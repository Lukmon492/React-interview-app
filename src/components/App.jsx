import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  index: 0,
  // ready, start, active, finish
  status: "ready",
  answer: null,
  point: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataFetched":
      return { ...state, status: "start", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "failed" };
    case "start":
      return { ...state, status: "active" };

    case "checkAns":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index++ };
    default:
      throw new Error("Unknown Action");
  }
};

const App = () => {
  const [{ questions, status, index, point, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log(questions);
  const curQuestion = questions.at(index);
  console.log(curQuestion);

  // Accessing questions from FAKE API
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({ type: "dataFetched", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const totalQuestions = questions.length;
  const maxPoint = questions.reduce((prev, cur) => prev + cur.points, 0);
  // Cheking answer
  const hasAnswered = answer !== null;

  return (
    <div className="app">
      <Header />

      <Main>
        {/* Ready Status */}
        {status === "ready" && <div className="loader-container">Loading</div>}

        {/* Start Status */}
        {status === "start" && (
          <>
            {/* welcome screen */}
            <div className="start">
              <h2>Welcome to the Interview</h2>
              <h4>{totalQuestions} questions to test your FE Mastery</h4>
              <button
                className="btn"
                onClick={() => dispatch({ type: "start" })}
              >
                Let's start
              </button>
            </div>
          </>
        )}

        {/* Active status */}
        {status === "active" && (
          <div>
            {console.log(curQuestion["question"])}
            <header className="progress">
              <progress max={totalQuestions}>10</progress>

              <div>
                <p>
                  Question {index + 1}/{totalQuestions}
                </p>
              </div>
              <div>
                <p>
                  {point}/{maxPoint}
                </p>
              </div>
            </header>
            <h3>{curQuestion.question}</h3>

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
              {answer && (
                <button
                  className="btn"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {/* when data failed */}
        {status === "failed" && (
          <div className="error">
            <p>💥 There was an error fecthing questions.</p>
          </div>
        )}
      </Main>
    </div>
  );
};

export default App;
