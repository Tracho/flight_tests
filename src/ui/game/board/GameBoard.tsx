import SVGStar from "@/assets/icons/star.svg?react";
import SVGDelete from "@/assets/icons/delate.svg?react";
import NeonBtn from "@/ui/button/NeonBtn";
import Radio from "@/ui/input/Radio";
import Checkbox from "@/ui/input/Checkbox";
import InfoCorrect from "@/ui/list/Info/InfoCorrect";
import Info from "@/ui/list/Info/Info";
import InfoHelp from "@/ui/list/Info/infoHelp";
import { quizActionsTest, useGame } from "@/store/useOpenGameQuiz";
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
import SaveNeonBtn from "@/ui/button/SaveNeonBtn";
import { getSelectQuiz } from "@/store/useSettingParams";
import TimeTic from "@/ui/Time/TimeTic";
type SelectedAnswer = {
  text: string;
  select: boolean;
};

// Предположим, что это тип вашего объекта опции
type QuizOption = {
  text: string;
  isCorrect: boolean;
};

function GameBoard() {
  const game = useGame();
  const db = quizActionsTest.getOpenDataCateQuiz();
  const WatchQuiz = getSelectQuiz();
  // Создаем локальный стейт для хранения ОДНОКРАТНО перемешанных опций
  const [shuffledOptions, setShuffledOptions] = useState<QuizOption[]>([]);
  const [selectedAnswer, SetSelectedAnswer] = useState<SelectedAnswer[]>([]);

  // Перемешиваем только тогда, когда меняется ID вопроса
  useEffect(() => {
    // 1. Делаем поверхностную копию массива [...], чтобы НЕ мутировать оригинал в game
    const optionsCopy = [...game.getQuizQuestion().options];

    // 2. Перемешиваем нашу копию
    for (let i = optionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
    }

    // 3. Сохраняем в стейт. Теперь при кликах этот массив меняться не будет!
    setShuffledOptions(optionsCopy);
  }, [game.getIdQuestion()]); // Четкий триггер: только при смене вопроса

  // Вычисляем statusCount на основе оригинального массива (так надежнее)
  const statusCount = game.getQuizQuestion().options.reduce(
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

  const HandlerSelectRadion = (val: SelectedAnswer) => {
    SetSelectedAnswer([val]);
  };

  const HandlerSelectCheckBox = (val: SelectedAnswer) => {
    SetSelectedAnswer((prev) => {
      if (!val.select) {
        return prev.filter((item) => item.text !== val.text);
      }
      if (prev.some((item) => item.text === val.text)) {
        return prev.map((item) => (item.text === val.text ? val : item));
      }
      return [...prev, val];
    });
  };

  const HandleCheckingAnswers = () => {
    let isCorrect = game.checkingAnswers(selectedAnswer);
    game.addIdQuestProgress(isCorrect);
    game.endGame();
  };

  const HandleNextQuesion = () => {
    game.nextQuestion();
    game.toggleShowAnswers();
    SetSelectedAnswer([]);
  };

  const HandlePreviousQuesion = () => {
    game.previousQuestion();
    SetSelectedAnswer([]);
  };

  if (!db) {
    return null;
  }
 

 
  return (
    <>
      {game.game.started == true && (
        <div
          className={`flex flex-col ${bglight} ${bgdarkNeutral} rounded border shadow-2xl ${borderDarkNeonViolet700} ${borderLightNeonOrange700}`}
        >
          <div
            className={`px-6 py-4 border-b border-orange-700 dark:border-violet-700`}
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
                <SaveNeonBtn questionNumber={game.getIdQuestion()} cate={WatchQuiz.cate} quiz={WatchQuiz.quiz}/> 
              </div>
            </div>
            <div className="flex justify-end">
              <TimeTic/>
            </div>
            <p className="text-lg">{game.getQuizQuestion().title}</p>

            <ul className="flex flex-col gap-3">
              {/* Рендерим из локального стейта shuffledOptions вместо ArrRadndomOptions */}
              {shuffledOptions.map((item, index) => {
                if (statusCount?.trueCount === 1) {
                  return (
                    <li key={item.text}>
                      {" "}
                      {/* Лучше использовать item.text вместо index для key, если тексты уникальны */}
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
                    <li key={item.text}>
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default GameBoard;
