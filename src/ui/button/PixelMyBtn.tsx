import type { ComponentProps } from "react";

type Props = {
  mstyle?: "green" | "greenOutline";
} & ComponentProps<"button">;

function PixelMyBtn({
  children,
  mstyle = "green",
  className = "",
  ...props
}: Props) {
  // Базовые стили: убраны скругления и плавные анимации
  const base =
    "cursor-pointer font-pixel px-4 py-2 uppercase active:translate-y-1 select-none inline-block";

  const styles = {
    // Стиль с жесткой пиксельной тенью
    green:
      "bg-green-600 text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-green-500",
    // Стиль с инверсией при наведении
    greenOutline:
      "bg-white text-green-700 border-4 border-green-700 shadow-[4px_4px_0px_0px_rgba(21,128,61,1)] active:shadow-none hover:bg-green-700 hover:text-white",
  };

  return (
    <button
      {...props}
      className={`${base} ${styles[mstyle]} ${className}`}
    >
      {children}
    </button>
  );
}

export default PixelMyBtn;
