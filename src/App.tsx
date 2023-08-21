import { faker } from "@faker-js/faker";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/userEngine";


function App() {
  const { state, words } = useEngine();
  return (
  <>
  <CountdownTimer timeLeft={30}/>
  <WordsContainer>
    <GeneratedWords words={words}/>
    <UserTypings className="absolute inset-0" userInput={words}/>
  </WordsContainer>
  <RestartButton className={"mx-auto mt-10 text-pink"}
  onRestart={() => null}/>
  <Results
    className="mt-10"
    errors={10}
    accuracyPercentage={100}
    total={200}/>
  </>
  )
}

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
      {children}
    </div>
  );
};

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="text-light">{words}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-purple font-medium">Time: {timeLeft}</h2>;
}; 

export default App;
