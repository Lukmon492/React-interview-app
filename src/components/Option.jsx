const Option = ({ curQuestion, answer, dispatch }) => {
  // Cheking answer
  const hasAnswered = answer !== null;

  return (
    <>
      {" "}
      <div className="options">
        {curQuestion.options.map((option, index) => (
          <button
            disabled={hasAnswered}
            className={`btn btn-option ${
              hasAnswered
                ? index === curQuestion.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }
                  ${index === answer ? "answer" : ""}`}
            key={index}
            onClick={() => dispatch({ type: "checkAns", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
    </>
  );
};

export default Option;
