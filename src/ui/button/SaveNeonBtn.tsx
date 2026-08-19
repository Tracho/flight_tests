import { useGame } from "@/store/useOpenGameQuiz";
import NeonBtn from "./NeonBtn";
import SVGStar from "@/assets/icons/star.svg?react";
import SVGDelete from "@/assets/icons/delate.svg?react";
import {
  getProgressBar,
  updateProgressBar,
  useProgressBar,
} from "@/store/quizDataStore";
import type { QuizProgressBar } from "@/types/quizProgressStore";

type Props = {
  questionNumber: number;
  cate: string;
  quiz: string;
};
function SaveNeonBtn({ questionNumber, cate, quiz }: Props) {
  const progress = useProgressBar(cate, quiz);

  const checkedSave = progress?.q_saved?.includes(questionNumber) ?? false;

  const HandleSave = () => {
    updateProgressBar((progress) => {
      const currentQuiz = progress[cate]?.[quiz];

      if (!currentQuiz) {
        return {
          ...progress,
          [cate]: {
            ...(progress[cate] ?? {}),
            [quiz]: {
              passed: [],
              not_passed: [],
              q_saved: [questionNumber],
              timeMatch: [],
              timerMatch: [],
              numCorrectLenght: [],
              numErrorLenght: [],
              date: [],
            },
          },
        };
      }

      // Если уже сохранён — ничего не делаем
      if (currentQuiz.q_saved.includes(questionNumber)) {
        return progress;
      }

      return {
        ...progress,
        [cate]: {
          ...progress[cate],
          [quiz]: {
            ...currentQuiz,
            q_saved: [...currentQuiz.q_saved, questionNumber],
          },
        },
      };
    });
  };

  const HandleDelete = () => {
    updateProgressBar((progress) => {
      const currentQuiz = progress[cate]?.[quiz];

      if (!currentQuiz) {
        return progress;
      }

      return {
        ...progress,
        [cate]: {
          ...progress[cate],
          [quiz]: {
            ...currentQuiz,
            q_saved: currentQuiz.q_saved.filter((id) => id !== questionNumber),
          },
        },
      };
    });
  };
  return (
    <>
      {checkedSave == false ? (
        <NeonBtn
          title="Сохранить"
          className="px-2"
          color="amber"
          variant="outline"
          onClick={HandleSave}
        >
          <SVGStar width={22} />
        </NeonBtn>
      ) : (
        <NeonBtn
          title="Удалить сохранение"
          className="px-2"
          color="red"
          variant="outline"
          onClick={HandleDelete}
        >
          <SVGDelete width={22}></SVGDelete>
        </NeonBtn>
      )}
    </>
  );
}

export default SaveNeonBtn;
