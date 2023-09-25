import React from "react";
import Frame from "./frame";
import { nanoid } from "nanoid";

export default function Questions() {
  const [quizArr, setQuizArr] = React.useState(); // Storing Fetching data
  const [quesArr, setQuesArr] = React.useState(); //Fetched data into array
  const [startAgain, setStartAgain] = React.useState(true); // start control
  const [isSelected, setIsSelected] = React.useState(false); // all option selected control
  const [score, setScore] = React.useState(0); // score control

  // console.log("re-rendered!");

  // <-----------Fetching data from the API----------->
  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuizArr(data.results);
      });
  }, [startAgain]);

  // <------------Fetched Data into Array ------------>
  React.useEffect(() => {
    setQuesArr(
      quizArr?.map((item) => {
        const allAnsArr = [...item.incorrect_answers, item.correct_answer];
        const allAns = allAnsArr.sort(() => Math.random() - 0.5);
        const corrAns = item.correct_answer;
        return {
          id: nanoid(),
          questions: item.question,
          answers: allAns,
          correctAns: corrAns,
          isSelected: false,
          selectedAnswer: "",
        };
      })
    );
  }, [quizArr]);

  // <------------ Array into elements  ------------>
  const questionElements =
    quesArr && quesArr.length !== 0
      ? quesArr.map((ques) => (
          <Frame
            key={ques.id}
            id={ques.id}
            questions={ques.questions}
            answers={ques.answers}
            correctAns={ques.correctAns}
            selectedAnswer={ques.selectedAnswer}
            selectAnswer={selectAnswer}
            isSelected={isSelected}
          />
        ))
      : null;

  // <----------Storing the selected Answer----------->
  function selectAnswer(id, selectedAns) {
    setQuesArr((prevQuiz) =>
      prevQuiz.map((item) => {
        if (item.id === id) {
          // console.log(selectedAns);
          return { ...item, isSelected: true, selectedAnswer: selectedAns };
        } else {
          return item;
        }
      })
    );
  }

  // <--Optoins are selected for all questions then calculating the score-->
  function allOptionSelected() {
    if (isSelected) {
      setIsSelected(false);
      setStartAgain((prev) => !prev);
    } else {
      const optionSelected = quesArr.every((item) => item.isSelected === true);
      setIsSelected(optionSelected);
      setScore(
        quesArr?.filter((item) => item.selectedAnswer === item.correctAns)
          .length
      );
    }
  }

  // <---------Button control over start menu--------->
  const controlBtn = (
    <div className="score-details">
      {isSelected && (
        <p className="score">{`You are correct ${score} out of 5`} </p>
      )}
      <button className="restart-btn" onClick={allOptionSelected}>
        {isSelected ? "Start Again" : "Check Answers"}
      </button>
    </div>
  );

  return (
    <div>
      <div>{questionElements}</div>
      <div>{controlBtn}</div>
    </div>
  );
}
