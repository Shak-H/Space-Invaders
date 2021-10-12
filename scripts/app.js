
// variable needed to start/reset game
let hasGameStarted = false

// have random amount of aliens appear on first 3 rows
let cells = document.querySelectorAll('.grid div')
console.log('cells', cells)

const allCellsArray = Array.from(cells).fill('default')
console.log("allCellsArray", allCellsArray)

const startingRows = allCellsArray.slice(0, 29)
console.log('startingRows', startingRows)

const remainingRows = allCellsArray.slice(28, 99)
console.log('remainingRows', remainingRows)

const randomisedAliens = () => {
  if (Math.random() > 0.5) {
    return 'alien'
  } else {
    return 'default'
  }
}

const firstAliens = startingRows.map(randomisedAliens)
console.log('firstAliens', firstAliens)

let gridMap = firstAliens.concat(remainingRows)
console.log('gridMap', gridMap)

const addAliens = () => {
  cells.forEach((cell, i) => {
  cell.classList.add(gridMap[i])
})
}


// const addAliens = () => {
//   //code here
// }
// console.log('addAliens', addAliens())

//start game function

const start = document.querySelector('#start')

const startGame = () => {
  
  addAliens()
  addPlayer()
  moveAliens()

}

start.addEventListener('click', startGame)


//have player appear on random cell in bottom row


const bottomRow = gridMap.slice(90, 99)
console.log('bottowRow', bottomRow)

const randomIndex = (Math.floor(Math.random()*bottomRow.length))+90
console.log('randomIndex', randomIndex)

const playerStartingCell = cells[randomIndex]
console.log('playerStartingCell', playerStartingCell)

const addPlayer = () => {
  return playerStartingCell.classList.add('player')
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

//initalise bullet

const addBullet = () => {
  console.log('cells[playerIndex-10]', cells[playerIndex-10])
  return cells[playerIndex-10].classList.add('bullet')
  
}

//fire bullet

const bulletIndex = gridMap[playerIndex-10]
let intervalId
const fireBullet = () => {
  intervalId = setInterval(() => {
  console.log('bullet')
  Array.from(cells).map(cell => {
    console.log('cell', cell)
    
    if (cell.classList.contains('bullet')) {
      let index = Array.from(cells).indexOf(cell)
      console.log('index', index)
      if (index<10){
        cells[index].classList.remove('bullet')
        clearInterval(intervalId)
      } else if (cells[index-10].classList.contains('alien')){
        cells[index - 10].classList.remove('alien')
        cells[index].classList.remove('bullet')
        clearInterval(intervalId)
      } else {
      cells[index - 10].classList.add('bullet')
      cells[index].classList.remove('bullet')
      
      } 
    } 
    }
  ) 
}, 500) 
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

// move aliens

function findAliens(arr, val) {
  let indexes = [];
  let i=-1;
  while((i=arr.indexOf(val, i+1)) != -1) {
    indexes.push(i)
  }
  return indexes
}

let alienIndexes = findAliens(firstAliens, 'alien')
console.log('alienIndexes', alienIndexes)

const newIndexes = (array) => {
  return array.map((index) => index-1)
  
}
console.log('newIndexes(alientIndexes)', newIndexes(alienIndexes))

// let alienIntervalId

// const moveAliens = () => {
//   console.log(alienIndexes)
//   alienIntervalId = setInterval(() => {
//     const moveLeft = () => {
//     let nextIndexes = newIndexes(alienIndexes)
    // if (alienIndexes % 10 === 0) {
    //   console.log('cant move - at edge')
    //   moveDown()
    //   moveLeft = false
    // }
//     allCellsArray[alienIndexes].classList.remove('alien')
//     allCellsArray[nextIndexes].classList.add('alien')
//     alienIndexes = nextIndexes
//   moveLeft()
//    } 
// }, 500)

// }
// moveAliens()

// console.log(moveAliens())

let alienIntervalId

const moveAliens = () => {
alienIntervalId = setInterval(() => {
 let moveLeft = true
 let moveRight = false
 if(moveLeft === true) {
   for(i=0; i<cells.length;i++){
    console.log('cells[i]', cells[i])
    if(cells[i].classList.contains('alien')){
    cells[i].classList.remove('alien')
    cells[i-1].classList.add('alien')
    console.log('cells[(i-1)]', cells[(i-1)])
    if(cells[i] % 10 === 0){
      moveDown()
      moveLeft = false
      moveRight = true
    }
   }
  } 
 }
if(moveRight === true) {
  for(i=0; i<cells.length;i++){
   console.log('cells[i]', cells[i])
   if(cells[i].classList.contains('alien')){
   cells[i].classList.remove('alien')
   cells[i+1].classList.add('alien')
    if(cells[i] % 10 === 0){
     moveDown()
     moveRight = false
     moveLeft = true
    }
   }
  } 
 }
},3000)
}

 //this will be called in start game

const moveDown = () => {
  for(i=0; i<cells.length;i++){
    console.log('cells[i]', cells[i])
    if(cells[i].classList.contains('alien')){
    cells[i].classList.remove('alien')
    cells[i-10].classList.add('alien')
  }
 }
}

