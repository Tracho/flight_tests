import { useState, type ReactNode } from "react";
import Modal from "./Modal";
import NeonBtn from "../button/NeonBtn";
import { memo } from "react";
import { quizOpenWindow } from "@/store/useOpenWindowTestStore";
import Radio from "../input/Radio";
import Checkbox from "../input/Checkbox";
import InfoCorrect from "../list/Info/InfoCorrect";
import Info from "../list/Info/Info";
import InfoHelp from "../list/Info/infoHelp";
import SVGStar from "@/assets/icons/star.svg?react";
import SVGDelete from "@/assets/icons/delate.svg?react";
import Pagination from "../pagination/Pagination";

type Props = {
  cateName: string;
  testName: string;
  pages: number[];
  startIndex?: number;
  children: ReactNode;
  NeonBtnColor?:"green" | "sky" | "amber" | "red" | "gray";
};
function ContainerCateModal({
  children,
  cateName,
  testName,
  startIndex,
  pages,
  NeonBtnColor,
}: Props) {
  const [window, setWindow] = useState(false);
  const [page, setPage] = useState(startIndex ?? 0);
  const questionNumber = pages[page];
  // const total = quizOpenWindow.getQuestionsCount(cateName, testName);
  const total = pages.length;
  // QuizQuestion
const db = quizOpenWindow.getQuestion(
    cateName,
    testName,
    questionNumber
);
  let statusCount = db?.options.reduce(
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
  return (
    <>
      <NeonBtn
        className="text-xs"
        color={NeonBtnColor}
        variant="solid"
        onClick={() => setWindow(true)}
      >
        {children}
      </NeonBtn>
      <Modal
        childrenClass="px-0"
        open={window}
        onClose={() => setWindow(false)}
        title={testName}
      >
        <div className="px-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <b className="bg-sky-600 px-2 py-1 rounded">Вопрос №{questionNumber +1}</b>
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
          <ul className="flex flex-col gap-3">
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
          <InfoCorrect header="Правильный ответ">
            {db?.correctAnswer}
          </InfoCorrect>
          {db?.info && <Info header="Полезная информация">{db?.info}</Info>}
          {db?.infoHelp && (
            <InfoHelp header="Дополнительная информация">
              {db?.infoHelp}
            </InfoHelp>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-violet-800 px-6 pt-6">
          <Pagination page={page} total={total} onChange={setPage} />
        </div>
      </Modal>
    </>
  );
}

export default memo(ContainerCateModal);
