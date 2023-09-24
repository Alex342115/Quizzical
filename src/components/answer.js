import React from "react";
import { decode } from "html-entities";

export default function Answer(props) {
  return props.answers.map((ans) => (
    <div
      onClick={() => {
        props.selectAnswer(props.id, ans);
        // console.log(ans)
      }}
      key={ans}
    >
      <input id={ans} type="radio" name={props.correctAns} className="normal" />
      <label
        htmlFor={ans}
        className={`ans-btn ${
          props.isSelected
            ? props.correctAns === ans
              ? "correct-answer"
              : props.selectedAnswer === ans
              ? "wrong-answer"
              : "disable"
            : "normal"
        }`}
      >
        {decode(ans)}
      </label>
    </div>
  ));
}
