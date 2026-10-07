import InputEnter from "@/ui/form/InputEnter";
import { useEffect, useState } from "react";
import SVGsend from "@/assets/icons/send.svg?react";
import Details from "@/ui/list/Details/Details";
import { bgdarkNeutral, borderDark, borderLign } from "@/data/desingStyle";
import ChildrenDetails from "@/ui/list/Details/ChildrenDetails";
import { useGame } from "@/store/useOpenGameQuiz";
type SelectedAnswer = {
  text: string;
  select: boolean;
};
type QuizOption = {
  text: string;
  isCorrect: boolean;
};
type props = {
  // HandlerSelectRadion: ({
  //   text,
  //   select,
  // }: {
  //   text: string;
  //   select: boolean;
  // }) => void;
  HandlerSelectCheckBox: ({
    text,
    select,
  }: {
    text: string;
    select: boolean;
  }) => void;
  shuffledOptions: QuizOption[];
  selectedAnswer: SelectedAnswer[];
  HandleCheckingAnswers: () => void;
  HandleNextQuesion: () => void;
};
function GBtextInput({
  HandlerSelectCheckBox,
  shuffledOptions,
  selectedAnswer,
  HandleCheckingAnswers,
  HandleNextQuesion,
}: props) {
  const game = useGame();
  const [openTips, setOpenTips] = useState(false);
  const [answerInp, setAnswerInp] = useState("");
  const lenghtTrueOptions = shuffledOptions.filter((e) => e.isCorrect == true);
  const handleSubmit = () => {
    if (answerInp.trim() !== "")
      HandlerSelectCheckBox({
        text: answerInp,
        select: true,
      });
    setAnswerInp("");

    if (selectedAnswer.length === lenghtTrueOptions.length) {
      HandleCheckingAnswers();
    }
    if (game.getShowAnswers() == true) {
      HandleNextQuesion();
    }
  };

  useEffect(() => {
    setOpenTips(false);
  }, [shuffledOptions]);
  return (
    <>
      <div className="flex flex-wrap gap-3 items-center">
        <span>
          Ваш ответ [{selectedAnswer.length} / {lenghtTrueOptions.length}]:
        </span>
        <div className="flex flex-wrap gap-3">
          {selectedAnswer.map((e) => (
            <span
              key={e.text}
              className="text-sm cursor-pointer px-1.5 py-0.5 flex items-center gap-2 rounded bg-sky-500"
              onClick={() =>
                HandlerSelectCheckBox({ text: e.text, select: false })
              }
            >
              {e.text}
            </span>
          ))}
        </div>
      </div>
      <InputEnter
        inpClassName="w-full"
        value={answerInp}
        inpStyle="light"
        onChange={setAnswerInp}
        onSubmit={handleSubmit}
        placeholder="Введите текст..."
      >
        <SVGsend className="w-6 h-6" />
      </InputEnter>
      <div onClick={() => setOpenTips((old) => !old)}>
        <ChildrenDetails
          title={`Подсказка`}
          childrenClass="flex-wrap"
          titleClass="text-base"
          svgClass="w-5"
          BgContainerClass={`bg-orange-100/40 ${bgdarkNeutral} ${borderLign} ${borderDark}`}
          open={openTips}
        >
          {shuffledOptions.map((e) => (
            <span key={e.text} className="text-sm px-1 flex items-center gap-2">
              <span className={`rounded-lg bg-sky-500 w-2 h-2`}></span>
              {e.text}
            </span>
          ))}
        </ChildrenDetails>
      </div>
    </>
  );
}

export default GBtextInput;
