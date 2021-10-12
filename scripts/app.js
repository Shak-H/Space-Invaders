
// variable needed to start/reset game
let hasGameStarted = false

// have random amount of aliens appear on first 3 rows

const startingRows = Array.from({length: 29}).fill('grid div')

const randomisedAliens = () => {
  if (Math.random() > 0.5) {
    return 'alien'
  }
}

const firstAliens = startingRows.map(randomisedAliens)
console.log(firstAliens)

const cells = document.querySelectorAll('.grid div')
console.log(cells)

cells.forEach((cell, i) => {
  cell.classList.add(firstAliens[i])
})

//have player appear on random cell in bottom row
const allCellsArray = Array.from(cells)
console.log(allCellsArray)

const bottomRow = allCellsArray.slice(90, 99).fill('grid div')
console.log(bottomRow)

const randomIndex = (Math.floor(Math.random()*bottomRow.length))+90
console.log(randomIndex)

const playerStartingCell = allCellsArray[randomIndex]
console.log(playerStartingCell)

const addPlayer = () => {
  return playerStartingCell.classList.add('player')
}
addPlayer()

//move player

let playerIndex = allCellsArray.indexOf(playerStartingCell)
console.log(playerIndex)

const handleArrowLeft = () => {
    const newIndex = playerIndex -1
    if (playerIndex % 10 === 0) {
    console.log('cant move - at edge')
    return
  }
  allCellsArray[playerIndex].classList.remove('player')
  allCellsArray[newIndex].classList.add('player')
  playerIndex = newIndex
}

const handleArrowRight = () => {
  const newIndex = playerIndex +1
  if ((playerIndex+1) % 10 === 0) {
  console.log('cant move - at edge')
  return
}
allCellsArray[playerIndex].classList.remove('player')
allCellsArray[newIndex].classList.add('player')
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
  console.log(allCellsArray[playerIndex-10])
  return allCellsArray[playerIndex-10].classList.add('bullet')
  
}

//fire bullet

const bulletIndex = allCellsArray[playerIndex-10]
let intervalId
const fireBullet = () => {
  intervalId = setInterval(() => {
  console.log('bullet')
  allCellsArray.map(cell => {
    console.log(cell)
    
    if (cell.classList.contains('bullet')) {
      let index = allCellsArray.indexOf(cell)
      console.log(index)
      if (index<10){
        allCellsArray[index].classList.remove('bullet')
        clearInterval(intervalId)
      } else if (allCellsArray[index-10].classList.contains('alien')){
        allCellsArray[index - 10].classList.remove('alien')
        allCellsArray[index].classList.remove('bullet')
        clearInterval(intervalId)
      } else {
      allCellsArray[index - 10].classList.add('bullet')
      allCellsArray[index].classList.remove('bullet')
      
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
  let indexes = [], i=-1
  while((i=arr.indexOf(val, i+1)) != -1) {
    indexes.push(i)
  }
  return indexes
}

let alienIndexes = findAliens(firstAliens, 'alien')
console.log(alienIndexes)

const newIndexes = (array) => {
  return array.map((index) => index-1)
  
}
console.log(newIndexes(alienIndexes))

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
 while(moveLeft === true) {
   for(i=0; i<allCellsArray.length;i++){
    console.log(allCellsArray[i])
    if(allCellsArray[i].classList.contains('alien')){
    allCellsArray[i].classList.remove('alien')
    allCellsArray[(i-1)].classList.add('alien')
    if(allCellsArray[i] % 10 === 0){
      moveDown()
      moveLeft = false
      moveRight = true
    }
   }
  } 
 }
while(moveRight === true) {
  for(i=0; i<allCellsArray.length;i++){
   console.log(allCellsArray[i])
   if(allCellsArray[i].classList.contains('alien')){
   allCellsArray[i].classList.remove('alien')
   allCellsArray[(i+1)].classList.add('alien')
    if(allCellsArray[i] % 10 === 0){
     moveDown()
     moveRight = false
     moveLeft = true
    }
   }
  } 
 }
},3000)
}


moveAliens() //this will be called in start game

const moveDown = () => {
  for(i=0; i<allCellsArray.length;i++){
    console.log(allCellsArray[i])
    if(allCellsArray[i].classList.contains('alien')){
    allCellsArray[i].classList.remove('alien')
    allCellsArray[(i-10)].classList.add('alien')
  }
 }
}