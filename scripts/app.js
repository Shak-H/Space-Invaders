// starting variables
const grid = document.querySelector(".grid");
const main = document.querySelector("main");

const startContainer = document.querySelector(".intro-game-container");
const scoreSpan = document.querySelector(".score span");
const livesImages = document.querySelector(".current-lives");
const levelSpan = document.querySelector(".level span");

const firstLife = document.querySelector("#first-life");
const secondLife = document.querySelector("#second-life");
const thirdLife = document.querySelector("#third-life");

const laserAudio = document.querySelector("#laser");
const startGameAudio = document.querySelector("#startgame");
const themeMusic = document.querySelector("#theme-music");
const explosion = document.querySelector("#explosion");
const chewy = document.querySelector("#chewy");
const imperialMarch = document.querySelector("#imperial-march");
const rebelSong = document.querySelector("#rebel-song");
const bombAudio = document.querySelector("#bomb");

const start = document.querySelector("#start");
const reset = document.querySelector("#reset");

const highScoreList = document.querySelector("#highScores");

let level = 1;
let lives = 3;
let score = 0;

let playerIndex;
let introId;

scoreSpan.innerHTML = score;
levelSpan.innerHTML = level;

////// Intro to Game //////

const introSectionFunction = () => {
  themeMusic.play();
  themeMusic.volume = 0.1;
};

document.addEventListener("mousemove", introSectionFunction);

////// Start Game //////
start.addEventListener("click", startGame);

function startGame() {
  startContainer.classList.add("hidden");
  main.classList.remove("hidden");
  startGameAudio.play();
  startGameAudio.volume = 0.4;
  highScoreList.innerHTML = highScore.map(
    (score) => `<li>${score.score} - ${score.name}`
  );
  setTimeout(function () {
    startAliensRight();
    startBombing();
  }, 1000);
}

////// Constructing the Grid //////
const row = Array.from({ length: 19 }).fill("space");
const gridMap = row
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row)
  .concat(row);

gridMap.forEach((className, i) => {
  const newCell = document.createElement("div");
  grid.appendChild(newCell);
  newCell.classList.add(className, i);
});

const allCells = Array.from(document.querySelectorAll(".grid div"));

////// Initilise & Move Player //////
const playerStart = allCells[Math.floor(Math.random() * 10) + 190];
playerStart.classList.add("player");
playerIndex = allCells.indexOf(playerStart);

const handleArrowLeft = () => {
  const newIndex = playerIndex - 1;
  if (playerIndex % 19 === 0) {
    console.log("cant move - at edge");
    return;
  }
  allCells[playerIndex].classList.remove("player");
  allCells[newIndex].classList.add("player");
  playerIndex = newIndex;
};

const handleArrowRight = () => {
  const newIndex = playerIndex + 1;
  if ((playerIndex + 1) % 19 === 0) {
    console.log("cant move - at edge");
    return;
  }
  allCells[playerIndex].classList.remove("player");
  allCells[newIndex].classList.add("player");
  playerIndex = newIndex;
};

////// Initialise & Move Aliens //////
let interval;
let intervalSpeed = 1000;
const alienStart = [
  3, 5, 7, 9, 11, 13, 15, 23, 25, 27, 29, 31, 33, 41, 43, 45, 47, 49, 51, 53,
  61, 63, 65, 67, 69, 71,
];

let alienIndex = Array.from(alienStart);
alienIndex.forEach((alien) => allCells[alien].classList.add("alien"));

function moveAliens(indexChange) {
  const rightBoundary = (alienIndex) => (alienIndex + 1) % 19 === 0;
  const leftBoundary = (alienIndex) =>
    alienIndex === 0 || alienIndex % 19 === 0;
  switch (indexChange) {
    case 1:
      if (alienIndex.some(rightBoundary)) {
        stopAliens(indexChange);
        return;
      }
      break;
    case -1:
      if (alienIndex.some(leftBoundary)) {
        stopAliens(indexChange);
        return;
      }
      break;
  }
  for (let i = 0; i < alienIndex.length; i++) {
    allCells[alienIndex[i]].classList.remove("alien");
    alienIndex[i] = alienIndex[i] + indexChange;
    allCells[alienIndex[i]].classList.add("alien");
  }
}

function stopAliens(indexChange) {
  clearInterval(interval);
  moveAliensDown();
  indexChange === 1 ? startAliensLeft() : startAliensRight();
}

function moveAliensDown() {
  for (let i = 0; i < alienIndex.length; i++) {
    allCells[alienIndex[i]].classList.remove("alien");
    alienIndex[i] = alienIndex[i] + row.length;
    allCells[alienIndex[i]].classList.add("alien");
  }
  if (alienIndex.some((alien) => alien > 189)) {
    gameOver();
    return;
  }
}

function startAliensRight() {
  interval = setInterval(function () {
    moveAliens(1);
  }, intervalSpeed);
}

function startAliensLeft() {
  interval = setInterval(function () {
    moveAliens(-1);
  }, intervalSpeed);
}

////// Initalise bullet //////
let newBullet;
let bulletIndex;
let bulletInterval;

function addBullet() {
  if (allCells.some((cell) => cell.classList.contains("bullet"))) {
    return;
  }
  bulletIndex = playerIndex;
  laserAudio.play();
  laserAudio.volume = 0.3;
  bulletInterval = setInterval(function () {
    moveBullet(bulletIndex);
  }, 100);
}

////// Fire Bullet //////
function moveBullet(bulletIndex) {
  newBullet = bulletIndex - row.length;
  console.log(newBullet);
  if (newBullet <= 0) {
    stopBullet();
    return;
  } else if (allCells[newBullet].classList.contains("alien")) {
    killAlien(newBullet);
    return;
  } else {
    moveBulletUp(newBullet);
  }
}

function moveBulletUp(newBullet) {
  allCells[bulletIndex].classList.remove("bullet");
  allCells[newBullet].classList.add("bullet");
  bulletIndex = newBullet;
}

function stopBullet() {
  clearInterval(bulletInterval);
  allCells[bulletIndex].classList.remove("bullet");
}

function killAlien(newBullet) {
  allCells[newBullet].classList.remove("alien");
  allCells[newBullet].classList.add("explosion");
  setTimeout(() => allCells[newBullet].classList.remove("explosion"), 700);
  alienIndex.splice(alienIndex.indexOf(newBullet), 1);
  stopBullet();
  score += 50;
  scoreSpan.innerHTML = score;
  explosion.play();
  explosion.volume = 0.4;
  if (!allCells.some((cell) => cell.classList.contains("alien"))) {
    level++;
    newEmperialWave();
    levelSpan.innerHTML = level;
  }
}

function newEmperialWave() {
  clearInterval(interval);
  clearInterval(bulletInterval);
  clearInterval(bombing);
  intervalSpeed = intervalSpeed * 0.8;
  alienIndex = Array.from(alienStart);
  startAliensRight();
  startBombing();
}

///// Start Bombing /////
let bombing;
let bombInterval;
let bombIndex;

function startBombing() {
  bombing = setInterval(startBomb, 3000);
}

function startBomb() {
  const randomCell = Math.ceil(Math.random() * 19);
  bombIndex = randomCell;
  bombAudio.play();
  bombAudio.volume = 0.3;
  bombInterval = setInterval(function () {
    dropBomb(bombIndex);
  }, 200);
}

function dropBomb(bombIndex) {
  const newBombIndex = bombIndex + row.length;
  if (newBombIndex >= allCells.length) {
    stopBomb();
    return;
  } else if (allCells[newBombIndex].classList.contains("player")) {
    stopBomb();
    hitPlayer(newBombIndex);
    return;
  } else if (allCells[newBombIndex].classList.contains("blockade")) {
    stopBomb();
    hitBlockade(newBombIndex);
  } else {
    moveBombDown(newBombIndex);
  }
}

function stopBomb() {
  clearInterval(bombInterval);
  allCells[bombIndex].classList.remove("bomb");
}

function hitPlayer(newBombIndex) {
  allCells[newBombIndex].classList.remove("player");
  allCells[newBombIndex].classList.add("explosion");
  setTimeout(() => allCells[newBombIndex].classList.remove("explosion"), 1500);
  explosion.play();
  explosion.volume = 0.4;
  allCells[playerIndex].classList.add("player");
  lives--;
  checkLives();
}

function moveBombDown(newBombIndex) {
  allCells[bombIndex].classList.remove("bomb");
  allCells[newBombIndex].classList.add("bomb");
  bombIndex = newBombIndex;
}

function checkLives() {
  if (lives === 2) {
    thirdLife.classList.add("hidden");
  } else if (lives === 1) {
    secondLife.classList.add("hidden");
  } else if (lives === 0) {
    gameOver();
  }
}

////// Blockades //////
const blockades = [173, 174, 175, 179, 180, 181, 185, 186, 187];
blockades.forEach((cell) => allCells[cell].classList.add("blockade"));
blockades.forEach((cell) => allCells[cell].classList.add("undamaged"));

function hitBlockade(index) {
  if (allCells[index].classList.contains("undamaged")) {
    allCells[index].classList.remove("undamaged");
    allCells[index].classList.add("damaged");
  } else if (allCells[index].classList.contains("damaged")) {
    allCells[index].classList.remove("damaged");
    allCells[index].classList.remove("blockade");
  }
}

////// Saving High Scores //////

const noOfHighScores = 10;
const highScores = "highScores";

const highScoreString = localStorage.getItem(highScores);
const highScore = JSON.parse(highScoreString) ?? [];

function checkHighScore(score) {
  const highScore = JSON.parse(localStorage.getItem(highScores)) ?? [];
  const lowestScore = highScore[noOfHighScores - 1]?.score ?? 0;

  if (score > lowestScore) {
    saveHighScore(score, highScore);
    showHighScores();
  }
}

function saveHighScore(score, highScore) {
  const name = prompt("You got a highscore! Enter name:");
  const newScore = { score, name };

  highScore.push(newScore);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(noOfHighScores);
  localStorage.setItem(highScores, JSON.stringify(highScore));
}

function showHighScores() {
  const highScore = JSON.parse(localStorage.getItem(highScores)) ?? [];
  const highScoreList = document.querySelector("#highScores");

  highScoreList.innerHTML = highScore
    .map((score) => `<li>${score.score} - ${score.name}`)
    .join("");
}

////// Game Over //////
const playGameAgain = () => {
  chewy.play();
  chewy.volume = 0.5;
  document.location.reload();
};

playAgain.addEventListener("click", playGameAgain);

function gameOver() {
  themeMusic.pause();
  themeMusic.currentTime = 0;
  document.removeEventListener("mousemove", introSectionFunction);
  clearInterval(introId);
  clearInterval(interval);
  clearInterval(bombing);
  imperialMarch.play();
  imperialMarch.volume = 0.7;
  gameOverPopup.classList.remove("hidden");
  finalScore.innerHTML = score;
  checkHighScore(score);
}

////// Reset Game //////
const resetGame = () => {
  chewy.play();
  chewy.volume = 0.5;
  document.location.reload();
};

reset.addEventListener("click", resetGame);

////// Event Listeners //////
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      handleArrowLeft();
      break;
    case "ArrowRight":
      handleArrowRight();
      break;
    case " ":
      addBullet();
      break;
  }
});
