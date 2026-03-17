let time = 0;
let interval = null;
let running = false;
let mode = "stopwatch"; // stopwatch | countdown
let presetTime = 0;

// Detectar página
if (window.location.pathname.includes("cronometro")) {
  mode = localStorage.getItem("mode") || "stopwatch";
  presetTime = parseInt(localStorage.getItem("preset")) || 0;

  if (mode === "countdown") {
    time = presetTime;
  }
}

// FORMATO
function formatTime(ms) {
  let total = Math.floor(ms / 1000);
  let hrs = Math.floor(total / 3600);
  let mins = Math.floor((total % 3600) / 60);
  let secs = total % 60;
  let millis = ms % 1000;

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}<span>${millis}</span>`;
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function updateDisplay() {
  let display = document.getElementById("display");
  if (display) display.innerHTML = formatTime(time);
}

// CRONÓMETRO / COUNTDOWN
let startBtn = document.getElementById("startPause");
let clearBtn = document.getElementById("clear");

if (startBtn) {
  startBtn.onclick = () => {
    if (!running) {
      running = true;
      startBtn.textContent = "Pause";

      interval = setInterval(() => {
        if (mode === "stopwatch") {
          time += 10;
        } else {
          time -= 10;
          if (time <= 0) {
            clearInterval(interval);
            time = 0;
          }
        }
        updateDisplay();
      }, 10);
    } else {
      running = false;
      startBtn.textContent = "Start";
      clearInterval(interval);
    }
  };
}

if (clearBtn) {
  clearBtn.onclick = () => {
    clearInterval(interval);
    running = false;
    startBtn.textContent = "Start";

    if (mode === "stopwatch") {
      time = 0;
    } else {
      time = presetTime;
    }

    updateDisplay();
  };
}

// =======================
// COUNTDOWN INPUT
// =======================
let inputDigits = "";

function addNumber(n) {
  inputDigits += n;
  updateInputDisplay();
}

function clearInput() {
  inputDigits = "";
  updateInputDisplay();
}

function updateInputDisplay() {
  let ms = parseInt(inputDigits) || 0;
  let display = document.getElementById("display");
  display.innerHTML = formatTime(ms * 1000);
}

// SET -> ir a cronómetro en modo countdown
function setCountdown() {
  let ms = (parseInt(inputDigits) || 0) * 1000;

  localStorage.setItem("mode", "countdown");
  localStorage.setItem("preset", ms);

  window.location.href = "cronometro.html";
}

// INIT
updateDisplay();
