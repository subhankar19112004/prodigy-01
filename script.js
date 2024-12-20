let startTime = null;
let elapsedTime = 0;
let timerInterval = null;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const laps = document.getElementById("laps");

function formatTime(time) {
  const milliseconds = Math.floor(time % 1000);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
}

function updateDisplay() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(diff);
}

function startStopwatch() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseStopwatch() {
  elapsedTime += Date.now() - startTime;
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00.000";
  laps.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function recordLap() {
  const lapTime = timeDisplay.textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
  laps.appendChild(lapItem);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
