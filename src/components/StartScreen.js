const StartScreen = ({ startQuiz }) => {
  return (
    <div className="start_screen--wrapper">
      <div className="start_screen--container">
        <h2> Quizzical </h2>
        <p> Random Trivial Quizes for Free! </p>
        <button onClick={startQuiz}> Start Quiz </button>
      </div>
    </div>
  );
};

export default StartScreen;
