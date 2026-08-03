import { C } from "../data/constants";

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  big?: boolean;
  full?: boolean;
}

export function PrimaryButton({ children, onClick, big, full }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-transform active:scale-95 ${
        big ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
      } ${full ? "w-full" : ""}`}
      style={{
        background: `linear-gradient(90deg, ${C.blue}, ${C.violet})`,
        color: "#080A14",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: BtnProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-body transition-colors"
      style={{ border: `1px solid ${C.line}`, color: C.text, background: "transparent" }}
    >
      {children}
    </button>
  );
}
