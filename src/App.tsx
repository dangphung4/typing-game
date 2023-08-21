import { faker } from "@faker-js/faker";
import RestartButton from "./components/RestartButton";

const words = faker.word.words(10);

function App() {
  
  return (
  <>
  <CountdownTimer timeLeft={30}/>
  <GeneratedWords words={words} />
  <RestartButton className={"mx-auto mt-10 text-pink"}
  onRestart={() => null}/>
 
  </>
  )
}

const GeneratedWords = ({ words }: { words: string }) => {
  return <div className="text-4xl text-center text-light">{words}</div>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-purple font-medium">Time: {timeLeft}</h2>;
}; 

export default App;
