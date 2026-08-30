import InputEnter from "@/ui/form/InputEnter";
import { useState } from "react";
import SVGsend from "@/assets/icons/send.svg?react";

function GBtextInput() {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    setSearch("");
  };
  return (
    <>
      <InputEnter
        inpClassName="w-full"
        value={search}
        inpStyle="light"
        onChange={setSearch}
        onSubmit={handleSearch}
        placeholder="Поиск..."
      > <SVGsend className="w-6 h-6" /></InputEnter>
    </>
  );
}

export default GBtextInput;
