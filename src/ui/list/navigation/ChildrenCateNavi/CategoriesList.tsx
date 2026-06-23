import Checkbox from "@/ui/input/Checkbox";
import { useQuizStore } from "@/store/useQuizStore";
import { memo } from "react";

function CategoriesList() {
  const data = useQuizStore((state) => state.data);
  const checkCate = useQuizStore((state) => state.checkBoxCate);

  return (
    <div className="flex flex-col gap-2 mt-5">
      {data.map((item) => (
        <Checkbox
          key={item.category}
          mstyle="green"
          checked={item.selected}
          onChange={() => checkCate(item.category)}
        >
          {item.category}
        </Checkbox>
      ))}
    </div>
  );
}

export default memo(CategoriesList);