import Option from "./Option";

const Question = ({ curQuestion, answer, dispatch }) => {
  return (
    <div>
      <h3>{curQuestion.question}</h3>
      <Option curQuestion={curQuestion} answer={answer} dispatch={dispatch} />
    </div>
  );
};

export default Question;
