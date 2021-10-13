
// variable needed to start/reset game
let hasGameStarted = false

// have random amount of aliens appear on first 3 rows
let cells = document.querySelectorAll('.grid div')
// console.log('cells', cells)

const allCellsArray = Array.from(cells)
// console.log("allCellsArray", allCellsArray)

const startingRowsOfNodes = Array.from(cells).slice(0, 29)
// console.log('startingRowOfNodes.length', startingRowsOfNodes.length)
const startingRows = allCellsArray.slice(0, 29)
// console.log('startingRows', startingRows)
const remainingRowsOfNodes = Array.from(cells).slice(28,99)

// const fullGridOfNodesWithRandomAlienClasses = startingRowsOfNodes.concat(remainingRowsOfNodes)
// console.log('fullGridOfNodesWithRandomAlienClasses', fullGridOfNodesWithRandomAlienClasses)

const remainingRows = allCellsArray.slice(28, 99)
// console.log('remainingRows', remainingRows)

// const addAliens = () => {
//   for(i=0; i<29; i++) {
//   if (Math.random() > 0.5) {
//     allCellsArray[i].classList.add('alien')
    
//   // } else {
//   //   startingRowsOfNodes[i].classList.add('empty')
//   //   console.log(startingRowsOfNodes)
//    }
// }
// }
const randomisedAliens = () => {
  if (Math.random() > 0.5){
    return 'alien'
  }
}

// console.log('randomisedAliens', randomisedAliens())

const firstAliens = startingRows.map(randomisedAliens)
// console.log('firstAliens', firstAliens)

let gridMap = firstAliens.concat(remainingRows)
console.log('gridMap', gridMap)

// const addAliens = () => {
// return cells.forEach((cell, i) => {
// cell.classList.add(gridMap[i])
  
// })
// }

const addAliens = () => {
  for(let i=0; i<gridMap.length; i++) {
    if(gridMap[i]==='alien')
    allCellsArray[i].classList.add('alien')
  }
  }
  

//start game function

const start = document.querySelector('#start')

const startGame = () => {
  addAliens()
  // console.log('allCellsArray', allCellsArray)
  // console.log('cells', cells)
  addPlayer()
  moveAliens()
}

start.addEventListener('click', startGame)

//have player appear on random cell in bottom row

// const bottomRow = gridMap.slice(90, 99)
// console.log('bottowRow', bottomRow)

const randomIndex = (Math.floor(Math.random()*10))+90
// console.log('randomIndex', randomIndex)

const playerStartingCell = cells[randomIndex]
// console.log('playerStartingCell', playerStartingCell)

const addPlayer = () => {
  return playerStartingCell.classList.add('player')
}

//move player

let playerIndex = Array.from(cells).indexOf(playerStartingCell)
// console.log('playerIndex', playerIndex)

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
  // console.log('cells[playerIndex-10]', cells[playerIndex-10])
  return cells[playerIndex-10].classList.add('bullet')
}

//fire bullet

// const bulletIndex = gridMap[playerIndex-10]
let intervalId
const fireBullet = () => {
  intervalId = setInterval(() => {
  // console.log('bullet')
  Array.from(cells).map(cell => {
    // console.log('cell', cell)
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

// let alienIntervalId

// const moveAliens = () => {
//    allCellsArray.map(cell => {
//      if(cell.classList.contains('alien')) {
//       let index = allCellsArray.indexOf(cell)
//       console.log(allCellsArray[index])
//       console.log('index', index)
//       console.log('index+10', index + 10)
//       if(index % 10 === 0){

//         moveDown()
//       }
//     }
//    })
  //   Array.from(cells).map(cell => {
    
  //   if (cell.classList.contains('alien')) {
  //     let index = Array.from(cells).indexOf(cell)
  //     console.log('index', index)
  //     if (index%10===0){
  //       console.log('index', index)
  //       // moveDown()
  //       clearInterval(alienIntervalId)
  //     } else if (cells[index-1].classList.contains('alien')){
  //       cells[index-1].classList.remove('alien')
  //       cells[index].classList.remove('alien')
  //       cells[index-1].classList.add('alien')
  //     } else {
  //     cells[index - 1].classList.add('alien')
  //     cells[index].classList.remove('alien')
  //     } 
  //   } 
  //   }
  // ) 
// }

// moveAliens()

// const moveDown = () => {
//   console.log('allCellsArray', allCellsArray)
//   console.log('all cells array reversed', allCellsArray.slice('').reverse())
//   const reversedAllCellsArray = allCellsArray.slice('').reverse()
//   reversedAllCellsArray.map(cell => {
//     if(cell.classList.contains('alien')) {
//      let index = allCellsArray.indexOf(cell)
//      if(index % 10 === 0){
//        allCellsArray[index].classList.remove('alien')
//        allCellsArray[index + 10].classList.add('alien')
//      }
//     }
//       // 
    
  
    //  console.log('move down triggered')
    
     
     
    //  }
  // Array.from(cells).forEach(cell => {
  //   if (cell.classList.contains('alien')) {
  //     let index = Array.from(cells).indexOf(cell)
  //     console.log('index', index)
  //     let indexOfRowBelow = index += 10
  //     console.log('indexOfRowBelow', indexOfRowBelow)
  //     if(cells[indexOfRowBelow].classList.contains('alien')){
  //     cells[indexOfRowBelow].classList.remove('alien')
  //     cells[index].classList.remove('alien')
  //     cells[indexOfRowBelow].classList.add('alien')
  //     return
  //   } else if (!cells[indexOfRowBelow].classList.contains('alien')){
  //     cells[index].classList.remove('alien')
  //     cells[indexOfRowBelow].classList.add('alien')
  //     return
  //   }
      // clearInterval(alienIntervalId)
      
//     }
//   )
// }

// alienIntervalId = setTimeout(moveAliens, 3000)

let movingLeft = true
let direction = -1

const aliensLeft = () => {
  Array.from(cells).some((cell) => {
      if(cell.classList.contains('aliens')){
        return true
      }
  })
}

function findAliens(arr, val) {
  let indexes = [];
  let i=-1;
  while((i=arr.indexOf(val, i+1)) != -1) {
    indexes.push(i)
  }
  return indexes
}

let alienIndexes = findAliens(gridMap, 'alien')
console.log('alienIndexes', alienIndexes)

console.log('cells[alienIndexes]', allCellsArray[alienIndexes])

const addNextAliens = () => {
  for(let i=0; i<alienIndexes; i++) {
    allCellsArray[alienIndexes[i]].classList.add('alien')
  }
}

const removeAliens = () => {
  for (let i=0; 0<alienIndexes;i++) {
    console.log('alienIndexes[i]', alienIndexes[i])
    allCellsArray[alienIndexes[i]].classList.remove('alien')
  }
}

const newIndexes = (array, x) => {
  return array.map((index) => index+x)
}
console.log('newIndexes(alienIndexes)', newIndexes(alienIndexes, -1))



const moveAliens = () => {

  alienIntervalId = setInterval(() => {
    
  
  const leftEdge = alienIndexes[0] % 10 === 0
  const rightEdge = alienIndexes[alienIndexes.length-1] % 9 === 0
  removeAliens()

  if (leftEdge && movingLeft) {
    for (let i = 0; i < alienIndexes.length; i++){
      alienIndexes[i] += 11
      direction = 1
      movingLeft = false
    }
  }
  if (rightEdge && !movingLeft) {
    for (let i = 0; i < alienIndexes.length; i++) {
      alienIndexes[i] =+ 9
      direction = -1
      movingLeft = true
    }
  }

  for(let i = 0; i < alienIndexes.length; i++) {
    alienIndexes[i] += direction
  }

  addNextAliens()

  

}, 3000);
}

