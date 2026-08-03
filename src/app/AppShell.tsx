import { useMemo, useState } from "react";
import MirrorMark from "../components/MirrorMark";
import { C, TABS, buildPaths, adjustPath, computeMetrics, TOGGLES } from "../data/constants";
import type { OnboardingData, AppTab } from "../types";

import PathsScreen from "./screens/PathsScreen";
import SimulatorScreen from "./screens/SimulatorScreen";
import DashboardScreen from "./screens/DashboardScreen";
import MentorScreen from "./screens/MentorScreen";
import TimelineScreen from "./screens/TimelineScreen";
import NewsScreen from "./screens/NewsScreen";
import MapScreen from "./screens/MapScreen";

interface AppShellProps {
  data: OnboardingData;
  active: string[];
  setActive: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AppShell({ data, active, setActive }: AppShellProps) {
  const [tab, setTab] = useState<AppTab>("paths");

  const paths = useMemo(
    () => buildPaths(data.dream).map((p) => adjustPath(p, active)),
    [data.dream, active]
  );
  const metrics = useMemo(() => computeMetrics(active), [active]);
  const dreamPath = paths.find((p) => p.id === "dream")!;
  const dreamName = dreamPath.name;
  const ctx = {
    salary: dreamPath.salary!,
    aiRisk: dreamPath.aiRisk,
    probability: dreamPath.probability,
    dreamName,
    activeLabels: active.map((id) => TOGGLES.find((t) => t.id === id)?.label).filter(Boolean).join(", "),
  };

  return (
    <div className="flex min-h-full font-body text-ink">
      <aside className="hidden md:flex flex-col w-60 shrink-0 py-6 px-4" style={{ borderRight: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 px-2 mb-8">
          <MirrorMark size={24} />
          <span className="font-display font-semibold">Mirror AI</span>
        </div>
        <div className="px-2 mb-6">
          <div className="text-xs" style={{ color: C.dim }}>Digital twin</div>
          <div className="font-display text-[15px] mt-1">{data.name || "Your twin"}</div>
        </div>
        <nav className="space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{ background: tab === t.id ? C.surface2 : "transparent", color: tab === t.id ? C.text : C.muted }}
            >
              <t.icon size={16} color={tab === t.id ? C.violet : C.dim} /> {t.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex gap-1 overflow-x-auto px-4 py-3" style={{ borderBottom: `1px solid ${C.line}` }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs shrink-0"
              style={{ background: tab === t.id ? C.surface2 : "transparent", color: tab === t.id ? C.text : C.muted, border: `1px solid ${C.line}` }}
            >
              <t.icon size={13} /> {t.label}
            </button>
          ))}
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
          {tab === "paths" && <PathsScreen paths={paths} />}
          {tab === "simulator" && <SimulatorScreen paths={paths} active={active} setActive={setActive} />}
          {tab === "dashboard" && <DashboardScreen metrics={metrics} />}
          {tab === "mentor" && <MentorScreen ctx={ctx} />}
          {tab === "timeline" && <TimelineScreen dreamName={dreamName} />}
          {tab === "news" && <NewsScreen name={data.name} dreamName={dreamName} />}
          {tab === "map" && <MapScreen activeGermany={active.includes("germany")} />}
        </div>
      </div>
    </div>
  );
}
