import { useEffect, useRef, useState } from "react";
function App() {
  const normalTimer = {
    color: "white",
  };
  const redTimer = {
    color: "red",
  };
  let audio = useRef();

  const [breakLength, setBreakLength] = useState("5");
  const [sessionLength, setSessionLength] = useState("25");
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timerMin, setTimerMin] = useState("25");
  const [timerSec, setTimerSec] = useState("00");
  const [redAlert, setRedAlert] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const breakDecrement = () => {
    let length = Number(breakLength);
    if (!isTimerOn && length > 1 && length <= 60) {
      if (length <= 10) {
        setBreakLength(length - 1);
        setTimerSec("00");
        if (isBreak) {
          setTimerMin("0" + (length - 1));
        }
      } else {
        setBreakLength(length - 1);
        setTimerSec("00");
        if (isBreak) {
          setTimerMin(length - 1);
        }
      }
    }
  };
  const breakIncrement = () => {
    let length = Number(breakLength);
    if (!isTimerOn && length >= 1 && length < 60) {
      if (length < 9) {
        setBreakLength(length + 1);
        setTimerSec("00");
        if (isBreak) {
          setTimerMin("0" + (length + 1));
        }
      } else {
        setBreakLength(length + 1);
        setTimerSec("00");
        if (isBreak) {
          setTimerMin(length + 1);
        }
      }
    }
  };
  const sessionDecrement = () => {
    let length = Number(sessionLength);
    if (!isTimerOn && length > 1 && length <= 60) {
      if (length <= 10) {
        setSessionLength(length - 1);
        setTimerMin("0" + (length - 1));
        setTimerSec("00");
      } else {
        setSessionLength(length - 1);
        setTimerMin(length - 1);
        setTimerSec("00");
      }
    }
  };
  const sessionIncrement = () => {
    let length = Number(sessionLength);
    if (!isTimerOn && length >= 1 && length < 60) {
      if (length < 9) {
        setSessionLength(length + 1);
        setTimerMin("0" + (length + 1));
        setTimerSec("00");
      } else {
        setSessionLength(length + 1);
        setTimerMin(length + 1);
        setTimerSec("00");
      }
    }
  };
  let intervalId = useRef();

  useEffect(() => {
    if (isTimerOn) {
      if (!isPaused) {
        setTimerSec("00");
      }
      const playAudio = () => {
        audio.current = document.getElementById("beep");
        audio.current.play();
        return;
      };
      if (isBreak) {
        if (!isPaused) {
          setTimerMin((prevMin) => {
            if (Number(breakLength) < 10) {
              return "0" + Number(breakLength);
            }
            return Number(breakLength);
          });
        }
        setIsPaused(false);
        intervalId.current = setInterval(() => {
          changeBreakSec();
        }, 100);
      } else {
        if (!isPaused) {
          setTimerMin((prevMin) => {
            if (Number(sessionLength) < 10) {
              return "0" + Number(sessionLength);
            }
            return Number(sessionLength);
          });
        }
        setIsPaused(false);
        intervalId.current = setInterval(() => {
          changeSessionSec();
        }, 100);
      }

      function changeSessionMin() {
        setTimerMin((prevMin) => {
          setRedAlert(false);
          if (prevMin <= 10 && prevMin >= 0) {
            if (Number(prevMin) === 1) {
              setRedAlert(true);
            }
            if (Number(prevMin) === 0) {
              // 00:00
              playAudio();
              clearInterval(intervalId.current);
              setIsBreak((prev) => !prev);
              return prevMin;
            }
            return "0" + (prevMin - 1);
          }
          return prevMin - 1;
        });
      }
      function changeSessionSec() {
        setTimerSec((prevSec) => {
          if (prevSec <= 10 && prevSec >= 0) {
            if (Number(prevSec) === 0) {
              changeSessionMin();
              return "59";
            }
            return "0" + (prevSec - 1);
          }
          return prevSec - 1;
        });
      }
      function changeBreakMin() {
        setTimerMin((prevMin) => {
          setRedAlert(false);
          if (prevMin <= 10 && prevMin >= 0) {
            if (Number(prevMin) === 1) {
              setRedAlert(true);
            }
            if (Number(prevMin) === 0) {
              // 00:00
              playAudio();
              clearInterval(intervalId.current);
              setIsBreak((prev) => !prev);
              return prevMin;
            }
            return "0" + (prevMin - 1);
          }
          return prevMin - 1;
        });
      }
      function changeBreakSec() {
        setTimerSec((prevSec) => {
          if (prevSec <= 10 && prevSec >= 0) {
            if (Number(prevSec) === 0) {
              changeBreakMin();
              return "59";
            }
            return "0" + (prevSec - 1);
          }
          return prevSec - 1;
        });
      }
    }
  }, [isTimerOn, isBreak]);
  
  const stopTimer = () => {
    setIsTimerOn(false);
    setIsPaused(true);
    clearInterval(intervalId.current);
  };
  const startTimer = () => {
    setIsTimerOn(true);
  };
  const handlePlayPause = () => {
    if (isTimerOn) {
      stopTimer();
    } else if (!isTimerOn) {
      startTimer();
    }
  };
  const initialize = () => {
    clearInterval(intervalId.current);
    audio?.current?.load();
    setBreakLength("5");
    setSessionLength("25");
    setTimerMin("25");
    setTimerSec("00");
    setIsTimerOn(false);
    setIsBreak(false);
    setRedAlert(false);
    // setToggle(false);
  };
  const handleReset = () => {
    initialize();
  };

  return (
    <div id="container" className="App">
      <div>
        <div className="main-title">25 + 5 Clock</div>
        <div className="length-control">
          <div id="break-label">Break Length</div>
          <button
            className="btn-level"
            id="break-decrement"
            value="-"
            onClick={breakDecrement}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="break-length">
            {breakLength}
          </div>
          <button
            className="btn-level"
            id="break-increment"
            value="+"
            onClick={breakIncrement}
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <button
            className="btn-level"
            id="session-decrement"
            value="-"
            onClick={sessionDecrement}
          >
            <i className="fa fa-arrow-down fa-2x"></i>
          </button>
          <div className="btn-level" id="session-length">
            {sessionLength}
          </div>
          <button
            className="btn-level"
            id="session-increment"
            value="+"
            onClick={sessionIncrement}
          >
            <i className="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
        <div className="timer" style={redAlert ? redTimer : normalTimer}>
          <div className="timer-wrapper">
            <div id="timer-label">{isBreak ? "Break" : "Session"}</div>
            <div id="time-left">
              {timerMin}:{timerSec}
            </div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={handlePlayPause}>
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
        </div>
        <div className="author">
          Designed and Coded by
          <br />
          <a href="/#" target="_blank" rel="noreferrer">
            G Rohit
          </a>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}

export default App;
