# SPACE INVADERS - GA PROJECT 1

![gif](https://github.com/Shak-H/Space-Invaders/blob/main/space-invaders-gif2.gif)

## TABLE OF CONTENTS

- [Overview](#overview)
  - [Technologies Used](#technologies)
  - [Deployment](#deployment)
- [Brief](#brief)
- [Development Process](#dev-process)
  - [Planning](#planning)
  - [Reaching MVP](#mvp)
  - [Stretch Goals](#stretch)
- [Wins & Challenges](#wins-challenges)
- [Bugs & Known Errors](#bugs)
- [Future Improvements](#improvements)
- [Key Learnings](#learnings)

## <a name='overview'>OVERVIEW</a>

My first dev project for the Software Engineering Immersive course and also my first ever project using JavaScript.

#### *UPDATE - since completing the course I spent 3 days editing and improving the project.

### <a name='technologies'>TECHNOLOGIES USED</a>

- HTML5
- CSS3
- JavaScript
- Git / GitHub

### <a name='deployment'>DEPLOYED PROJECT LINK</a>

The game has been deployed in GitHub pages and is available [here](https://shak-h.github.io/Space-Invaders/).

### <a name='brief'>BRIEF</a>

We were briefed with creating a game using JS grids. I decided to create the game Space Invaders, with a Star Wars theme. Where players would be able to play the part of Han Solo, fighting a fleet of TIE fighters, in the iconic Millennium Falcon.

Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.

The player can only move left or right. The aliens also move from left to right, and also down each time they reach the side of the screen. The aliens also periodically drop bombs towards the player.

Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

## <a name='dev-process'>DEVELOPMENT PROCESS</a>

### <a name='planning'>PLANNING</a>

My initial research for the game started when I was around 12 years old and first played Space Invaders on my fathers PC, the first video game I ever played. So when the opportunity came to create a grid based game, choosing Space Invaders was an easy decision.

I started developing the game by sketching out a wireframe to help visualise how the game would look, along with some of the HTML and CSS that would be required.

![image](https://user-images.githubusercontent.com/81522060/151721980-1e6493b2-0ac2-447f-a6df-f04342f6bc7e.png)

I then listed the functionality I wanted to include before deciding which would be part of the MVP and which would be my stretch goals.

Using the wireframe and planned functionality, I wrote pseudocode for the MVP, breaking it down into bite size chunks to allow me to think through all the necessary steps that were required. Here’s an example of pseudocode for the player movement logic:

```

<!-- // move player -->
<!-- document.addEventListener('keydown') with function with switch statement that calls
 function for player movement dependent on key pressed -->
<!-- function for move in certain direction depending on which key pressed -->
   <!-- needs to add and remove alien class -->
   <!-- player index needs to change with each move -->
   <!-- needs to know if player at edge -->
<!-- function to stop players moving off edge -->

```

### <a name="mvp">REACHING MVP</a>

#### Building the grid

#### *UPDATE

When improving my project I decided to change how I constructed the grid. I used the `from()` and `fill()` array methods to create rows of a fixed length, and `concat()` to construct a grid of 11 rows. I then used `forEach()` to loop over the grid array and for each index: create a `div` element; create class names from the index and fill string; and append the div to the main grid div in my HTML.

```

gridMap.forEach((className, i) => {
  const newCell = document.createElement("div");
  grid.appendChild(newCell);
  newCell.classList.add(className, i);
});

```

#### *ORIGINAL CODE

The first step was creating the grid. I did this using a combination of HTML and CSS. I created a div with a class of “grid”, which contained a separate `div` for each cell and then styled the grid using CSS.

```

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  height: 76%;
  width: 85%;
}

```

#### Aliens

#### *UPDATE

Having the aliens appear in random cells made it difficult to add extra features to my game so I decided to change how they appeared and moved. I wrote a function to move the aliens across the grid at a set interval, checking each time to see if some hit the edges of the grid. If the aliens reach the edge, they will move down and start in the other direction. However, if they have hit the bottom player row, it’s game over.

```

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

```

#### *ORIGINAL CODE

I decided early on that I wanted the aliens to start in random cells on the grid (a decision that in hindsight I would not have made), and I suspected having them move in unison, in particular when moving down together, would be one of the more challenging aspects of the project. I first wrote functions to allow the aliens to randomly appear on the first 3 rows.

```

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

```

I then wrote functions to; find the indexes of the aliens, check if they were at the edge of the grid, and then move down, which would also check to see if the aliens had reached the bottom row of the grid.

```

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
console.log("bottomRow", bottomRow);

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
      console.log("hit bottom row");
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

```

Finally, I wrote a function to move the aliens across the grid at a set interval, and calling the other functions where appropriate.

```

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

```

#### Player Start Position & Movement

I had my aliens, now I needed my player. Again, I wanted the player to appear in a random cell on the bottom row of the grid.

```

const playerStart = allCells[Math.floor(Math.random() * 10) + 190];
playerStart.classList.add("player");
playerIndex = allCells.indexOf(playerStart);

```

I wrote a function to find the index of the player to allow for movement and then added event listeners and functions to handle left and right arrow keydowns, including logic to check if the player had reached the edge of the grid.

```

const handleArrowLeft = () => {
  const newIndex = playerIndex - 1;
  if (playerIndex % 10 === 0) {
    console.log("cant move - at edge");
    return;
  }
  cells[playerIndex].classList.remove("player");
  cells[newIndex].classList.add("player");
  playerIndex = newIndex;
};

const handleArrowRight = () => {
  const newIndex = playerIndex + 1;
  if ((playerIndex + 1) % 10 === 0) {
    console.log("cant move - at edge");
    return;
  }
  cells[playerIndex].classList.remove("player");
  cells[newIndex].classList.add("player");
  playerIndex = newIndex;
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

```

#### Lasers

#### *UPDATE

The change to the Grid meant I also needed to change the way my lasers moved. Now on keydown, a bullet is generated at the player’s current index and moves up the grid at a set interval. If it hits an alien, it calls a function to kill the alien, removing it from the grid, and increases the player’s score accordingly. If there are no aliens left on the grid, the aliens regenerate to their starting position and the level increases by 1. Here’s my `killAlien` function:

```

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

```
I also decided to add a function to have lasers fired at the player. I used similar logic to the lasers for moving the bombs down the grid, however initialising the bombs required an interval and a random index to be generated for the starting position each time. If a bomb hit the player, the player would be reset to their original starting position, and a life would be taken away. If the player had no lives left, game over!

```
function hitPlayer(newBombIndex) {
  allCells[newBombIndex].classList.remove("player");
  allCells[newBombIndex].classList.add("explosion");
  setTimeout(() => allCells[newBombIndex].classList.remove("explosion"), 1500);
  explosion.play();
  explosion.volume = 0.4;
  allCells[playerIndex].classList.add("player");
  score -= 45;
  lives--;
  checkLives();
}
```

#### *ORIGINAL CODE

With the aliens and player now moving (somewhat) correctly, I now needed to give the player the ability to shoot the aliens. I added a keydown event listener for the Spacebar, which would call a function to generate a laser to appear directly above the players current index, as well as, a sound effect on a timeout to go with it, as well as, calling another function to move up the grid at a set interval.

```

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case " ":
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

```

If it hits the alien, it calls a function which would remove the alien, add an explosion and sound effect, and add to the players score.

```

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

```

#### Design & Audio

#### *UPDATE

As part of my update, I really wanted the intro be seperate to the actually game play. I used classes to toggle elements from hidden to visible. An event listener for the start game button would hide the intro display div and make the main game container visible. If the player runs out of lives, this toggles the game over div to visible, displaying the player’s final score and a play again button.

![image](https://user-images.githubusercontent.com/81522060/154309742-1d53bb4e-0bce-433f-b17f-ddf070e85260.png)

![image](https://user-images.githubusercontent.com/81522060/154309828-bd1c8345-042c-4c0b-8b1f-3f204e19ada6.png)

![image](https://user-images.githubusercontent.com/81522060/154309882-d864cc08-fccf-4e23-9656-a5e082c7d98e.png)

#### *ORIGINAL CODE

I really wanted a theme for the game, rather than copying the original Space Invaders, and Star Wars was a perfect fit.

### <a name='stretch'>STRETCH GOALS</a>

#### *UPDATE

Apart from adding lasers being fired at the player, I also wanted to create a blockade and have high scores saved locally.

For the blockade, in the row above the player, I added a `.blockade` class to nine grid cells to create three blockade rows. I also initialised these blockades with a class of `.undamaged`. If a dropped bomb collides with a blockade, it changes the `.undamaged` class to `.damaged`, and the blockade visually shrinks. If a `.damaged` cell is hit again, the `.blockade` class is removed and it disappears, reducing the player’s protection.

To save high scores, I wrote three functions. One would check the score, to see if it was higher than the current 10 highest. Next was saving the high score in a key value pair, with the score and the player name, stored using the `prompt` method. Thirdly, I had to display the high scores, I did this using the `map` method adding an ordered list item to each score in my high score array.

```

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

```

#### *ORIGINAL CODE

Once my MVP was complete I was able to start working on some of my stretch goals.

The first was adding sound effects. I wanted the user to have as many of their senses stimulated as possible, as well as, giving them the full Star Wars experience. This meant using appropriate sound effects where possible. I did this by not only adding lazer and explosion sounds using set Timeouts to make them smooth, but also by adding the rolling text and Star Wars theme tune as soon as the page was clicked on.

```

const introSectionFunction = () => {
  themeMusic.play();
  themeMusic.volume = 0.1;
};

```

I also wanted to add levels with increasing difficulty by making the speed of the alien movement increase. I was able to add the increasing levels with faster movement, however, the randomised initialisation of the aliens caused a bug, where the number of aliens on each wave decreased, so that by the third wave no aliens appeared.

## <a name='wins-challenges'> WINS & CHALLENGES</a>

I was really happy with how the game looked and sounded. The theme was very clear and there were lots of aspects that supported the theme, from graphics to sounds. While I would not choose to have randomly appearing aliens again, due to the complications it caused, I was still happy I was able to make the MVP work with this feature included.

I was most challenged by the alien movement - getting them to move in sync, in the right direction, and drop when any one alien hit the barrier was a challenge. Also, as my first programming project, I was challenged by the intensity of concentration and the frustration that can be experienced when your code does not quite work the way you want it to. I had my first trip to the dreaded JS valley of despair, but came out all the better for it.

## <a name='bugs'>KNOWN BUGS & ERRORS</a>

#### *UPDATE
The first two bugs below have been fixed.

- When you advance to the second level the number of aliens that appear reduces, and then by the third level there are no aliens left.
- If the aliens reach the bottom row where the player is, the game continues.
- Occasionally, the laser will pass through an alien without killing it and instead hit the next alien above.
- The ‘play again’ button refreshes the page entirely instead of resetting the elements to a start state.

## <a name='improvements'>FUTURE IMPROVEMENTS</a>

#### *UPDATE
The first two points below have been added/fixed.

- High Scores scoreboard using local storage.
- Fix the bug for when levels increase.
- Add the ability for aliens to fire lasers.
- Add different types of aliens with different points, including bonus UFO.
- Add responsive design.
- Add the ability for the user to select different characters.

## <a name='learnings'>KEY LEARNINGS</a>

- Prioritising my time was a big take away, I realised I probably spent too much time on styling, that could have been used to improve the functionality of the game.
- JavaScript fundamentals. This was my first JavaScript project and no frameworks were used so it really solidified the JS concepts, methods, and DOM manipulation I’d learnt so far.
- Planning! Resisting the urge to start coding immediately was difficult, but writing detailed pseudocode made the development process much easier, particularly for the more challenging logic.
- Four weeks into a career switch bootcamp, I absolutely loved building this project. It made me certain that software engineering is the right path for me.
