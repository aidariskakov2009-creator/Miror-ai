import { Newspaper } from "lucide-react";
import { C } from "../../data/constants";

interface NewsProps {
  name?: string;
  dreamName: string;
}

export default function NewsScreen({ name, dreamName }: NewsProps) {
  const yr = 2026;
  const who = name || "You";
  const whoLower = name || "you";
  const headlines = [
    { y: yr + 1, h: `${who} completes first major project in ${dreamName}.` },
    { y: yr + 3, h: `Local outlet profiles ${whoLower} as a rising name in ${dreamName}.` },
    { y: yr + 5, h: `${who} promoted to a leadership role after five years in ${dreamName}.` },
    { y: yr + 8, h: `${who} launches an independent venture built on ${dreamName} expertise.` },
    { y: yr + 10, h: `Industry panel invites ${whoLower} to speak on the future of ${dreamName}.` },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl">Headlines from your future.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        Fictional, generated from your current trajectory &mdash; not a promise.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {headlines.map((n) => (
          <div key={n.h} className="rounded-2xl p-5" style={{ background: C.surface2, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between text-xs mb-3" style={{ color: C.dim }}>
              <span className="font-mono">{n.y}</span>
              <span className="flex items-center gap-1">
                <Newspaper size={12} /> Mirror future wire
              </span>
            </div>
            <p className="font-display text-[17px] leading-snug">{n.h}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
