import Option from "./Option";

const Question = ({ curQuestion, answer, dispatch, index, totalQuestions }) => {
  return (
    <div>
      <h3>{curQuestion.question}</h3>
      <Option
        curQuestion={curQuestion}
        answer={answer}
        dispatch={dispatch}
        index={index}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default Question;
