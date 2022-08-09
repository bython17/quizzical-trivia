const Question = ({ question, alternatives, isAnswerShown }) => {
  return (
    <div className="question--container">
      <h2
        className="question--question_text"
        dangerouslySetInnerHTML={{ __html: question }}
      ></h2>
      <div className="question--alternative_container">
        {alternatives.map(({ select, value, isAnswer, isSelected }, index) => (
          <button
            key={index}
            onClick={select}
            className={`question--alternative ${isSelected ? "selected" : ""} ${
              isAnswerShown && isAnswer ? "correct" : ""
            } ${isAnswerShown && !isAnswer ? "wrong" : ""}`}
            dangerouslySetInnerHTML={{ __html: value }}
          ></button>
        ))}
      </div>
      <div className="question--separator"></div>
    </div>
  );
};

export default Question;
