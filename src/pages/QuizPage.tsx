import { quizActionsTest } from "@/store/useOpenQuiz";

function QuizPage() {
  let test = quizActionsTest.getSelectQuestion();
  return ( <>
  {test}
  </> );
}

export default QuizPage;