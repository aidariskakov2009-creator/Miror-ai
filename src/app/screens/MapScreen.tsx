import { C, COUNTRIES } from "../../data/constants";

export default function MapScreen({ activeGermany }: { activeGermany: boolean }) {
  return (
    <div>
      <h2 className="font-display text-2xl">Where the opportunity is.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>
        Salary, demand, and mobility, compared across your candidate countries.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {COUNTRIES.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: C.surface,
              border: `1px solid ${activeGermany && c.name === "Germany" ? C.blue + "77" : C.line}`,
            }}
          >
            <div className="text-2xl">{c.flag}</div>
            <div className="flex-1">
              <div className="font-display text-base">{c.name}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs" style={{ color: C.muted }}>
                <span>
                  Salary <b className="font-mono font-medium" style={{ color: C.text }}>{c.salary}</b>
                </span>
                <span>Demand {c.demand}</span>
                <span>Visa {c.visa}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-base" style={{ color: C.teal }}>{c.remote}</div>
              <div className="text-xs" style={{ color: C.dim }}>remote score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
