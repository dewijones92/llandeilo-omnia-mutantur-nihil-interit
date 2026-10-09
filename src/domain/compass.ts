const TURN = Math.PI * 2;
const FACING_NORTH = -Math.PI / 2;

export function bearingOf(alpha: number): number {
  const deg = (Math.atan2(-Math.cos(alpha), -Math.sin(alpha)) * 180) / Math.PI;
  return ((deg % 360) + 360) % 360;
}

export function northAlpha(alpha: number): number {
  return FACING_NORTH + Math.round((alpha - FACING_NORTH) / TURN) * TURN;
}

/** The camera angles that look along a compass bearing, tilted `pitch` degrees below the horizon. */
export function cameraAngles(
  bearing: number,
  pitch: number,
): { readonly alpha: number; readonly beta: number } {
  const b = (bearing * Math.PI) / 180;
  return { alpha: Math.atan2(-Math.cos(b), -Math.sin(b)), beta: Math.PI / 2 - (pitch * Math.PI) / 180 };
}
