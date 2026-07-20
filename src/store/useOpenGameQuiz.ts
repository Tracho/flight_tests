// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory, QuizQuestion, CategoryQuiz } from "@/types/quiz";
import { useShallow } from "zustand/react/shallow";
import { quizData } from "@/data/quizData";
import { getData, updateData } from "./quizDataStore";

type SelectQuestion = {
  cate: string;
  quiz: string;
};
type GameSettings = {
  mode: "standard" | "random" | "";
  withTimer: boolean;
  started: boolean;
  idQuestion: number;
  showAnswers: boolean;
};
type SelectedAnswer = {
  text: string;
  select: boolean;
};

interface QuizState {
  data: QuizCategory[]; // Глобальная дата баззы

  selectQuestion: SelectQuestion; // определение категории и квиза при клике и URL Parameters
  game: GameSettings; // Игровая настройка. Когда должна начаться игра, закончится, показать ответы, время и тд

  setSelectCateQuizQuestion: (val: SelectQuestion) => void; // выбор на странице категорий. Выбран, категория квиза

  setGame: (value: Partial<GameSettings>) => void; // Изменение настройки игры, к примеру мод игры
  startGame: () => void; // Запустить игру
  stopGame: () => void; // Остановить игру
  resetGame: () => void; // Обновить все настройки игры
  getOpenDataCateQuiz: () => CategoryQuiz | undefined; // Достает категорию квиза
  getQuizQuestion: () => QuizQuestion; // Достает вопрос из квиза
  getIdQuestion: () => number; // Достает текущий индекс из ObjGame: GameSettings
  setСhangeStatusAnswers: (val: boolean) => void; // Вручную изменить  showAnswers: false || true, в ObjGame: GameSettings чтобы скрыть вопросы или показать какой должен был быть ответ
  toggleShowAnswers: () => void; // Автоматично при вызове переписывает showAnswers: false || true, в ObjGame: GameSettings тем самим вопросы будут показывать как правильно и не правильно, или скрыть вопросы
  getShowAnswers: () => boolean; // Достает showAnswers: false || true, в ObjGame: GameSettings
  checkingAnswers: (answers: SelectedAnswer[]) => boolean; // Проверка ответов answers == question.options, вернут boolean
  nextQuestion: () => void; // часть навигации следующий вопрос
  previousQuestion: () => void; // часть навигации предыдущий вопрос
  addIdQuestProgress: (boolean: boolean) => void; //
}

const ObjGame: GameSettings = {
  mode: "",
  withTimer: false,
  started: false,
  idQuestion: 0,
  showAnswers: false,
};
// Сам стор оставляем приватным (не экспортируем),
// чтобы наружу выходили только чистые атомарные инструменты
const useOpenQuiz = create<QuizState>((set, get) => ({
  data: getData(),

  selectQuestion: {
    cate: "",
    quiz: "",
  },

  game: ObjGame,

  // arrSelectedAnswer: [],

  setGame: (value) =>
    set((state) => ({
      game: {
        ...state.game,
        ...value,
      },
    })),

  startGame: () =>
    set((state) => ({
      game: {
        ...state.game,
        started: true,
      },
    })),

  stopGame: () =>
    set((state) => ({
      game: {
        ...state.game,
        started: false,
      },
    })),

  resetGame: () =>
    set({
      game: ObjGame,
    }),

  getIdQuestion: (): number => {
    return get().game.idQuestion;
  },

  setСhangeStatusAnswers: (val) => {
    set((state) => ({
      game: {
        ...state.game,
        showAnswers: val,
      },
    }));
  },
  toggleShowAnswers: () =>
    set((state) => ({
      game: {
        ...state.game,
        showAnswers: !state.game.showAnswers,
      },
    })),
  getShowAnswers: () => get().game.showAnswers,

  setSelectCateQuizQuestion: (val) =>
    set({
      selectQuestion: val,
    }),

  getQuizQuestion: (): QuizQuestion => {
    const quiz = get().getOpenDataCateQuiz();
    const index = get().game.idQuestion;
    return quiz?.json[index] || ({} as QuizQuestion);
  },

  getOpenDataCateQuiz: (): CategoryQuiz | undefined => {
    const select = get().selectQuestion;
    return get()
      .data.find((cat) => cat.category === select.cate)
      ?.arr.find((quiz) => quiz.title === select.quiz);
  },

  checkingAnswers: (answers: SelectedAnswer[]) => {
    get().toggleShowAnswers();

    const question = get().getQuizQuestion();

    // правильные ответы из базы
    const correctAnswers = question.options
      .filter((item) => item.isCorrect)
      .map((item) => item.text)
      .sort();

    // ответы пользователя
    const selectedAnswers = answers
      .filter((item) => item.select)
      .map((item) => item.text)
      .sort();

    const isCorrect =
      correctAnswers.length === selectedAnswers.length &&
      correctAnswers.every(
        (answer, index) => answer === selectedAnswers[index],
      );

    return isCorrect;
  },

  nextQuestion: () => {
    const max_index = get().getOpenDataCateQuiz()?.json.length ?? 0;
    const this_index = get().getIdQuestion();
    const next_index = this_index + 1 < max_index ? this_index + 1 : this_index;

    set((state) => ({
      game: {
        ...state.game,
        idQuestion: next_index,
      },
    }));
  },

  previousQuestion: () => {
    const this_index = get().getIdQuestion();
    const prev_index = this_index > 0 ? this_index - 1 : 0;

    set((state) => ({
      game: {
        ...state.game,
        idQuestion: prev_index,
      },
    }));
  },

  addIdQuestProgress: (isCorrect) => {
    const { cate, quiz } = get().selectQuestion;
    const questionId = get().game.idQuestion;

    console.group(
      `%cQuestion #${questionId} | ${isCorrect ? "✅ CORRECT" : "❌ WRONG"}`,
      `color:${isCorrect ? "limegreen" : "red"};font-weight:bold`,
    );

    console.log("Category:", cate);
    console.log("Quiz:", quiz);

    updateData((data) =>
      data.map((category) => {
        if (category.category !== cate) return category;

        return {
          ...category,

          arr: category.arr.map((test) => {
            if (test.title !== quiz) return test;

            let passed = [...test.storage_q_passed];
            let notPassed = [...test.storage_q_not_passed];

            console.log("---------------");
            console.log("Before");
            console.log("Passed:", passed);
            console.log("Not Passed:", notPassed);

            if (isCorrect) {
              const count = notPassed.filter((id) => id === questionId).length;

              console.log("Errors count:", count);

              if (count > 1) {
                const index = notPassed.indexOf(questionId);
                notPassed.splice(index, 1);

                console.log(
                  "➡ Убрали одну ошибку. Осталось:",
                  notPassed.filter((i) => i === questionId).length,
                );
              } else if (count === 1) {
                notPassed = notPassed.filter((id) => id !== questionId);

                if (!passed.includes(questionId)) {
                  passed.push(questionId);
                }

                console.log(
                  "➡ Последняя ошибка исправлена. Вопрос перенесён в Passed.",
                );
              } else {
                if (!passed.includes(questionId)) {
                  passed.push(questionId);
                }

                console.log("➡ Ошибок не было. Добавили сразу в Passed.");
              }
            } else {
              const count = notPassed.filter((id) => id === questionId).length;

              console.log("Errors count:", count);

              if (count < 3) {
                notPassed.push(questionId);

                console.log(`➡ Добавили ошибку (${count + 1}/3)`);
              } else {
                console.log("➡ Уже 3 ошибки. Больше не добавляем.");
              }

              if (passed.includes(questionId)) {
                passed = passed.filter((id) => id !== questionId);

                console.log("➡ Убрали вопрос из Passed.");
              }
            }

            console.log("After");
            console.log("Passed:", passed);
            console.log("Not Passed:", notPassed);

            return {
              ...test,
              storage_q_passed: passed,
              storage_q_not_passed: notPassed,
            };
          }),
        };
      }),
    );

    console.groupEnd();
  },
}));

// 1. ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ (Будет вызывать перерендер компонента при изменении)
export const useSelectQuestion = () =>
  useOpenQuiz((state) => state.selectQuestion);
export const useQuizData = () => useOpenQuiz((state) => state.data);
export const useGame = () =>
  useOpenQuiz(
    useShallow((state) => ({
      game: state.game,
      setGame: state.setGame,
      startGame: state.startGame,
      stopGame: state.stopGame,
      resetGame: state.resetGame,
      getIdQuestion: state.getIdQuestion,
      getQuizQuestion: state.getQuizQuestion,
      setСhangeStatusAnswers: state.setСhangeStatusAnswers,
      toggleShowAnswers: state.toggleShowAnswers,
      getShowAnswers: state.getShowAnswers,
      checkingAnswers: state.checkingAnswers,
      nextQuestion: state.nextQuestion,
      previousQuestion: state.previousQuestion,
      addIdQuestProgress: state.addIdQuestProgress,
    })),
  );

// 2. ОБЪЕКТ ДЛЯ ИЗМЕНЕНИЯ И ЧТЕНИЯ ВНЕ РЕНДЕРА (НЕ вызывает перерендер при вызове)
export const quizActionsTest = {
  setSelectCateQuizQuestion: (val: SelectQuestion) =>
    useOpenQuiz.getState().setSelectCateQuizQuestion(val),

  getSelectQuestion: () => useOpenQuiz.getState().selectQuestion,
  getOpenDataCateQuiz: () => useOpenQuiz.getState().getOpenDataCateQuiz(),
};
