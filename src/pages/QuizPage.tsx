import { hasQuiz } from "@/store/quizDataStore";
import { useGame } from "@/store/useOpenGameQuiz";
import { setSelectQuiz } from "@/store/useSettingParams";
import NeonBtn from "@/ui/button/NeonBtn";
import BgContainer from "@/ui/container/BgContainer";
import GameBoard from "@/ui/game/board/GameBoard";
import QuizGameOverBoard from "@/ui/list/QuizDashboard/QuizGameOverBoard";
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

  console.log(cate); // "Testing"
  console.log(title); // "My Data base Dev Testing"

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
                <BgContainer>
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
