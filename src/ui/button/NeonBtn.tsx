import type { ComponentProps } from "react";

// Доступные цвета, стили и размеры
type ButtonColor = "green" | "sky" | "amber" | "red" | "gray";
type ButtonVariant = "solid" | "outline";

type Props = {
  color?: ButtonColor;
  variant?: ButtonVariant;
} & ComponentProps<"button">;

function NeonBtn({
  children,
  color = "green",
  variant = "solid",
  className = "",
  ...props
}: Props) {
  
  // Базовые стили: убраны тяжелые бордеры, добавлен плавный переход для неона
  const base =
    "cursor-pointer rounded px-4 py-1 font-bold tracking-wide uppercase transition-all duration-300 select-none active:scale-[0.98]";

  // Сетка стилей: [цвет][вариант]
  const styles: Record<ButtonColor, Record<ButtonVariant, string>> = {
    green: {
      solid: "bg-green-700 text-white shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:bg-green-600 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]",
      outline: "border border-green-700 text-green-600 bg-transparent hover:bg-green-700/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
    },
    sky: {
      solid: "bg-sky-700 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:bg-sky-600 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]",
      outline: "border border-sky-700 text-sky-600 bg-transparent hover:bg-sky-700/10 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]",
    },
    amber: {
      solid: "bg-amber-700 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:bg-amber-600 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
      outline: "border border-amber-700 text-amber-600 bg-transparent hover:bg-amber-700/10 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)]",
    },
    red: {
      solid: "bg-red-700 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]",
      outline: "border border-red-700 text-red-600 bg-transparent hover:bg-red-700/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    },
    gray: {
      solid: "bg-neutral-800 text-neutral-200 border border-neutral-700 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:bg-neutral-700",
      outline: "border border-neutral-600 text-neutral-600 bg-transparent hover:bg-neutral-800 hover:text-neutral-200",
    },
  };

  const currentStyle = styles[color][variant];

  return (
    <button
      {...props}
      // className идет в самом конце, перекрывая стандартный размер текста, если вы его передадите
      className={`${base} ${currentStyle} ${className}`}
    >
      {children}
    </button>
  );
}

export default NeonBtn;
