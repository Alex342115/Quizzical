import React from "react";
import Answer from "./answer";
import { decode } from "html-entities";
export default function Frame(props) {
  const answers = props.answers;
  const correctAns = props.correctAns;
  const id = props.id;

  return (
    <div className="">
      <h2 className="question">{decode(props.questions)}</h2>
      <div className="flex answers">
        <Answer
          className="flex-warp "
          key={id}
          id={id}
          answers={answers}
          correctAns={correctAns}
          selectAnswer={props.selectAnswer}
          selectedAnswer={props.selectedAnswer}
          isSelected={props.isSelected}
        />
      </div>
      <br />
      <hr />
    </div>
  );
}
