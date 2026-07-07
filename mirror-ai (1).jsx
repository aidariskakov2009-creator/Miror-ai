import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Sparkles, ArrowRight, ArrowLeft, Brain, TrendingUp, TrendingDown, Globe2,
  MessageCircle, Clock, Newspaper, Map as MapIcon, Check, ChevronRight,
  Rocket, Languages, Code2, Plane, Briefcase, GraduationCap, Building2,
  Users, Shield, Zap, Heart, Award, X, Layers, Send, Sun, Moon, Compass,
  BarChart3, Flame, Target, Wallet, GaugeCircle,
} from "lucide-react";

/* ---------------------------------------------------------------
   MIRROR AI — Digital Future Twin
   Design tokens
   bg void #0A0D18 · surface #12162A · surface2 #191F3D · line rgba(255,255,255,.08)
   text #EEF1FF · muted #8F97BE
   present (blue) #6E8CFF · future (violet) #C08CFF · growth (teal) #45D9C0 · risk (coral) #FF8F6B
   display: Space Grotesk · body: Inter · data: JetBrains Mono
   signature: "the mirror line" — a vertical seam of light splitting now / next
----------------------------------------------------------------- */

const C = {
  bg: "#0A0D18",
  surface: "#12162A",
  surface2: "#191F3D",
  line: "rgba(255,255,255,0.09)",
  lineStrong: "rgba(255,255,255,0.16)",
  text: "#EEF1FF",
  muted: "#8F97BE",
  dim: "#5C6389",
  blue: "#6E8CFF",
  violet: "#C08CFF",
  teal: "#45D9C0",
  coral: "#FF8F6B",
};

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');`;

const displayFont = { fontFamily: "'Space Grotesk', sans-serif" };
const bodyFont = { fontFamily: "'Inter', sans-serif" };
const monoFont = { fontFamily: "'JetBrains Mono', monospace" };

/* ---------------------------------------------------------------
   Mock data
----------------------------------------------------------------- */

const SUBJECTS = ["Mathematics", "Biology", "Computer Science", "Art & Design", "Business", "Physics", "Literature", "Psychology"];
const STRENGTHS = ["Problem solving", "Communication", "Creativity", "Leadership", "Focus", "Empathy", "Discipline", "Curiosity"];
const TECH_SKILLS = ["Coding", "Design tools", "Spreadsheets", "Data analysis", "Video editing", "None yet"];

const TOGGLES = [
  { id: "english", label: "Improve English", icon: Languages, effects: { salary: 0.06, aiRisk: -2, probability: 4, mobility: 8, confidence: 6 } },
  { id: "python", label: "Learn Python", icon: Code2, effects: { salary: 0.12, aiRisk: -14, probability: 6, skillGap: -16, learning: 10 } },
  { id: "germany", label: "Move to Germany", icon: Plane, effects: { salary: 0.15, mobility: 22, probability: -4, happiness: 4 } },
  { id: "freelance", label: "Start freelancing", icon: Briefcase, effects: { salary: 0.04, entrepreneurship: 18, probability: -8, burnout: 10 } },
  { id: "startup", label: "Launch a startup", icon: Rocket, effects: { salary: -0.05, entrepreneurship: 30, probability: -16, burnout: 20, happiness: 8 } },
  { id: "internship", label: "Take an internship", icon: Building2, effects: { salary: 0.02, probability: 10, readiness: 10 } },
  { id: "studyabroad", label: "Study abroad", icon: GraduationCap, effects: { salary: 0.08, mobility: 16, probability: -2, confidence: 8 } },
];

function buildPaths(dreamCareer) {
  return [
    {
      id: "safe", label: "Path A", tag: "Safe career", name: "Systems Engineer", color: C.blue,
      baseSalary: 65000, aiRisk: 22, probability: 82, satisfaction: 7.2,
      timeline: "Junior \u2192 Mid \u2192 Senior over 6 years",
      unis: ["State University", "Community college + bootcamp"],
      certs: ["AWS Certified Practitioner", "Scrum Fundamentals"],
      skills: ["SQL", "JavaScript", "Communication"],
    },
    {
      id: "high", label: "Path B", tag: "High income", name: "Investment Analyst", color: C.coral,
      baseSalary: 120000, aiRisk: 47, probability: 61, satisfaction: 6.5,
      timeline: "Analyst \u2192 Associate \u2192 VP over 8 years",
      unis: ["Top-tier business school"],
      certs: ["CFA level I\u2013III", "Financial modeling"],
      skills: ["Excel modeling", "Valuation", "Negotiation"],
    },
    {
      id: "dream", label: "Path C", tag: "Dream career", name: dreamCareer || "Founder & Product Lead", color: C.violet,
      baseSalary: 90000, aiRisk: 30, probability: 54, satisfaction: 9.1,
      timeline: "Explorer \u2192 Builder \u2192 Leader over 7 years",
      unis: ["Self-directed + specialized courses"],
      certs: ["Domain certification", "Leadership program"],
      skills: ["Deep domain expertise", "Storytelling", "Resilience"],
    },
  ];
}

function adjustPath(path, active) {
  let salaryMult = 1, aiRisk = path.aiRisk, probability = path.probability;
  active.forEach((id) => {
    const t = TOGGLES.find((x) => x.id === id);
    if (!t) return;
    if (t.effects.salary) salaryMult += t.effects.salary;
    if (t.effects.aiRisk) aiRisk += t.effects.aiRisk;
    if (t.effects.probability) probability += t.effects.probability;
  });
  aiRisk = Math.max(4, Math.min(90, Math.round(aiRisk)));
  probability = Math.max(8, Math.min(97, Math.round(probability)));
  const salary = Math.round((path.baseSalary * salaryMult) / 100) * 100;
  return { ...path, salary, aiRisk, probability };
}

const BASE_METRICS = {
  readiness: 58, income: 60, mobility: 40, demand: 66, burnout: 35, automation: 34,
  leadership: 50, entrepreneurship: 30, skillGap: 55, confidence: 52, happiness: 61, learning: 57,
};

const METRIC_META = [
  { key: "readiness", label: "Career readiness", icon: GaugeCircle, good: "high" },
  { key: "income", label: "Income potential", icon: Wallet, good: "high" },
  { key: "mobility", label: "Global mobility", icon: Globe2, good: "high" },
  { key: "demand", label: "Future demand", icon: TrendingUp, good: "high" },
  { key: "burnout", label: "Burnout risk", icon: Flame, good: "low" },
  { key: "automation", label: "Automation risk", icon: Zap, good: "low" },
  { key: "leadership", label: "Leadership potential", icon: Users, good: "high" },
  { key: "entrepreneurship", label: "Entrepreneurship potential", icon: Rocket, good: "high" },
  { key: "skillGap", label: "Skill gap", icon: Target, good: "low" },
  { key: "confidence", label: "Confidence score", icon: Shield, good: "high" },
  { key: "happiness", label: "Future happiness index", icon: Heart, good: "high" },
  { key: "learning", label: "Learning speed", icon: Brain, good: "high" },
];

function computeMetrics(active) {
  const m = { ...BASE_METRICS };
  active.forEach((id) => {
    const t = TOGGLES.find((x) => x.id === id);
    if (!t) return;
    Object.entries(t.effects).forEach(([k, v]) => {
      if (k === "salary" || k === "probability" || k === "aiRisk") return;
      if (m[k] !== undefined) m[k] += v;
    });
    if (t.effects.salary) m.income += Math.round(t.effects.salary * 100);
  });
  Object.keys(m).forEach((k) => { m[k] = Math.max(4, Math.min(96, Math.round(m[k]))); });
  return m;
}

const COUNTRIES = [
  { name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA", salary: "$71k", demand: "High", visa: "Moderate", remote: 62 },
  { name: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8", salary: "$98k", demand: "Very high", visa: "Hard", remote: 71 },
  { name: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1", salary: "$68k", demand: "High", visa: "Moderate", remote: 66 },
  { name: "Canada", flag: "\uD83C\uDDE8\uD83C\uDDE6", salary: "$64k", demand: "High", visa: "Easy", remote: 58 },
  { name: "Singapore", flag: "\uD83C\uDDF8\uD83C\uDDEC", salary: "$76k", demand: "High", visa: "Moderate", remote: 49 },
  { name: "UAE", flag: "\uD83C\uDDE6\uD83C\uDDEA", salary: "$82k", demand: "Medium", visa: "Easy", remote: 41 },
  { name: "Remote / global", flag: "\uD83C\uDF10", salary: "$59k", demand: "Very high", visa: "None", remote: 100 },
  { name: "Home country", flag: "\uD83C\uDFE0", salary: "$41k", demand: "Medium", visa: "None", remote: 55 },
];

const MENTOR_QA = [
  { q: "Why did my salary projection change?", a: (ctx) => `Every skill or move you add shifts the model's inputs. Right now your active choices are ${ctx.activeLabels || "none yet"} \u2014 together they move Path C's projected salary to $${ctx.salary.toLocaleString()}. Salary responds most to scarce, in-demand skills and to geography, since cost of living and local demand both scale pay.` },
  { q: "Why is AI replacing parts of this career?", a: (ctx) => `Roles built from repeatable, well-documented tasks are the easiest for AI to absorb. Path C currently carries a ${ctx.aiRisk}% automation exposure \u2014 the judgment-heavy and relationship-heavy parts of the role are the most protected. Building a specialty AI struggles to standardize is your best hedge.` },
  { q: "What should I learn first?", a: () => `Start with the skill that unlocks the most optionality, usually a technical fundamental like Python or data literacy, then layer in communication skills. Technical skill without communication caps your ceiling; communication without technical depth caps your credibility.` },
  { q: "How can I increase my probability of success?", a: (ctx) => `Your current probability of reaching Path C is ${ctx.probability}%. The fastest lever is usually an internship or apprenticeship \u2014 it converts uncertainty into real signal for employers. After that, consistency compounds faster than intensity.` },
  { q: "Which universities fit this path?", a: (ctx) => `For ${ctx.dreamName}, the model weighs specialized programs and strong alumni networks over general prestige. Self-directed study plus a focused credential often performs comparably to a traditional four-year path for this specific field \u2014 it depends more on the portfolio you build than the crest on your degree.` },
];

/* ---------------------------------------------------------------
   Small building blocks
----------------------------------------------------------------- */

function MirrorMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L30 9 V23 L16 30 L2 23 V9 Z" stroke={C.blue} strokeWidth="1.4" fill="none" />
      <path d="M16 2 V30" stroke={C.violet} strokeWidth="1.4" />
      <path d="M16 2 L2 9 V23 L16 30 Z" fill={C.blue} opacity="0.14" />
      <path d="M16 2 L30 9 V23 L16 30 Z" fill={C.violet} opacity="0.14" />
    </svg>
  );
}

function GlowDivider({ vertical = true }) {
  if (vertical) {
    return (
      <div style={{
        width: 1, alignSelf: "stretch",
        background: `linear-gradient(180deg, transparent, ${C.blue}66, ${C.violet}66, transparent)`,
      }} />
    );
  }
  return (
    <div style={{
      height: 1, width: "100%",
      background: `linear-gradient(90deg, transparent, ${C.blue}66, ${C.violet}66, transparent)`,
    }} />
  );
}

function Ring({ value, size = 88, stroke = 7, color = C.blue, delay = 0 }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60 + delay); return () => clearTimeout(t); }, [delay]);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (mounted ? value / 100 : 0) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.line} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1100ms cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        ...monoFont, fontSize: size * 0.24, fontWeight: 600, color: C.text,
      }}>
        {mounted ? value : 0}
      </div>
    </div>
  );
}

function Chip({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all"
      style={{
        ...bodyFont,
        border: `1px solid ${active ? C.blue : C.line}`,
        background: active ? `${C.blue}1F` : "transparent",
        color: active ? C.text : C.muted,
      }}
    >
      {Icon && <Icon size={15} />}
      {children}
      {active && <Check size={14} color={C.teal} />}
    </button>
  );
}

function PrimaryButton({ children, onClick, big, full }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-transform active:scale-95 ${big ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"} ${full ? "w-full" : ""}`}
      style={{
        ...bodyFont,
        background: `linear-gradient(90deg, ${C.blue}, ${C.violet})`,
        color: "#080A14",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06)`,
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors"
      style={{ ...bodyFont, border: `1px solid ${C.line}`, color: C.text, background: "transparent" }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------
   Screen 1 — Landing
----------------------------------------------------------------- */

function Landing({ onStart }) {
  const [split, setSplit] = useState(50);
  const stats = [
    { n: "2.4M+", l: "futures simulated" },
    { n: "146", l: "countries modeled" },
    { n: "91%", l: "would recommend" },
  ];
  return (
    <div style={{ ...bodyFont, color: C.text }}>
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <MirrorMark />
          <span style={{ ...displayFont, fontWeight: 600, letterSpacing: 0.2 }}>Mirror AI</span>
        </div>
        <GhostButton onClick={onStart}>Try the twin <ArrowRight size={14} /></GhostButton>
      </nav>

      <header className="max-w-6xl mx-auto px-6 md:px-12 pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: C.dim, letterSpacing: 1.5 }}>
          <Sparkles size={13} color={C.violet} /> DIGITAL FUTURE TWIN
        </div>
        <h1 style={{ ...displayFont, fontSize: "clamp(2.4rem, 6vw, 4.6rem)", fontWeight: 600, lineHeight: 1.04, letterSpacing: -1 }}>
          See your future<br />
          before you <span style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.violet})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>choose it.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg" style={{ color: C.muted }}>
          Google Maps shows you multiple routes. Mirror AI shows you multiple futures &mdash;
          simulated from your skills, goals, and the way the world of work is actually moving.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <PrimaryButton big onClick={onStart}>Generate my future twin <ArrowRight size={17} /></PrimaryButton>
          <span className="text-sm" style={{ color: C.dim }}>Free &middot; takes 3 minutes</span>
        </div>

        {/* signature: the mirror line — drag to compare now vs next */}
        <div className="mt-16 rounded-2xl relative overflow-hidden select-none" style={{ border: `1px solid ${C.line}`, background: C.surface }}>
          <div className="flex items-center justify-between px-6 pt-6 text-xs" style={{ color: C.dim, letterSpacing: 1 }}>
            <span>YOU, TODAY</span>
            <span>YOU, IN 5 YEARS</span>
          </div>
          <div className="relative h-64 md:h-80 mx-6 my-5 rounded-xl overflow-hidden" style={{ background: C.surface2 }}>
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="p-6 flex flex-col justify-end">
                <div style={{ color: C.dim, fontSize: 12 }}>Role</div>
                <div style={{ ...displayFont, fontSize: 22 }}>Junior Analyst</div>
                <div className="mt-3 flex gap-6" style={monoFont}>
                  <div><div style={{ fontSize: 11, color: C.dim }}>SALARY</div><div style={{ color: C.blue }}>$42,000</div></div>
                  <div><div style={{ fontSize: 11, color: C.dim }}>READINESS</div><div style={{ color: C.blue }}>48</div></div>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-end items-end text-right">
                <div style={{ color: C.dim, fontSize: 12 }}>Role</div>
                <div style={{ ...displayFont, fontSize: 22 }}>Lead Product Strategist</div>
                <div className="mt-3 flex gap-6" style={monoFont}>
                  <div><div style={{ fontSize: 11, color: C.dim }}>SALARY</div><div style={{ color: C.violet }}>$118,000</div></div>
                  <div><div style={{ fontSize: 11, color: C.dim }}>READINESS</div><div style={{ color: C.violet }}>86</div></div>
                </div>
              </div>
            </div>
            <div
              className="absolute top-0 bottom-0"
              style={{ left: `${split}%`, width: 1.5, background: `linear-gradient(180deg, ${C.blue}, ${C.violet})`, boxShadow: `0 0 24px 2px ${C.violet}55` }}
            />
            <div
              className="absolute top-1/2 flex items-center justify-center rounded-full"
              style={{ left: `${split}%`, width: 34, height: 34, transform: "translate(-50%,-50%)", background: C.bg, border: `1px solid ${C.lineStrong}` }}
            >
              <Layers size={14} color={C.text} />
            </div>
          </div>
          <input
            type="range" min="5" max="95" value={split} onChange={(e) => setSplit(Number(e.target.value))}
            className="w-full opacity-0 absolute inset-x-0 bottom-0 h-64 md:h-80 cursor-ew-resize"
            style={{ top: 84 }}
            aria-label="Compare today versus future"
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-10">
          {stats.map((s) => (
            <div key={s.l}>
              <div style={{ ...displayFont, fontSize: 26, fontWeight: 600 }}>{s.n}</div>
              <div className="text-xs mt-1" style={{ color: C.dim }}>{s.l}</div>
            </div>
          ))}
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t" style={{ borderColor: C.line }}>
        <p className="text-xs mb-3" style={{ color: C.dim, letterSpacing: 1.5 }}>THE PROBLEM</p>
        <h2 style={{ ...displayFont, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 500 }} className="max-w-2xl">
          Millions choose an education and a career with almost no personalized signal about the consequences.
        </h2>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            "Will AI replace this profession by the time I graduate?",
            "What salary can I realistically expect, and where?",
            "What happens if I move abroad, or start a business instead?",
          ].map((q) => (
            <div key={q} className="rounded-xl p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              <MessageCircle size={18} color={C.muted} />
              <p className="mt-4 text-sm" style={{ color: C.text }}>{q}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t" style={{ borderColor: C.line }}>
        <p className="text-xs mb-3" style={{ color: C.dim, letterSpacing: 1.5 }}>WHAT YOU GET</p>
        <div className="grid md:grid-cols-4 gap-5 mt-6">
          {[
            { icon: Layers, t: "Three simulated futures", d: "Safe, high-income, and dream-career paths built from your real inputs." },
            { icon: Compass, t: "A live simulator", d: "Change one variable and watch every projection recalculate instantly." },
            { icon: Brain, t: "An AI mentor", d: "Ask it why any number moved, and what to do about it." },
            { icon: Newspaper, t: "Future headlines", d: "Fictional news from the years ahead, written from your own trajectory." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
              <f.icon size={20} color={C.violet} />
              <div style={{ ...displayFont, fontSize: 16 }} className="mt-4">{f.t}</div>
              <p className="text-sm mt-2" style={{ color: C.muted }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 border-t" style={{ borderColor: C.line }}>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { q: "\u201CIt showed me the internship was worth more than the extra certificate. I would never have guessed that.\u201D", n: "Priya, 19 \u2014 pre-university" },
            { q: "\u201CI moved the Germany variable and my whole ten-year timeline rewrote itself in two seconds.\u201D", n: "Tomas, 24 \u2014 career switcher" },
            { q: "\u201CThe future news cards made the whole thing feel real instead of theoretical.\u201D", n: "Aiko, 21 \u2014 design student" },
          ].map((t) => (
            <div key={t.n} className="rounded-xl p-6" style={{ background: C.surface2, border: `1px solid ${C.line}` }}>
              <p className="text-sm" style={{ color: C.text }}>{t.q}</p>
              <p className="text-xs mt-4" style={{ color: C.dim }}>{t.n}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-12 py-24 text-center">
        <h2 style={{ ...displayFont, fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 500 }}>Ready to meet your twin?</h2>
        <div className="mt-8"><PrimaryButton big onClick={onStart}>Start the simulation <ArrowRight size={17} /></PrimaryButton></div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------
   Screen 2 — Onboarding
----------------------------------------------------------------- */

const STEPS = ["Basics", "Education", "Skills & goals", "Lifestyle", "Review"];

function Onboarding({ data, setData, onDone, onBack }) {
  const [step, setStep] = useState(0);
  const toggleArr = (key, val) => {
    setData((d) => {
      const arr = d[key] || [];
      return { ...d, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] };
    });
  };
  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const inputStyle = {
    ...bodyFont, background: C.surface2, border: `1px solid ${C.line}`, color: C.text,
    borderRadius: 12, padding: "12px 16px", width: "100%", outline: "none",
  };

  return (
    <div className="min-h-full flex flex-col" style={{ ...bodyFont, color: C.text }}>
      <div className="max-w-2xl mx-auto w-full px-6 pt-10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <MirrorMark size={22} />
          <span style={{ ...displayFont, fontWeight: 600 }}>Mirror AI</span>
        </div>
        <div className="flex items-center gap-2 mt-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors"
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
              {i < STEPS.length - 1 && <div className="flex-1 h-px" style={{ background: C.line }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 flex-1">
        {step === 0 && (
          <div className="space-y-5 animate-[fadeIn_.4s_ease]">
            <h2 style={{ ...displayFont, fontSize: 28 }}>Let's start with the basics.</h2>
            <div>
              <label className="text-xs" style={{ color: C.dim }}>Your name</label>
              <input style={{ ...inputStyle, marginTop: 6 }} placeholder="Jordan" value={data.name || ""} onChange={(e) => set("name", e.target.value)} />
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
                <input style={{ ...inputStyle, marginTop: 6 }} placeholder="e.g. Kazakhstan" value={data.country || ""} onChange={(e) => set("country", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-[fadeIn_.4s_ease]">
            <h2 style={{ ...displayFont, fontSize: 28 }}>Your education so far.</h2>
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
          <div className="space-y-6 animate-[fadeIn_.4s_ease]">
            <h2 style={{ ...displayFont, fontSize: 28 }}>Skills, and where you're headed.</h2>
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
              <input style={{ ...inputStyle, marginTop: 6 }} placeholder="e.g. Product designer, doctor, founder" value={data.dream || ""} onChange={(e) => set("dream", e.target.value)} />
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
          <div className="space-y-6 animate-[fadeIn_.4s_ease]">
            <h2 style={{ ...displayFont, fontSize: 28 }}>How do you want to work and live?</h2>
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
          <div className="space-y-5 animate-[fadeIn_.4s_ease]">
            <h2 style={{ ...displayFont, fontSize: 28 }}>Ready to build your twin.</h2>
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
        <GhostButton onClick={() => (step === 0 ? onBack() : setStep(step - 1))}><ArrowLeft size={14} /> Back</GhostButton>
        {step < STEPS.length - 1 ? (
          <PrimaryButton onClick={() => setStep(step + 1)}>Continue <ArrowRight size={15} /></PrimaryButton>
        ) : (
          <PrimaryButton onClick={onDone}>Generate my twin <Sparkles size={15} /></PrimaryButton>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Screen 3 — Generating twin
----------------------------------------------------------------- */

function Generating({ onDone }) {
  const items = [
    "Analyzing personality signals",
    "Mapping skills and strengths",
    "Cross-referencing education pathways",
    "Reading labor market trends",
    "Modeling AI-driven industry shifts",
    "Scanning global opportunity data",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx >= items.length) { const t = setTimeout(onDone, 700); return () => clearTimeout(t); }
    const t = setTimeout(() => setIdx((i) => i + 1), 550);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <div className="min-h-full flex items-center justify-center px-6" style={{ ...bodyFont, color: C.text }}>
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-8 flex items-center justify-center" style={{ width: 96, height: 96 }}>
          <div className="animate-spin" style={{ width: 96, height: 96, borderRadius: "50%", border: `2px solid ${C.line}`, borderTopColor: C.violet, borderRightColor: C.blue }} />
        </div>
        <h2 style={{ ...displayFont, fontSize: 24 }}>{idx >= items.length ? "Your Digital Future Twin is ready." : "Building your Digital Future Twin"}</h2>
        <div className="mt-8 space-y-3 text-left">
          {items.map((it, i) => (
            <div key={it} className="flex items-center gap-3 text-sm transition-opacity" style={{ color: i <= idx ? C.text : C.dim, opacity: i <= idx ? 1 : 0.4 }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: i < idx ? `${C.teal}22` : "transparent", border: `1px solid ${i < idx ? C.teal : C.line}` }}>
                {i < idx ? <Check size={11} color={C.teal} /> : i === idx ? <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.blue }} /> : null}
              </div>
              {it}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   App shell + tabs
----------------------------------------------------------------- */

const TABS = [
  { id: "paths", label: "Future paths", icon: Layers },
  { id: "simulator", label: "Simulator", icon: Compass },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "mentor", label: "AI mentor", icon: Brain },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "news", label: "Future news", icon: Newspaper },
  { id: "map", label: "Opportunity map", icon: MapIcon },
];

function PathCard({ path, featured }) {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: C.surface, border: `1px solid ${featured ? path.color + "55" : C.line}` }}>
      <div className="flex items-center justify-between">
        <span className="text-xs px-2.5 py-1 rounded-full" style={{ color: path.color, background: `${path.color}18` }}>{path.tag}</span>
        <span className="text-xs" style={{ color: C.dim }}>{path.label}</span>
      </div>
      <div>
        <div style={{ ...displayFont, fontSize: 21 }}>{path.name}</div>
        <div className="text-xs mt-1" style={{ color: C.muted }}>{path.timeline}</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs" style={{ color: C.dim }}>Salary projection</div>
          <div style={{ ...monoFont, fontSize: 18, color: path.color }}>${(path.salary ?? path.baseSalary).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs" style={{ color: C.dim }}>Success probability</div>
          <div style={{ ...monoFont, fontSize: 18 }}>{path.probability}%</div>
        </div>
        <div>
          <div className="text-xs" style={{ color: C.dim }}>AI replacement risk</div>
          <div style={{ ...monoFont, fontSize: 18 }}>{path.aiRisk}%</div>
        </div>
        <div>
          <div className="text-xs" style={{ color: C.dim }}>Job satisfaction</div>
          <div style={{ ...monoFont, fontSize: 18 }}>{path.satisfaction}/10</div>
        </div>
      </div>
      <div className="h-px" style={{ background: C.line }} />
      <div>
        <div className="text-xs mb-2" style={{ color: C.dim }}>Suggested skills</div>
        <div className="flex flex-wrap gap-2">
          {path.skills.map((s) => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full" style={{ border: `1px solid ${C.line}`, color: C.muted }}>{s}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs mb-2" style={{ color: C.dim }}>Education route</div>
        <div className="text-sm" style={{ color: C.text }}>{path.unis[0]}</div>
      </div>
    </div>
  );
}

function PathsScreen({ paths }) {
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Three futures, built from your answers.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>Every path updates as you change variables in the simulator.</p>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {paths.map((p) => <PathCard key={p.id} path={p} featured={p.id === "dream"} />)}
      </div>
    </div>
  );
}

function SimulatorScreen({ paths, active, setActive }) {
  const toggle = (id) => setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Change a variable. Watch every future move.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>Toggle any combination \u2014 the three paths recalculate instantly.</p>
      <div className="flex flex-wrap gap-2.5 mt-6">
        {TOGGLES.map((t) => (
          <Chip key={t.id} active={active.includes(t.id)} onClick={() => toggle(t.id)} icon={t.icon}>{t.label}</Chip>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {paths.map((p) => (
          <div key={p.id} className="rounded-2xl p-6" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ color: p.color, background: `${p.color}18` }}>{p.tag}</span>
            </div>
            <div style={{ ...displayFont, fontSize: 18 }} className="mt-3">{p.name}</div>
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: C.dim }}>Salary</span><span style={{ ...monoFont, color: p.color }}>${p.salary.toLocaleString()}</span></div>
                <div className="h-1.5 rounded-full" style={{ background: C.line }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${Math.min(100, (p.salary / 200000) * 100)}%`, background: p.color }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: C.dim }}>Success probability</span><span style={monoFont}>{p.probability}%</span></div>
                <div className="h-1.5 rounded-full" style={{ background: C.line }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${p.probability}%`, background: C.teal }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: C.dim }}>AI risk</span><span style={monoFont}>{p.aiRisk}%</span></div>
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

function DashboardScreen({ metrics }) {
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Your future, quantified.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>Twelve signals pulled from your twin, updated live from the simulator.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {METRIC_META.map((m, i) => {
          const v = metrics[m.key];
          const color = m.good === "high" ? (v > 60 ? C.teal : v > 35 ? C.blue : C.coral) : (v < 35 ? C.teal : v < 60 ? C.blue : C.coral);
          return (
            <div key={m.key} className="rounded-2xl p-5 flex flex-col items-center text-center gap-3" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
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

function MentorScreen({ ctx }) {
  const [asked, setAsked] = useState([0]);
  const ask = (i) => setAsked((a) => (a.includes(i) ? a : [...a, i]));
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Ask your AI mentor.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>It explains the reasoning behind every number in your twin.</p>
      <div className="mt-6 rounded-2xl p-5 md:p-6 space-y-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
        {MENTOR_QA.map((qa, i) => (
          <div key={qa.q}>
            <button onClick={() => ask(i)} className="flex items-center gap-3 text-left w-full">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: `${C.blue}1F` }}>
                <MessageCircle size={13} color={C.blue} />
              </div>
              <span className="text-sm" style={{ color: C.text }}>{qa.q}</span>
            </button>
            {asked.includes(i) && (
              <div className="ml-10 mt-3 rounded-xl p-4 text-sm" style={{ background: C.surface2, color: C.muted, border: `1px solid ${C.line}` }}>
                <span className="inline-flex items-center gap-2 mb-2 text-xs" style={{ color: C.violet }}><Brain size={12} /> Mirror mentor</span>
                <p>{qa.a(ctx)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineScreen({ dreamName }) {
  const milestones = [
    { t: "Today", d: "Exploring options, building foundational skills.", tag: "Start" },
    { t: "1 year", d: `First hands-on project or internship pointing toward ${dreamName}.`, tag: "Foundation" },
    { t: "3 years", d: "Recognized junior contributor, first promotion or client win.", tag: "Growth" },
    { t: "5 years", d: `Established in the ${dreamName} track, mentoring others.`, tag: "Momentum" },
    { t: "10 years", d: "Leading a team, product, or practice of your own.", tag: "Mastery" },
  ];
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Your ten-year arc.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>The path toward {dreamName}, milestone by milestone.</p>
      <div className="mt-10 relative">
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${C.blue}, ${C.violet})` }} />
        <div className="space-y-8">
          {milestones.map((m, i) => (
            <div key={m.t} className={`relative flex md:items-center gap-5 md:gap-10 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="absolute left-3 md:left-1/2 w-2.5 h-2.5 rounded-full -translate-x-1/2" style={{ background: C.violet, marginTop: 6 }} />
              <div className="md:w-1/2" />
              <div className="ml-10 md:ml-0 md:w-1/2 rounded-xl p-5" style={{ background: C.surface, border: `1px solid ${C.line}` }}>
                <div className="flex items-center gap-2 text-xs" style={{ color: C.dim }}>
                  <span>{m.t}</span><span>&middot;</span><span style={{ color: C.blue }}>{m.tag}</span>
                </div>
                <p className="text-sm mt-2" style={{ color: C.text }}>{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsScreen({ name, dreamName }) {
  const yr = 2026;
  const headlines = [
    { y: yr + 1, h: `${name || "You"} completes first major project in ${dreamName}.` },
    { y: yr + 3, h: `Local outlet profiles ${name || "you"} as a rising name in ${dreamName}.` },
    { y: yr + 5, h: `${name || "You"} promoted to a leadership role after five years in ${dreamName}.` },
    { y: yr + 8, h: `${name || "You"} launches an independent venture built on ${dreamName} expertise.` },
    { y: yr + 10, h: `Industry panel invites ${name || "you"} to speak on the future of ${dreamName}.` },
  ];
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Headlines from your future.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>Fictional, generated from your current trajectory &mdash; not a promise.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {headlines.map((n) => (
          <div key={n.h} className="rounded-2xl p-5" style={{ background: C.surface2, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between text-xs mb-3" style={{ color: C.dim }}>
              <span style={monoFont}>{n.y}</span>
              <span className="flex items-center gap-1"><Newspaper size={12} /> Mirror future wire</span>
            </div>
            <p style={{ ...displayFont, fontSize: 17, lineHeight: 1.35 }}>{n.h}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapScreen({ activeGermany }) {
  return (
    <div>
      <h2 style={{ ...displayFont, fontSize: 24 }}>Where the opportunity is.</h2>
      <p className="text-sm mt-2" style={{ color: C.muted }}>Salary, demand, and mobility, compared across your candidate countries.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {COUNTRIES.map((c) => (
          <div key={c.name} className="rounded-2xl p-5 flex items-center gap-4" style={{
            background: C.surface, border: `1px solid ${activeGermany && c.name === "Germany" ? C.blue + "77" : C.line}`,
          }}>
            <div className="text-2xl">{c.flag}</div>
            <div className="flex-1">
              <div style={{ ...displayFont, fontSize: 16 }}>{c.name}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs" style={{ color: C.muted }}>
                <span>Salary <b style={{ color: C.text, fontWeight: 500, ...monoFont }}>{c.salary}</b></span>
                <span>Demand {c.demand}</span>
                <span>Visa {c.visa}</span>
              </div>
            </div>
            <div className="text-right">
              <div style={{ ...monoFont, fontSize: 16, color: C.teal }}>{c.remote}</div>
              <div className="text-xs" style={{ color: C.dim }}>remote score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   App shell
----------------------------------------------------------------- */

function AppShell({ data, active, setActive }) {
  const [tab, setTab] = useState("paths");
  const paths = useMemo(() => buildPaths(data.dream).map((p) => adjustPath(p, active)), [data.dream, active]);
  const metrics = useMemo(() => computeMetrics(active), [active]);
  const dreamName = paths.find((p) => p.id === "dream")?.name || "your dream career";
  const dreamPath = paths.find((p) => p.id === "dream");
  const ctx = {
    salary: dreamPath.salary, aiRisk: dreamPath.aiRisk, probability: dreamPath.probability,
    dreamName, activeLabels: active.map((id) => TOGGLES.find((t) => t.id === id)?.label).join(", "),
  };

  return (
    <div className="flex min-h-full" style={{ ...bodyFont, color: C.text }}>
      <aside className="hidden md:flex flex-col w-60 shrink-0 py-6 px-4" style={{ borderRight: `1px solid ${C.line}` }}>
        <div className="flex items-center gap-2 px-2 mb-8">
          <MirrorMark size={24} />
          <span style={{ ...displayFont, fontWeight: 600 }}>Mirror AI</span>
        </div>
        <div className="px-2 mb-6">
          <div className="text-xs" style={{ color: C.dim }}>Digital twin</div>
          <div style={{ ...displayFont, fontSize: 15 }} className="mt-1">{data.name || "Your twin"}</div>
        </div>
        <nav className="space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id} onClick={() => setTab(t.id)}
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
            <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs shrink-0"
              style={{ background: tab === t.id ? C.surface2 : "transparent", color: tab === t.id ? C.text : C.muted, border: `1px solid ${C.line}` }}>
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

/* ---------------------------------------------------------------
   Root
----------------------------------------------------------------- */

export default function MirrorAI() {
  const [screen, setScreen] = useState("landing");
  const [data, setData] = useState({});
  const [active, setActive] = useState([]);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        ${FONTS}
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        input::placeholder { color: ${C.dim}; }
        input:focus { border-color: ${C.blue} !important; }
      `}</style>
      {screen === "landing" && <Landing onStart={() => setScreen("onboarding")} />}
      {screen === "onboarding" && (
        <Onboarding data={data} setData={setData} onBack={() => setScreen("landing")} onDone={() => setScreen("generating")} />
      )}
      {screen === "generating" && <Generating onDone={() => setScreen("app")} />}
      {screen === "app" && <AppShell data={data} active={active} setActive={setActive} />}
    </div>
  );
}
