import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountDownTimer from "./useCountDownTimer";
import useTypings from "./useTypings";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } =
    useCountDownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } =
    useTypings(state !== "finish");

  return { state, words, timeLeft };
};

export default useEngine;
