import SVGSTrue from "@/assets/icons/checkmark-circle.svg?react";
import SVGFlase from "@/assets/icons/close-circle.svg?react";
import SVGFTotal from "@/assets/icons/list-circle.svg?react";
import { quizActionsTest, useGame } from "@/store/useOpenGameQuiz";
import type { ReactNode } from "react";

type Props = {
  numCorrect?: number | null;
  numError?: number | null;
  Total?: number | null;
  children?: ReactNode;
  svgW?: number;
  svgH?: number;
};
function CountTrueFalseAnswers({
  numCorrect = null,
  numError = null,
  Total = null,
  svgW = 18,
  svgH = 18,
  children,
}: Props) {
  let thisTotal = Total;
  if(Total == null){
    thisTotal = quizActionsTest.getOpenDataCateQuiz()?.json.length ?? 0;
  }

 
  const game = useGame(); 
  let thisCorrenct =
    numCorrect == null ? game.game.numCorrect.length : numCorrect;
  let thisError = numError == null ? game.game.numError.length : numError;
 
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <SVGSTrue
            className="text-green-600 dark:text-green-400"
            width={svgW}
            hanging={svgH}
          />
          {thisCorrenct}
        </span>
        |
        <span className="flex items-center gap-1">
          <SVGFlase className="text-red-500" width={svgW} hanging={svgH} />
          {thisError}
        </span>
        |
        <span className="flex items-center gap-1">
          <SVGFTotal className="dark:text-white" width={svgW} hanging={svgH} />
          {thisTotal}
        </span>
        {children}
      </div>
    </>
  );
}

export default CountTrueFalseAnswers;
