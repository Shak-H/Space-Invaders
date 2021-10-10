
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


// cells.forEach((cell) => {
//   cell.classList.add(bottomRow[randomIndex])
// })

// start player on bottom row
// const allCellsArray = Array.from(cells)
// console.log(allCellsArray)
// const randomisedPlayerCell = bottomRow[randomIndex]

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

