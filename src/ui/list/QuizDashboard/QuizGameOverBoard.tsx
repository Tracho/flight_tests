import type { QuizProgressBarKey } from "@/types/quizProgressStore";
import { getProgressBar } from "@/store/quizDataStore";
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
function QuizGameOverBoard() {
  const game = useGame();
  const db = quizActionsTest.getOpenDataCateQuiz();

  const { cate, quiz } = getSelectQuiz();
  const arrProgressBar: QuizProgressBarKey = getProgressBar({ cate, quiz });
  const duplicates = arrProgressBar?.not_passed.filter((item, index) => arrProgressBar?.not_passed.indexOf(item) !== index);

  const placeholder_text = "Пусто...";

  if (!db) {
    return null;
  }

   

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
          {arrProgressBar?.not_passed.length > 0
            ? Array.from(new Set(arrProgressBar?.not_passed)).map((i, _) => (
                <ContainerCateModal
                  NeonBtnColor="red"
                  pages={Array.from(new Set(arrProgressBar?.not_passed))}
                  cateName={cate}
                  testName={db.title}
                  startIndex={_}
                  key={_}
                >
                  {i + 1}
                </ContainerCateModal>
              ))
            : placeholder_text}
        </div>
        <div className="flex flex-col gap-3">
          <span>‼️ Повторные ошибки:</span>
          <div className="flex flex-wrap gap-3">
            {duplicates.length > 0
              ? Array.from(new Set(duplicates)).map((i, _) => (
                  <ContainerCateModal
                    NeonBtnColor="red"
                    pages={Array.from(new Set(duplicates))}
                    cateName={cate}
                    testName={db.title}
                    startIndex={_}
                    key={_}
                  >
                    {i + 1}
                  </ContainerCateModal>
                ))
              : placeholder_text}
          </div>
        </div>
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
        title={`❔ Не пройденные вопросы (${db.json.length})`}
        childrenClass="flex-wrap"
        titleClass="text-base"
        svgClass="w-5"
        BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
      >
        {Array.from({ length: db.json.length }, (_, index) => index + 1).map(
          (questionNumber, index) => (
            <ContainerCateModal
              NeonBtnColor="gray"
              key={questionNumber}
              pages={Array.from({ length: db.json.length }, (_, i) => i)}
              cateName={cate}
              testName={db.title}
              startIndex={index}
            >
              {questionNumber}
            </ContainerCateModal>
          ),
        )}
      </ChildrenDetails>
    </ChildrenDetails>
  );
}

export default QuizGameOverBoard;
