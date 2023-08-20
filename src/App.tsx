import { faker } from "@faker-js/faker";

const words = faker.word.words(10);

function App() {
  return (
    <div className="text-4xl text-center text-#f8f8f2">
     {words}
    </div>
  );
}

export default App;
