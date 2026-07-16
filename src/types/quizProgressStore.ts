export type QuizProgress = {
    [cate: string]: {
        [quiz: string]: {
            passed: number[];
            failed: number[];
            saved: number[];
        };
    };
}