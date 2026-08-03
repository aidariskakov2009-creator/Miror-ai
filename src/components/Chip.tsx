import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { C } from "../data/constants";

interface ChipProps {
  active: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export default function Chip({ active, onClick, icon: Icon, children }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-body transition-all"
      style={{
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
