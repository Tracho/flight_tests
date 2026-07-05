import BgContainer from "@/ui/container/BgContainer";
import CategoriesList from "./ChildrenCateNavi/CategoriesList";
import SeacrchCate from "./ChildrenCateNavi/SeacrchCate";

function CategoryNavi() { 
  return (
    <>
      <div className="max-w-full sm:max-w-xs w-full flex flex-col">
        <BgContainer>
          <div className="flex flex-col gap-3">
            <span className="text-lg">Поиск по категориям</span>
            <SeacrchCate />
          </div>
          <div className="flex flex-col mt-5 gap-3">
            <span className="text-lg">Категории:</span>
            <CategoriesList />
          </div>
        </BgContainer>
      </div>
    </>
  );
}

export default CategoryNavi;
