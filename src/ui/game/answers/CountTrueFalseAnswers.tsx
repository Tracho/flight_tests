import SVGSTrue from "@/assets/icons/checkmark-circle.svg?react";
import SVGFlase from "@/assets/icons/close-circle.svg?react";
import { useGame } from "@/store/useOpenGameQuiz";
import type { ReactNode } from "react";

type Props = {
  numCorrect?:number | null;
  numError?:number | null;
  children?: ReactNode;
}
function CountTrueFalseAnswers({numCorrect = null,numError = null, children}:Props) {
  const game = useGame();
  return ( <>
  <div className="flex items-center gap-3 text-lg">
    <span className="flex items-center gap-1"><SVGSTrue className="text-green-600 dark:text-green-400" width={24} hanging={24}/>{numCorrect == null ? game.game.numCorrect.length : numCorrect}</span>
    |
    <span className="flex items-center gap-1"><SVGFlase className="text-red-500" width={24} hanging={24}/>{numError == null ? game.game.numError.length : numError}</span>
    {children}  
  </div>
  </> );
}

export default CountTrueFalseAnswers;  