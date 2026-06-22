type ProgressBarProps = {
  progress: number; // Число от 0 до 100
  theme?: "green" | "sky" | "amber" | "neonRed";
  className?: string;
};

function ProgressBar({
  progress,
  theme = "green",
  className = "",
}: ProgressBarProps) {
  // Ограничиваем прогресс в пределах от 0 до 100
  const safeProgress = Math.min(Math.max(progress, 0), 100);
 
  const themes = {
    green: {
      bar: "bg-green-500",
      glow: "shadow-[0_0_15px_rgba(34,197,94,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)]",
    },
    sky: {
      bar: "bg-sky-400",
      glow: "shadow-[0_0_15px_rgba(56,189,248,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)]",
    },
    amber: {
      bar: "bg-amber-500",
      glow: "shadow-[0_0_15px_rgba(245,158,11,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)]",
    }, 
    neonRed: {
      bar: "bg-red-600",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.8),_inset_0_0_8px_rgba(239,68,68,0.4)]",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full h-8 bg-neutral-900 border border-neutral-800 rounded-lg p-1 overflow-hidden flex items-center">
        <div
          style={{ width: `${safeProgress}%` }}
          className={`h-full rounded-md transition-all duration-500 ease-out relative ${currentTheme.bar} ${currentTheme.glow}`}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
          <span className="text-sm font-black text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {safeProgress}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
