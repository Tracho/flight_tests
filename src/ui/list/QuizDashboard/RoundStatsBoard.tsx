import SVGFTotal from "@/assets/icons/list-circle.svg?react";
import { getProgressBar } from "@/store/quizDataStore";
import { getSelectQuiz } from "@/store/useSettingParams";
import type { QuizProgressBarKey } from "@/types/quizProgressStore";
import DoubleProgressBar from "../progress/DoubleProgressBar";
import { quizActionsTest } from "@/store/useOpenGameQuiz";
import BgContainer from "@/ui/container/BgContainer";
import {
  bglightgray70,
  bgdarkNeutral30,
  borderLign,
  borderDark,
} from "@/data/desingStyle";
import TimeTic from "@/ui/Time/TimeTic";
import CountTrueFalseAnswers from "@/ui/game/answers/CountTrueFalseAnswers";

function RoundStatsBoard() {
  const db = quizActionsTest.getOpenDataCateQuiz();
  if (!db) {
    return null;
  }
  const { cate, quiz } = getSelectQuiz();
  const arrProgressBar: QuizProgressBarKey = getProgressBar({ cate, quiz });
  console.log(arrProgressBar);
  // Ответы
  const lastIdCorrect = arrProgressBar?.numCorrectLenght.length - 1;
  const lastIdError = arrProgressBar?.numCorrectLenght.length - 1;
  const passed = Number(arrProgressBar?.numCorrectLenght[lastIdCorrect]);
  const failed = Number(arrProgressBar?.numErrorLenght[lastIdError]);
  const TotalQuestionLenght = db.json.length;
  // Время и дата
  const lastMyTime = arrProgressBar?.timeMatch.length - 1;
  const MyTime = arrProgressBar?.timeMatch[lastMyTime].split(":");

  return (
    <>
      <BgContainer
        myClass="flex flex-col gap-3 justify-between"
        className={`${bglightgray70} ${bgdarkNeutral30} ${borderLign} ${borderDark}`}
      >
        <div className="flex justify-between items-center">
          <span className="flex justify-between gap-2 items-center text-lg">
            Ответы:
            <CountTrueFalseAnswers numCorrect={passed} numError={failed}>
              |
              <span className="flex items-center gap-1">
                <SVGFTotal
                  className="dark:text-white"
                  width={24}
                  hanging={24}
                />
                {TotalQuestionLenght}
              </span>
            </CountTrueFalseAnswers>
          </span>
          
          <TimeTic myTime={MyTime} />
        </div>
        <DoubleProgressBar
          data={db}
          progressBar={arrProgressBar}
          roundProgress={true}
        />
      </BgContainer>
    </>
  );
}

export default RoundStatsBoard;
