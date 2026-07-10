export default function MirrorMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L30 9 V23 L16 30 L2 23 V9 Z" stroke="#6E8CFF" strokeWidth="1.4" fill="none" />
      <path d="M16 2 V30" stroke="#C08CFF" strokeWidth="1.4" />
      <path d="M16 2 L2 9 V23 L16 30 Z" fill="#6E8CFF" opacity="0.14" />
      <path d="M16 2 L30 9 V23 L16 30 Z" fill="#C08CFF" opacity="0.14" />
    </svg>
  );
}
