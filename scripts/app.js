// starting variables
let cells = document.querySelectorAll('.grid div')
let movingRight = true
const width = 10
let direction = 1
let alienId
let introId
const lives = document.querySelector('#lives')
const firstLife = document.querySelector('.first-life')
const secondLife = document.querySelector('.second-life')
const thirdLife = document.querySelector('.third-life')
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
const start = document.querySelector('#start')
const reset = document.querySelector('#reset')
let levelTwo = false

//play music and scroll text when mouse hovers over page

const introSectionFunction = () => {
   themeMusic.play()
}

document.addEventListener('mousemove', introSectionFunction)

// have random amount of aliens appear on first 3 rows


let allCellsArray = Array.from(cells)
let startingRows = allCellsArray.slice(0, 29)
let remainingRows = allCellsArray.slice(28, 99)

let randomisedAliens = () => {
  if (Math.random() > 0.5){
    return 'alien'
  }
}

let firstAliens = startingRows.map(randomisedAliens)
let gridMap = firstAliens.concat(remainingRows)

const resetAliens = () => {
  let allCellsArray = Array.from(cells)
  let startingRows = allCellsArray.slice(0, 29)
  let remainingRows = allCellsArray.slice(28, 99)
  
  let randomisedAliens = () => {
    if (Math.random() > 0.5){
      return 'alien'
    }
  }
  let firstAliens = startingRows.map(randomisedAliens)
  let gridMap = firstAliens.concat(remainingRows)
  }

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
   
  const atLeftEdge = (alienIndexes) => {
    alienIndexes % 10 === 0
  }
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
    clearInterval(aliensId)
    lives.innerHTML = currentLives
    if(firstLife.classList.contains('first-life')) {
      firstLife.classList.remove('first-life')
      firstLife.classList.add('removed-life')
  } else if (secondLife.classList.contains('second-life')) {
    secondLife.classList.remove('second-life')
    secondLife.classList.add('removed-life')
  } else if (thirdLife.classList.contains('third-life')) {
    secondLife.classList.remove('third-life')
    secondLife.classList.add('removed-life')
    result.innerHTML = 'No Lives left. GAME OVER'
  }
  }

  if (aliensRemoved.length === alienIndexes.length) {
    result.innerHTML = 'Well done, you have the destroyed the Galactic fleet. May the force be with you!'
    clearInterval(aliensId)
    levelTwo = true
  }
}, 900)
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
        cells[index - 10].classList.add('explosion')

        setTimeout(()=>cells[index - 10].classList.remove('explosion'), 700)
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

const startGame = () => {
  aliensRemoved = []
    removeAliens()
    for(let i=0; i<gridMap.length; i++) {
      allCellsArray[i].classList.remove('alien')
    }
    firstAliens = null
    
    for(let i=0; i<gridMap.length; i++) {
      if(gridMap[i]==='alien')
      gridMap[i] = null
    }
  addPlayer()
  setTimeout(function(){
    addAliens()
    moveAliens()
  },4000)
  startGameAudio.play()
}

//reset game function 

const clearPlayer = () => {
  allCellsArray[playerIndex].classList.remove('player')
  playerStartingCell.classList.remove('player')
}

const clearAliens = () => {
    aliensRemoved = []
    removeAliens()
    for(let i=0; i<gridMap.length; i++) {
      allCellsArray[i].classList.remove('alien')
    }
    firstAliens = null
    
    for(let i=0; i<gridMap.length; i++) {
      if(gridMap[i]==='alien')
      gridMap[i] = null
    }

    clearInterval(aliensId)
  
} 



const resetLives = () => {
    firstLife.classList.add('first-life')
    secondLife.classList.add('second-life')
    thirdLife.classList.add('third-life')
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
  resetAliens()
}

const resetGame = () => {
  clearFunction()
}

reset.addEventListener('click', resetGame)
start.addEventListener('click', startGame)

//Level Two 

// if (levelTwo = true) {

//  //add player to random cell in bottom row
//  playerStartingCell = cells[(Math.floor(Math.random()*10))+90]
 
//  addPlayer()

//  //move player
  
//  playerIndex = Array.from(cells).indexOf(playerStartingCell)
 
//  //initalise Aliens

//   allCellsArray = Array.from(cells)
//   startingRows = allCellsArray.slice(0, 29)
//   remainingRows = allCellsArray.slice(28, 99)
  
//   firstAliens = startingRows.map(randomisedAliens)
//   gridMap = firstAliens.concat(remainingRows)
  
//   addAliens()
    
//   // move aliens
  
//   let alienIndexes = findAliens(gridMap, 'alien')
  
//   const moveAliens = () => {
    
//     aliensId = setInterval(() => {
     
//     const atLeftEdge = (alienIndexes) => {
//       alienIndexes % 10 === 0
//     }
//     const atRightEdge = (alienIndexes) => {
//       alienIndexes % 10 === 9
//     }
//     const moveDown = () => {
//       for(let i = 0; i < alienIndexes.length; i++) {
//         alienIndexes[i] += width
//       }
//     }
//     removeAliens()
  
//     if (alienIndexes.some(atRightEdge) && movingRight) {
//         moveDown()
//         direction = -1
//         movingRight = false
      
//     } else if (alienIndexes.some(atLeftEdge) && !movingRight) {
//         moveDown()
//         direction = 1
//         movingRight = true
      
//     } else {
//       for(let i = 0; i < alienIndexes.length; i++) {
//         alienIndexes[i] += direction
//       }
//     }
  
//     addNextAliens()
  
//     const bottomRow = allCellsArray.slice(90, 99)
//     for(let i = 0; i < bottomRow.length; i++)
//     if(bottomRow[i].classList.contains('alien')){
//       result.innerHTML = 'The Galactic fleet have passed the blockade and have nearly reached the rebel base. You have lost a life'
//       currentLives --
//       clearInterval(aliensId)
//       lives.innerHTML = currentLives
//       firstLife.classList.remove('first-life')
//       firstLife.classList.add('removed-life')
//     }
  
//     if (aliensRemoved.length === alienIndexes.length) {
//       result.innerHTML = 'Well done, you have the destroyed the Galactic fleet. May the force be with you!'
//       clearInterval(aliensId)
//     }
//   }, 700)
//   }
  
//   moveAliens()
  