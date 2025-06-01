const FinishScreen = ({ point, maxPoint, highscore, dispatch }) => {
  const percentage = (point / maxPoint) * 100;

  let emoji;
  if (percentage === 100) "🥇";
  if (percentage >= 80 && percentage < 100) "🎉";
  if (percentage >= 50 && percentage < 80) "😃";
  if (percentage >= 0 && percentage < 50) "🙂";
  if (percentage === 0) "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji} </span>
        You Scored <strong>{point}</strong> out of the {maxPoint} (
        {Math.floor(percentage)}%)
      </p>

      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
