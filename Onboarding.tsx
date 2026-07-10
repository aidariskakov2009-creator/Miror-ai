import { useState } from "react";
import { Check, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import MirrorMark from "../components/MirrorMark";
import Chip from "../components/Chip";
import { PrimaryButton, GhostButton } from "../components/Buttons";
import { C, SUBJECTS, STRENGTHS, TECH_SKILLS, ONBOARDING_STEPS } from "../data/constants";
import type { OnboardingData } from "../types";

interface OnboardingProps {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
  onDone: () => void;
  onBack: () => void;
}

export default function Onboarding({ data, setData, onDone, onBack }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const toggleArr = (key: "subjects" | "strengths" | "techSkills", val: string) => {
    setData((d) => {
      const arr = d[key] || [];
      return { ...d, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  };
  const set = (key: keyof OnboardingData, val: string) => setData((d) => ({ ...d, [key]: val }));

  const inputClass = "w-full rounded-xl px-4 py-3 font-body text-ink bg-surface2 border border-line outline-none";

  return (
    <div className="min-h-full flex flex-col font-body text-ink">
      <div className="max-w-2xl mx-auto w-full px-6 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <MirrorMark size={22} />
          <span className="font-display font-semibold">Mirror AI</span>
        </div>
        <div className="flex items-center gap-2 mt-8">
          {ONBOARDING_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors shrink-0"
                  style={{
                    background: i <= step ? `linear-gradient(90deg, ${C.blue}, ${C.violet})` : "transparent",
                    border: `1px solid ${i <= step ? "transparent" : C.line}`,
                    color: i <= step ? "#080A14" : C.dim,
                  }}
                >
                  {i < step ? <Check size={13} /> : i + 1}
                </div>
                <span className="text-xs hidden md:inline" style={{ color: i === step ? C.text : C.dim }}>{s}</span>
              </div>
              {i < ONBOARDING_STEPS.length - 1 && <div className="flex-1 h-px" style={{ background: C.line }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 flex-1">
        {step === 0 && (
          <div className="space-y-5 animate-fadeIn">
            <h2 className="font-display text-[28px]">Let's start with the basics.</h2>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Your name</label>
              <input className={`${inputClass} mt-1.5`} placeholder="Jordan" value={data.name || ""} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs" style={{ color: C.dim }}>Age range</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["15\u201317", "18\u201321", "22\u201325", "26+"].map((a) => (
                    <Chip key={a} active={data.age === a} onClick={() => set("age", a)}>{a}</Chip>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs" style={{ color: C.dim }}>Country</label>
                <input className={`${inputClass} mt-1.5`} placeholder="e.g. Kazakhstan" value={data.country || ""} onChange={(e) => set("country", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="font-display text-[28px]">Your education so far.</h2>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Education level</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["High school", "Undergraduate", "Graduate", "Self-taught"].map((a) => (
                  <Chip key={a} active={data.education === a} onClick={() => set("education", a)}>{a}</Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Favorite subjects</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {SUBJECTS.map((s) => (
                  <Chip key={s} active={(data.subjects || []).includes(s)} onClick={() => toggleArr("subjects", s)}>{s}</Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Your strengths</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {STRENGTHS.map((s) => (
                  <Chip key={s} active={(data.strengths || []).includes(s)} onClick={() => toggleArr("strengths", s)}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="font-display text-[28px]">Skills, and where you're headed.</h2>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Technical skills you already have</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {TECH_SKILLS.map((s) => (
                  <Chip key={s} active={(data.techSkills || []).includes(s)} onClick={() => toggleArr("techSkills", s)}>{s}</Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Your dream career</label>
              <input className={`${inputClass} mt-1.5`} placeholder="e.g. Product designer, doctor, founder" value={data.dream || ""} onChange={(e) => set("dream", e.target.value)} />
            </div>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Desired salary range</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["$30\u201350k", "$50\u201380k", "$80\u2013120k", "$120k+"].map((a) => (
                  <Chip key={a} active={data.salary === a} onClick={() => set("salary", a)}>{a}</Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="font-display text-[28px]">How do you want to work and live?</h2>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Remote or office</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Remote", "Hybrid", "Office", "No preference"].map((a) => (
                  <Chip key={a} active={data.workStyle === a} onClick={() => set("workStyle", a)}>{a}</Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Willing to relocate</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Yes, anywhere", "Yes, within region", "Prefer to stay"].map((a) => (
                  <Chip key={a} active={data.relocate === a} onClick={() => set("relocate", a)}>{a}</Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Entrepreneurship interest</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Low", "Curious", "High \u2014 want to build"].map((a) => (
                  <Chip key={a} active={data.entrepreneurship === a} onClick={() => set("entrepreneurship", a)}>{a}</Chip>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <h2 className="font-display text-[28px]">Ready to build your twin.</h2>
            <p className="text-sm" style={{ color: C.muted }}>Here's what we'll simulate from:</p>
            <div className="rounded-xl p-5 space-y-3" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              {[
                ["Name", data.name || "\u2014"],
                ["Country", data.country || "\u2014"],
                ["Education", data.education || "\u2014"],
                ["Dream career", data.dream || "\u2014"],
                ["Salary goal", data.salary || "\u2014"],
                ["Relocation", data.relocate || "\u2014"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span style={{ color: C.dim }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 py-8 flex justify-between">
        <GhostButton onClick={() => (step === 0 ? onBack() : setStep(step - 1))}>
          <ArrowLeft size={14} /> Back
        </GhostButton>
        {step < ONBOARDING_STEPS.length - 1 ? (
          <PrimaryButton onClick={() => setStep(step + 1)}>
            Continue <ArrowRight size={15} />
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={onDone}>
            Generate my twin <Sparkles size={15} />
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
