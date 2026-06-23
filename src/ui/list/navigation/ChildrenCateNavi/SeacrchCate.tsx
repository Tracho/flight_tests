import InputEnter from "@/ui/form/InputEnter";
import SVGSearch from "@/assets/icons/search.svg?react"; 
import { useQuizStore } from "@/store/useQuizStore";
import { useState } from "react";
function SeacrchCate() {
  const data = useQuizStore((state) => state.data);
  const [search, setSearch] = useState("");

  // const searchQuiz = useQuizStore((state) => state.searchQuiz);
  const searchCate = useQuizStore((state) => state.searchCateQuestion);
  const handleSearch = () => {
    searchCate(search); 
  };
  return (
    <>
      <InputEnter
        inpClassName="w-100"
        value={search}
        onChange={setSearch}
        onSubmit={handleSearch}
      >
        <SVGSearch className="w-6" />
      </InputEnter>
    </>
  );
}

export default SeacrchCate;
