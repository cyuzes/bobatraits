import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Quiz.css";
import cloud2 from "../assets/cloud2.png";

function Quiz() {
  /* keeps track of the question on for the progress bar */
  const [currentQuestion, setCurrentQuestion] = useState(0);

  /* scores the aspects of the mbti */
  const [aspects, setAspects] = useState({
    i: 0,
    e: 0,
    s: 0,
    n: 0,
    t: 0,
    f: 0,
    j: 0,
    p: 0,
  });

  /* shows the intro */
  const [showIntro, setShowIntro] = useState(true);

  /* keeps track of answer history */
  const [history, setHistory] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const navigate = useNavigate();

  /* finds out the mbti to display based on answer */
  function mbti() {
    const { i, e, s, n, t, f, j, p } = aspects;
    const ie = i > e ? "I" : "E";
    const sn = n > s ? "N" : "S";
    const tf = t > f ? "T" : "F";
    const jp = j > p ? "J" : "P";
    return `${ie}${sn}${tf}${jp}`;
  }

  /* quiz questions and answers */
  const questions = [
    {
      text: "your alarm goes off in the morning but you are still tired from not getting enough sleep. how do you approach your day?",
      options: [
        {
          text: "*get up immediately and follow your daily routine*",
          aspect: "j",
        },
        {
          text: "*hit the snooze button and adjust your schedule based on your current mood*",
          aspect: "p",
        },
      ],
    },
    {
      text: "while getting ready for your date, you call a friend for advice, but they only offer emotional support. what is your reaction?",
      options: [
        {
          text: "(frustrated that you did not receive practical advice)",
          aspect: "t",
        },
        {
          text: "(feel comforted by the support, relieving the stress)",
          aspect: "f",
        },
      ],
    },
    {
      text: "you arrive to the location of the date, your local boba shop. there is some awkward tension in the air. what do you do?",
      options: [
        {
          text: "*patiently wait for your date to break the ice and initiate the conversation",
          aspect: "i",
        },
        {
          text: "*bothered by the awkward tension, you start up some conversation*",
          aspect: "e",
        },
      ],
    },
    {
      text: "throughout the date, your date makes conversation through everyday small talk. how do you feel?",
      options: [
        {
          text: "(appreciate the casual topics, its a good way to connect through everyday experiences)",
          aspect: "s",
        },
        {
          text: "(these questions are a little surface level, i prefer for some more interesting questions)",
          aspect: "n",
        },
      ],
    },
    {
      text: "while conversing, what do you find yourself prefer doing more?",
      options: [
        { text: "listening", aspect: "i" },
        { text: "speaking", aspect: "e" },
      ],
    },
    {
      text: "your date begins talking about their future. how do you engage in the conversation?",
      options: [
        {
          text: "*ask them about how they plan on achieving their goals*",
          aspect: "t",
        },
        {
          text: "*express interest in their commitment and passion to their goals*",
          aspect: "f",
        },
      ],
    },
    {
      text: "feeling thirsty, you guys order some boba. the new seasonal flavor catches your attention. what do you order?",
      options: [
        {
          text: "*order your regular flavor because you are familiar with it*",
          aspect: "j",
        },
        {
          text: "*order the new seasonal flavor because you enjoy trying something new*",
          aspect: "p",
        },
      ],
    },
    {
      text: "when your order was called, you were given your drink along with a cupcake you did not order. what is your reaction?",
      options: [
        { text: "“oh… thank you?” *proceeds to eat it*", aspect: "s" },
        {
          text: "“what is this for?... is there a promotion going on?...”",
          aspect: "n",
        },
      ],
    },
    {
      text: "your date plays their favorite song for you that you have never heard of. what do you focus on?",
      options: [
        { text: "the lyrics", aspect: "n" },
        { text: "the rhythm", aspect: "s" },
      ],
    },
    {
      text: "as your date was coming to an end, someone dropped their drink. what is your reaction?",
      options: [
        { text: "“what happened? did they trip on something?”", aspect: "t" },
        {
          text: "“i feel bad. i hope everything is okay. they just ordered it too”",
          aspect: "f",
        },
      ],
    },
    {
      text: "needing to recharge after a tiring and successful date, your friends ask if you want to hang out.",
      options: [
        { text: "head back home to recharge", aspect: "i" },
        { text: "go catch up your friends", aspect: "e" },
      ],
    },
    {
      text: "your date texted you suggesting going on another date the next week. what is your response?",
      options: [
        {
          text: "“id love too! lets set a date and time so we can plan ahead!”",
          aspect: "j",
        },
        {
          text: "“sounds great! lets see how the week goes and work on the details closer to the date!”",
          aspect: "p",
        },
      ],
    },
  ];

  /* actions for when clicking an answer */
  const handleAnswerClick = (aspect) => {
    /* creates a copy of the selected answer updating the array */
    /* returning the array to new state  */
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[currentQuestion] = aspect;
      return newSelectedAnswers;
    });

    /* updates the answer history */
    setHistory((prevHistory) => [
      /* pulls out history and updates the array with new info */
      ...prevHistory,
      { questionIndex: currentQuestion, selectedAspect: aspect },
    ]);

    /* updates the aspect scores */
    setAspects((prevAspects) => ({
      /* pulls out aspect scores and adds one to selected aspect */
      ...prevAspects,
      [aspect]: prevAspects[aspect] + 1,
    }));

    /* incrementing questions */
    setCurrentQuestion(currentQuestion + 1);
  };

  /* when the start button is pressed, hide the introduction */
  const handleStartQuiz = () => {
    setShowIntro(false);
  };

  /* calculates the mbti and navigate the results to be displayed in the results.jsx*/
  const handleFinishQuiz = () => {
    const mbtiType = mbti();
    navigate("/results", { state: { aspects, mbtiType } });
  };

  return (
    <div className="quiz-container">
      {showIntro ? (
        <div className="beginning">
          <section className="cloud-section">
            <img src={cloud2} alt="cloud" className="cloud" />
          </section>
          <h1>welcome! </h1>
          <p>here are reminders that will help get you the most accurate results:</p>
          <ol>
            <li>read each question carefully.</li>
            <li>choose the answer you are most likely to do in the situation.</li>
            <li>you can go back to review and change your answers if needed.</li>
          </ol>
          <p>when you are ready press go!</p>
          <button onClick={handleStartQuiz}>go</button>
        </div>
      ) : currentQuestion < questions.length ? (
        <div>
          <div className="questions">
            <h2>{questions[currentQuestion].text}</h2>
            <div className="question-separator"></div>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.aspect)}
                style={{
                  backgroundColor:
                    selectedAnswers[currentQuestion] === option.aspect ? "#658354" : "",
                  boxShadow:
                    selectedAnswers[currentQuestion] === option.aspect
                      ? "0px 0px 10px rgba(255, 255, 255, 0.5)"
                      : "",
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
          {currentQuestion < questions.length && (
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${(currentQuestion / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          )}
          <div className="back">
            {currentQuestion > 0 && (
              <button
                onClick={() => {
                  const previousQuestion = history.pop();
                  if (previousQuestion) {
                    setCurrentQuestion(previousQuestion.questionIndex);
                    setAspects((prevAspects) => ({
                      ...prevAspects,
                      [previousQuestion.selectedAspect]:
                        prevAspects[previousQuestion.selectedAspect] - 1,
                    }));
                  }
                }}
              >
                ←
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <section className="complete">
            <p>the bobaristas finished brewing your drink...</p>
            <button onClick={handleFinishQuiz}>pick up your order</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Quiz;
