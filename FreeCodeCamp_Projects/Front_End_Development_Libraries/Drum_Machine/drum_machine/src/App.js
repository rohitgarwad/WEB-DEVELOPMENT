import "./styles.css";
import { e, t, a, b, s } from "./data.js";
import { useState } from "react";
function App() {
  const [playId, setPlayId] = useState("");
  const [powerOn, setPowerOn] = useState(true);
  const [bankOn, setBankOn] = useState(false);
  const handlePadOnClick = (event) => {
    let audioElement;
    let id;
    if (event.type === "click") {
      audioElement = event.target.childNodes[0];
      id = event.target.id;
    } else if (event.type === "keydown") {
      audioElement = document.getElementById(`${event.key.toUpperCase()}`);
      id = audioElement && audioElement.parentElement.id;
    }
    if (powerOn) {
      const display = document.getElementById("display");
      audioElement && audioElement.play();
      if (audioElement) {
        display.innerText = id;
      }
    }
    setPlayId(id);
    setTimeout(() => setPlayId(""), 100);
  };
  const handlePowerOnClick = () => {
    setPowerOn(!powerOn);
  };
  function changeDisplay() {
    const display = document.getElementById("display");
    if (bankOn) {
      display.innerText = "Heater Kit";
    } else {
      display.innerText = "Smooth Piano Kit";
    }
  }
  const handleBankOnClick = () => {
    // powerOn && setBankOn(!bankOn);
    if (powerOn) {
      setBankOn(!bankOn);
      changeDisplay();
    }
  };
  const handleOnInputChange = (event) => {
    const audioElements = document.querySelectorAll("audio");
    const display = document.getElementById("display");
    display.innerText = `Volume: ${Math.round(event.target.value * 100)}`;
    setTimeout(() => (display.innerHTML = "&nbsp;"), 1000);
    audioElements.forEach(
      (audioElement) => (audioElement.volume = event.target.value)
    );
  };
  document.onkeydown = handlePadOnClick;
  if (!powerOn) {
    const display = document.getElementById("display");
    display.innerHTML = "&nbsp";
  }
  return (
    <div className="App">
      <div className="main-container" id="drum-machine">
        <div className="pad-bank">
          {bankOn
            ? t.map((obj) => (
                <div
                  className="drum-pad"
                  id={obj.id}
                  key={obj.id}
                  onClick={handlePadOnClick}
                  style={playId === obj.id ? (powerOn ? a : b) : s}
                >
                  <audio
                    className="clip"
                    id={obj.keyTrigger}
                    src={obj.url}
                  ></audio>
                  {obj.keyTrigger}
                </div>
              ))
            : e.map((obj) => (
                <div
                  className="drum-pad"
                  id={obj.id}
                  key={obj.id}
                  onClick={handlePadOnClick}
                  style={playId === obj.id ? (powerOn ? a : b) : s}
                >
                  <audio
                    className="clip"
                    id={obj.keyTrigger}
                    src={obj.url}
                  ></audio>
                  {obj.keyTrigger}
                </div>
              ))}
        </div>
        <div className="logo">
          <div className="inner-logo">FCC&nbsp;</div>
          <i className="inner-logo fa fa-free-code-camp"></i>
        </div>
        <div className="controls-container">
          <div className="control">
            <p>POWER</p>
            <div className="select">
              <div
                className="inner"
                onClick={handlePowerOnClick}
                style={{ float: powerOn ? "right" : "left" }}
              ></div>
            </div>
          </div>
          <p className="display" id="display">
            &nbsp;
          </p>
          <div className="volume-slider">
            <input
              max={1}
              min={0}
              step={0.01}
              type="range"
              defaultValue={0.3}
              disabled={!powerOn}
              onInput={handleOnInputChange}
            ></input>
          </div>
          <div className="control">
            <p>BANK</p>
            <div className="select">
              <div
                className="inner"
                onClick={handleBankOnClick}
                style={{ float: bankOn ? "right" : "left" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
