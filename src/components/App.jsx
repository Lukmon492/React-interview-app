import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  index: 0,
  // ready, error, start, active, finished
  status: "ready",
  answer: null,
  point: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataFetched":
      return { ...state, status: "start", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "failed" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "checkAns": {
      // getting the curQuestion
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finalQuestion": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.point > state.highscore ? state.point : state.highscore,
      };
    }
    case "restart":
      return {
        ...initialState,
        status: "start",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "quizTimer":
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    default:
      throw new Error("Unknown Action");
  }
};

const App = () => {
  const [
    { questions, status, index, point, answer, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const curQuestion = questions.at(index);
  // console.log(curQuestion);

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

  return (
    <div className="app">
      <Header />
      <Main>
        {/* Ready/Loading Status */}
        {status === "ready" && <Loader />}

        {/* Start Status */}
        {status === "start" && (
          <StartScreen totalQuestions={totalQuestions} dispatch={dispatch} />
        )}

        {/* Active status */}
        {status === "active" && (
          <div>
            <Progress
              totalQuestions={totalQuestions}
              index={index}
              point={point}
              maxPoint={maxPoint}
              answer={answer}
            />

            <Question
              curQuestion={curQuestion}
              answer={answer}
              dispatch={dispatch}
              index={index}
              totalQuestions={totalQuestions}
            />
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              answer={answer}
              index={index}
              totalQuestions={totalQuestions}
              dispatch={dispatch}
            />
          </div>
        )}

        {status === "finished" && (
          <FinishScreen
            point={point}
            maxPoint={maxPoint}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}

        {/* when data failed */}
        {status === "failed" && <Error />}
      </Main>
    </div>
  );
};

export default App;
