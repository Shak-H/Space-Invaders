// variable needed to start/reset game

let movingRight = true
const width = 10
let direction = 1
let alienId
let introId
const lives = document.querySelector('#lives')
const firstLife = document.querySelector('#first-life')
const secondLife = document.querySelector('#second-life')
const thirdLife = document.querySelector('#third-life')
let currentLives = 3
let aliensRemoved = []
const score = document.querySelector('#score')
let currentScore = 0
const result = document.querySelector('#game-status')
const laserAudio = document.querySelector('#laser')
const startGameAudio = document.querySelector('#startgame')
const introSection = document.querySelector('.intro')
const themeMusic = document.querySelector('#theme-music')
const explosion = document.querySelector('#explosion')

//play music and scroll text when mouse hovers over intro section

const introSectionFunction = () => {
   themeMusic.play()
}

document.addEventListener('mousemove', introSectionFunction)

// have random amount of aliens appear on first 3 rows
let cells = document.querySelectorAll('.grid div')


const allCellsArray = Array.from(cells)

const startingRowsOfNodes = Array.from(cells).slice(0, 29)
// console.log('startingRowOfNodes.length', startingRowsOfNodes.length)
const startingRows = allCellsArray.slice(0, 29)
// console.log('startingRows', startingRows)
const remainingRowsOfNodes = Array.from(cells).slice(28,99)

const fullGridOfNodesWithRandomAlienClasses = startingRowsOfNodes.concat(remainingRowsOfNodes)
// console.log('fullGridOfNodesWithRandomAlienClasses', fullGridOfNodesWithRandomAlienClasses)

const remainingRows = allCellsArray.slice(28, 99)
// console.log('remainingRows', remainingRows)

const randomisedAliens = () => {
  if (Math.random() > 0.5){
    return 'alien'
  }
}

// console.log('randomisedAliens', randomisedAliens())

let firstAliens = startingRows.map(randomisedAliens)
// console.log('firstAliens', firstAliens)

let gridMap = firstAliens.concat(remainingRows)
// console.log('gridMap', gridMap)

const addAliens = () => {
  for(let i=0; i<gridMap.length; i++) {
    if(gridMap[i]==='alien')
    allCellsArray[i].classList.add('alien')
  }
  }

  const removeAliens = () => {
    for (let i = 0; i < alienIndexes.length; i++) {
      allCellsArray[alienIndexes[i]].classList.remove('alien')
    }
  }

// const aliens = [
//   0,1,2,3,4,5,6,
//   10,11,12,13,14,15,16,
//   20,21,22,23,24,25,26,
// ]

const addNextAliens = () => {
  for(let i = 0; i < alienIndexes.length; i++) {
    if(!aliensRemoved.includes(i))
    allCellsArray[alienIndexes[i]].classList.add('alien')
  }
}

// const removeAliens = () => {
//   for (let i = 0; i < aliens.length; i++) {
//     allCellsArray[aliens[i]].classList.remove('alien')
//   }
// }

//add player to random cell in bottom row
const playerStartingCell = cells[(Math.floor(Math.random()*10))+90]
const addPlayer = () => {
  playerStartingCell.classList.add('player')
}

//move player

let playerIndex = Array.from(cells).indexOf(playerStartingCell)
console.log('playerIndex', playerIndex)

const handleArrowLeft = () => {
    const newIndex = playerIndex -1
    if (playerIndex % 10 === 0) {
    console.log('cant move - at edge')
    return
  }
  cells[playerIndex].classList.remove('player')
  cells[newIndex].classList.add('player')
  playerIndex = newIndex
}

const handleArrowRight = () => {
  const newIndex = playerIndex +1
  if ((playerIndex+1) % 10 === 0) {
  console.log('cant move - at edge')
  return
}
cells[playerIndex].classList.remove('player')
cells[newIndex].classList.add('player')
playerIndex = newIndex
}

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'ArrowLeft':
      handleArrowLeft()
      break
    case 'ArrowRight':
      handleArrowRight()
      break
  }
})

// move aliens

function findAliens(arr, val) {
  let indexes = [];
  let i=-1;
  while((i=arr.indexOf(val, i+1)) != -1) {
    indexes.push(i)
  }
  return indexes
}

let alienIndexes = findAliens(gridMap, 'alien')
// console.log('alienIndexes', alienIndexes)

// console.log('cells[alienIndexes]', allCellsArray[alienIndexes])

// const addNextAliens = () => {
//   for(let i=0; i<aliens.length; i++) {
//     allCellsArray[aliens[i]].classList.add('alien')
//   }
// }
// const newIndexes = (array, x) => {
//   return array.map((index) => index+x)
// }
// console.log('newIndexes(alienIndexes)', newIndexes(alienIndexes, -1))
// const moveDown = () => {

// }

const moveAliens = () => {
  
  aliensId = setInterval(() => {
   
  // const atLeftEdge = aliens[0] % 10 === 0
  const atLeftEdge = (alienIndexes) => {
    alienIndexes % 10 === 0
  }
  // const atRightEdge = aliens[aliens.length - 1] % 10 === 9
  const atRightEdge = (alienIndexes) => {
    alienIndexes % 10 === 9
  }
  const moveDown = () => {
    for(let i = 0; i < alienIndexes.length; i++) {
      alienIndexes[i] += width
    }
  }
  removeAliens()

  if (alienIndexes.some(atRightEdge) && movingRight) {
      moveDown()
      direction = -1
      movingRight = false
    
  } else if (alienIndexes.some(atLeftEdge) && !movingRight) {
      moveDown()
      direction = 1
      movingRight = true
    
  } else {
    for(let i = 0; i < alienIndexes.length; i++) {
      alienIndexes[i] += direction
    }
  }

  addNextAliens()

  const bottomRow = allCellsArray.slice(90, 99)
  for(let i = 0; i < bottomRow.length; i++)
  if(bottomRow[i].classList.contains('alien')){
    result.innerHTML = 'The Galactic fleet have passed the blockade and have nearly reached the rebel base. You have lost a life'
    currentLives --
    lives.innerHTML = currentLives
    firstLife.style.background = 'rgba(255, 255, 255, 0)'
    clearInterval(aliensId)
  }

  if (aliensRemoved.length === alienIndexes.length) {
    result.innerHTML = 'Well done, you have the destroyed the Galactic fleet. May the force be with you!'
    clearInterval(aliensId)
  }
}, 2000)
}

//initalise bullet

const addBullet = () => {
  if(cells[playerIndex-10].classList.contains('alien')){
    cells[playerIndex-10].classList.remove('alien')
  }
  return cells[playerIndex-10].classList.add('bullet')
}

//fire bullet

let fireBulletId
const fireBullet = () => {
  fireBulletId = setInterval(() => {
  Array.from(cells).map(cell => {
    if (cell.classList.contains('bullet')) {
      let index = Array.from(cells).indexOf(cell)
      console.log('index', index)
      if (index<10){
        cells[index].classList.remove('bullet')
        clearInterval(fireBulletId)
      } else if (cells[index-10].classList.contains('alien')){
        cells[index - 10].classList.remove('alien')
        cells[index].classList.remove('bullet')
        const alienRemoved = alienIndexes.indexOf(index-10)
        aliensRemoved.push(alienRemoved)
        currentScore += 50
        score.innerHTML = currentScore
        explosion.play()
        clearInterval(fireBulletId)
      } else {
      cells[index - 10].classList.add('bullet')
      cells[index].classList.remove('bullet')
      } 
    } 
    }
  ) 
}, 600) 
}

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'f':
      console.log('pressed f key')
      addBullet()
      fireBullet()
      setTimeout(function() {
        laserAudio.play()
        setTimeout(function(){
          laserAudio.pause()
          laserAudio.currentTime = 0
        }, 500)
      }, 50) 
      break
    }
})

//start game function

const start = document.querySelector('#start')

const startGame = () => {
  addPlayer()
  setTimeout(function(){
    addAliens()
    moveAliens()
  },4000)
  startGameAudio.play()
}

start.addEventListener('click', startGame)

//reset game function 

const clearPlayer = () => {
  allCellsArray[playerIndex].classList.remove('player')
}

const clearAliens = () => {
    removeAliens()
    clearInterval(aliensId)
  
} 

// const resetAliens = () => {
//   firstAliens = startingRows.map(randomisedAliens)
//   gridMap = firstAliens.concat(remainingRows)
// }

const resetLives = () => {
    firstLife.style.background = 'url(./images/mil-falcon.JPG)'
    secondLife.style.background = 'url(./images/mil-falcon.JPG)'
    thirdLife.style.background = 'url(./images/mil-falcon.JPG)'
    currentLives = 3
}

const clearScore = () => {
  currentScore = 0
  score.innerHTML = currentScore
}

const clearFunction = () => {
  clearPlayer()
  clearAliens()
  clearScore()
  // resetAliens()
}


const reset = document.querySelector('#reset')

const resetGame = () => {
  clearFunction()
}

reset.addEventListener('click', resetGame)