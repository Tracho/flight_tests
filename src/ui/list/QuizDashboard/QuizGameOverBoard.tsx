import type { QuizProgressBarKey } from "@/types/quizProgressStore";
import { getProgressBar, useProgressBar } from "@/store/quizDataStore";
import { quizActionsTest, useGame } from "@/store/useOpenGameQuiz";
import ChildrenDetails from "../Details/ChildrenDetails";
import ContainerCateModal from "@/ui/Modal/ContainerCateModal";
import { getSelectQuiz } from "@/store/useSettingParams";
import DoubleProgressBar from "../progress/DoubleProgressBar";
import NeonLink from "@/ui/button/NeonLink";
import {
  bgdarkNeutral,
  bglight,
  bglightgray,
  borderDark,
  borderLign,
} from "@/data/desingStyle";
import CountTrueFalseAnswers from "@/ui/game/answers/CountTrueFalseAnswers";
import TimeTic from "@/ui/Time/TimeTic";
import InfoDate from "@/ui/date/InfoDate";
function QuizGameOverBoard() {
  const game = useGame();
  const db = quizActionsTest.getOpenDataCateQuiz();
  if (!db) {
    return null;
  }
  const { cate, quiz } = getSelectQuiz();
  const arrProgressBar: QuizProgressBarKey = useProgressBar(cate, quiz);

  const notPassed = arrProgressBar?.not_passed ?? [];
  const errorCounts = new Map<number, number>();

  notPassed.forEach((question) => {
    errorCounts.set(question, (errorCounts.get(question) ?? 0) + 1);
  });

  const uniqueErrorQuestions = Array.from(new Set(notPassed));
  const duplicates = uniqueErrorQuestions.filter(
    (question) => (errorCounts.get(question) ?? 0) > 1,
  );

  const placeholder_text = "Пусто...";

  const questionIndexes = Array.from(
    { length: db.json.length },
    (_, index) => index,
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

  return (
    <ChildrenDetails
      title={db.title || ""}
      description={db.description}
      childrenClass="flex-col"
      titleClass="text-lg"
      svgClass="w-6"
      open={true}
      topChildren={
        <>
          <DoubleProgressBar data={db} progressBar={arrProgressBar} />

          <div className="flex justify-center items-center w-full">
            <NeonLink
              to={{
                pathname: "/quiz",
                search: `?cate=${encodeURIComponent(cate)}&title=${encodeURIComponent(quiz)}`,
                // hash: "#1", // Если #1 это именно хэш-якорь
              }}
              onClick={() => game.setGame({ started: false })}
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
            ? uniqueErrorQuestions.map((question, index) => (
                <ContainerCateModal
                  NeonBtnColor="red"
                  pages={uniqueErrorQuestions}
                  duplicateErrorCounts={errorCounts.get(question)}
                  cateName={cate}
                  testName={db.title}
                  startIndex={index}
                  key={question}
                >
                  {renderErrorQuestion(question)}
                </ContainerCateModal>
              ))
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
                  duplicateErrorCounts={errorCounts.get(question)}
                  cateName={cate}
                  testName={db.title}
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
                cateName={cate}
                testName={db.title}
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
                cateName={cate}
                testName={db.title}
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
                    numCorrect={arrProgressBar.numCorrectLenght[index]}
                    numError={arrProgressBar.numErrorLenght[index]}
                    Total={db.json.length}
                  />
                  
                </span>
                <div className="flex justify-between items-center gap-3">
                  <TimeTic
                    myTime={arrProgressBar.timeMatch[index].split(":")}
                  />
                  <InfoDate date={el} />
                </div>
              </div>
            ))
          : placeholder_text}
      </ChildrenDetails>

      <ChildrenDetails
        title={`❔ Не пройденные вопросы (${db.json.length})`}
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
            cateName={cate}
            testName={db.title}
            startIndex={index}
          >
            {questionNumber + 1}
          </ContainerCateModal>
        ))}
      </ChildrenDetails>
    </ChildrenDetails>
  );
}

export default QuizGameOverBoard;
