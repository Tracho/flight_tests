import { useGame } from "@/store/useOpenGameQuiz";
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
import {
  bgdarkNeutral,
  bglight,
  bglightgray,
  borderDark,
  borderLign,
} from "@/data/desingStyle";
import { getProgressBar, useProgressBarAll } from "@/store/quizDataStore";
import type { QuizProgressBarKey } from "@/types/quizProgressStore";
import { setSelectQuiz } from "@/store/useSettingParams";
import CountTrueFalseAnswers from "@/ui/game/answers/CountTrueFalseAnswers";
import TimeTic from "@/ui/Time/TimeTic";
import InfoDate from "@/ui/date/InfoDate";

function QuizDashboard() {
  const data = useQuizData();
  if (!data) {
    return null;
  }
  const game = useGame();
  const ProgressBarAll = useProgressBarAll();
  const selectedCategories = useSelectedCategories() ?? [];
  const selectedTests = useSelectedTests() ?? [];
  const placeholder_text = "Пусто...!!";
  console.group("QuizDashboard");
  console.log(data);
  console.log(ProgressBarAll);
  console.groupEnd();
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
                    const questionIndexes = Array.from(
                      { length: childItem.json.length },
                      (_, index) => index,
                    );

                    const arrProgressBar: QuizProgressBarKey =
                      ProgressBarAll?.[item.category]?.[childItem.title];
                    const notPassed = arrProgressBar?.not_passed ?? [];
                    const errorCounts = new Map<number, number>();

                    for (const question of notPassed) {
                      errorCounts.set(
                        question,
                        (errorCounts.get(question) ?? 0) + 1,
                      );
                    }

                    const uniqueErrorQuestions = [...errorCounts.keys()];

                    const duplicates = uniqueErrorQuestions.filter(
                      (question) => (errorCounts.get(question) ?? 0) > 1,
                    );

                    const renderErrorQuestion = (question: number) => {
                      const count = errorCounts.get(question) ?? 0;

                      return (
                        <span className="relative inline-flex items-center justify-center">
                          <span>{question + 1}</span>
                          {count > 1 && (
                            <span className="absolute -right-6 -top-2 rounded-full bg-red-900 px-1 py-0.5 text-[9px] font-bold leading-none text-white flex justify-center items-center">
                              {count}
                            </span>
                          )}
                        </span>
                      );
                    };

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
                              <DoubleProgressBar
                                data={childItem}
                                progressBar={arrProgressBar}
                              />
                              <div className="flex justify-center items-center w-full">
                                <NeonLink
                                  to={{
                                    pathname: "/quiz",
                                    search: `?cate=${encodeURIComponent(item.category)}&title=${encodeURIComponent(childItem.title)}`,
                                    // hash: "#1", // Если #1 это именно хэш-якорь
                                  }}
                                  onClick={() =>
                                    game.setGame({ started: false })
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
                            title={`🚨 Вопросы с ошибками (${new Set(arrProgressBar?.not_passed).size || 0})`}
                            childrenClass="flex-col"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            <div className="flex flex-wrap gap-3">
                              {notPassed.length > 0
                                ? uniqueErrorQuestions.map(
                                    (question, index) => (
                                      <ContainerCateModal
                                        NeonBtnColor="red"
                                        pages={uniqueErrorQuestions}
                                        duplicateErrorCounts={errorCounts.get(
                                          question,
                                        )}
                                        cateName={item.category}
                                        testName={childItem.title}
                                        startIndex={index}
                                        key={question}
                                      >
                                        {renderErrorQuestion(question)}
                                      </ContainerCateModal>
                                    ),
                                  )
                                : placeholder_text}
                            </div>
                            {duplicates.length > 0 && (
                              <div className="flex flex-col gap-3">
                                <span>‼️ Повторные ошибки:</span>
                                <div className="flex flex-wrap gap-3">
                                  {duplicates.map((question, index) => (
                                    <ContainerCateModal
                                      NeonBtnColor="red"
                                      pages={duplicates}
                                      duplicateErrorCounts={errorCounts.get(
                                        question,
                                      )}
                                      cateName={item.category}
                                      testName={childItem.title}
                                      startIndex={index}
                                      key={question}
                                    >
                                      {renderErrorQuestion(question)}
                                    </ContainerCateModal>
                                  ))}
                                </div>
                              </div>
                            )}
                          </ChildrenDetails>
                          <ChildrenDetails
                            title={`✅ Изученные вопросы (${arrProgressBar?.passed.length || 0})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            {arrProgressBar?.passed.length > 0
                              ? arrProgressBar?.passed.map((i, _) => (
                                  <ContainerCateModal
                                    NeonBtnColor="green"
                                    pages={arrProgressBar?.passed}
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
                            title={`⭐ Сохраненные вопросы (${arrProgressBar?.q_saved.length || 0})`}
                            childrenClass="flex-wrap"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            {arrProgressBar?.q_saved.length > 0
                              ? arrProgressBar?.q_saved.map((i, _) => (
                                  <ContainerCateModal
                                    NeonBtnColor="amber"
                                    pages={arrProgressBar?.q_saved}
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
                            title={`📝 История матчей`}
                            childrenClass="flex-col"
                            titleClass="text-base"
                            svgClass="w-5"
                            BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
                          >
                            {arrProgressBar?.date.length > 0
                              ? arrProgressBar?.date.map((el, index) => (
                                  <div
                                    key={`${el}-${index}`}
                                    className="flex justify-between items-center flex-wrap gap-2 border-b-2 border-gray-400/50 pb-2"
                                  >
                                    <span className="flex justify-between gap-2 items-center text-lg flex-wrap">
                                      Ответы: 
                                      <CountTrueFalseAnswers
                                        numCorrect={
                                          arrProgressBar.numCorrectLenght[index]
                                        }
                                        numError={
                                          arrProgressBar.numErrorLenght[index]
                                        }
                                        Total={childItem.json.length}
                                      />
                                    </span>
                                    <div className="flex justify-between items-center gap-3">
                                      <TimeTic
                                        myTime={arrProgressBar.timeMatch[
                                          index
                                        ].split(":")}
                                      />
                                      <InfoDate date={el} />
                                    </div>
                                  </div>
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
                            {questionIndexes.map((questionNumber, index) => (
                              <ContainerCateModal
                                NeonBtnColor="gray"
                                key={questionNumber}
                                pages={questionIndexes}
                                cateName={item.category}
                                testName={childItem.title}
                                startIndex={index}
                              >
                                {questionNumber + 1}
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
