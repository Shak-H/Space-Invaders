
// variable needed to start/reset game
let hasGameStarted = false

// have random amount of aliens appear on first 3 rows
let cells = document.querySelectorAll('.grid div')
// console.log('cells', cells)

const allCellsArray = Array.from(cells)
// console.log("allCellsArray", allCellsArray)

const startingRowsOfNodes = Array.from(cells).slice(0, 29)
console.log('startingRowOfNodes.length', startingRowsOfNodes.length)
// const startingRows = allCellsArray.slice(0, 29)
// console.log('startingRows', startingRows)
const remainingRowsOfNodes = Array.from(cells).slice(28,99)

// const fullGridOfNodesWithRandomAlienClasses = startingRowsOfNodes.concat(remainingRowsOfNodes)
// console.log('fullGridOfNodesWithRandomAlienClasses', fullGridOfNodesWithRandomAlienClasses)

const remainingRows = allCellsArray.slice(28, 99)
// console.log('remainingRows', remainingRows)

const addAliens = () => {
  for(i=0; i<29; i++) {
  if (Math.random() > 0.5) {
    allCellsArray[i].classList.add('alien')
    
  // } else {
  //   startingRowsOfNodes[i].classList.add('empty')
  //   console.log(startingRowsOfNodes)
   }
}
}

console.log(allCellsArray)
// console.log('randomisedAliens', randomisedAliens())

// const firstAliens = startingRows.map(randomisedAliens)
// console.log('firstAliens', firstAliens)

// let gridMap = firstAliens.concat(remainingRows)
// console.log('gridMap', gridMap)

//  const addAliens = () => {
//   return cells.forEach((cell, i) => {
//   cell.classList.add(gridMap[i])
  
// })
// }

//start game function

const start = document.querySelector('#start')

const startGame = () => {
  addAliens()
  addPlayer()
  // moveAliens()
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
//   alienIntervalId = setInterval(() => {
//    let moveLeft = true
//    let moveRight = false
//   //  const atLeftEdge = 
//    if(moveLeft === true) {
//      for(i=0; i<cells.length;i++){
//       console.log(gridMap[i])
//       if(gridMap[i]==='alien' && i % 10 ===0){
//         gridMap[i] = 'default'
//         gridMap[i+10] = 'alien'
//         console.log(gridMap)
//         cells.forEach((cell, i) => {
//         cell.classList.add(gridMap[i])
//         })
        
//         moveLeft = false
//         moveRight = true
//        } else if (gridMap[i]==='alien'){
//       gridMap[i] = 'default'
//       gridMap[i-1]= 'alien'
//       console.log(gridMap)
//       cells.forEach((cell, i) => {
//        cell.classList.add(gridMap[i])
//       })
      
//     }
//     } 
//    } 
//    if(moveRight === true) {
//    if(gridMap[i]==='alien' && i % 9 ===0){
//     gridMap[i] = 'default'
//     gridMap[i+10]= 'alien'
//     console.log(gridMap)
//     cells.forEach((cell, i) => {
//     cell.classList.add(gridMap[i])
//     })
//     moveLeft = true
//     moveRight = false
//    } else if (gridMap[i]==='alien'){
//   gridMap[i] = 'default'
//   gridMap[i+1]= 'alien'
//   console.log(gridMap)
//   cells.forEach((cell, i) => {
//     cell.classList.add(gridMap[i])
//    })
  
//   }
// }
  // },3000)

  // }  