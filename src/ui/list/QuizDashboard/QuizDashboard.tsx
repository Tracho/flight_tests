import { quizActionsTest } from "@/store/useOpenGameQuiz";
import {
  useQuizData,
  useSelectedCategories,
  useSelectedTests,
} from "@/store/useQuizStore";

import NeonLink from "@/ui/button/NeonLink";
import Details from "@/ui/list/Details/Details";
import DoubleProgressBar from "@/ui/list/progress/DoubleProgressBar";
import ContainerCateModal from "@/ui/Modal/ContainerCateModal";
import ChildrenDetails from "../Details/ChildrenDetails";
import { bgdarkNeutral, bglight, bglightgray, borderDark, borderLign } from "@/data/desingStyle";
import { getData } from "@/store/quizDataStore";

function QuizDashboard() {
  const data = getData()
  const selectedCategories = useSelectedCategories();
  const selectedTests = useSelectedTests();
  const placeholder_text = "Пусто..."; 
  console.log(data)
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
                        <ChildrenDetails
                          key={childItem.title + childIndex}
                          title={childItem.title}
                          description={childItem.description}
                          childrenClass="flex-col"
                          titleClass="text-lg"
                          svgClass="w-6"
                          topChildren={
                            <>
                              <DoubleProgressBar data={childItem} />
                              <div className="flex justify-center items-center w-full">
                                <NeonLink
                                  to={{
                                    pathname: "/quiz",
                                    search: `?cate=${encodeURIComponent(item.category)}&title=${encodeURIComponent(childItem.title)}`,
                                    // hash: "#1", // Если #1 это именно хэш-якорь
                                  }}
                                  onClick={() =>
                                    quizActionsTest.setSelectCateQuizQuestion({cate:item.category, quiz:childItem.title,})
                                  }
                                  color="sky"
                                  variant="solid"
                                  className="text-xs"
                                >
                                  Начать тест
                                </NeonLink>
                              </div>
                            </>
                          }
                        >
                          <ChildrenDetails
                            title={`🚨 Вопросы с ошибками (${new Set(childItem.storage_q_not_passed).size})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            {
                           
                            childItem.storage_q_not_passed.length > 0
                              ? Array.from(new Set(childItem.storage_q_not_passed)).map((i, _) => (
                                  <ContainerCateModal 
                                    NeonBtnColor="red"
                                    pages={Array.from(new Set(childItem.storage_q_not_passed))}
                                    cateName={item.category}
                                    testName={childItem.title}
                                    startIndex={_}
                                    key={_}
                                  >
                                    {i + 1}
                                  </ContainerCateModal>
                                ))
                              : placeholder_text}
                          </ChildrenDetails>
                          <ChildrenDetails
                            title={`✅ Изученные вопросы (${childItem.storage_q_passed.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            {childItem.storage_q_passed.length > 0
                              ? childItem.storage_q_passed.map((i, _) => (
                                  <ContainerCateModal
                                    NeonBtnColor="green"
                                    pages={childItem.storage_q_passed}
                                    cateName={item.category}
                                    testName={childItem.title}
                                    startIndex={_}
                                    key={_}
                                  >
                                    {i + 1}
                                  </ContainerCateModal>
                                ))
                              : placeholder_text}
                          </ChildrenDetails>
                          <ChildrenDetails
                            title={`⭐ Сохраненные вопросы (${childItem.storage_q_saved.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            {childItem.storage_q_saved.length > 0
                              ? childItem.storage_q_saved.map((i, _) => (
                                  <ContainerCateModal
                                    NeonBtnColor="amber"
                                    pages={childItem.storage_q_saved}
                                    cateName={item.category}
                                    testName={childItem.title}
                                    startIndex={_}
                                    key={_}
                                  >
                                    {i + 1}
                                  </ContainerCateModal>
                                ))
                              : placeholder_text}
                          </ChildrenDetails>
                          <ChildrenDetails
                            title={`❔ Не пройденные вопросы (${childItem.json.length})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
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
                          </ChildrenDetails>
                        </ChildrenDetails>
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
