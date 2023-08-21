import { useCallback, useEffect, useState } from "react";


export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () =>{
    const [state, setState] = useState<State>("start");

    return {state};
}

export default useEngine;