import { useGame } from "@/store/useOpenGameQuiz";
import NeonBtn from "@/ui/button/NeonBtn";
import GameBoard from "@/ui/game/board/GameBoard";

// const game = useGame();

// game.setGame({
//   mode: "random",
// });

// game.setGame({
//   withTimer: true,
// });

// game.startGame();
function QuizPage() {
  const game = useGame();
  console.log(game.game.started)
  return (
    <>
      <div className="flex justify-center">
        <div className="container px-4 py-10 flex justify-between gap-8 flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-3xl">Выбери стиль квиза.</h1>
            <div className="w-full flex justify-center items-center gap-2">
              <NeonBtn
                color="sky"
                variant="solid"
                className="text-lg"
                onClick={() => {
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
                  game.setGame({ mode: "random" });
                  game.startGame();
                }}
              >
                Случайные
              </NeonBtn>
            </div>

            <div>
              <GameBoard></GameBoard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
