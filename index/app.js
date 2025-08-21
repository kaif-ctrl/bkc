// ----------------- Screen references -----------------
const startScreen = document.getElementById("start-screen");
const inputScreen = document.getElementById("input-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const playBtn = document.getElementById("play-btn");
const backBtn = document.getElementById("back-btn");
const retryBtn = document.getElementById("retry-btn");

// Next buttons
const nextFileBtn = document.getElementById("next-file-btn");
const nextFileBtn1 = document.getElementById("next-file-btn1");
const nextFileBtn2 = document.getElementById("next-file-btn2");
const nextFileBtn3 = document.getElementById("next-file-btn3");
const nextFileBtn4 = document.getElementById("next-file-btn4");
const nextFileBtn5 = document.getElementById("next-file-btn5");

// Input fields & result display
const playerName = document.getElementById("player-name");
const crushName = document.getElementById("crush-name");
const resultDisplay = document.getElementById("result-display");

// ----------------- Screen Navigation -----------------
startBtn.addEventListener("click", () => {
  startScreen.classList.replace("active", "hidden");
  inputScreen.classList.replace("hidden", "active");
});

backBtn.addEventListener("click", () => {
  inputScreen.classList.replace("active", "hidden");
  startScreen.classList.replace("hidden", "active");
});

retryBtn.addEventListener("click", () => {
  resultScreen.classList.replace("active", "hidden");
  inputScreen.classList.replace("hidden", "active");

  playerName.value = "";
  crushName.value = "";
  resultDisplay.innerHTML = `<p class="waiting">Calculating your destiny...</p>`;

  // Hide all Next buttons
  const nextButtons = [nextFileBtn, nextFileBtn1, nextFileBtn2, nextFileBtn3, nextFileBtn4, nextFileBtn5];
  nextButtons.forEach(btn => btn.style.display = "none");
});

// ----------------- FLAMES Logic -----------------
function flamesGame(name1, name2) {
  let n1 = name1.toLowerCase().replace(/\s+/g, "").split("");
  let n2 = name2.toLowerCase().replace(/\s+/g, "").split("");

  // Remove common letters
  n1 = n1.filter(char => {
    let idx = n2.indexOf(char);
    if (idx !== -1) {
      n2.splice(idx, 1);
      return false;
    }
    return true;
  });

  let remaining = n1.length + n2.length;

  let flames = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  // Circular elimination
  while (flames.length > 1) {
    index = (index + remaining - 1) % flames.length;
    flames.splice(index, 1);
  }

  const resultMap = {
    "F": "Friend 🤝",
    "L": "Love ❤️",
    "A": "Affection 💞",
    "M": "Marriage 💍",
    "E": "Enemy 😈",
    "S": "Sister 👧"
  };

  return resultMap[flames[0]];
}

// ----------------- Play Button -----------------
playBtn.addEventListener("click", () => {
  const name1 = playerName.value.trim();
  const name2 = crushName.value.trim();

  if (!name1 || !name2) {
    alert("Please enter both names!");
    return;
  }

  // Move to result screen
  inputScreen.classList.replace("active", "hidden");
  resultScreen.classList.replace("hidden", "active");

  // Show calculating animation
  resultDisplay.innerHTML = `<p class="waiting">Calculating your destiny...</p>`;

  // Hide all Next buttons
  const nextButtons = [nextFileBtn, nextFileBtn1, nextFileBtn2, nextFileBtn3, nextFileBtn4, nextFileBtn5];
  nextButtons.forEach(btn => btn.style.display = "none");

  // Delay for effect
  setTimeout(() => {
    const result = flamesGame(name1, name2);
    resultDisplay.innerHTML = `<p><strong>${name1}</strong> & <strong>${name2}</strong><br>Result: ${result}</p>`;

    // Show corresponding Next button
    const resultToBtn = {
      "Friend 🤝": nextFileBtn,
      "Love ❤️": nextFileBtn1,
      "Affection 💞": nextFileBtn2,
      "Marriage 💍": nextFileBtn3,
      "Enemy 😈": nextFileBtn4,
      "Sister 👧": nextFileBtn5
    };

    if (resultToBtn[result]) resultToBtn[result].style.display = "inline-block";
  }, 1500);
});

// ----------------- Next File Buttons -----------------
nextFileBtn.addEventListener("click", () => location.href = "../file2/file2.html");
nextFileBtn1.addEventListener("click", () => location.href = "../file3/file3.html");
nextFileBtn2.addEventListener("click", () => location.href = "../file4/file4.html");
nextFileBtn3.addEventListener("click", () => location.href = "../file5/file5.html");
nextFileBtn4.addEventListener("click", () => location.href = "../file6/file6.html");
nextFileBtn5.addEventListener("click", () => location.href = "../file7/file7.html");
