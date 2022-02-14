// starting variables
let cells = document.querySelectorAll(".grid div");
let movingRight = true;
const width = 10;
let direction = 1;

let currentLives = 3;
let currentScore = 0;
let aliensRemoved = [];
let alienId;
let introId;

const lives = document.querySelector("#lives");
const firstLife = document.querySelector(".first-life");
const secondLife = document.querySelector(".second-life");
const thirdLife = document.querySelector(".third-life");
const score = document.querySelector("#score");
const result = document.querySelector("#game-status");
const laserAudio = document.querySelector("#laser");
const startGameAudio = document.querySelector("#startgame");
const introSection = document.querySelector(".intro");
const themeMusic = document.querySelector("#theme-music");
const explosion = document.querySelector("#explosion");
const chewy = document.querySelector("#chewy");
const imperialMarch = document.querySelector("#imperial-march");
const rebelSong = document.querySelector("#rebel-song");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");

let level = 1;
let movementSpeed = 1000;

////// Intro to Game - play music and scroll text when mouse hovers over page //////

const introSectionFunction = () => {
  themeMusic.play();
  themeMusic.volume = 0.1;
};

document.addEventListener("mousemove", introSectionFunction);

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

////// Initialise Aliens - have random amount of aliens appear on first 3 rows //////

let allCellsArray = Array.from(cells);
let startingRows = allCellsArray.slice(0, 29);
let remainingRows = allCellsArray.slice(28, 99);

let randomisedAliens = () => {
  if (Math.random() > 0.5) {
    return "alien";
  }
};

let firstAliens = startingRows.map(randomisedAliens);
let gridMap = firstAliens.concat(remainingRows);

const addAliens = () => {
  for (let i = 0; i < gridMap.length; i++) {
    if (gridMap[i] === "alien") allCellsArray[i].classList.add("alien");
  }
};

const removeAliens = () => {
  for (let i = 0; i < alienIndexes.length; i++) {
    allCellsArray[alienIndexes[i]].classList.remove("alien");
  }
};

const aliens = [
  0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26,
];

const addNextAliens = () => {
  for (let i = 0; i < alienIndexes.length; i++) {
    if (!aliensRemoved.includes(i))
      allCellsArray[alienIndexes[i]].classList.add("alien");
  }
};

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

////// Move Aliens //////

function findAliens(arr, val) {
  let indexes = [];
  let i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

let alienIndexes = findAliens(gridMap, "alien");

const bottomRow = allCellsArray.slice(90, 99);

const atLeftEdge = (alienIndexes) => {
  alienIndexes % 10 === 0;
};
const atRightEdge = (alienIndexes) => {
  alienIndexes % 10 === 9;
};
const moveDown = () => {
  for (let i = 0; i < alienIndexes.length; i++) {
    alienIndexes[i] += width;
  }
  for (let i = 0; i < bottomRow.length; i++) {
    if (bottomRow[i].classList.contains("alien")) {
      // imperialMarch.play()
      result.innerHTML =
        "YOU WERE DESTROYED!! .... The Galactic fleet have passed the blockade and have nearly reached the rebel base. You have lost a life";
      currentLives--;
      clearInterval(alienId);
      lives.innerHTML = currentLives;
      checkLives();
    }
  }
};

const moveAliens = () => {
  alienId = setInterval((movementSpeed) => {
    removeAliens();

    if (alienIndexes.some(atRightEdge) && movingRight) {
      moveDown();
      direction = -1;
      movingRight = false;
    } else if (alienIndexes.some(atLeftEdge) && !movingRight) {
      moveDown();
      direction = 1;
      movingRight = true;
    } else {
      for (let i = 0; i < alienIndexes.length; i++) {
        alienIndexes[i] += direction;
      }
    }
    addNextAliens();
  }, movementSpeed);
};

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

////// Start Game //////

const startGame = () => {
  aliensRemoved = [];
  removeAliens();
  for (let i = 0; i < gridMap.length; i++) {
    allCellsArray[i].classList.remove("alien");
  }
  firstAliens = null;

  for (let i = 0; i < gridMap.length; i++) {
    if (gridMap[i] === "alien") gridMap[i] = null;
  }
  addPlayer();
  setTimeout(function () {
    addAliens();
    moveAliens();
  }, 4000);
  startGameAudio.play();
};

////// Reset Game //////

const resetGame = () => {
  // clearFunction()
  chewy.play();
  chewy.volume = 0.5;
  document.location.href = "";
};

reset.addEventListener("click", resetGame);
start.addEventListener("click", startGame);
