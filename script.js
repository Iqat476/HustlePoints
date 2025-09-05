// ====== Elements ======
const scoreDisplay = document.getElementById("score");
const taskList = document.getElementById("task-list");
const sound = document.getElementById("point-sound");
const popup = document.getElementById("points-pop");
const newTaskInput = document.getElementById("new-task-input");
const addTaskBtn = document.getElementById("add-task");
const bgUrlInput = document.getElementById("bg-url");
const applyBgBtn = document.getElementById("apply-bg");
const quoteDisplay = document.getElementById("quote");
const levelBar = document.getElementById("level-bar");
const stopwatchDisplay = document.getElementById("stopwatch");

// ====== Data ======
let points = 0;
let tasks = [];
let elapsedSeconds = 0;
let stopwatchInterval = null;
let streak = 0;
let lastVisit = null;

// Leveling config
const pointsPerLevel = 100;

// ====== Quotes ======
const quotes = [
  "💡 Keep grinding. Your future self will thank you.",
  "🚀 Progress, not perfection.",
  "🔥 Hustle in silence, let success make the noise.",
  "💪 You’re stronger than your excuses.",
  "🎯 One task at a time. One win at a time.",
  "⏳ Small efforts daily lead to big results.",
  "🌟 Dreams don’t work unless you do.",
  "💼 Street hustle, elite mindset."
];

// ====== Initialize ======
function init() {
  loadData();
  renderTasks();
  updateScore();
  updateLevelBar();
  updateStopwatchDisplay();
  checkStreak();

  showRandomQuote();
  setInterval(showRandomQuote, 20000);
}
init();

// ====== LocalStorage Helpers ======
function saveData() {
  localStorage.setItem("rushgrind_points", points);
  localStorage.setItem("rushgrind_tasks", JSON.stringify(tasks));
  localStorage.setItem("rushgrind_bg", document.body.style.backgroundImage || "");
  localStorage.setItem("rushgrind_stopwatch", elapsedSeconds);
  localStorage.setItem("rushgrind_streak", streak);
  localStorage.setItem("rushgrind_lastVisit", new Date().toDateString());
}

function loadData() {
  const savedPoints = localStorage.getItem("rushgrind_points");
  const savedTasks = localStorage.getItem("rushgrind_tasks");
  const savedBg = localStorage.getItem("rushgrind_bg");
  const savedStopwatch = localStorage.getItem("rushgrind_stopwatch");
  const savedStreak = localStorage.getItem("rushgrind_streak");
  const savedLastVisit = localStorage.getItem("rushgrind_lastVisit");

  if (savedPoints) points = parseInt(savedPoints);
  if (savedTasks) tasks = JSON.parse(savedTasks);
  if (savedBg) document.body.style.backgroundImage = savedBg;
  if (savedStopwatch) elapsedSeconds = parseInt(savedStopwatch);
  if (savedStreak) streak = parseInt(savedStreak);
  if (savedLastVisit) lastVisit = savedLastVisit;
}

// ====== Tasks ======
addTaskBtn.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, done: false });
    newTaskInput.value = "";
    renderTasks();
    saveData();
  }
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (!task.done) {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task";
      checkbox.checked = false;

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          completeTask(index);
        }
      });

      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(" " + task.text));
      taskList.appendChild(li);
    }
  });
}

function completeTask(index) {
  points += 10;
  tasks[index].done = true;
  updateScore();
  updateLevelBar();
  sound.play();
  showPopup();

  // Show done message
  const doneMsg = document.createElement("p");
  doneMsg.textContent = `✅ "${tasks[index].text}" completed!`;
  doneMsg.className = "done-message";
  document.body.appendChild(doneMsg);
  setTimeout(() => doneMsg.remove(), 1500);

  renderTasks();
  saveData();
}

function updateScore() {
  scoreDisplay.textContent = `Points: ${points}`;
}

// ====== Popup ======
function showPopup() {
  popup.classList.remove("hidden");
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.add("hidden");
  }, 800);
}

// ====== Background changer ======
applyBgBtn.addEventListener("click", () => {
  const url = bgUrlInput.value.trim();
  if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
    document.body.style.backgroundImage = `url('${url}')`;
    saveData();
  } else {
    alert("Please enter a valid image URL starting with http or https.");
  }
});

// ====== Motivational quotes ======
function showRandomQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[random];
  quoteDisplay.classList.add("fade-in");
  setTimeout(() => {
    quoteDisplay.classList.remove("fade-in");
  }, 4000);
}

// ====== Stopwatch ======
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateStopwatchDisplay() {
  stopwatchDisplay.textContent = formatTime(elapsedSeconds);
}

function updateStopwatch() {
  elapsedSeconds++;
  updateStopwatchDisplay();
  saveData();
}

window.startTimer = function () {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(updateStopwatch, 1000);
  }
};

window.stopTimer = function () {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
};

window.resetTimer = function () {
  window.stopTimer();
  elapsedSeconds = 0;
  updateStopwatchDisplay();
  saveData();
};

// ====== Leveling system ======
function updateLevelBar() {
  const level = Math.floor(points / pointsPerLevel) + 1;
  const progress = (points % pointsPerLevel) / pointsPerLevel * 100;

  levelBar.innerHTML = `
    <div style="background:#444; border-radius: 10px; overflow: hidden; height: 20px; margin: 15px 0;">
      <div style="width: ${progress}%; background: #ffcc00; height: 100%; transition: width 0.5s;"></div>
    </div>
    <div style="color: #ffcc00; font-weight: bold;">Level: ${level}</div>
  `;
}

// ====== Daily streak ======
function checkStreak() {
  if (!lastVisit) {
    streak = 1;
  } else {
    const lastDate = new Date(lastVisit);
    const today = new Date();
    const diffTime = today.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }
  saveData();
  showStreakMessage();
}

function showStreakMessage() {
  const streakMsg = document.createElement("p");
  streakMsg.textContent = `🔥 Daily Streak: ${streak} day${streak > 1 ? 's' : ''}! Keep hustling!`;
  streakMsg.style.position = "fixed";
  streakMsg.style.top = "10px";
  streakMsg.style.left = "50%";
  streakMsg.style.transform = "translateX(-50%)";
  streakMsg.style.background = "rgba(255, 204, 0, 0.85)";
  streakMsg.style.padding = "8px 16px";
  streakMsg.style.borderRadius = "12px";
  streakMsg.style.color = "#000";
  streakMsg.style.fontWeight = "bold";
  streakMsg.style.zIndex = "1000";

  document.body.appendChild(streakMsg);

  setTimeout(() => streakMsg.remove(), 99999999999999999);
}
