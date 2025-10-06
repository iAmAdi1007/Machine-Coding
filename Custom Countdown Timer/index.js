const pauseButton = document.querySelector("#pause-timer");
const resetButton = document.querySelector("#reset-timer");
const startButton = document.querySelector("#start-timer");
const inputText = document.querySelector("#input-text");
const timerText = document.querySelector(".timer-text");
let IS_TIME_CHANGED = false;
let timerId = null;


function handleStartTimer() {
  if (IS_TIME_CHANGED) {
    startButton.classList.add("disabled");
    pauseButton.classList.remove("disabled");
    resetButton.classList.remove("disabled");
    let timeValue = timerText.innerText.split(":");
    let totalTimeInSecs =
      parseInt(timeValue[0]) * 3600 +
      parseInt(timeValue[1]) * 60 +
      parseInt(timeValue[2]);

    timerId = setInterval(() => {
      totalTimeInSecs = totalTimeInSecs - 1;
      if (totalTimeInSecs === 0) {
        clearInterval(timerId);
        IS_TIME_CHANGED = false;
        startButton.classList.remove("disabled");
        pauseButton.classList.add("disabled");
        resetButton.classList.add("disabled");
      }
      let convertedTime = convertTime(totalTimeInSecs);
      timerText.innerText = convertedTime;
    }, 100);
  } else {
    return;
  }
}

function handlePauseTimer() {
  if (!timerId) {
    return;
  }
  clearInterval(timerId);
  startButton.classList.remove("disabled");
  pauseButton.classList.add("disabled");
}

function handleResetTimer() {
  clearInterval(timerId);
  IS_TIME_CHANGED = false;
  timerText.innerText = "0:0:0";
  startButton.classList.remove("disabled");
  pauseButton.classList.add("disabled");
  resetButton.classList.add("disabled");
  inputText.value = "";
}

function convertTime(secs) {
  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const seconds = secs - hrs * 3600 - mins * 60;
  return `${hrs}:${mins}:${seconds}`;
}

function handleTextChange(event) {
  const val = event.target.value;
  IS_TIME_CHANGED = true;
  const time = convertTime(val);
  timerText.innerText = time;
}

function init() {
  pauseButton.classList.add("disabled");
  resetButton.classList.add("disabled");
  startButton.addEventListener("click", handleStartTimer);
  inputText.addEventListener("input", handleTextChange);
  pauseButton.addEventListener("click", handlePauseTimer);
  resetButton.addEventListener("click", handleResetTimer);
}

init();
