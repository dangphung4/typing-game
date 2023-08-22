import { useCallback, useEffect, useState } from "react";
import { countErrors } from "../ultils/helpers"
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
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(
    state !== "finish"
  );

  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0,cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed,wordsReached));
  }, [typed, words, cursor])

  //change from start to run upon keystroke
  useEffect(()=>{
    
  }, [isStarting, startCountdown, cursor]);

  return { state, words, timeLeft, typed };
};

export default useEngine;
