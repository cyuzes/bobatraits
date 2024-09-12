import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { GiBoba } from "react-icons/gi";
import { CiRedo, CiSaveDown2, CiBoxList, CiShare2 } from "react-icons/ci";
import { GrFormPrevious } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import {
  FaTiktok,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";
import "../styles/App.css";
import cloud2 from "../assets/cloud2.png";
import navinpfp from "../assets/navinpfp.jpg";

function App() {
  // dropdown menu functionality
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(false);
  };

  // quiz functionality
  const [showIntro, setShowIntro] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
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
  const [results, setResults] = useState(null);

  // determine the mbti
  const mbti = () => {
    const { i, e, s, n, t, f, j, p } = aspects;
    const ie = i > e ? "I" : "E";
    const sn = n > s ? "N" : "S";
    const tf = t > f ? "T" : "F";
    const jp = j > p ? "J" : "P";
    return `${ie}${sn}${tf}${jp}`;
  };

  // questions
  const questions = [
    {
      question:
        "your alarm goes off in the morning but you are still tired from not getting enough sleep. how do you approach your day?",
      options: [
        {
          answer: "*get up immediately and follow your daily routine*",
          aspect: "j",
        },
        {
          answer: "*hit the snooze button and adjust your schedule based on your current mood*",
          aspect: "p",
        },
      ],
    },
    {
      question:
        "while getting ready for your date, you call a friend for advice, but they only offer emotional support. what is your reaction?",
      options: [
        {
          answer: "(frustrated that you did not receive practical advice)",
          aspect: "t",
        },
        {
          answer: "(feel comforted by the support, relieving the stress)",
          aspect: "f",
        },
      ],
    },
    {
      question:
        "you arrive to the location of the date, your local boba shop. there is some awkward tension in the air. what do you do?",
      options: [
        {
          answer: "*patiently wait for your date to break the ice and initiate the conversation",
          aspect: "i",
        },
        {
          answer: "*bothered by the awkward tension, you start up some conversation*",
          aspect: "e",
        },
      ],
    },
    {
      question:
        "throughout the date, your date makes conversation through everyday small talk. how do you feel?",
      options: [
        {
          answer:
            "(appreciate the casual topics, its a good way to connect through everyday experiences)",
          aspect: "s",
        },
        {
          answer:
            "(these questions are a little surface level, i prefer for some more interesting questions)",
          aspect: "n",
        },
      ],
    },
    {
      question: "while conversing, what do you find yourself prefer doing more?",
      options: [
        { answer: "listening", aspect: "i" },
        { answer: "speaking", aspect: "e" },
      ],
    },
    {
      question:
        "your date begins talking about their future. how do you engage in the conversation?",
      options: [
        {
          answer: "*ask them about how they plan on achieving their goals*",
          aspect: "t",
        },
        {
          answer: "*express interest in their commitment and passion to their goals*",
          aspect: "f",
        },
      ],
    },
    {
      question:
        "feeling thirsty, you guys order some boba. the new seasonal flavor catches your attention. what do you order?",
      options: [
        {
          answer: "*order your regular flavor because you are familiar with it*",
          aspect: "j",
        },
        {
          answer: "*order the new seasonal flavor because you enjoy trying something new*",
          aspect: "p",
        },
      ],
    },
    {
      question:
        "when your order was called, you were given your drink along with a cupcake you did not order. what is your reaction?",
      options: [
        { answer: "“oh… thank you?” *proceeds to eat it*", aspect: "s" },
        {
          answer: "“what is this for?... is there a promotion going on?...”",
          aspect: "n",
        },
      ],
    },
    {
      question:
        "your date plays their favorite song for you that you have never heard of. what do you focus on?",
      options: [
        { answer: "the lyrics", aspect: "n" },
        { answer: "the rhythm", aspect: "s" },
      ],
    },
    {
      question:
        "as your date was coming to an end, someone dropped their drink. what is your reaction?",
      options: [
        { answer: "“what happened? did they trip on something?”", aspect: "t" },
        {
          answer: "“i feel bad. i hope everything is okay. they just ordered it too”",
          aspect: "f",
        },
      ],
    },
    {
      question:
        "needing to recharge after a tiring and successful date, your friends ask if you want to hang out.",
      options: [
        { answer: "head back home to recharge", aspect: "i" },
        { answer: "go catch up your friends", aspect: "e" },
      ],
    },
    {
      question:
        "your date texted you suggesting going on another date the next week. what is your response?",
      options: [
        {
          answer: "“id love too! lets set a date and time so we can plan ahead!”",
          aspect: "j",
        },
        {
          answer:
            "“sounds great! lets see how the week goes and work on the details closer to the date!”",
          aspect: "p",
        },
      ],
    },
    {
      question: "the bobaristas finished brewing your drink.",
      options: [
        {
          answer: "pick up your order",
        },
      ],
    },
  ];

  // start quiz functionality and redo
  const handleStartQuiz = () => {
    setShowIntro(true);
    setResults(null);
  };

  const handleGo = () => {
    setIsQuizOpen(true);
    setShowIntro(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setAspects({
      i: 0,
      e: 0,
      s: 0,
      n: 0,
      t: 0,
      f: 0,
      j: 0,
      p: 0,
    });
    setResults(null);
    setProgress(0);
  };

  // question system
  const handleAnswerSelect = (option) => {
    setAspects((prevAspects) => ({
      ...prevAspects,
      [option.aspect]: prevAspects[option.aspect] + 1,
    }));
    setAnswers([...answers, option.answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      updateProgress();
    } else {
      handleQuizSubmit();
    }
  };

  // go to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1)); // Optionally remove last answer
    }
  };

  // progress bar
  const [progress, setProgress] = useState(0);
  const updateProgress = () => {
    const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
    setProgress(progressPercentage);
  };

  // closing quiz
  const handleQuizSubmit = () => {
    const mbtiType = mbti();
    setResults({
      answers,
      mbtiType,
    });
    setIsQuizOpen(false);
  };

  /* save img button */
  const handleSaveResults = () => {
    // save functionality here
  };

  /* menu button */
  const handleMenu = () => {
    <a href="#menu" />;
  };

  /* default state */
  const [currentItemIndexes, setCurrentItemIndexes] = useState({
    classic: 0,
    fruit: 0,
    bold: 0,
    fresh: 0,
  });

  /* flavor categories */
  const categories = {
    classic: [
      { alt: "classic-milk-tea", name: "classic milk tea" },
      { alt: "oolong-milk-tea", name: "oolong milk tea" },
      { alt: "thai-milk-tea", name: "thai milk tea" },
      { alt: "wintermelon-milk-tea", name: "wintermelon milk tea" },
    ],
    fruit: [
      { alt: "honeydew-milk-tea", name: "honeydew milk tea" },
      { alt: "strawberry-milk-tea", name: "strawberry milk tea" },
      { alt: "mango-milk-tea", name: "mango milk tea" },
      { alt: "passion-FRUIT-milk-tea", name: "passion fruit milk tea" },
    ],
    bold: [
      { alt: "matcha-milk-tea", name: "matcha milk tea" },
      { alt: "ube-milk-tea", name: "ube milk tea" },
      { alt: "mango-green-milk-tea", name: "mango green milk tea" },
      { alt: "brown-sugar-milk-tea", name: "brown sugar milk tea" },
    ],
    fresh: [
      { alt: "jasmine-green-milk-tea", name: "jasmine green milk tea" },
      { alt: "lychee-green-milk-tea", name: "lychee green milk tea" },
      { alt: "okinawa-milk-tea", name: "okinawa milk tea" },
      { alt: "taro-milk-tea", name: "aro milk tea" },
    ],
  };

  const [isMenuCollapse, setMenuCollapse] = useState(true);
  const handleMenuCollapse = () => {
    setMenuCollapse((prevState) => !prevState);
  };

  /* previous slide */
  const handlePrevItem = (category) => {
    setCurrentItemIndexes((prevIndexes) => ({
      ...prevIndexes,
      [category]:
        prevIndexes[category] === 0 ? categories[category].length - 1 : prevIndexes[category] - 1,
    }));
  };

  /* next slide */
  const handleNextItem = (category) => {
    setCurrentItemIndexes((prevIndexes) => ({
      ...prevIndexes,
      [category]:
        prevIndexes[category] === categories[category].length - 1 ? 0 : prevIndexes[category] + 1,
    }));
  };

  return (
    <div>
      <section className="web-container">
        <div>
          {/* header section */}
          <header>
            <section className="web-header">
              <div className="header-left">
                <section className="brand">
                  <GiBoba />
                  <h1>bobatraits.</h1>
                </section>
              </div>
              <div className="header-right">
                {!isDropdownOpen && ( // Render the menu button only when dropdown is closed
                  <button className="dropdown-menu" onClick={() => setDropdownOpen(true)}>
                    <IoMdMenu />
                  </button>
                )}
                {isDropdownOpen && (
                  <ul className="dropdown-list">
                    <li>
                      <a onClick={toggleDropdown}>
                        <RxCross1 />
                      </a>
                    </li>
                    <li>
                      <a href="#hero" onClick={handleStartQuiz && toggleDropdown}>
                        <b>start</b>
                      </a>
                    </li>
                    <li>
                      <a href="#menu" onClick={toggleDropdown}>
                        <b>menu</b>
                      </a>
                    </li>
                    <li>
                      <a href="#about-us" onClick={toggleDropdown}>
                        <b>about us</b>
                      </a>
                    </li>
                    <li>
                      <a href="https://forms.gle/3Bcury57qsqoGjBX6">
                        <b>contact us</b>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </section>
          </header>

          {/* main section */}
          <main>
            {/* hero + quiz section */}
            <div className="hero-section" id="#hero">
              <section className="hero-background">
                {!showIntro && !isQuizOpen && !results && (
                  <section className="hero-content">
                    <h2>discover your perfect boba tea flavor</h2>
                    <p>press start to begin the quiz</p>
                    <button className="start-button" onClick={handleStartQuiz}>
                      start
                    </button>
                  </section>
                )}
                {showIntro ? (
                  <div className="beginning">
                    <section className="cloud-section">
                      <img src={cloud2} alt="cloud" className="cloud" />
                    </section>
                    <section className="beginning-text">
                      <h2>welcome!</h2>
                      <p>here are reminders that will help get you the most accurate results:</p>
                      <ol>
                        <li>read each question carefully.</li>
                        <li>choose the answer you are most likely to do in the situation.</li>
                        <li>you can go back to review and change your answers if needed.</li>
                      </ol>
                      <p>when you are ready press go!</p>
                    </section>
                    <button className="go-button" onClick={handleGo}>
                      go
                    </button>
                  </div>
                ) : (
                  isQuizOpen && (
                    <div className="quiz-container">
                      <section className="quiz-background">
                        <div className="quiz-progress">
                          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p>{questions[currentQuestion].question}</p>
                        <ul className="quiz-options">
                          {questions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                              <button onClick={() => handleAnswerSelect(option)}>
                                {option.answer}
                              </button>
                            </li>
                          ))}
                        </ul>
                        {/* Previous Question Button */}
                        {currentQuestion > 0 && (
                          <button className="previous-question" onClick={handlePreviousQuestion}>
                            <GrFormPrevious />
                          </button>
                        )}
                      </section>
                    </div>
                  )
                )}

                {results && (
                  <div className="results-container">
                    <section className="result-background">
                      <section className="result-top">
                        <h2>you are...</h2>
                        <p>{results.mbtiType}</p>
                        <p>
                          share your results using <u>#bobatraits</u>
                        </p>
                      </section>
                      <div className="line"></div>
                      <section className="result-buttons">
                        <section className="save-button">
                          <CiSaveDown2 />
                          <button onClick={handleSaveResults}>save your results</button>
                        </section>
                        <section className="redo-button">
                          <CiRedo />
                          <button onClick={handleStartQuiz}>redo the quiz</button>
                        </section>
                        <section className="menu-button">
                          <CiBoxList />
                          <a href="#menu">
                            <button>complete menu</button>
                          </a>
                        </section>
                        <section className="copy-button">
                          <CiShare2 />
                          <button
                            onClick={navigator.clipboard.writeText(
                              "https://cyuzes.github.io/bobatraits/"
                            )}
                          >
                            share link
                          </button>
                        </section>
                      </section>
                      <section className="result-bottom">
                        <p>thank you for completing the test!</p>
                        <p>
                          support the creators by following their <a href="#about-us">socials</a>!
                        </p>
                      </section>
                    </section>
                  </div>
                )}
              </section>
            </div>

            {/* menu sectionn */}
            <div className="menu" id="menu">
              <section className="menu-background">
                <button className="menu-collapse" onClick={handleMenuCollapse}>
                  {isMenuCollapse ? (
                    <p>
                      open menu
                      <br />
                      <FaCaretDown />
                    </p>
                  ) : (
                    <p>
                      close menu
                      <br />
                      <FaCaretUp />
                    </p>
                  )}
                </button>
                {!isMenuCollapse && (
                  <div className="category-container">
                    <section className="menu-description">
                      <h2>explore the menu!</h2>
                      <p>
                        the complete drink menu of bobatraits with categories to easily navigate and
                        find your desired flavor. click on the drink to see its nutritional facts.
                        to find the flavor that best fits your personality, simply click the button
                        below or navigate to the home page to start!
                      </p>
                    </section>
                    {Object.keys(categories).map((category) => (
                      <div key={category} className="category-slider">
                        <h2>───‏ ‎ {category} ‏ ‎───</h2>
                        <div className="slider-container">
                          <button
                            className="slide-button prev"
                            onClick={() => handlePrevItem(category)}
                          >
                            &lt;
                          </button>
                          <div className="flavor-slider">
                            {categories[category].map(
                              (flavor, index) =>
                                index === currentItemIndexes[category] && (
                                  <div className="flavor-item" key={flavor.alt}>
                                    <img src={navinpfp} alt={flavor.alt} />
                                    <span className="flavor">{flavor.name}</span>
                                  </div>
                                )
                            )}
                          </div>
                          <button
                            className="slide-button next"
                            onClick={() => handleNextItem(category)}
                          >
                            &gt;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/*about section */}
            <div className="about-us" id="about-us">
              <section className="about-background">
                <div className="about-text">
                  <section className="about-body">
                    <p>
                      bobatraits offers a fun and unique way to explore your personality through the
                      lens of boba tea. inspired by the frameworks of the myers-briggs theory, our
                      quiz matches you with a boba flavor based on your answers to 12 thoughtfully
                      crafted questions, revealing insights into your personality traits and boba
                      flavor.
                    </p>
                    <div className="disclaimer">
                      <p>
                        disclaimer: the contents provided in the quiz is intended for entertainment
                        purposes only.
                      </p>
                    </div>
                  </section>
                </div>
                <section className="meet">
                  <h2>meet the bobaristas</h2>
                </section>
                <div className="team">
                  <div className="navin">
                    <div className="navinpic">
                      <img src={navinpfp} alt="navinpfp" className="pfp" />
                    </div>
                    <div className="intro">
                      <h2 className="navink">navin kunakornvanich</h2>
                      <h4 className="mbti">oolong milk tea</h4>
                      <div className="name-separator"></div>
                      <div className="socials">
                        <a
                          href="https://www.instagram.com/navinpk_/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaInstagram />
                        </a>
                        <a
                          href="https://www.tiktok.com/@navinpk_"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaTiktok />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/navin-kunakornvanich-3b4706312/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaLinkedin />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mykaila">
                    <div className="mykailapic">
                      <img src={navinpfp} alt="mykailapfp" className="pfp" />
                    </div>
                    <div className="mykailapic"></div>
                    <div className="intro">
                      <h2 className="mykailab">mykaila bongato</h2>
                      <h4 className="mbti">lychee green milk tea</h4>
                      <div className="name-separator"></div>
                      <div className="socials">
                        <a
                          href="https://www.instagram.com/muhkailah/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaInstagram />
                        </a>
                        <a
                          href="https://www.tiktok.com/@muhkailah?lang=en"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaTiktok />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/mykailab/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaLinkedin />
                        </a>
                        <a
                          href="https://www.youtube.com/@xomykaila/featured"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon"
                        >
                          <FaYoutube />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* footer section */}
          <footer className="web-footer">
            <p>&copy; 2024 Bobatraits. All rights reserved.</p>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;
