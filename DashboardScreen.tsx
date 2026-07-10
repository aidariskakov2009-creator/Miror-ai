import Ring from "../../components/Ring";
import { C, METRIC_META } from "../../data/constants";
import type { Metrics } from "../../types";

export default function DashboardScreen({ metrics }: { metrics: Metrics }) {
  return (
    <div>
      <h2 className="font-display text-2xl">Your future, quantified.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        Twelve signals pulled from your twin, updated live from the simulator.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {METRIC_META.map((m, i) => {
          const v = metrics[m.key];
          const color =
            m.good === "high"
              ? v > 60 ? C.teal : v > 35 ? C.blue : C.coral
              : v < 35 ? C.teal : v < 60 ? C.blue : C.coral;
          return (
            <div
              key={m.key}
              className="rounded-2xl p-5 flex flex-col items-center text-center gap-3"
              style={{ background: C.surface, border: `1px solid ${C.line}` }}
            >
              <Ring value={v} size={78} stroke={6} color={color} delay={i * 60} />
              <div className="flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
                <m.icon size={13} /> {m.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
