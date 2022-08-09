import { useState } from "react";
import Blobs from "./components/Blobls";
import Questions from "./components/Questions";
import StartScreen from "./components/StartScreen";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      <Blobs />
      {!gameStarted ? (
        <StartScreen startQuiz={() => setGameStarted(true)} />
      ) : (
        <Questions />
      )}
    </div>
  );
};

export default App;
