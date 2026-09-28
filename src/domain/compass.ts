const TURN = Math.PI * 2;
const FACING_NORTH = -Math.PI / 2;

export function bearingOf(alpha: number): number {
  const deg = (Math.atan2(-Math.cos(alpha), -Math.sin(alpha)) * 180) / Math.PI;
  return ((deg % 360) + 360) % 360;
}

export function northAlpha(alpha: number): number {
  return FACING_NORTH + Math.round((alpha - FACING_NORTH) / TURN) * TURN;
}
