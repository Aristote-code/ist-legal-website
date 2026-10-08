import Image from "next/image";

// IST Legal logo — supplied SVG (mark + wordmark), viewBox trimmed to the artwork (2493×679).
const RATIO = 2493 / 679;

export function Logo({ height = 30 }: { height?: number }) {
  const width = height * RATIO;
  return (
    <Image
      src="/brand/ist-legal-logo.svg"
      alt="IST Legal"
      width={Math.round(width)}
      height={height}
      style={{ width, height }}
      preload
    />
  );
}
