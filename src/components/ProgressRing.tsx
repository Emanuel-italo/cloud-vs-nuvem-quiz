interface ProgressRingProps {
  current: number;
  total: number;
}

const ProgressRing = ({ current, total }: ProgressRingProps) => {
  const percentage = (current / total) * 100;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(215 40% 22%)" strokeWidth="6" />
          <circle
            cx="60" cy="60" r={radius} fill="none"
            stroke="hsl(210 100% 55%)"
            strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
            style={{ filter: "drop-shadow(0 0 6px hsl(210 100% 55% / 0.5))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground">{current}/{total}</span>
          <span className="font-display text-[10px] tracking-widest text-muted-foreground">PERGUNTAS</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressRing;
