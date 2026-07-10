import { C } from "../../data/constants";
import type { FuturePath } from "../../types";

function PathCard({ path, featured }: { path: FuturePath; featured?: boolean }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-5"
      style={{ background: C.surface, border: `1px solid ${featured ? path.color + "55" : C.line}` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs px-2.5 py-1 rounded-full" style={{ color: path.color, background: `${path.color}18` }}>
          {path.tag}
        </span>
        <span className="text-xs" style={{ color: C.dim }}>{path.label}</span>
      </div>
      <div>
        <div className="font-display text-[21px]">{path.name}</div>
        <div className="text-xs mt-1" style={{ color: C.muted }}>{path.timeline}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs" style={{ color: C.dim }}>Salary projection</div>
          <div className="font-mono text-lg" style={{ color: path.color }}>${(path.salary ?? path.baseSalary).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs" style={{ color: C.dim }}>Success probability</div>
          <div className="font-mono text-lg">{path.probability}%</div>
        </div>
        <div>
          <div className="text-xs" style={{ color: C.dim }}>AI replacement risk</div>
          <div className="font-mono text-lg">{path.aiRisk}%</div>
        </div>
        <div>
          <div className="text-xs" style={{ color: C.dim }}>Job satisfaction</div>
          <div className="font-mono text-lg">{path.satisfaction}/10</div>
        </div>
      </div>
      <div className="h-px" style={{ background: C.line }} />
      <div>
        <div className="text-xs mb-2" style={{ color: C.dim }}>Suggested skills</div>
        <div className="flex flex-wrap gap-2">
          {path.skills.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full" style={{ border: `1px solid ${C.line}`, color: C.muted }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs mb-2" style={{ color: C.dim }}>Education route</div>
        <div className="text-sm">{path.unis[0]}</div>
      </div>
    </div>
  );
}

export default function PathsScreen({ paths }: { paths: FuturePath[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl">Three futures, built from your answers.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        Every path updates as you change variables in the simulator.
      </p>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {paths.map((p) => (
          <PathCard key={p.id} path={p} featured={p.id === "dream"} />
        ))}
      </div>
    </div>
  );
}
