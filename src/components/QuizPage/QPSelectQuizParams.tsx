import { useGame } from "@/store/useOpenGameQuiz";
import type { TypeParamsTitleQuestion } from "@/types/quizParamsGame";
import Radio from "@/ui/input/Radio";
  

type Props = {
  arr: TypeParamsTitleQuestion;
  nameGroup: string;
};

function QPSelectQuizParams({ arr, nameGroup }: Props) {
  const game = useGame();

  return (
    <>
      <ul className="flex flex-col gap-3">
        {arr.map((e, index) => (
          <Radio
            key={index}
            mstyle={"green"}
            name={nameGroup}
            value={e.title}
            isCorrect={e.checked}
            checked={e.checked}
            onChange={() => game.setGame({ paramsQuestions: e.type })}
          >
            {e.title}
          </Radio>
        ))}
      </ul>
    </>
  );
}

export default QPSelectQuizParams;
