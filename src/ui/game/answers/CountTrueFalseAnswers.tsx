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
};
function CountTrueFalseAnswers({
  numCorrect = null,
  numError = null,
  Total = null,
  children,
}: Props) {
  let thisTotal = Total;
  if(Total == null){
    thisTotal = quizActionsTest.getOpenDataCateQuiz()?.json.length ?? 0;
  }

  console.log(thisTotal)
  const game = useGame(); 
  let thisCorrenct =
    numCorrect == null ? game.game.numCorrect.length : numCorrect;
  let thisError = numError == null ? game.game.numError.length : numError;
 
  return (
    <>
      <div className="flex items-center gap-3 text-lg">
        <span className="flex items-center gap-1">
          <SVGSTrue
            className="text-green-600 dark:text-green-400"
            width={24}
            hanging={24}
          />
          {thisCorrenct}
        </span>
        |
        <span className="flex items-center gap-1">
          <SVGFlase className="text-red-500" width={24} hanging={24} />
          {thisError}
        </span>
        |
        <span className="flex items-center gap-1">
          <SVGFTotal className="dark:text-white" width={24} hanging={24} />
          {thisTotal}
        </span>
        {children}
      </div>
    </>
  );
}

export default CountTrueFalseAnswers;
