const insectChoose = document.querySelectorAll(".insect-container > div a");
const game = document.querySelector("#game");
const gameContainer = game.querySelector("#container-game");
const timeEl = document.querySelector(".time");
const scoreEl = document.querySelector(".score");

const closeButtonEndGame = document.querySelector(".game-over .end-game a");
const gameOverEl = document.querySelector(".game-over");

window.scrollTo(0, 0);

closeButtonEndGame.addEventListener("click", () => {
  gameOverEl.classList.remove("show");
});

let timeInterval = 1000,
  insectChoiced = "",
  timePlayedMin = 0,
  timePlayedSeg = 0,
  score = 0,
  inter;

insectChoose.forEach((insect) => {
  insect.addEventListener("click", gameInit);
});

function gameInit(event) {
  resetGame();
  insectCount();
  insectChoiced = event.target.parentNode
    .querySelector("h3")
    .textContent.toLowerCase();

  setInterval(() => {
    timePlayedSeg++;

    if (timePlayedSeg > 59) {
      timePlayedMin++;
      timePlayedSeg = 0;
    }

    timeEl.textContent = `${
      timePlayedMin < 9 ? "0" + timePlayedMin : timePlayedMin
    }:${timePlayedSeg < 10 ? "0" + timePlayedSeg : timePlayedSeg}`;
  }, 1000);

  playGame(insectChoiced, timeInterval);
}

function playGame(insectChoiced, time) {
  inter = setInterval(() => {
    const insect = document.createElement("img");
    insect.src = `./images/${insectChoiced}.png`;
    insect.addEventListener("click", catchInsect);

    setPositionInsect(insect);

    gameContainer.appendChild(insect);
    insectCount();
  }, time);
}

function catchInsect({ target }) {
  target.classList.add("catch");

  score++;
  scoreEl.textContent = score;

  timeInterval -= 100;
  clearInterval(inter);

  playGame(insectChoiced, timeInterval);

  setTimeout(() => target.remove(), 550);
}

function setPositionInsect(insect) {
  insect.style.top =
    Math.ceil(Math.random() * gameContainer.getBoundingClientRect().height) +
    "px";

  insect.style.left =
    Math.ceil(Math.random() * gameContainer.getBoundingClientRect().width) +
    "px";
}

function insectCount() {
  const insects = document.querySelectorAll("#game img");

  if (insects.length > 15) {
    resetGame();

    gameOverEl.style.top =
      game.getBoundingClientRect().top + window.scrollY + "px";
    gameOverEl.classList.add("show");
  }
}

function resetGame() {
  clearInterval(inter);
  gameContainer.innerHTML = "";
  scoreEl.textContent = "0";
  timePlayedMin = 0;
  timePlayedSeg = 0;
  timeInterval = 1000;
  score = 0;
}
