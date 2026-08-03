import { useEffect, useState } from "react";
import { C } from "../data/constants";

interface RingProps {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  delay?: number;
}

export default function Ring({ value, size = 88, stroke = 7, color = C.blue, delay = 0 }: RingProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (mounted ? value / 100 : 0) * circ;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.line} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1100ms cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-mono font-semibold text-ink"
        style={{ fontSize: size * 0.24 }}
      >
        {mounted ? value : 0}
      </div>
    </div>
  );
}
