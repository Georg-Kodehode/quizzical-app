import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import Alternatives from "./Alternatives";
import { shuffle } from "../utilities";

export default function Questions(props) {
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState({});
  const [checkAnswers, setCheckAnswers] = useState(false);

  /**
   * Fetches five questions from the OTDB API, each question-object's question-string is
   * then decoded to make the questions readable.
   */
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        /**
         * For each question, shuffle its correct answer with its x number of incorrect answers in order
         * to make the ordering of the alternatives random.
         */
        const parsedQuestions = data.results.map((obj) => {
          const shuffledAlternatives = shuffle([
            ...obj.incorrect_answers,
            obj.correct_answer,
          ]);
          return {
            ...obj,
            question: decode(obj.question),
            alternatives: shuffledAlternatives,
          };
        });
        setQuestions(parsedQuestions);
      });
  }, []);

  /**
   * Update user's chosen answers
   */
  function updateChosenAnswers(answer, questionNum) {
    setChosenAnswers((prevState) => ({ ...prevState, [questionNum]: answer }));
  }

  /**
   * Check the score by counting the number of correct answers among the chosen answers
   */
  function checkScore() {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correct_answer === chosenAnswers[`${i}`]) {
        setFinalScore((prevState) => prevState + 1);
      }
    }
    setCheckAnswers((prevState) => !prevState);
  }

  /**
   * Mapping over the five questions fetched from OTDB API, each containing its own
   * 'Alternatives' component.
   */
  const fiveQuestions = questions.map((question, index) => {
    return (
      <div className="single-question-wrapper" key={nanoid()}>
        <p className="questions">{question.question}</p>
        <Alternatives
          alternatives={question.alternatives}
          correctAnswer={question.correct_answer}
          returnedChosenAnswer={chosenAnswers[index]}
          updateChosenAnswers={updateChosenAnswers}
          questionNum={index}
          checkAnswers={checkAnswers}
        ></Alternatives>
        <hr />
      </div>
    );
  });

  return (
    <div className="questions-wrapper">
      {fiveQuestions}
      {!checkAnswers ? (
        <button className="button question-button" onClick={checkScore}>
          Check answers
        </button>
      ) : (
        <div className="play-again-wrapper">
          <p className="score">{`You scored ${finalScore} / ${questions.length} correct answers`}</p>
          <button
            className="button play-again-button"
            onClick={props.switchPage}
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
