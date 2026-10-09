interface IconProps {
  className?: string;
  size?: number;
}

export function PumpkinIcon({ className, size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 7c-1-1.2-2.6-1.5-4.2-.9C5 7.1 3 9.9 3 13.2 3 16.9 5.4 20 8.6 20c.9 0 1.7-.2 2.4-.6.6.4 1.4.4 2 0 .7.4 1.5.6 2.4.6 3.2 0 5.6-3.1 5.6-6.8 0-3.3-2-6.1-4.8-7.1-1.6-.6-3.2-.3-4.2.9z" />
      <path d="M12 7c0-1.6.6-2.8 2-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BatIcon({ className, size = 48 }: IconProps) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 64 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M32 10l-3-6-1 5c-6-4-14-5-26-3 6 2 9 6 9 11 3-3 6-3 9 0 2-3 5-3 7 1 2 5 5 8 5 8s3-3 5-8c2-4 5-4 7-1 3-3 6-3 9 0 0-5 3-9 9-11-12-2-20-1-26 3l-1-5z" />
    </svg>
  );
}

// Cobweb anchored in the top-right corner of a 120×120 box
const WEB_CORNER = { x: 120, y: 0 };
const WEB_SPOKES = [0, 22.5, 45, 67.5, 90].map((angle) => {
  const radians = (angle * Math.PI) / 180;
  return { x: WEB_CORNER.x - 115 * Math.cos(radians), y: 115 * Math.sin(radians) };
});
const WEB_PATH = [
  ...WEB_SPOKES.map((end) => `M${WEB_CORNER.x} ${WEB_CORNER.y}L${end.x.toFixed(1)} ${end.y.toFixed(1)}`),
  ...[0.35, 0.6, 0.85].flatMap((ring) => {
    const points = WEB_SPOKES.map((end) => ({
      x: WEB_CORNER.x + (end.x - WEB_CORNER.x) * ring,
      y: end.y * ring,
    }));
    return points.slice(1).map((point, i) => {
      const previous = points[i];
      // Pull each strand's midpoint toward the corner so it sags like a real web
      const controlX = WEB_CORNER.x + ((previous.x + point.x) / 2 - WEB_CORNER.x) * 0.82;
      const controlY = ((previous.y + point.y) / 2) * 0.82;
      return `M${previous.x.toFixed(1)} ${previous.y.toFixed(1)}Q${controlX.toFixed(1)} ${controlY.toFixed(1)} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
    });
  }),
].join("");

export function CobwebCorner({ className, size = 160 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" className={className} aria-hidden="true">
      <path d={WEB_PATH} />
    </svg>
  );
}
