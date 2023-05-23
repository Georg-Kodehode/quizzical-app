import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function Alternatives(props) {
  const {
    alternatives,
    correctAnswer,
    returnedChosenAnswer,
    updateChosenAnswers,
    questionNum,
    checkAnswers,
  } = props;

  /** Lets the user choose their answer, updating alternativesObject's state with their choice.*/
  function chooseAnswer(answer) {
    updateChosenAnswers(answer, questionNum);
  }

  /** Create a div for each alternative of a question. The user's chosen answer
      receives a class to signify that it was the user's chosen answer, the correct answer, or the wrong answer
    */
  const allAlternatives = alternatives.map((alternative) => {
    return (
      <div
        className={`single-alternative ${
          decode(alternative) !== decode(returnedChosenAnswer)
            ? ""
            : !checkAnswers
            ? "chosen-alternative"
            : decode(alternative) === decode(correctAnswer)
            ? "correct-answer"
            : "wrong-answer"
        }`}
        key={nanoid()}
        onClick={() => {
          chooseAnswer(alternative);
        }}
      >
        {decode(alternative)}
      </div>
    );
  });

  return <div className="alternatives">{allAlternatives}</div>;
}
