import { C } from "../../data/constants";

export default function TimelineScreen({ dreamName }: { dreamName: string }) {
  const milestones = [
    { t: "Today", d: "Exploring options, building foundational skills.", tag: "Start" },
    { t: "1 year", d: `First hands-on project or internship pointing toward ${dreamName}.`, tag: "Foundation" },
    { t: "3 years", d: "Recognized junior contributor, first promotion or client win.", tag: "Growth" },
    { t: "5 years", d: `Established in the ${dreamName} track, mentoring others.`, tag: "Momentum" },
    { t: "10 years", d: "Leading a team, product, or practice of your own.", tag: "Mastery" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl">Your ten-year arc.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        The path toward {dreamName}, milestone by milestone.
      </p>
      <div className="mt-10 relative">
        <div
          className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, ${C.blue}, ${C.violet})` }}
        />
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <div key={m.t} className={`relative flex md:items-center gap-5 md:gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div
                className="absolute left-3 md:left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2"
                style={{ background: C.violet, marginTop: 6 }}
              />
              <div className="md:w-1/2" />
              <div className="ml-10 md:ml-0 md:w-1/2 rounded-xl p-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-2 text-xs" style={{ color: C.dim }}>
                  <span>{m.t}</span>
                  <span>&middot;</span>
                  <span style={{ color: C.blue }}>{m.tag}</span>
                </div>
                <p className="text-sm mt-2">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
