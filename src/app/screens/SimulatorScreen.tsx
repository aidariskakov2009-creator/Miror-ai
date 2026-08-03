import Chip from "../../components/Chip";
import { C, TOGGLES } from "../../data/constants";
import type { FuturePath } from "../../types";

interface SimulatorProps {
  paths: FuturePath[];
  active: string[];
  setActive: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SimulatorScreen({ paths, active, setActive }: SimulatorProps) {
  const toggle = (id: string) =>
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <div>
      <h2 className="font-display text-2xl">Change a variable. Watch every future move.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        Toggle any combination &mdash; the three paths recalculate instantly.
      </p>
      <div className="flex flex-wrap gap-2.5 mt-6">
        {TOGGLES.map((t) => (
          <Chip key={t.id} active={active.includes(t.id)} onClick={() => toggle(t.id)} icon={t.icon}>
            {t.label}
          </Chip>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {paths.map((p) => (
          <div key={p.id} className="rounded-2xl p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ color: p.color, background: `${p.color}18` }}>
                {p.tag}
              </span>
            </div>
            <div className="font-display text-lg mt-3">{p.name}</div>
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: C.dim }}>Salary</span>
                  <span className="font-mono" style={{ color: p.color }}>${p.salary!.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: C.line }}>
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (p.salary! / 200000) * 100)}%`, background: p.color }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: C.dim }}>Success probability</span>
                  <span className="font-mono">{p.probability}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: C.line }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.probability}%`, background: C.teal }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: C.dim }}>AI risk</span>
                  <span className="font-mono">{p.aiRisk}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: C.line }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.aiRisk}%`, background: C.coral }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
