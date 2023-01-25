import React, { FC } from "react";
import uniqid from "uniqid";
import { userAnswer } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

type Props = {
  question: string;
  answers: string[]; // array of strings but it's any for now
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: userAnswer | undefined;
  questionNo: number;
  totalQuestion: number;
};

const QuestionCard: FC<Props> = ({
  question,
  answers,
  callBack,
  userAnswer,
  questionNo,
  totalQuestion,
}) => (
  <Wrapper>
    <p className="number">
      Question : {questionNo} / {totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
        key={answer}
        correct={userAnswer?.correctAnswer === answer}
        userClicked={userAnswer?.answer === answer}
      >
        <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
