import {
  useQuizData,
  useSelectedCategories,
  useSelectedTests,
} from "@/store/useQuizStore";
import NeonBtn from "@/ui/button/NeonBtn";
import Details from "@/ui/list/Details/Details";
import DoubleProgressBar from "@/ui/list/progress/DoubleProgressBar";
import ContainerCateModal from "@/ui/Modal/ContainerCateModal";
import Modal from "@/ui/Modal/Modal";
import { useState } from "react";

function QuizDashboard() {
  const data = useQuizData();
  const selectedCategories = useSelectedCategories();
  const selectedTests = useSelectedTests();

  return (
    <>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => {
          if (
            selectedCategories.includes(item.category) ||
            selectedCategories.length == 0
          )
            if (item.visible)
              return (
                <Details
                  key={item.category + index}
                  title={item.category}
                  description={item.description}
                  childrenClass="flex-col"
                >
                  {item.arr.map((childItem, childIndex) => {
                    if (
                      selectedTests.length == 0 ||
                      selectedTests.includes(childItem.title)
                    )
                      return (
                        <Details
                          key={childItem.title + childIndex}
                          title={childItem.title}
                          description={childItem.description}
                          childrenClass="flex-col"
                          titleClass="text-lg"
                          svgClass="w-6"
                          topChildren={<DoubleProgressBar data={childItem}/>}
                        >  
                          <Details
                            title={`🚨 Вопросы с ошибками (${childItem.storage_q_not_passed.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                          >
                            {childItem.storage_q_not_passed.map((i, _) => (
                              <ContainerCateModal
                                NeonBtnColor="red"
                                pages={childItem.storage_q_not_passed}
                                cateName={item.category}
                                testName={childItem.title}
                                startIndex={_}
                                key={_}
                              >
                                {i}
                              </ContainerCateModal>
                            ))}
                          </Details>
                          <Details
                            title={`✅ Изученные вопросы (${childItem.storage_q_passed.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                          >
                            {childItem.storage_q_passed.map((i, _) => (
                              <ContainerCateModal
                                NeonBtnColor="green"
                                pages={childItem.storage_q_passed}
                                cateName={item.category}
                                testName={childItem.title}
                                startIndex={_}
                                key={_}
                              >
                                {i}
                              </ContainerCateModal>
                            ))}
                          </Details>
                          <Details
                            title={`💾 Сохраненные вопросы (${childItem.storage_q_saved.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                          >
                            {childItem.storage_q_saved.map((i, _) => (
                              <ContainerCateModal
                                NeonBtnColor="amber"
                                pages={childItem.storage_q_saved} 
                                cateName={item.category}
                                testName={childItem.title}
                                startIndex={_}
                                key={_}
                              >
                                {i}
                              </ContainerCateModal>
                            ))}
                          </Details>
                          <Details
                            title={`❔ Не пройденные вопросы (${childItem.json.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                          >
                            {Array.from(
                              { length: childItem.json.length },
                              (_, index) => index + 1,
                            ).map((questionNumber, index) => (
                              <ContainerCateModal
                                NeonBtnColor="gray"
                                key={questionNumber}
                                pages={Array.from(
                                  { length: childItem.json.length },
                                  (_, i) => i,
                                )}
                                cateName={item.category}
                                testName={childItem.title}
                                startIndex={index}
                              >
                                {questionNumber}
                              </ContainerCateModal>
                            ))}
                          </Details>
                        </Details>
                      );
                  })}
                </Details>
              );
        })}
      </div>
    </>
  );
}

export default QuizDashboard;
