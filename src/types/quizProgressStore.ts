export type QuizProgress = {
  [cate: string]: {
    [quiz: string]: {
      storage_q_passed: number[];
      storage_q_not_passed: number[];
      storage_q_saved: number[];
    };
  };
};
