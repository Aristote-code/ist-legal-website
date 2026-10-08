import Image from "next/image";

// IST Legal logo (Figma node 8:1780): arch mark + "IST LEGAL" in Certia Black, 10% tracking.
// Proportions from the frame — mark 584.65×568.45, gap 217, wordmark 261.23px — scaled to `height`.
const MARK_W = 584.654;
const MARK_H = 568.454;

export function Logo({ height = 30 }: { height?: number }) {
  const scale = height / MARK_H;
  return (
    <span className="flex items-center" style={{ gap: 217 * scale }}>
      <Image
        src="/brand/ist-legal-mark.svg"
        alt=""
        width={Math.round(MARK_W * scale)}
        height={height}
        style={{ width: MARK_W * scale, height }}
        preload
      />
      <span
        className="whitespace-nowrap font-black uppercase leading-none text-white"
        style={{ fontSize: 261.231 * scale, letterSpacing: "0.1em" }}
      >
        IST Legal
      </span>
    </span>
  );
}
