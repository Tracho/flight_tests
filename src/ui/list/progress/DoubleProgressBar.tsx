import type { QuizTest } from "@/types/quiz";
import { memo } from "react";
type DoubleProgressBarProps = {
  className?: string;
  data: QuizTest;
};

function DoubleProgressBar({ className = "", data }: DoubleProgressBarProps) {
  // Ограничиваем оба прогресса в пределах от 0 до 100
  const total = data.json.length || 1;

  const passed = new Set(data.storage_q_passed).size;
  const failed = new Set(data.storage_q_not_passed).size;
  const saved = new Set(data.storage_q_saved).size;

  const greenProgress = (passed / total) * 100;
  const redProgress = (failed / total) * 100;

  // Чтобы сумма не превышала 100%
  const grayProgress = Math.max(0, 100 - greenProgress - redProgress);

  // Стили свечения, взятые из ваших тем
  const greenGlow =
    "shadow-[0_0_15px_rgba(34,197,94,0.7),_inset_0_1px_2px_rgba(255,255,255,0.4)]";
  const redGlow =
    "shadow-[0_0_20px_rgba(239,68,68,0.8),_inset_0_0_8px_rgba(239,68,68,0.4)]";

  return (
    <div className="relative w-full flex h-8 overflow-hidden rounded-lg border border-gray-600 bg-neutral-950">
      <div
        style={{ width: `${greenProgress}%` }}
        className={`h-full bg-green-500 transition-all duration-500 ${greenGlow}`}
      />

      <div
        style={{ width: `${redProgress}%` }}
        className={`h-full bg-red-600 transition-all duration-500 ${redGlow}`}
      />

      <div
        style={{ width: `${grayProgress}%` }}
        className="h-full bg-neutral-950 transition-all duration-500"
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <span className="text-sm font-bold text-white drop-shadow-lg text-shadow">
          ✅ {passed}
          <span className="mx-2 text-neutral-400">|</span>🚨 {failed}
          <span className="mx-2 text-neutral-400">|</span>⭐ {saved}
          <span className="mx-2 text-neutral-400">|</span>
          📚 {total}
        </span>
      </div>
    </div>
  );
}

export default memo(DoubleProgressBar);
