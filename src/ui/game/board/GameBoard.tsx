import SVGStar from "@/assets/icons/star.svg?react";
import SVGDelete from "@/assets/icons/delate.svg?react";
import NeonBtn from "@/ui/button/NeonBtn";
import Radio from "@/ui/input/Radio";
import Checkbox from "@/ui/input/Checkbox";
import InfoCorrect from "@/ui/list/Info/InfoCorrect";
import Info from "@/ui/list/Info/Info";
import InfoHelp from "@/ui/list/Info/infoHelp";
import { quizActionsTest, useGame } from "@/store/useOpenGameQuiz";
import { useEffect } from "react";

function GameBoard() {
  const game = useGame();
  const db = quizActionsTest.getOpenDataQuiz();

  useEffect(() => {
    console.log(db);
  }, [game.game.started]);
  return (
    <>
      {game.game.started == true && (
        <div className="px-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <b className="bg-sky-600 px-2 py-1 rounded">
              {/* Вопрос №{questionNumber + 1} */}
              Вопрос №{1}
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
          <p className="text-lg">{db?.title}</p>
          {/* <ul className="flex flex-col gap-3">
          {db?.options.map((item, index) => {
            if (statusCount?.trueCount === 1) {
              return (
                <li key={index}>
                  
                  <Radio
                    name={db?.title + startIndex}
                    value={item.text}
                    isCorrect={item.isCorrect}
                    checked={item.isCorrect}
                    disabled
                  >
                    {item.text}
                  </Radio>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  
                  <Checkbox
                    name={db?.title + startIndex}
                    value={item.text}
                    isCorrect={item.isCorrect}
                    checked={item.isCorrect}
                    disabled
                  >
                    {item.text}
                  </Checkbox>
                </li>
              );
            }
          })}
        </ul>
        <InfoCorrect header="Правильный ответ">{db?.correctAnswer}</InfoCorrect>
        {db?.info && <Info header="Полезная информация">{db?.info}</Info>}
        {db?.infoHelp && (
          <InfoHelp header="Дополнительная информация">{db?.infoHelp}</InfoHelp>
        )} */}
        </div>
      )}
    </>
  );
}

export default GameBoard;
