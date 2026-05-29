import type { ComponentProps } from "react";

type Props = {
  mstyle?: "green" | "greenOutline";
} & ComponentProps<"input">;

function MyInput({ mstyle = "green", className = "", ...props }: Props) {
  const base =
    "px-3 py-2 rounded outline-none transition-all duration-300";

  const styles = {
    green:
      "border border-green-600 focus:ring-2 focus:ring-green-500",
    greenOutline:
      "border-2 border-green-600 bg-transparent focus:ring-2 focus:ring-green-500",
  };

  return (
    <input
      {...props}
      className={`${base} ${styles[mstyle]} ${className}`}
      type="text"
      placeholder="text..."
    />
  );
}

export default MyInput;