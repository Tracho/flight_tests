import SVRArrowL from "@/assets/icons/arrow-left.svg?react";
import SVRArrowR from "@/assets/icons/arrow-right.svg?react";
import NeonBtn from "../button/NeonBtn";

type Props = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, total, onChange }: Props) {
  return (
    <div className="flex items-center justify-between w-full">
      <NeonBtn
        className="px-2"
        color="sky" 
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
      >
        <SVRArrowL width={31} />
      </NeonBtn>

      <div className="text-base font-semibold text-gray-600 dark:text-slate-300">
        <b>{page + 1} / {total}</b>
      </div>

      <NeonBtn
        className="px-2"
        color="sky" 
        disabled={page >= total - 1}
        onClick={() => onChange(page + 1)}
      >
        <SVRArrowR width={31} />
      </NeonBtn>
    </div>
  );
}
