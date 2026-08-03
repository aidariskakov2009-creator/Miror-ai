import { useState } from "react";
import { MessageCircle, Brain } from "lucide-react";
import { C, MENTOR_QA } from "../../data/constants";
import type { MentorContext } from "../../types";

export default function MentorScreen({ ctx }: { ctx: MentorContext }) {
  const [asked, setAsked] = useState<number[]>([0]);
  const ask = (i: number) => setAsked((a) => (a.includes(i) ? a : [...a, i]));

  return (
    <div>
      <h2 className="font-display text-2xl">Ask your AI mentor.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        It explains the reasoning behind every number in your twin.
      </p>
      <div className="mt-6 rounded-2xl p-5 md:p-6 space-y-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
        {MENTOR_QA.map((qa, i) => (
          <div key={qa.q}>
            <button onClick={() => ask(i)} className="flex items-center gap-3 text-left w-full">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: `${C.blue}1F` }}>
                <MessageCircle size={13} color={C.blue} />
              </div>
              <span className="text-sm">{qa.q}</span>
            </button>
            {asked.includes(i) && (
              <div className="ml-10 mt-3 rounded-xl p-4 text-sm" style={{ background: C.surface2, color: C.muted, border: `1px solid ${C.line}` }}>
                <span className="inline-flex items-center gap-2 mb-2 text-xs" style={{ color: C.violet }}>
                  <Brain size={12} /> Mirror mentor
                </span>
                <p>{qa.a(ctx)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
