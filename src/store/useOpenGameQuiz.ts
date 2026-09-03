import { getTime, useSetTime } from "./useTimeTic";
// src/store/useQuizStore.ts
import { create } from "zustand";
import type { QuizCategory, QuizQuestion, CategoryQuiz } from "@/types/quiz";
import { useShallow } from "zustand/react/shallow";
import {
  getData,
  getProgressBar,
  setData,
  updateData,
  updateProgressBar,
} from "./quizDataStore";
import { getSelectQuiz } from "./useSettingParams";
import { persist } from "zustand/middleware";
import type {
  QuizFormatParamType,
  QuizModeParamType,
  QuizParamType,
} from "@/types/quizParamsGame";

type GameSettings = {
  mode: QuizModeParamType;
  paramsQuestions: QuizParamType;
  format: QuizFormatParamType;
  withTimer: boolean;
  started: boolean;
  finish: boolean;
  idQuestion: number;
  showAnswers: boolean;
  numError: number[]; // Изменено с [] на number[]
  numCorrect: number[]; // Изменено с [] на number[]
};

type SelectedAnswer = {
  text: string;
  select: boolean;
};

interface QuizState {
  data: QuizCategory[]; // Глобальная дата баззы
  game: GameSettings; // Игровая настройка. Когда должна начаться игра, закончится, показать ответы, время и тд
  foundQuestion: QuizQuestion | undefined; // Сохранение найденного вопроса
  foundQuestionIndex: number; // Сохранение найденного Index вопроса
  currentQuestions: CategoryQuiz | undefined; // Новое поле: вопросы для текущего раунда

  setGame: (value: Partial<GameSettings>) => void; // Изменение настройки игры, к примеру мод игры
  startGame: () => void; // Запустить игру
  stopGame: () => void; // Остановить игру
  resetGame: () => void; // Обновить все настройки игры
  getOpenDataCateQuiz: () => CategoryQuiz | undefined; // Достает категорию квиза
  useQuestionGeneration: () => void; // Достает категорию квиза
  getQuizQuestion: () => QuizQuestion; // Достает вопрос из квиза
  getIdQuestion: () => number; // Достает текущий индекс из ObjGame: GameSettings
  setQuestionByTitle: (val: string) => void; // Поиск вопроса по тайтлу, для рандом мода.
  setСhangeStatusAnswers: (val: boolean) => void; // Вручную изменить  showAnswers: false || true, в ObjGame: GameSettings чтобы скрыть вопросы или показать какой должен был быть ответ
  toggleShowAnswers: () => void; // Автоматично при вызове переписывает showAnswers: false || true, в ObjGame: GameSettings тем самим вопросы будут показывать как правильно и не правильно, или скрыть вопросы
  getShowAnswers: () => boolean; // Достает showAnswers: false || true, в ObjGame: GameSettings
  checkingAnswers: (answers: SelectedAnswer[]) => boolean | void; // Проверка ответов answers == question.options, вернут boolean
  nextQuestion: () => void; // часть навигации следующий вопрос
  previousQuestion: () => void; // часть навигации предыдущий вопрос
  addIdQuestProgress: (boolean: boolean) => void; //
  endGame: () => void;
}

const ObjGame: GameSettings = {
  mode: "standard",
  paramsQuestions: "all",
  format: "choice",
  withTimer: false,
  started: false,
  finish: false,
  idQuestion: 0,
  showAnswers: false,
  numError: [],
  numCorrect: [],
};

// Сам стор оставляем приватным (не экспортируем),
// чтобы наружу выходили только чистые атомарные инструменты
const shuffleArray = <T>(array: T[]): T[] => {
  const newArr = [...array]; // Создаем копию, чтобы не мутировать оригинал
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const useOpenQuiz = create<QuizState>()(
  persist(
    (set, get) => ({
      data: getData(),
      game: ObjGame,
      foundQuestion: undefined,
      foundQuestionIndex: 0,
      currentQuestions: undefined, // Изначально массив пустой

      // arrSelectedAnswer: [],

      setGame: (value) =>
        set((state) => ({
          game: {
            ...state.game,
            ...value,
          },
        })),

      startGame: () => {
        // 1. Сначала генерируем порядок вопросов
        useQuestionGeneration();
        // 2. Затем переводим игру в активный статус
        set((state) => ({
          game: {
            ...state.game,
            started: true,
          },
        }));
      },

      stopGame: () =>
        set((state) => ({
          game: {
            ...state.game,
            started: false,
          },
        })),

      resetGame: () => {
        set((state) => ({
          game: {
            ...state.game,
            withTimer: false,
            started: false,
            finish: false,
            idQuestion: 0,
            showAnswers: false,
            numError: [],
            numCorrect: [],
          },
        }));
      },

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

      getQuizQuestion: (): QuizQuestion => {
        // const quiz = get().getOpenDataCateQuiz();
        const quiz = get().currentQuestions;
        const index = get().game.idQuestion;

        return quiz?.json[index] || ({} as QuizQuestion);
      },

      setQuestionByTitle: (val: string): void => {
        // const quiz = get().getOpenDataCateQuiz();
        const quiz = get().currentQuestions;
        const questionsArray = quiz?.json || [];

        // 1. Находим ИНДЕКС (ID) вопроса в массиве
        const questionIndex = questionsArray.findIndex(
          (item) =>
            item.title.trim().toLowerCase() === val.trim().toLowerCase(),
        );

        // 2. Выводим ID в логи
        if (questionIndex !== -1) {
          console.log(`Вопрос найден! ID (индекс) вопроса: ${questionIndex}`);
        } else {
          console.warn(`Вопрос с заголовком "${val}" не найден в базе данных.`);
        }

        // 3. Достаем сам вопрос по найденному индексу (если индекс валидный)
        const question =
          questionIndex !== -1 ? questionsArray[questionIndex] : undefined;

        // 4. Сохраняем в состояние стора
        set({ foundQuestion: question, foundQuestionIndex: questionIndex });
      },

      getOpenDataCateQuiz: (): CategoryQuiz | undefined => {
        const { cate, quiz } = getSelectQuiz();
        return get()
          .data.find((cat) => cat.category === cate)
          ?.arr.find((qui) => qui.title === quiz);
      },

      useQuestionGeneration: () => {
        const { cate, quiz } = getSelectQuiz();

        // 1. Ищем оригинальный квиз в базе данных
        const originalQuiz = get()
          .data.find((cat) => cat.category === cate)
          ?.arr.find((quizz) => quizz.title === quiz);

        if (!originalQuiz) {
          set({ currentQuestions: undefined });
          return;
        }

        // Создаем рабочий массив вопросов, который будем фильтровать
        let workingQuestions = [...originalQuiz.json];
        const storageData = getProgressBar({ cate, quiz });
        // Применяем фильтрацию в зависимости от paramsQuestions
        if (get().game.paramsQuestions === "errors") {
          const SetNot_Passed = new Set(storageData?.not_passed || []);

          // Фильтруем массив, оставляя только те вопросы, чьи индексы есть в ошибках
          workingQuestions = workingQuestions.filter((_, index) =>
            SetNot_Passed.has(index),
          );
        } else if (get().game.paramsQuestions === "saved") {
          const SetQ_saved = new Set(storageData?.q_saved || []);

          // Фильтруем массив, оставляя только сохраненные индексы
          workingQuestions = workingQuestions.filter((_, index) =>
            SetQ_saved.has(index),
          );
        }

        // 2. Перемешиваем или копируем уже отфильтрованный рабочий массив вопросов
        const finalQuestionsJson =
          get().game.mode === "random"
            ? shuffleArray(workingQuestions)
            : workingQuestions; // workingQuestions — это уже новая копия, спред [...копия] не нужен

        // 3. Сохраняем итоговую структуру в стейт
        set({
          currentQuestions: {
            ...originalQuiz,
            json: finalQuestionsJson,
          },
        });
      },

      checkingAnswers: (answers: SelectedAnswer[]) => {
        get().toggleShowAnswers();
        const question =
          get().game.mode === "standard"
            ? get().getQuizQuestion()
            : get().foundQuestion;
        const currentId =
          get().game.mode === "standard"
            ? get().game.idQuestion // Используем get().game.idQuestion для получение индекса
            : get().foundQuestionIndex; // Используем foundQuestionIndex для получение индекса
        if (!question?.options) {
          return;
        }
        const correctAnswers = question.options
          .filter((item) => item.isCorrect)
          .map((item) => item.text)
          .sort();

        const selectedAnswers = answers
          .filter((item) => item.select)
          .map((item) => item.text)
          .sort();

        const isCorrect =
          correctAnswers.length === selectedAnswers.length &&
          correctAnswers.every(
            (answer, index) => answer === selectedAnswers[index],
          );

        const currentGame = get().game;

        // Из-за Partial<GameSettings> и strict-режима TS делаем явное приведение к массиву или дефолтное значение
        let nextCorrect = (currentGame.numCorrect || []).filter(
          (id) => id !== currentId,
        );
        let nextError = (currentGame.numError || []).filter(
          (id) => id !== currentId,
        );

        if (isCorrect) {
          nextCorrect.push(currentId);
        } else {
          nextError.push(currentId);
        }

        // Теперь setGame примет этот объект без ошибок компиляции!
        get().setGame({
          numCorrect: nextCorrect,
          numError: nextError,
        });

        return isCorrect;
      },

      nextQuestion: () => {
        // const max_index = get().getOpenDataCateQuiz()?.json.length ?? 0;
        const max_index = get().currentQuestions?.json.length ?? 0;
        const this_index = get().getIdQuestion();
        const next_index =
          this_index + 1 < max_index ? this_index + 1 : this_index;

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
        const { cate, quiz } = getSelectQuiz();
        // const questionId = get().game.idQuestion; // Используем get().game.idQuestion для получение индекса
        const questionId =
          get().game.mode === "standard"
            ? get().game.idQuestion // Используем get().game.idQuestion для получение индекса
            : get().foundQuestionIndex; // Используем foundQuestionIndex для получение индекса
        updateProgressBar((progress) => {
          const newProgress = structuredClone(progress);
 
          // создаем структуру если ее нет
          if (!newProgress[cate]) {
            newProgress[cate] = {};
          }

          if (!newProgress[cate][quiz]) {
            newProgress[cate][quiz] = {
              passed: [],
              not_passed: [],
              q_saved: [],
              timeMatch: [],
              timerMatch: [],
              numCorrectLenght: [],
              numErrorLenght: [],
              date: [],
            };
          }

          const current = newProgress[cate][quiz];

          let passed = [...current.passed];
          let notPassed = [...current.not_passed];

          if (isCorrect) {
            const count = notPassed.filter((id) => id === questionId).length;
            console.warn("пагинация-",questionId)
            console.warn("длина-",notPassed.filter((id) => id === questionId).length)
            console.warn(notPassed)
             if (count > 1) {
              const index = notPassed.indexOf(questionId);
              notPassed.splice(index, 1);
            } else if (count === 1) {
              notPassed = notPassed.filter((id) => id !== questionId);

              if (!passed.includes(questionId)) {
                passed.push(questionId);
              }
            } else {
              if (!passed.includes(questionId)) {
                passed.push(questionId);
              }
            }
          } else {
            const count = notPassed.filter((id) => id === questionId).length;

            if (count < 5) {
              notPassed.push(questionId);
            }

            passed = passed.filter((id) => id !== questionId);
          }
      
          current.passed = passed;
          current.not_passed = notPassed;

          console.group(`%c${cate} / ${quiz}`, "color:cyan;font-weight:bold");
          console.log("Passed:", passed);
          console.log("Not passed:", notPassed);
          console.groupEnd();

          return newProgress;
        });
      },

      endGame: () => {
        // const maxLenghtQuiz = get().getOpenDataCateQuiz()?.json.length;
        const maxLenghtQuiz = get().currentQuestions?.json.length;
        // +1 нужен, так как idQuestion начинается с 0
        const currentId =
          get().game.mode === "standard"
            ? get().game.idQuestion // Используем get().game.idQuestion для получение индекса
            : get().foundQuestionIndex; // Используем foundQuestionIndex для получение индекса
        const thisNumberQuiz = currentId+ 1;

        if (maxLenghtQuiz && thisNumberQuiz === maxLenghtQuiz) {
          const { cate, quiz } = getSelectQuiz();

          updateProgressBar((progress) => {
            const currentQuiz = progress[cate]?.[quiz];
            if (!currentQuiz) {
              return progress; // Если квиз не найден, возвращаем стейт без изменений
            }

            // 1. Исправили форматирование времени (убрали лишний пробел)
            const hours = String(getTime().TimeHours).padStart(2, "0");
            const minutes = String(getTime().timeMinutes).padStart(2, "0");
            const seconds = String(getTime().timeSeconds).padStart(2, "0");
            const RoundTime = `${hours}:${minutes}:${seconds}`;

            // 2. Безопасно достаем старые массивы с подстраховкой || [], чтобы TS не ругался
            const OldTimeMatch = currentQuiz.timeMatch || [];
            const OldTimerMatch = currentQuiz.timerMatch || [];
            const OldNumCorrectLenght = currentQuiz.numCorrectLenght || [];
            const OldNumErrorLenght = currentQuiz.numErrorLenght || [];
            const OldDate = currentQuiz.date || [];

            // Получаем текущие результаты раунда
            const RoundCorrectLenght = get().game.numCorrect.length;
            const RoundErrorLenght = get().game.numError.length;

            const now = new Date();
            const RoundDate = now.toLocaleDateString("ru-RU");

            // 3. Создаем новые массивы, добавляя новые значения в конец
            const nextTimeMatch = [...OldTimeMatch, RoundTime];
            const nextTimerMatch = [...OldTimerMatch]; // если здесь будет новое значение времени, добавьте его сюда
            const nextNumCorrect = [...OldNumCorrectLenght, RoundCorrectLenght];
            const nextNumError = [...OldNumErrorLenght, RoundErrorLenght];
            const nextDate = [...OldDate, RoundDate];

            // 4. Возвращаем полностью обновленный объект, ограничивая массивы до 10 элементов
            return {
              ...progress,
              [cate]: {
                ...progress[cate],
                [quiz]: {
                  ...currentQuiz,
                  // .slice(-10) оставляет только последние 10 элементов
                  timeMatch: nextTimeMatch.slice(-10),
                  timerMatch: nextTimerMatch.slice(-10),
                  numCorrectLenght: nextNumCorrect.slice(-10),
                  numErrorLenght: nextNumError.slice(-10),
                  date: nextDate.slice(-10),
                },
              },
            };
          });

          // Финишируем игру
          get().setGame({
            finish: true,
          });
        }
      },
    }),
    {
      name: "GameParamsOpenQui",
      partialize: (state: QuizState) => ({
        game: state.game,
      }),
    },
  ),
);

// 1. ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ (Будет вызывать перерендер компонента при изменении)

export const useQuizData = () => useOpenQuiz((state) => state.data);
export const useGame = () =>
  useOpenQuiz(
    useShallow((state) => ({
      game: state.game,
      setGame: state.setGame,
      startGame: state.startGame,
      stopGame: state.stopGame,
      resetGame: state.resetGame,
      endGame: state.endGame,
      getIdQuestion: state.getIdQuestion,
      getQuizQuestion: state.getQuizQuestion,
      setQuestionByTitle: state.setQuestionByTitle,
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
  getOpenDataCateQuiz: () => useOpenQuiz.getState().getOpenDataCateQuiz(),
  getCurrentQuestions: () => useOpenQuiz.getState().currentQuestions,
  getFoundQuestionIndex: () => useOpenQuiz.getState().foundQuestionIndex,
};
function useQuestionGeneration() {
  useOpenQuiz.getState().useQuestionGeneration();
}
 