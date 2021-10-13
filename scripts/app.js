// variable needed to start/reset game
let hasGameStarted = false
let movingRight = true
let width = 10
let direction = 1
let alienId
let results = document.querySelector('#score')
let lives = document.querySelector('#lives')
let aliensRemoved = []
let score = 0


// have random amount of aliens appear on first 3 rows
let cells = document.querySelectorAll('.grid div')


const allCellsArray = Array.from(cells)

// const startingRowsOfNodes = Array.from(cells).slice(0, 29)
// console.log('startingRowOfNodes.length', startingRowsOfNodes.length)
// const startingRows = allCellsArray.slice(0, 29)
// console.log('startingRows', startingRows)
// const remainingRowsOfNodes = Array.from(cells).slice(28,99)

// const fullGridOfNodesWithRandomAlienClasses = startingRowsOfNodes.concat(remainingRowsOfNodes)
// console.log('fullGridOfNodesWithRandomAlienClasses', fullGridOfNodesWithRandomAlienClasses)

// const remainingRows = allCellsArray.slice(28, 99)
// console.log('remainingRows', remainingRows)

// const randomisedAliens = () => {
//   if (Math.random() > 0.5){
//     return 'alien'
//   }
// }

// console.log('randomisedAliens', randomisedAliens())

// const firstAliens = startingRows.map(randomisedAliens)
// console.log('firstAliens', firstAliens)

// let gridMap = firstAliens.concat(remainingRows)
// console.log('gridMap', gridMap)

// const addAliens = () => {
//   for(let i=0; i<gridMap.length; i++) {
//     if(gridMap[i]==='alien')
//     allCellsArray[i].classList.add('alien')
//   }
//   }
const aliens = [
  0,1,2,3,4,5,6,7,
  10,11,12,13,14,15,16,17,
  20,21,22,23,24,25,26,27
]

const addAliens = () => {
  for(let i = 0; i < aliens.length; i++) {
    if(!aliensRemoved.includes(i))
    allCellsArray[aliens[i]].classList.add('alien')
  }
}

const removeAliens = () => {
  for (let i = 0; i < aliens.length; i++) {
    allCellsArray[aliens[i]].classList.remove('alien')
  }
}

//add player to random cell in bottom row
const playerStartingCell = cells[(Math.floor(Math.random()*10))+90]
const addPlayer = () => {
  playerStartingCell.classList.add('player')
}

//move player

let playerIndex = Array.from(cells).indexOf(playerStartingCell)

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

// const aliensLeft = () => {
//   Array.from(cells).some((cell) => {
//       if(cell.classList.contains('aliens')){
//         return true
//       }
//   })
// }

// function findAliens(arr, val) {
//   let indexes = [];
//   let i=-1;
//   while((i=arr.indexOf(val, i+1)) != -1) {
//     indexes.push(i)
//   }
//   return indexes
// }

// let alienIndexes = findAliens(gridMap, 'alien')
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


const moveAliens = () => {
  
  aliensId = setInterval(() => {
    
  const leftEdge = aliens[0] % 10 === 0
  const rightEdge = aliens[aliens.length-1] % 9 === 0
  removeAliens()

  if (rightEdge && movingRight) {
    for (let i = 0; i < aliens.length; i++){
      aliens[i] += width +1
      direction = -1
      movingRight = false
    }
  }
  if (leftEdge && !movingRight) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i] += width -1
      direction = 1
      movingRight = true
    }
  }

  for(let i = 0; i < aliens.length; i++) {
    aliens[i] += direction
  }

  addAliens()

}, 2000)

 }

//initalise bullet

const addBullet = () => {
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
        const alienRemoved = aliens.indexOf(index-10)
        aliensRemoved.push(alienRemoved)
        score += 50
        results.innerHTML = score
        clearInterval(fireBulletId)
      } else {
      cells[index - 10].classList.add('bullet')
      cells[index].classList.remove('bullet')
      } 
    } 
    }
  ) 
}, 200) 
}

document.addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'f':
      console.log('pressed f key')
      addBullet()
      fireBullet()
      break
  }
})

//start game function

const start = document.querySelector('#start')

const startGame = () => {
  addAliens()
  addPlayer()
  moveAliens()
  
}

start.addEventListener('click', startGame)
