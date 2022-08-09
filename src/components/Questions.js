import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Loading from "./Loading";
import Question from "./Question";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  useEffect(() => {
    if (!isAnswerShown) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((questionData) => {
          const fixedQuestions = fixQuestions(questionData.results);
          setQuestions(fixedQuestions);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnswerShown]);

  useEffect(() => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((questionObj) => ({
        ...questionObj,
        isAnswerShown: isAnswerShown,
      }))
    );
  }, [isAnswerShown]);

  const fixQuestions = (questionsArray) => {
    return questionsArray.map((questionObject) => {
      const questionId = nanoid();
      // changing the incorrect answers to be objects
      const alternativeObjects = questionObject.incorrect_answers.map(
        (alternative_text) => {
          const alternativeId = nanoid();
          return {
            id: alternativeId,
            value: alternative_text,
            isSelected: false,
            isAnswer: false,
            select: () => selectAnswer(questionId, alternativeId),
          };
        }
      );

      // inserting the correct answer to the wrong alernatives
      const array_length = alternativeObjects.length;
      const randomInsertIndex = Math.floor(Math.random() * array_length);
      const correctAnswerId = nanoid();
      alternativeObjects.splice(randomInsertIndex, 0, {
        id: correctAnswerId,
        value: questionObject.correct_answer,
        isSelected: false,
        isAnswer: true,
        select: () => selectAnswer(questionId, correctAnswerId),
      });

      return {
        id: questionId,
        isAnswerShown: isAnswerShown,
        isCorrect: checkIfQuestionIsAnswered(alternativeObjects),
        question: questionObject.question,
        alternatives: alternativeObjects,
      };
    });
  };

  const checkIfQuestionIsAnswered = (alternatives) => {
    console.log(alternatives, "its the sucker");
    return alternatives.some(
      ({ isAnswer, isSelected }) => isAnswer && isSelected
    );
  };

  const selectAnswer = (questionId, alternativeId) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((questionObj) => {
        if (questionObj.id === questionId) {
          const updatedAlternatives = questionObj.alternatives.map(
            (alternativeObj) =>
              alternativeObj.id === alternativeId
                ? { ...alternativeObj, isSelected: true }
                : { ...alternativeObj, isSelected: false }
          );
          return {
            ...questionObj,
            alternatives: updatedAlternatives,
            isCorrect: checkIfQuestionIsAnswered(updatedAlternatives),
          };
        }
        return questionObj;
      });
    });
  };

  const checkIfNothingIsSelected = () => {
    return !questions.every((questionObj) => {
      const somethingIsSelected = questionObj.alternatives.some(
        (alternative) => alternative.isSelected === true
      );
      return somethingIsSelected;
    });
  };

  const getCorrectlyAnsweredQuestions = () => {
    const correctlyAnsweredQuestons = questions.filter(
      ({ isCorrect }) => isCorrect
    );
    return correctlyAnsweredQuestons.length;
  };

  const playAgain = () => {
    setIsAnswerShown(false);
    setQuestions([]);
  };

  return (
    <div className="questions--wrapper">
      <div className="questions--container">
        {questions.length !== 0 ? (
          questions.map((data) => {
            return (
              <Question
                key={data.id}
                isAnswerShown={data.isAnswerShown}
                question={data.question}
                alternatives={data.alternatives}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <div className="questions--footer_container">
        {isAnswerShown && (
          <h2 className="questions--results">
            You Scored {getCorrectlyAnsweredQuestions()}/{questions.length}{" "}
            correct answers
          </h2>
        )}
        {questions.length !== 0 && (
          <button
            onClick={isAnswerShown ? playAgain : () => setIsAnswerShown(true)}
            disabled={!isAnswerShown ? checkIfNothingIsSelected() : false}
            className="questions--check_answer"
          >
            {isAnswerShown ? "Play again" : "Check answers"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
