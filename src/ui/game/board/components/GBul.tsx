import { useGame } from "@/store/useOpenGameQuiz";
import type { CategoryQuiz } from "@/types/quiz";
import Checkbox from "@/ui/input/Checkbox";
import Radio from "@/ui/input/Radio";

type SelectedAnswer = {
  text: string;
  select: boolean;
};

// Предположим, что это тип вашего объекта опции
type QuizOption = {
  text: string;
  isCorrect: boolean;
};
type statusCount= {
 trueCount: number;
 falseCount: number;
}
type Props = {
  shuffledOptions:QuizOption[],
  selectedAnswer:SelectedAnswer[],
  statusCount:statusCount,
  db:CategoryQuiz,
  HandlerSelectRadion: ({text, select}: {text: string, select: boolean})=>void;
  HandlerSelectCheckBox: ({text, select}: {text: string, select: boolean})=>void;
}
function GBul({shuffledOptions, selectedAnswer, statusCount,db,HandlerSelectRadion,HandlerSelectCheckBox}:Props) {
  const game = useGame();
  return (
    <>
      <ul className="flex flex-col gap-3">
        {/* Рендерим из локального стейта shuffledOptions вместо ArrRadndomOptions */}
        {shuffledOptions.map((item, index) => {
          if (statusCount?.trueCount === 1) {
            return (
              <li key={item.text}>
                {" "}
                {/* Лучше использовать item.text вместо index для key, если тексты уникальны */}
                
                <Radio
                  name={db.json[game.getIdQuestion()].title}
                  mstyle={
                    game.getShowAnswers() == false
                      ? "blue"
                      : item.isCorrect == true
                        ? "green"
                        : "danger"
                  }
                  value={item.text}
                  checked={selectedAnswer.some(
                    (a) => a.text === item.text && a.select,
                  )}
                  onChange={(e) =>
                    HandlerSelectRadion({
                      text: item.text,
                      select: e.target.checked,
                    })
                  }
                  disabled={game.getShowAnswers()}
                  isCorrect={game.getShowAnswers() ? item.isCorrect : undefined}
                >
                  {item.text}
                </Radio>
              </li>
            );
          } else {
            return (
              <li key={item.text}>
                <Checkbox
                  name={db.json[game.getIdQuestion()].title}
                  mstyle={
                    game.getShowAnswers() == false
                      ? "blue"
                      : item.isCorrect == true
                        ? "green"
                        : "danger"
                  }
                  value={item.text}
                  checked={selectedAnswer.some(
                    (a) => a.text === item.text && a.select,
                  )}
                  onChange={(e) =>
                    HandlerSelectCheckBox({
                      text: item.text,
                      select: e.target.checked,
                    })
                  }
                  disabled={game.getShowAnswers()}
                  isCorrect={game.getShowAnswers() ? item.isCorrect : undefined}
                >
                  {item.text}
                </Checkbox>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
}

export default GBul;
