import { useGame } from "@/store/useOpenGameQuiz";
import Radio from "@/ui/input/Radio";

type QuizParamType = "all" | "saved" | "errors";

type arr = {
  title: string;
  type: QuizParamType;
  checked: boolean;
}[];

type Props = {
  arr: arr;
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
