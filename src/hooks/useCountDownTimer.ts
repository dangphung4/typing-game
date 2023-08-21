import { useCallback, useEffect, useRef, useState } from "react";

const useCountDownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const hasTimerEnded = timeLeft <= 0;
  const isRunning = intervalRef.current != null;

  const startCountdown = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  }, [setTimeLeft]);

  const resetCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeLeft(seconds);
  }, [seconds]);
  useEffect(() => {

    if(!timeLeft && intervalRef.current){
        clearInterval(intervalRef.current);
    }
  }, [timeLeft,intervalRef]);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountDownTimer;
