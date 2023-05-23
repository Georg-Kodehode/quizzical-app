export default function Start(props) {
  return (
    <div className="start-wrapper">
      <h1 className="start-header">Quizzical</h1>
      <p className="start-description">A quiz app</p>
      <button className="button" onClick={props.switchPage}>
        Start quiz
      </button>
    </div>
  );
}
