import SVGRandom from "@/assets/icons/random.svg?react"
import SVGReader from "@/assets/icons/reader.svg?react"
import SVGOptions from "@/assets/icons/options.svg?react"
import QPSelectQuizParams from "@/components/QuizPage/QPSelectQuizParams";
import { hasQuiz } from "@/store/quizDataStore";
import { useGame } from "@/store/useOpenGameQuiz";
import { setSelectQuiz } from "@/store/useSettingParams";
import type {
  QuizFormatParamType,
  QuizModeParamType,
  QuizParamType,
  TypeParamsTitleQuestion,
  TypeQuizFormatParamType,
  TypeQuizModeParamType,
} from "@/types/quizParamsGame";
import type { QuizProgressBar } from "@/types/quizProgressStore";
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
  const paramsQuestions: TypeParamsTitleQuestion = [
    {
      title: "Все вопросы.",
      type: "all",
      checked: game.game.paramsQuestions == "all",
    },
    {
      title: "Работа над ошибками.",
      type: "errors",
      checked: game.game.paramsQuestions == "errors",
    },
    {
      title: "Сохраненные вопросы.",
      type: "saved",
      checked: game.game.paramsQuestions == "saved",
    },
  ];
  const paramsModGame: TypeQuizModeParamType = [
    {
      title: "По-порядку.",
      type: "standard",
      checked: game.game.mode == "standard",
    },
    {
      title: "Случайные",
      type: "random",
      checked: game.game.mode == "random",
    },
  ];
  const paramsFormatGame: TypeQuizFormatParamType = [
    {
      title: "Тесты.",
      type: "choice",
      checked: game.game.format == "choice",
    },
    {
      title: "По вводу.",
      type: "text",
      checked: game.game.format == "text",
    },
  ];
 
  return (
    <>
      <div className="flex justify-center">
        <div className="container px-4 py-10 flex justify-between gap-8 flex-col">
          <div className="flex flex-col gap-3">
            {game.game.started === false && (
              <>
                <h1 className="text-center text-3xl">Выбери стиль квиза.</h1>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                  <div className="flex flex-wrap justify-center gap-5">
                    <QPSelectQuizParams
                      arr={paramsFormatGame}
                      nameGroup={"paramsFormatGame"}
                      onChange={(value) =>
                        game.setGame({
                          format: value as QuizFormatParamType,
                        })
                      }
                    ><div className="flex gap-2"><SVGReader width={24} hanging={24}/><b>Формат</b></div></QPSelectQuizParams>
                    <QPSelectQuizParams
                      arr={paramsModGame}
                      nameGroup={"paramsModGame"}
                      onChange={(value) =>
                        game.setGame({
                          mode: value as QuizModeParamType,
                        })
                      }
                    ><div className="flex gap-2"><SVGRandom width={24} hanging={24}/><b>Сортировка</b></div></QPSelectQuizParams>
                    <QPSelectQuizParams
                      arr={paramsQuestions}
                      nameGroup={"paramsQuestions"}
                      onChange={(value) =>
                        game.setGame({
                          paramsQuestions: value as QuizParamType,
                        })
                      }
                    ><div className="flex gap-2"><SVGOptions width={24} hanging={24}/><b>Фильтр вопросов</b></div></QPSelectQuizParams>
                  </div>
                  <div className="flex items-center justify-center">
                    <NeonBtn
                      color="sky"
                      variant="solid"
                      className="text-lg"
                      onClick={() => {
                        game.resetGame();
                        game.startGame();
                      }}
                    >
                      Начать
                    </NeonBtn>
                  </div>
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
