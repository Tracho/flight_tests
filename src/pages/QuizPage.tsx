import QPSelectQuizParams from "@/components/QuizPage/QPSelectQuizParams";
import { hasQuiz } from "@/store/quizDataStore";
import { useGame } from "@/store/useOpenGameQuiz";
import { setSelectQuiz } from "@/store/useSettingParams";
import type { TypeParamsTitleQuestion } from "@/types/quizParamsGame";
import NeonBtn from "@/ui/button/NeonBtn";
import BgContainer from "@/ui/container/BgContainer";
import GameBoard from "@/ui/game/board/GameBoard";
import Radio from "@/ui/input/Radio";
import QuizGameOverBoard from "@/ui/list/QuizDashboard/QuizGameOverBoard";
import RoundStatsBoard from "@/ui/list/QuizDashboard/RoundStatsBoard";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// const game = useGame();

// game.setGame({
//   mode: "random",
// });

// game.setGame({
//   withTimer: true,
// });

// game.startGame();
function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cate = searchParams.get("cate") ?? "";
  const title = searchParams.get("title") ?? "";

  useEffect(() => {
    if (hasQuiz(cate, title) == true) {
      game.setGame({ started: false });
      setSelectQuiz({
        cate: cate,
        quiz: title,
      });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  const game = useGame();
  const TypeParamsQuestions = game.game.paramsQuestions;
  console.log(TypeParamsQuestions)
  const paramsQuestions:TypeParamsTitleQuestion = [
    {
      title:"Все вопросы.",
      type:"all",
      checked:TypeParamsQuestions == "all",
    },
    {
      title:"Работа над ошибками.",
      type:"errors",
      checked:TypeParamsQuestions == "errors",
    },
    {
      title:"Сохраненные вопросы.",
      type:"saved",
      checked:TypeParamsQuestions == "saved",
    }
  ]
  const paramsModGame:TypeParamsTitleQuestion = [
    {
      title:"По-порядку.",
      type:"all",
      checked:TypeParamsQuestions == "all",
    },
    {
      title:"Случайные",
      type:"errors",
      checked:TypeParamsQuestions == "errors",
    }
  ]
  return (
    <>
      <div className="flex justify-center">
        <div className="container px-4 py-10 flex justify-between gap-8 flex-col">
          <div className="flex flex-col gap-3">
            {game.game.started === false && (
              <>
                <h1 className="text-center text-3xl">Выбери стиль квиза.</h1>
                <div className="w-full flex justify-center items-center gap-2">
                  <NeonBtn
                    color="sky"
                    variant="solid"
                    className="text-lg"
                    onClick={() => {
                      game.resetGame();
                      game.setGame({ mode: "standard" });
                      game.startGame();
                    }}
                  >
                    По-порядку
                  </NeonBtn>
                  <NeonBtn
                    color="sky"
                    variant="solid"
                    className="text-lg"
                    onClick={() => {
                      game.resetGame();
                      game.setGame({ mode: "random" });
                      game.startGame();
                    }}
                  >
                    Случайные
                  </NeonBtn>

                  <QPSelectQuizParams arr={paramsQuestions} nameGroup={"quizParamsQuestion"} />
                </div>
              </>
            )}
            {game.game.started === true && game.game.finish == false && (
              <div>
                <GameBoard></GameBoard>
              </div>
            )}
            {game.game.started === true && game.game.finish === true && (
              <>
                <div>geme over</div>
                <BgContainer myClass="flex flex-col gap-5 justify-between">
                  <RoundStatsBoard />
                  <QuizGameOverBoard />
                </BgContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
