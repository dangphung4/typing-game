import { useCallback, useEffect, useState } from "react";
import { countErrors } from "../ultils/helpers";
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
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  //regenerate screen and words once all words are filled up
  useEffect(() => {
    if (areWordsFinished) {
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    clearTyped,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

  //change from start to run upon keystroke
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  // finish when time is up
  useEffect(() => {
    if (!timeLeft) {
      console.log("Time!");
      setState("finish");
    }
  }, [timeLeft, sumErrors]);


  const restart = useCallback(() =>{
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();

  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped])

  return { state, words, timeLeft, typed, errors, totalTyped, restart};
};

export default useEngine;
