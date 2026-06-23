import BgContainer from "@/ui/container/BgContainer";
import CategoriesList from "./ChildrenCateNavi/CategoriesList";
import SeacrchCate from "./ChildrenCateNavi/SeacrchCate";

function CategoryNavi() {

  return (
    <>
      <div className="max-w-xs w-xs flex flex-col">
        <BgContainer> 
          <SeacrchCate/>
          <CategoriesList/>
        </BgContainer>
      </div>
    </>
  );
}

export default CategoryNavi;
