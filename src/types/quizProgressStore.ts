export type QuizProgressBar = {
  [cate: string]: {
    [quiz: string]: QuizProgressBarKey;
  };
};
export type QuizProgressBarKey = {
  passed: number[];
  not_passed: number[];
  q_saved: number[];
  timeMatch: string[];
  timerMatch: string[];
  numCorrectLenght:number[];
  numErrorLenght:number[];
  date: string[];
};
