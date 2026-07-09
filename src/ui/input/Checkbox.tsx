import { bglightgray70, bgdarkNeutral } from "@/data/desingStyle";
import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type ColorStyle = "green" | "cyan" | "danger" | "warning" | "blue";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  mstyle?: ColorStyle;
  labelClassName?: string;
  checkboxClassName?: string;
  children?: ReactNode;
  isCorrect?: boolean; // ОДИН аргумент: true = зелёный, false = красный, не передан = нейтральный
};

export function Checkbox({
  mstyle = "green",
  labelClassName = `${bglightgray70} ${bgdarkNeutral}`,
  checkboxClassName = "",
  children,
  id,
  className = "",
  disabled,
  isCorrect, // Извлекаем из пропсов
  ...props
}: Props) {
  const generatedId = id || useId();

  // Идентичный расчет нижнего бордера и мягкой тени
  let validationBorder =
    "border-b-2 border-transparent transition-all duration-200";
  if (isCorrect === true) {
    validationBorder =
      "border-b-2 border-green-500 shadow-[0_4px_12px_-4px_rgba(34,197,94,0.5)]";
  } else if (isCorrect === false) {
    validationBorder =
      "border-b-2 border-red-500 shadow-[0_4px_12px_-4px_rgba(239,68,68,0.5)]";
  }

  // Контейнер 1 в 1 как у Радио: темный фон, отступы, скругление и валидация bg-neutral-900
  const wrapperClass = `flex items-center gap-3 py-1.5 px-1.5 rounded transition-all duration-200 ${validationBorder} ${
    disabled ? "cursor-not-allowed" : "cursor-pointer"
  } ${labelClassName}`;

  const inputClass = "sr-only peer";

  // Квадратный контейнер (rounded вместо rounded-full), border вместо border-2
  const boxBase =
    "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 bg-white";

  // Идентичные круговые тени и бортеры. Механизм [&>svg]:scale-100 плавно зажигает галочку
  const boxStyles: Record<ColorStyle, string> = {
    green:
      "border-slate-300 peer-checked:border-2 peer-checked:border-green-600 peer-checked:shadow-[0_0_8px_0_theme(colors.green.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-green-500/100 peer-checked:[&>svg]:scale-100",
    cyan: "border-slate-300 peer-checked:border-2 peer-checked:border-cyan-500 peer-checked:shadow-[0_0_8px_0_theme(colors.cyan.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500/100 peer-checked:[&>svg]:scale-100",
    danger:
      "border-slate-300 peer-checked:border-2 peer-checked:border-red-600 peer-checked:shadow-[0_0_8px_0_theme(colors.red.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-red-500/100 peer-checked:[&>svg]:scale-100",
    warning:
      "border-slate-300 peer-checked:border-2 peer-checked:border-amber-500 peer-checked:shadow-[0_0_8px_0_theme(colors.amber.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500/100 peer-checked:[&>svg]:scale-100",
    blue: "border-slate-300 peer-checked:border-2 peer-checked:border-blue-600 peer-checked:shadow-[0_0_8px_0_theme(colors.blue.500)] peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/100 peer-checked:[&>svg]:scale-100",
  };

  const iconStyles: Record<ColorStyle, string> = {
    green: "[fill:theme(colors.green.600)]",
    cyan: "[fill:theme(colors.cyan.500)]",
    danger: "[fill:theme(colors.red.600)]",
    warning: "[fill:theme(colors.amber.500)]",
    blue: "[fill:theme(colors.blue.600)]",
  };

  const computedBoxClass = `${boxBase} ${boxStyles[mstyle]} ${checkboxClassName}`;

  return (
    <label htmlFor={generatedId} className={wrapperClass}>
      <input
        type="checkbox"
        id={generatedId}
        className={inputClass}
        disabled={disabled}
        {...props}
      />
      <div className={computedBoxClass}>
        {/* SVG теперь плавно реагирует на родительский селектор [&>svg] через базовый scale-0 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3.5 h-3.5 scale-0 transition-transform duration-200 shrink-0 ${iconStyles[mstyle]}`}
          data-name="Layer 2"
          height="100"
          id="Layer_2"
          viewBox="0 0 100 100"
          width="100"
        >
          <path d="M83.8,25.76l-2.64-2.64a9,9,0,0,0-12.72,0L39,52.5,31.56,45a9,9,0,0,0-12.72,0L16.2,47.67a9,9,0,0,0,0,12.73L32.68,76.88a9,9,0,0,0,12.72,0L83.8,38.49a9,9,0,0,0,0-12.73Z" />
        </svg>
      </div>
      {children && (
        <span className="font-medium leading-none contents">
          {children}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
