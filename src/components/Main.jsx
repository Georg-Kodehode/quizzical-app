import Start from "./Start";
import Questions from "./Questions";
import blueBlob from "../images/blob_blue.png";
import yellowBlob from "../images/blob_yellow.png";

import { useState } from "react";

export default function Main() {
  const [areQuestions, setAreQuestions] = useState(false);

  /**Switches between the two pages. This function is sent as a prop to both Questions
   * and Start components.*/
  function switchPage() {
    setAreQuestions((prevState) => !prevState);
  }
  return (
    <div className="main-wrapper">
      {areQuestions ? (
        <Questions switchPage={switchPage}></Questions>
      ) : (
        <Start switchPage={switchPage}></Start>
      )}
      <img src={yellowBlob} alt="a yellow blob" className="yellow-blob-image" />
      <img src={blueBlob} alt="a blue blob" className="blue-blob-image" />
    </div>
  );
}
