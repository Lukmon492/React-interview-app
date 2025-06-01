const Progress = ({ totalQuestions, index, point, maxPoint, answer }) => {
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={index + Number(answer !== null)}
      ></progress>

      <div className="progress-details">
        <div>
          <p>
            Question <strong>{index + 1}</strong>/{totalQuestions}
          </p>
        </div>
        <div>
          <p>
            <strong>{point}</strong>/{maxPoint}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Progress;
