import { useCallback, useEffect, useState } from "react";
import { countErrors } from "../ultils/helpers";
import useWords from "./useWords";
import useCountDownTimer from "./useCountDownTimer";
import useTypings from "./useTypings";
import { clear } from "@testing-library/user-event/dist/clear";

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

  //regenerate screen and words once all words are filled up
  useEffect(() => {
    if (areWordsFinished) {
      console.log("Words are finished!");
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

  const restart = useCallback(() =>{
    console.log("Restarting!");;
    resetCountdown;
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();

  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped])

  return { state, words, timeLeft, typed };
};

export default useEngine;
