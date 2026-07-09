import Checkbox from "@/ui/input/Checkbox";
import { quizActions, useQuizData, useSelectedCategories, useSelectedTests } from "@/store/useQuizStore";
import { memo } from "react";
import './Categories.scss';
function CategoriesList() {
  const data = useQuizData();
  const selectedCategories =  useSelectedCategories();
  const selectedTests = useSelectedTests();
 
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => ( 
          <div key={item.category} className="myStyleCategoryLineH">
            <Checkbox 
              mstyle="green"
              checked={selectedCategories.includes(item.category)}
              onChange={() => quizActions.checkCategory(item.category)}
              labelClassName="bg-none"
            >
              {item.category}
            </Checkbox>

            <div className="ml-5">
              {item.arr.map((i) => (
                <Checkbox
                  key={i.title}
                  mstyle="green"
                  labelClassName="myStyleCategoryLineW"
                  checked={selectedTests.includes(i.title)}
                  onChange={() => quizActions.checkboxTest(item.category, i.title)}
                >
                  {i.title}
                </Checkbox>
              ))}
            </div>
          </div> 
      ))}
    </div>
  );
}

export default memo(CategoriesList);
