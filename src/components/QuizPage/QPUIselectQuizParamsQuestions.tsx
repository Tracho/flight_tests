import Radio from "@/ui/input/Radio";

function QPUIselectQuizParamsQuestions() {
  return (
    <>
      <ul className="flex flex-col gap-3">
        <Radio name="quizParamsQuestion" value={"Все вопросы"}>
          Все вопросы
        </Radio>
        <Radio name="quizParamsQuestion" value={"Работа над ошибками"}>
          Работа над ошибками
        </Radio>
        <Radio name="quizParamsQuestion" value={"Сохраненные вопросы"}>
          Все вопросы
        </Radio>
      </ul>
    </>
  );
}

export default QPUIselectQuizParamsQuestions;
