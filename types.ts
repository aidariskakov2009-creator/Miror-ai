import type { LucideIcon } from "lucide-react";

export interface OnboardingData {
  name?: string;
  age?: string;
  country?: string;
  education?: string;
  subjects?: string[];
  strengths?: string[];
  techSkills?: string[];
  dream?: string;
  salary?: string;
  workStyle?: string;
  relocate?: string;
  entrepreneurship?: string;
}

export interface ToggleEffects {
  salary?: number;
  aiRisk?: number;
  probability?: number;
  mobility?: number;
  confidence?: number;
  skillGap?: number;
  learning?: number;
  entrepreneurship?: number;
  burnout?: number;
  happiness?: number;
  readiness?: number;
}

export interface ToggleDef {
  id: string;
  label: string;
  icon: LucideIcon;
  effects: ToggleEffects;
}

export interface FuturePath {
  id: "safe" | "high" | "dream";
  label: string;
  tag: string;
  name: string;
  color: string;
  baseSalary: number;
  aiRisk: number;
  probability: number;
  satisfaction: number;
  timeline: string;
  unis: string[];
  certs: string[];
  skills: string[];
  salary?: number;
}

export interface Metrics {
  readiness: number;
  income: number;
  mobility: number;
  demand: number;
  burnout: number;
  automation: number;
  leadership: number;
  entrepreneurship: number;
  skillGap: number;
  confidence: number;
  happiness: number;
  learning: number;
}

export type MetricKey = keyof Metrics;

export interface MetricMeta {
  key: MetricKey;
  label: string;
  icon: LucideIcon;
  good: "high" | "low";
}

export interface Country {
  name: string;
  flag: string;
  salary: string;
  demand: string;
  visa: string;
  remote: number;
}

export interface MentorContext {
  salary: number;
  aiRisk: number;
  probability: number;
  dreamName: string;
  activeLabels: string;
}

export interface MentorQA {
  q: string;
  a: (ctx: MentorContext) => string;
}

export type Screen = "landing" | "onboarding" | "generating" | "app";

export type AppTab =
  | "paths"
  | "simulator"
  | "dashboard"
  | "mentor"
  | "timeline"
  | "news"
  | "map";
