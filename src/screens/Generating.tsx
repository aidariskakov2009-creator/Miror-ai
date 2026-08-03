import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { C } from "../data/constants";

const ITEMS = [
  "Analyzing personality signals",
  "Mapping skills and strengths",
  "Cross-referencing education pathways",
  "Reading labor market trends",
  "Modeling AI-driven industry shifts",
  "Scanning global opportunity data",
];

export default function Generating({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= ITEMS.length) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIdx((i) => i + 1), 550);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div className="min-h-full flex items-center justify-center px-6 font-body text-ink">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-8 flex items-center justify-center" style={{ width: 96, height: 96 }}>
          <div
            className="animate-spin"
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              border: `2px solid ${C.line}`,
              borderTopColor: C.violet,
              borderRightColor: C.blue,
            }}
          />
        </div>
        <h2 className="font-display text-2xl">
          {idx >= ITEMS.length ? "Your Digital Future Twin is ready." : "Building your Digital Future Twin"}
        </h2>
        <div className="mt-8 space-y-3 text-left">
          {ITEMS.map((it, i) => (
            <div
              key={it}
              className="flex items-center gap-3 text-sm transition-opacity"
              style={{ color: i <= idx ? C.text : C.dim, opacity: i <= idx ? 1 : 0.4 }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: i < idx ? `${C.teal}22` : "transparent",
                  border: `1px solid ${i < idx ? C.teal : C.line}`,
                }}
              >
                {i < idx ? (
                  <Check size={11} color={C.teal} />
                ) : i === idx ? (
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.blue }} />
                ) : null}
              </div>
              {it}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
