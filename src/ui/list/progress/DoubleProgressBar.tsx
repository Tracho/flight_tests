import { memo } from "react";
type DoubleProgressBarProps = {
  greenProgress: number; // Зеленый слой (основной, поверх)
  redProgress: number;   // Красный слой (фоновый/дополнительный)
  className?: string;
};

function DoubleProgressBar({
  greenProgress,
  redProgress,
  className = "",
}: DoubleProgressBarProps) {
  // Ограничиваем оба прогресса в пределах от 0 до 100
  const safeGreen = Math.min(Math.max(greenProgress, 0), 100);
  const safeRed = Math.min(Math.max(redProgress, 0), 100);

  // Стили свечения, взятые из ваших тем
  const greenGlow = "shadow-[0_0_15px_rgba(34,197,94,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)]";
  const redGlow = "shadow-[0_0_20px_rgba(239,68,68,0.8),_inset_0_0_8px_rgba(239,68,68,0.4)]";

  return (
    <div className={`w-full ${className}`}>
      {/* Серо-темный фон контейнера */}
      <div className="relative w-full h-8 bg-neutral-900 border border-neutral-800 rounded-lg p-1 overflow-hidden flex items-center">
        
        {/* ЛЕЙЕР 1 (Снизу): Красный прогресс бар */}
        <div
          style={{ width: `${safeRed}%` }}
          className={`absolute left-1 top-1 bottom-1 rounded-md transition-all duration-500 ease-out bg-red-600 ${redGlow}`}
        />

        {/* ЛЕЙЕР 2 (Сверху): Зеленый прогресс бар */}
        <div
          style={{ width: `${safeGreen}%` }}
          className={`absolute left-1 top-1 bottom-1 rounded-md transition-all duration-500 ease-out bg-green-500 ${greenGlow}`}
        />

        {/* Текст строго по центру */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
          <span className="text-sm font-black text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {safeGreen}% / {safeRed}%
          </span>
        </div>

      </div>
    </div>
  );
}

export default memo(DoubleProgressBar);
