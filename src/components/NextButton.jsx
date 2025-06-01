const NextButton = ({ answer, index, totalQuestions, dispatch }) => {
  // early return
  if (answer === null) return null;
  return (
    <div>
      {index < totalQuestions - 1 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finalQuestion" })}
        >
          Finish
        </button>
      )}
    </div>
  );
};

export default NextButton;
