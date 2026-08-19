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
  bgdarkNeutral,
  borderLign,
  borderDark,
} from "@/data/desingStyle";
import TimeTic from "@/ui/Time/TimeTic";
import CountTrueFalseAnswers from "@/ui/game/answers/CountTrueFalseAnswers";
import InfoDate from "@/ui/date/InfoDate";
import ChildrenDetails from "../Details/ChildrenDetails";

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
  const LastMyDate = arrProgressBar?.date.length - 1;
  const MyDate = arrProgressBar?.date[LastMyDate];
  return (
    <>
    <h2 className="text-lg">Статистика за этот раунд</h2>
      <BgContainer
        myClass="flex flex-col gap-3 justify-between"
        className={`${bglightgray70} ${bgdarkNeutral30} ${borderLign} ${borderDark}`}
      >
        <div className="flex justify-between items-center flex-wrap gap-2">
          <span className="flex justify-between gap-2 items-center text-lg">
            Ответы:
            <CountTrueFalseAnswers
              numCorrect={passed}
              numError={failed}
              Total={TotalQuestionLenght}
            />
          </span>
          <div className="flex justify-between items-center gap-3">
            <TimeTic myTime={MyTime} />
            <InfoDate date={MyDate} />
          </div>
        </div>

        <DoubleProgressBar
          data={db}
          progressBar={arrProgressBar}
          roundProgress={true}
        />

        <ChildrenDetails
          title={`📝 История матчей`}
          childrenClass="flex-col"
          titleClass="text-base"
          svgClass="w-5"
          BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
        >
          {arrProgressBar?.date.map((el, index) => (
            <div key={`${el}-${index}`} className="flex justify-between items-center flex-wrap gap-2 border-b-2 border-gray-400/50 pb-2">
              <span className="flex justify-between gap-2 items-center text-lg flex-wrap">
                Ответы:
                <CountTrueFalseAnswers
                  numCorrect={arrProgressBar.numCorrectLenght[index]}
                  numError={arrProgressBar.numErrorLenght[index]}
                  Total={TotalQuestionLenght}
                />
              </span>
              <div className="flex justify-between items-center gap-3">
                <TimeTic myTime={arrProgressBar.timeMatch[index].split(":")} />
                <InfoDate date={el} />
              </div>
            </div>
          ))}
        </ChildrenDetails>
      </BgContainer>
    </>
  );
}

export default RoundStatsBoard;
