import InputEnter from "@/ui/form/InputEnter";
import SVGSearch from "@/assets/icons/search.svg?react";
import { quizActions } from "@/store/useQuizStore";
import { useState } from "react";
function SeacrchCate() {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    quizActions.searchCategory(search);
  };
  return (
    <>
      <InputEnter
        inpClassName="w-full"
        value={search}
        onChange={setSearch}
        onSubmit={handleSearch}
        placeholder="Поиск..."
      >
        <SVGSearch className="w-6" />
      </InputEnter>
    </>
  );
}

export default SeacrchCate;
