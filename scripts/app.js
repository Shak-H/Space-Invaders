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

const start = document.querySelector("#start");
const reset = document.querySelector("#reset");

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
  setTimeout(function () {
    startAliensRight();
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

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      handleArrowLeft();
      break;
    case "ArrowRight":
      handleArrowRight();
      break;
  }
});

const checkLives = () => {
  if (firstLife.classList.contains("first-life")) {
    firstLife.classList.remove("first-life");
    firstLife.classList.add("removed-life");
  } else if (secondLife.classList.contains("second-life")) {
    secondLife.classList.remove("second-life");
    secondLife.classList.add("removed-life");
  } else if (thirdLife.classList.contains("third-life")) {
    secondLife.classList.remove("third-life");
    secondLife.classList.add("removed-life");
    result.innerHTML = "No Lives left. GAME OVER";
  }
};

const destroyedEmperialWave = () => {
  // rebelSong.play()
  result.innerHTML =
    "WINNER!!! .... Well done, you have the destroyed the Galactic fleet. May the force be with you!";
  level++;
  newEmperialWave();
};

const newEmperialWave = () => {
  clearInterval(alienId);

  result.innerHTML = `Level ${level}`;
  movementSpeed *= 0.9;
  alienIndexes = aliens;
  addNextAliens();
  moveAliens();
};

////// Initalise bullet //////

const addBullet = () => {
  if (cells[playerIndex - 10].classList.contains("alien")) {
    cells[playerIndex - 10].classList.remove("alien");
  }
  return cells[playerIndex - 10].classList.add("bullet");
};

////// Fire Bullet //////

let fireBulletId;
const fireBullet = () => {
  fireBulletId = setInterval(() => {
    Array.from(cells).map((cell) => {
      if (cell.classList.contains("bullet")) {
        let index = Array.from(cells).indexOf(cell);
        console.log("index", index);
        if (index < 10) {
          cells[index].classList.remove("bullet");
          clearInterval(fireBulletId);
        } else if (cells[index - 10].classList.contains("alien")) {
          cells[index - 10].classList.remove("alien");
          cells[index].classList.remove("bullet");
          cells[index - 10].classList.add("explosion");

          setTimeout(
            () => cells[index - 10].classList.remove("explosion"),
            700
          );
          const alienRemoved = alienIndexes.indexOf(index - 10);
          aliensRemoved.push(alienRemoved);
          currentScore += 50;
          score.innerHTML = currentScore;
          explosion.play();
          clearInterval(fireBulletId);
          if (aliensRemoved.length === alienIndexes.length) {
            destroyedEmperialWave();
          }
        } else {
          cells[index - 10].classList.add("bullet");
          cells[index].classList.remove("bullet");
        }
      }
    });
  }, 600);
};

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "f":
      console.log("pressed f key");
      addBullet();
      fireBullet();
      setTimeout(function () {
        laserAudio.play();
        setTimeout(function () {
          laserAudio.pause();
          laserAudio.currentTime = 0;
        }, 500);
      }, 50);
      break;
  }
});

////// Reset Game //////

const resetGame = () => {
  // clearFunction()
  chewy.play();
  chewy.volume = 0.5;
  document.location.href = "";
};

reset.addEventListener("click", resetGame);
