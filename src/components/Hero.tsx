import Image from "next/image";
import Link from "next/link";

const headline = [
  ["Reimagine", "What", "Your"],
  ["Business", "Can", "Achieve"],
];

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-bg-dark">
      {/* Image */}
      <div className="absolute inset-0 -z-10 overflow-clip">
        <Image src="/media/hero.png" alt="" fill preload sizes="100vw" className="pointer-events-none object-cover object-[72%_center] lg:object-center" />
      </div>

      {/* Fade into background from 33% */}
      <div className="absolute inset-0 flex min-h-[100svh] justify-center bg-gradient-to-b from-[rgba(8,16,20,0)] from-33% to-bg-dark">
        <div className="flex w-full max-w-[1200px] flex-col justify-end px-2xl pb-2xl pt-[120px]">
          <div className="flex flex-col justify-center gap-[36px] border-b border-line pb-[60px]">
            <div className="flex flex-col justify-center gap-2xl">
              <h1 className="max-w-[764px] text-[44px] font-normal leading-[1.1] tracking-[-0.06em] text-white sm:text-[56px] lg:text-display-2xl lg:leading-[79.2px] lg:tracking-[-4.32px]">
                {headline.map((line, l) => (
                  <span key={l} className="inline lg:block">
                    {line.map((word, w) => {
                      const delay = 0.1 + (l * 3 + w) * 0.08;
                      return (
                        <span key={word} className="word-in mr-[0.19em] last:mr-0" style={{ animationDelay: `${delay}s` }}>
                          {word}
                        </span>
                      );
                    })}
                    {l === 0 && " "}
                  </span>
                ))}
              </h1>
              <p className="max-w-[540px] text-lg leading-[25.2px] text-text-muted">
                We help leaders navigate complexity, solve critical challenges, and build stronger, more resilient
                organizations for the future.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2xl">
              <Link
                href="#book-a-call"
                className="flex h-[50.4px] min-w-[155px] items-center justify-center bg-white px-2xl py-[14px] text-md font-medium leading-[22.4px] text-bg-dark transition-opacity hover:opacity-90"
              >
                Book a Call
              </Link>
              <Link
                href="#case-studies"
                className="flex h-[50.4px] items-center justify-center border border-line px-2xl py-[14px] text-md font-medium leading-[22.4px] text-white transition-colors hover:bg-white/5"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between gap-[10px] pt-2xl text-sm leading-[19.6px] text-white">
            <p>Build with intention</p>
            <p className="text-right">Scale with confidence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
