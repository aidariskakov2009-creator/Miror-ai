import { useState } from "react";
import Landing from "./Landing";
import Onboarding from "./Onboarding";
import Generating from "./Generating";
import AppShell from "./AppShell";
import type { OnboardingData, Screen } from "./types";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [data, setData] = useState<OnboardingData>({});
  const [active, setActive] = useState<string[]>([]);

  return (
    <div style={{ background: "#0A0D18", minHeight: "100vh" }}>
      {screen === "landing" && <Landing onStart={() => setScreen("onboarding")} />}
      {screen === "onboarding" && (
        <Onboarding
          data={data}
          setData={setData}
          onBack={() => setScreen("landing")}
          onDone={() => setScreen("generating")}
        />
      )}
      {screen === "generating" && <Generating onDone={() => setScreen("app")} />}
      {screen === "app" && <AppShell data={data} active={active} setActive={setActive} />}
    </div>
  );
}
