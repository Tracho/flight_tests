import SVGStar from "@/assets/icons/star.svg?react";
import SVGDelete from "@/assets/icons/delate.svg?react";
import NeonBtn from "@/ui/button/NeonBtn";
import Radio from "@/ui/input/Radio";
import Checkbox from "@/ui/input/Checkbox";
import InfoCorrect from "@/ui/list/Info/InfoCorrect";
import Info from "@/ui/list/Info/Info";
import InfoHelp from "@/ui/list/Info/infoHelp";
import {  quizActionsTest, useGame } from "@/store/useOpenGameQuiz";
import { useEffect, useState } from "react";
import {
  bglightgray,
  bgdarkStonel720,
  bgdarkNeutral,
  bglight,
  borderDarkNeonViolet700,
  borderLightNeonOrange700,
} from "@/data/desingStyle";
import { getData } from "@/store/quizDataStore";
 

type SelectedAnswer = {
  text: string;
  select: boolean;
};
function GameBoard() {
  const game = useGame();
  const db = quizActionsTest.getOpenDataCateQuiz();
  useEffect(() => {
    console.log(db);
  }, [game.game.started]);

  let statusCount = game.getQuizQuestion().options.reduce(
    (accumulator, item) => {
      if (item.isCorrect) {
        accumulator.trueCount += 1;
      } else {
        accumulator.falseCount += 1;
      }
      return accumulator;
    },
    { trueCount: 0, falseCount: 0 },
  );

  const [selectedAnswer, SetSelectedAnswer] = useState<SelectedAnswer[]>([]);
  const HandlerSelectRadion = (val: SelectedAnswer) => {
    SetSelectedAnswer([val]);
  };
  const HandlerSelectCheckBox = (val: SelectedAnswer) => {
    SetSelectedAnswer((prev) => {
      // Если чекбокс сняли — удаляем его
      if (!val.select) {
        return prev.filter((item) => item.text !== val.text);
      }

      // Если уже есть — обновляем
      if (prev.some((item) => item.text === val.text)) {
        return prev.map((item) => (item.text === val.text ? val : item));
      }
      // Если нет — добавляем
      return [...prev, val];
    });
  };
  const HandleCheckingAnswers = () => {

    let isCorrect = game.checkingAnswers(selectedAnswer);
    game.addIdQuestProgress(isCorrect); 
    console.log(getData)
        
  };
  const HandleNextQuesion = () => {
    game.nextQuestion();
    game.toggleShowAnswers();
  };
  const HandlePreviousQuesion = () => {
    game.previousQuestion();
  };

  return (
    <>
      {game.game.started == true && (
        <div
          className={`flex flex-col ${bglight} ${bgdarkNeutral} rounded border shadow-2xl  ${borderDarkNeonViolet700} ${borderLightNeonOrange700}`}
        >
          <div
            className={`px-6 py-4  border-b border-orange-700 dark:border-violet-700`}
          >
            <h1 className="text-xl">{db?.title}</h1>
          </div>

          <div
            className={`px-6 py-4 ${bglightgray} ${bgdarkStonel720} flex gap-4 flex-col`}
          >
            <div className="flex justify-between items-center">
              <b className="bg-sky-600 rounded text-white px-2 py-1">
                Вопрос №{game.getIdQuestion() + 1}
              </b>
              <div className="flex flex-row justify-between items-center gap-3">
                <NeonBtn
                  title="Сохранить"
                  className="px-2"
                  color="amber"
                  variant="outline"
                >
                  <SVGStar width={22}></SVGStar>
                </NeonBtn>
                <NeonBtn
                  title="Удалить"
                  className="px-2"
                  color="red"
                  variant="outline"
                >
                  <SVGDelete width={22}></SVGDelete>
                </NeonBtn>
              </div>
            </div>
            <p className="text-lg">{game.getQuizQuestion().title}</p>
            <ul className="flex flex-col gap-3">
              {game.getQuizQuestion().options.map((item, index) => {
                if (statusCount?.trueCount === 1) {
                  return (
                    <li key={index}>
                      <Radio
                        name={
                          game.getQuizQuestion()?.title + game.getIdQuestion()
                        }
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
                        isCorrect={
                          game.getShowAnswers() ? item.isCorrect : undefined
                        }
                      >
                        {item.text}
                      </Radio>
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <Checkbox
                        name={
                          game.getQuizQuestion()?.title + game.getIdQuestion()
                        }
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
                        isCorrect={
                          game.getShowAnswers() ? item.isCorrect : undefined
                        }
                      >
                        {item.text}
                      </Checkbox>
                    </li>
                  );
                }
              })}
            </ul>

            <div className="flex justify-between items-center">
              {game.getIdQuestion() !== 0 && (
                <NeonBtn color="sky" onClick={HandlePreviousQuesion}>
                  {" "}
                  Назад{" "}
                </NeonBtn>
              )}

              <div className="flex justify-end w-full">
                {game.getShowAnswers() == false ? (
                  <NeonBtn color="green" onClick={HandleCheckingAnswers}>
                    Подтвердить выбор
                  </NeonBtn>
                ) : (
                  <NeonBtn color="sky" onClick={HandleNextQuesion}>
                    Далее
                  </NeonBtn>
                )}
              </div>
            </div>

            {game.getShowAnswers() == true && (
              <>
                <InfoCorrect header="Правильный ответ">
                  {game.getQuizQuestion()?.correctAnswer}
                </InfoCorrect>
                {game.getQuizQuestion()?.info && (
                  <Info header="Полезная информация">
                    {game.getQuizQuestion()?.info}
                  </Info>
                )}
                {game.getQuizQuestion()?.infoHelp && (
                  <InfoHelp header="Дополнительная информация">
                    {game.getQuizQuestion()?.infoHelp}
                  </InfoHelp>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GameBoard;
