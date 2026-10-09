#!/usr/bin/env bash
# The GPU e2e kit (ADR 0045): builds the site in WSL, serves it from a vite preview in WSL, and runs
# Playwright ON WINDOWS against Windows Chrome on the laptop's own GPU (WebGPU, High graphics).
# WSL cannot reach a Windows browser's debugging port, but Windows can load a server in WSL through
# localhost, so the browser and Playwright live on Windows and the server stays here.
#
#   tools/gpu/run.sh [--gpu-only] [--skip-build] [--uncapped]
#     --gpu-only    only the WebGPU, frame-timing and screenshot spec (e2e/gpu.spec.ts), not the normal e2e
#     --skip-build  reuse dist/ as it is (it must have been built with the same PAGES_BASE)
#     --uncapped    frame timings with vsync and Chrome's frame-rate limit off (the real frame cost)
#   Env: PAGES_BASE (default the GitHub Pages path, as CI), GPU_WIN_ROOT (default C:\llandeilo-gpu),
#        GPU_TIMEOUT (seconds for the Windows side, default 2700)
#
# Results land in test-results-gpu/ (webgpu.json, frames.json, screenshots, Playwright's JSON reports),
# a one-line summary prints at the end, and the exit code is the first failing Playwright pass's.
# A self-hosted CI runner job only needs to call this script and upload test-results-gpu/.
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
cd "$root"
started=$(date +%s)
log() { echo "$(date +%H:%M:%S) gpu: $*"; }
fail() {
  log "FAILED: $*"
  exit 2
}

passes=gpu,e2e
build=1
uncapped=()
for arg in "$@"; do
  case "$arg" in
    --gpu-only) passes=gpu ;;
    --skip-build) build=0 ;;
    --uncapped) uncapped=(-Uncapped) ;;
    *) fail "unknown argument $arg (see the top of $0)" ;;
  esac
done
base=${PAGES_BASE:-/llandeilo-omnia-mutantur-nihil-interit/}
win_root=${GPU_WIN_ROOT:-'C:\llandeilo-gpu'}
results=$root/test-results-gpu

# One run at a time: every run shares the one Windows working copy.
mkdir -p "$HOME/.cache"
exec 9>"$HOME/.cache/llandeilo-gpu.lock"
flock -n 9 || fail "another GPU run holds $HOME/.cache/llandeilo-gpu.lock"

ps=$(command -v powershell.exe || echo /mnt/c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe)
[[ -x "$ps" ]] || fail "powershell.exe not found: this kit runs under WSL on a Windows machine"
node_major=$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0)
((node_major >= 22)) || fail "needs Node 22.18+ in WSL (found $(node --version 2>/dev/null || echo none))"

# A symlinked node_modules (a worktree sharing the main clone's) is left alone.
if [[ ! -e node_modules ]] || { [[ ! -L node_modules ]] && [[ package-lock.json -nt node_modules/.package-lock.json ]]; }; then
  log "npm ci (node_modules missing or older than package-lock.json)"
  npm ci --no-audit --no-fund
fi
pw_version=$(node -p "require('./package-lock.json').packages['node_modules/@playwright/test'].version")

if ((build)); then
  log "building dist with PAGES_BASE=$base"
  t=$(date +%s)
  PAGES_BASE=$base npx vite build --logLevel warn
  log "built in $(($(date +%s) - t))s"
fi
[[ -f dist/index.html ]] || fail "no dist/index.html (drop --skip-build)"

stage=$(mktemp -d "${TMPDIR:-/tmp}/llandeilo-gpu.XXXXXX")
preview_pid=
cleanup() {
  if [[ -n "$preview_pid" ]] && kill -0 "$preview_pid" 2>/dev/null; then
    kill "$preview_pid" 2>/dev/null || true
    wait "$preview_pid" 2>/dev/null || true
  fi
  rm -rf "$stage"
}
trap cleanup EXIT

# A free port that is never the dev server's 5051.
port=5051
while ((port == 5051)); do
  port=$(node -e "const s=require('net').createServer();s.listen(0,'127.0.0.1',()=>{console.log(s.address().port);s.close()})")
done
url="http://localhost:$port$base"
PAGES_BASE=$base node node_modules/vite/bin/vite.js preview --port "$port" --strictPort --host 127.0.0.1 \
  >"$stage/preview.log" 2>&1 &
preview_pid=$!
for i in $(seq 1 60); do
  curl -sf -o /dev/null "$url" && break
  kill -0 "$preview_pid" 2>/dev/null || {
    cat "$stage/preview.log"
    fail "the preview server exited"
  }
  ((i % 10 == 0)) && log "waiting for the preview on :$port (tick $i/60)"
  sleep 0.5
done
curl -sf -o /dev/null "$url" || fail "the preview never answered at $url"
log "preview pid $preview_pid serving dist at $url"

# Windows needs only the test code: the specs, the src modules they import, and the GPU config.
tar -cf "$stage/repo.tar" package.json tsconfig.json playwright.gpu.config.ts e2e src \
  tools/frame-timing.ts tools/gpu
rm -rf "$results"
mkdir -p "$results"

log "running on Windows (passes: $passes; Playwright $pw_version; Windows root $win_root)"
set +e
# A backstop above Playwright's own 30-minute limit, so a stalled Windows side cannot hang a CI job.
timeout --kill-after=30 "${GPU_TIMEOUT:-2700}" "$ps" -NoProfile -NonInteractive -ExecutionPolicy Bypass -File "$(wslpath -w "$root/tools/gpu/windows.ps1")" \
  -Tar "$(wslpath -w "$stage/repo.tar")" -BaseUrl "$url" -Dest "$(wslpath -w "$results")" \
  -PlaywrightVersion "$pw_version" -Root "$win_root" -Passes "$passes" "${uncapped[@]}"
code=$?
set -e
log "Windows side exited $code"

node tools/gpu/summary.ts "$results" "$(($(date +%s) - started))" "$code" | tee "$results/summary.txt"
exit "$code"
