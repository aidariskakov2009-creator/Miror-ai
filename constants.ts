import {
  Languages, Code2, Plane, Briefcase, Rocket, Building2, GraduationCap,
  Layers, Compass, BarChart3, Brain, Clock, Newspaper, Map as MapIcon,
  GaugeCircle, Wallet, Globe2, TrendingUp, Flame, Zap, Users, Target,
  Shield, Heart,
} from "lucide-react";
import type {
  ToggleDef, FuturePath, Metrics, MetricMeta, Country, MentorQA, AppTab,
} from "../types";

/* -----------------------------------------------------------------
   Design tokens (mirrored in tailwind.config.js under theme.extend.colors)
   Kept here too since some values — a path's accent color, a metric's
   computed color — are picked at runtime rather than known up front.
------------------------------------------------------------------ */
export const C = {
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

export const SUBJECTS = [
  "Mathematics", "Biology", "Computer Science", "Art & Design",
  "Business", "Physics", "Literature", "Psychology",
];
export const STRENGTHS = [
  "Problem solving", "Communication", "Creativity", "Leadership",
  "Focus", "Empathy", "Discipline", "Curiosity",
];
export const TECH_SKILLS = [
  "Coding", "Design tools", "Spreadsheets", "Data analysis",
  "Video editing", "None yet",
];

export const ONBOARDING_STEPS = ["Basics", "Education", "Skills & goals", "Lifestyle", "Review"];

export const TABS: { id: AppTab; label: string; icon: typeof Layers }[] = [
  { id: "paths", label: "Future paths", icon: Layers },
  { id: "simulator", label: "Simulator", icon: Compass },
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "mentor", label: "AI mentor", icon: Brain },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "news", label: "Future news", icon: Newspaper },
  { id: "map", label: "Opportunity map", icon: MapIcon },
];

export const TOGGLES: ToggleDef[] = [
  { id: "english", label: "Improve English", icon: Languages, effects: { salary: 0.06, aiRisk: -2, probability: 4, mobility: 8, confidence: 6 } },
  { id: "python", label: "Learn Python", icon: Code2, effects: { salary: 0.12, aiRisk: -14, probability: 6, skillGap: -16, learning: 10 } },
  { id: "germany", label: "Move to Germany", icon: Plane, effects: { salary: 0.15, mobility: 22, probability: -4, happiness: 4 } },
  { id: "freelance", label: "Start freelancing", icon: Briefcase, effects: { salary: 0.04, entrepreneurship: 18, probability: -8, burnout: 10 } },
  { id: "startup", label: "Launch a startup", icon: Rocket, effects: { salary: -0.05, entrepreneurship: 30, probability: -16, burnout: 20, happiness: 8 } },
  { id: "internship", label: "Take an internship", icon: Building2, effects: { salary: 0.02, probability: 10, readiness: 10 } },
  { id: "studyabroad", label: "Study abroad", icon: GraduationCap, effects: { salary: 0.08, mobility: 16, probability: -2, confidence: 8 } },
];

export function buildPaths(dreamCareer?: string): FuturePath[] {
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

export function adjustPath(path: FuturePath, active: string[]): FuturePath {
  let salaryMult = 1;
  let aiRisk = path.aiRisk;
  let probability = path.probability;
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

export const BASE_METRICS: Metrics = {
  readiness: 58, income: 60, mobility: 40, demand: 66, burnout: 35, automation: 34,
  leadership: 50, entrepreneurship: 30, skillGap: 55, confidence: 52, happiness: 61, learning: 57,
};

export const METRIC_META: MetricMeta[] = [
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

export function computeMetrics(active: string[]): Metrics {
  const m: Metrics = { ...BASE_METRICS };
  active.forEach((id) => {
    const t = TOGGLES.find((x) => x.id === id);
    if (!t) return;
    (Object.entries(t.effects) as [keyof typeof t.effects, number][]).forEach(([k, v]) => {
      if (k === "salary" || k === "probability" || k === "aiRisk") return;
      if (k in m) (m as any)[k] += v;
    });
    if (t.effects.salary) m.income += Math.round(t.effects.salary * 100);
  });
  (Object.keys(m) as (keyof Metrics)[]).forEach((k) => {
    m[k] = Math.max(4, Math.min(96, Math.round(m[k])));
  });
  return m;
}

export const COUNTRIES: Country[] = [
  { name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA", salary: "$71k", demand: "High", visa: "Moderate", remote: 62 },
  { name: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8", salary: "$98k", demand: "Very high", visa: "Hard", remote: 71 },
  { name: "Netherlands", flag: "\uD83C\uDDF3\uD83C\uDDF1", salary: "$68k", demand: "High", visa: "Moderate", remote: 66 },
  { name: "Canada", flag: "\uD83C\uDDE8\uD83C\uDDE6", salary: "$64k", demand: "High", visa: "Easy", remote: 58 },
  { name: "Singapore", flag: "\uD83C\uDDF8\uD83C\uDDEC", salary: "$76k", demand: "High", visa: "Moderate", remote: 49 },
  { name: "UAE", flag: "\uD83C\uDDE6\uD83C\uDDEA", salary: "$82k", demand: "Medium", visa: "Easy", remote: 41 },
  { name: "Remote / global", flag: "\uD83C\uDF10", salary: "$59k", demand: "Very high", visa: "None", remote: 100 },
  { name: "Home country", flag: "\uD83C\uDFE0", salary: "$41k", demand: "Medium", visa: "None", remote: 55 },
];

export const MENTOR_QA: MentorQA[] = [
  { q: "Why did my salary projection change?", a: (ctx) => `Every skill or move you add shifts the model's inputs. Right now your active choices are ${ctx.activeLabels || "none yet"} \u2014 together they move Path C's projected salary to $${ctx.salary.toLocaleString()}. Salary responds most to scarce, in-demand skills and to geography, since cost of living and local demand both scale pay.` },
  { q: "Why is AI replacing parts of this career?", a: (ctx) => `Roles built from repeatable, well-documented tasks are the easiest for AI to absorb. Path C currently carries a ${ctx.aiRisk}% automation exposure \u2014 the judgment-heavy and relationship-heavy parts of the role are the most protected. Building a specialty AI struggles to standardize is your best hedge.` },
  { q: "What should I learn first?", a: () => `Start with the skill that unlocks the most optionality, usually a technical fundamental like Python or data literacy, then layer in communication skills. Technical skill without communication caps your ceiling; communication without technical depth caps your credibility.` },
  { q: "How can I increase my probability of success?", a: (ctx) => `Your current probability of reaching Path C is ${ctx.probability}%. The fastest lever is usually an internship or apprenticeship \u2014 it converts uncertainty into real signal for employers. After that, consistency compounds faster than intensity.` },
  { q: "Which universities fit this path?", a: (ctx) => `For ${ctx.dreamName}, the model weighs specialized programs and strong alumni networks over general prestige. Self-directed study plus a focused credential often performs comparably to a traditional four-year path for this specific field \u2014 it depends more on the portfolio you build than the crest on your degree.` },
];
