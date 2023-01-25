import { ReactEventHandler, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestion } from "./API";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTION = 10;

export type userAnswer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<userAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestion(TOTAL_QUESTION, Difficulty.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTION ? (
          <button className="start" onClick={startGame}>
            Start
          </button>
        ) : null}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Question Loading ...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestion={TOTAL_QUESTION}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callBack={checkAnswers}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTION - 1 ? (
          <button className="next" onClick={handleNextQuestion}>Next Question</button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
