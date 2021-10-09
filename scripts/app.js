
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
// const allCellsArray = Array.from(cells)
// console.log(allCellsArray)

// const bottomRow = allCellsArray.slice(90, 99).fill('grid div')
// console.log(bottomRow)

// const randomIndex = Math.floor(Math.random()*bottomRow.length)
// const randomisedPlayerCell = bottomRow[randomIndex]
// console.log(randomisedPlayerCell)

// cells.forEach((cell) => {
//   cell.classList.add(bottomRow[randomIndex])
// })

// start player on bottom row
const allCellsArray = Array.from(cells)
console.log(allCellsArray)

const playerIndex = allCellsArray[94]
console.log(playerIndex)

const addPlayer = function() {
  return playerIndex.classList.add('player')
}
addPlayer()