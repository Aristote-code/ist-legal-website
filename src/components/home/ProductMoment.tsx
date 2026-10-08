"use client";

import { hero } from "@/content/site";

const { moment } = hero;

// Timeline (seconds) for one 20s loop of the hero film.
export const LOOP = 20;
const T = {
  chipIn: 3.5,
  cardIn: 6.5,
  typeEnd: 9.5,
  searchEnd: 11,
  answerIn: 11,
  citesIn: 12.5,
  sourceIn: 14.5,
  out: 18.8,
};

const fade = (on: boolean) =>
  `transition-all duration-700 ease-out ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`;

export function ProductMoment({ t }: { t: number }) {
  const live = t < T.out;
  const typed = Math.max(0, Math.min(1, (t - T.cardIn) / (T.typeEnd - T.cardIn)));
  const question = moment.question.slice(0, Math.round(typed * moment.question.length));
  const searching = t >= T.typeEnd && t < T.searchEnd;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="relative mx-auto h-full max-w-[1200px] px-5">
        {/* Citation chip annotating the film */}
        <div className={`absolute right-[34%] top-[27%] ${fade(live && t >= T.chipIn)}`}>
          <div className="flex items-center gap-2 border border-white/15 bg-ink/50 px-3 py-1.5 text-[12px] text-on-ink backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-tint shadow-[0_0_10px_2px_rgba(169,155,255,0.6)]" />
            {moment.chip}
          </div>
          <div className="ml-[7px] h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        {/* Question → answer → authority card */}
        <div className={`absolute right-5 top-[36%] w-[380px] ${fade(live && t >= T.cardIn)}`}>
          <div className="border border-white/12 bg-ink/55 text-on-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-muted-ink">
              <span>IST Legal · Rwanda</span>
              <span>Illustrative</span>
            </div>

            <div className="px-4 pt-4 text-[14px] leading-snug">
              <span className="text-muted-ink">Q </span>
              {question}
              {typed < 1 && <span className="ml-0.5 inline-block h-[14px] w-px translate-y-[2px] animate-pulse bg-on-ink" />}
            </div>

            <div className="relative px-4 pb-4 pt-3">
              <p className={`text-[12px] text-muted-ink ${fade(searching)} absolute`}>Searching legal sources…</p>
              <p className={`text-[13px] leading-relaxed text-on-ink/85 ${fade(t >= T.answerIn)}`}>
                {moment.answer}
                <sup className="ml-0.5 text-brand-tint">[1]</sup>
                <sup className="ml-0.5 text-brand-tint">[2]</sup>
              </p>
            </div>

            <ul className={`border-t border-white/10 ${fade(t >= T.citesIn)}`}>
              {moment.citations.map((c) => {
                const opened = c.n === 1 && t >= T.sourceIn;
                return (
                  <li
                    key={c.n}
                    className={`flex items-start gap-3 border-b border-white/5 px-4 py-2.5 text-[12px] transition-colors duration-500 last:border-b-0 ${
                      opened ? "bg-brand/25" : ""
                    }`}
                  >
                    <span className="mt-px text-brand-tint">[{c.n}]</span>
                    <span className="flex-1">
                      <span className="block text-on-ink">{c.title}</span>
                      <span className="block text-muted-ink">{c.detail}</span>
                    </span>
                    <span className={`text-[11px] transition-colors ${opened ? "text-on-ink" : "text-muted-ink"}`}>
                      {opened ? "Source open" : "Open →"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className={`mt-2 text-right text-[11px] text-muted-ink ${fade(t >= T.sourceIn)}`}>
            Review the original provision before relying on the analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
