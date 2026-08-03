import { useState } from "react";
import { Sparkles, ArrowRight, MessageCircle, Layers, Compass, Brain, Newspaper } from "lucide-react";
import MirrorMark from "../components/MirrorMark";
import { PrimaryButton, GhostButton } from "../components/Buttons";
import { C } from "../data/constants";

export default function Landing({ onStart }: { onStart: () => void }) {
  const [split, setSplit] = useState(50);
  const stats = [
    { n: "2.4M+", l: "futures simulated" },
    { n: "146", l: "countries modeled" },
    { n: "91%", l: "would recommend" },
  ];

  return (
    <div className="font-body text-ink">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <MirrorMark />
          <span className="font-display font-semibold tracking-wide">Mirror AI</span>
        </div>
        <GhostButton onClick={onStart}>
          Try the twin <ArrowRight size={14} />
        </GhostButton>
      </nav>

      <header className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="flex items-center gap-2 mb-6 text-xs tracking-widest" style={{ color: C.dim }}>
          <Sparkles size={13} color={C.violet} /> DIGITAL FUTURE TWIN
        </div>
        <h1
          className="font-display font-semibold leading-[1.04] tracking-tight"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.6rem)" }}
        >
          See your future
          <br />
          before you{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${C.blue}, ${C.violet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            choose it.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg" style={{ color: C.muted }}>
          Google Maps shows you multiple routes. Mirror AI shows you multiple futures &mdash;
          simulated from your skills, goals, and the way the world of work is actually moving.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <PrimaryButton big onClick={onStart}>
            Generate my future twin <ArrowRight size={17} />
          </PrimaryButton>
          <span className="text-sm" style={{ color: C.dim }}>
            Free &middot; takes 3 minutes
          </span>
        </div>

        {/* signature: the mirror line — drag to compare now vs next */}
        <div
          className="mt-16 rounded-2xl relative overflow-hidden select-none"
          style={{ border: `1px solid ${C.line}`, background: C.surface }}
        >
          <div className="flex items-center justify-between px-6 pt-6 text-xs tracking-wider" style={{ color: C.dim }}>
            <span>YOU, TODAY</span>
            <span>YOU, IN 5 YEARS</span>
          </div>
          <div className="relative h-64 md:h-80 mx-6 my-5 rounded-xl overflow-hidden" style={{ background: C.surface2 }}>
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="p-6 flex flex-col justify-end">
                <div className="text-xs" style={{ color: C.dim }}>Role</div>
                <div className="font-display text-[22px]">Junior Analyst</div>
                <div className="mt-3 flex gap-6 font-mono">
                  <div>
                    <div className="text-[11px]" style={{ color: C.dim }}>SALARY</div>
                    <div style={{ color: C.blue }}>$42,000</div>
                  </div>
                  <div>
                    <div className="text-[11px]" style={{ color: C.dim }}>READINESS</div>
                    <div style={{ color: C.blue }}>48</div>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-end items-end text-right">
                <div className="text-xs" style={{ color: C.dim }}>Role</div>
                <div className="font-display text-[22px]">Lead Product Strategist</div>
                <div className="mt-3 flex gap-6 font-mono">
                  <div>
                    <div className="text-[11px]" style={{ color: C.dim }}>SALARY</div>
                    <div style={{ color: C.violet }}>$118,000</div>
                  </div>
                  <div>
                    <div className="text-[11px]" style={{ color: C.dim }}>READINESS</div>
                    <div style={{ color: C.violet }}>86</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: `${split}%`,
                width: 1.5,
                background: `linear-gradient(180deg, ${C.blue}, ${C.violet})`,
                boxShadow: `0 0 24px 2px ${C.violet}55`,
              }}
            />
            <div
              className="absolute top-1/2 flex items-center justify-center rounded-full"
              style={{
                left: `${split}%`,
                width: 34,
                height: 34,
                transform: "translate(-50%,-50%)",
                background: C.bg,
                border: `1px solid ${C.lineStrong}`,
              }}
            >
              <Layers size={14} color={C.text} />
            </div>
          </div>
          <input
            type="range"
            min={5}
            max={95}
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            className="w-full opacity-0 absolute inset-x-0 bottom-0 h-64 md:h-80 cursor-ew-resize"
            style={{ top: 84 }}
            aria-label="Compare today versus future"
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-10">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-display font-semibold text-[26px]">{s.n}</div>
              <div className="text-xs mt-1" style={{ color: C.dim }}>{s.l}</div>
            </div>
          ))}
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t" style={{ borderColor: C.line }}>
        <p className="text-xs mb-3 tracking-widest" style={{ color: C.dim }}>THE PROBLEM</p>
        <h2 className="font-display font-medium max-w-2xl" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
          Millions choose an education and a career with almost no personalized signal about the consequences.
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            "Will AI replace this profession by the time I graduate?",
            "What salary can I realistically expect, and where?",
            "What happens if I move abroad, or start a business instead?",
          ].map((q) => (
            <div key={q} className="rounded-xl p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              <MessageCircle size={18} color={C.muted} />
              <p className="mt-4 text-sm">{q}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t" style={{ borderColor: C.line }}>
        <p className="text-xs mb-3 tracking-widest" style={{ color: C.dim }}>WHAT YOU GET</p>
        <div className="grid md:grid-cols-4 gap-5 mt-6">
          {[
            { icon: Layers, t: "Three simulated futures", d: "Safe, high-income, and dream-career paths built from your real inputs." },
            { icon: Compass, t: "A live simulator", d: "Change one variable and watch every projection recalculate instantly." },
            { icon: Brain, t: "An AI mentor", d: "Ask it why any number moved, and what to do about it." },
            { icon: Newspaper, t: "Future headlines", d: "Fictional news from the years ahead, written from your own trajectory." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              <f.icon size={20} color={C.violet} />
              <div className="font-display text-base mt-4">{f.t}</div>
              <p className="text-sm mt-2" style={{ color: C.muted }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t" style={{ borderColor: C.line }}>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { q: "\u201CIt showed me the internship was worth more than the extra certificate. I would never have guessed that.\u201D", n: "Priya, 19 \u2014 pre-university" },
            { q: "\u201CI moved the Germany variable and my whole ten-year timeline rewrote itself in two seconds.\u201D", n: "Tomas, 24 \u2014 career switcher" },
            { q: "\u201CThe future news cards made the whole thing feel real instead of theoretical.\u201D", n: "Aiko, 21 \u2014 design student" },
          ].map((t) => (
            <div key={t.n} className="rounded-xl p-6" style={{ background: C.surface2, border: `1px solid ${C.line}` }}>
              <p className="text-sm">{t.q}</p>
              <p className="text-xs mt-4" style={{ color: C.dim }}>{t.n}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 text-center">
        <h2 className="font-display font-medium" style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>
          Ready to meet your twin?
        </h2>
        <div className="mt-8">
          <PrimaryButton big onClick={onStart}>
            Start the simulation <ArrowRight size={17} />
          </PrimaryButton>
        </div>
      </section>
    </div>
  );
}
