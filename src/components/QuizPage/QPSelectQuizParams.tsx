import type {
  QuizFormatParamType,
  QuizModeParamType,
  QuizParamType,
  TypeParamsTitleQuestion,
  TypeQuizFormatParamType,
  TypeQuizModeParamType,
} from "@/types/quizParamsGame";
import Radio from "@/ui/input/Radio";
import type { ReactNode } from "react";

type Props = {
  arr:
    | TypeParamsTitleQuestion
    | TypeQuizModeParamType
    | TypeQuizFormatParamType;
  nameGroup: string;
  onChange: (
    value: QuizParamType | QuizModeParamType | QuizFormatParamType,
  ) => void;
  children?: ReactNode; 
};

function QPSelectQuizParams({ arr, nameGroup, onChange, children }: Props) { 
  return (
    <>
    <div className="flex flex-col gap-3 sm:w-auto w-full">
      {children && <span className="text-lg">{children}</span>}
      <ul className="flex flex-col gap-3">
        {arr.map((e, index) => ( 
          <Radio
            key={index}
            mstyle="warning"
            name={nameGroup}
            value={`${e.title}`} 
            isCorrect={e.checked ? e.checked : undefined}
            checked={e.checked}
            disabled={"disabled" in e ? e.disabled : undefined}
            onChange={() => onChange(e.type)}
          >
            {e.title}
          </Radio>
        ))}
      </ul>
      </div>
    </>
  );
}

export default QPSelectQuizParams;
