import type { ComponentProps } from "react";

type Props = {
  mstyle?: "green" | "greenOutline";
} & ComponentProps<"button">;

function MyBtn({
  children,
  mstyle = "green",
  className = "",
  ...props
}: Props) {
  const base =
    "cursor-pointer rounded px-3 py-1 transition-all duration-300";

  const styles = {
    green:
      "bg-green-700 text-white hover:bg-green-800",
    greenOutline:
      "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
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

export default MyBtn;