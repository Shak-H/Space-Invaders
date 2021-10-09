const cells = document.querySelectorAll('.grid div')
console.log(cells)
let hasGameStarted = false

// const cellsArray = Array.from(cells).map((cell) => {
//   return cell.classList.contains('grid div')
// })
// console.log(cellsArray)

// const startingRows = cellsArray.slice(0, 29)
// console.log(startingRows)

const startingRows = Array.from({length: 29}).fill('grid div')

const randomisedAliens = () => {
  if (Math.random() > 0.5) {
    return 'alien'
  }
  
}

const firstAliens = startingRows.map(randomisedAliens)
console.log(firstAliens)

cells.forEach((cell, i) => {
  cell.classList.add(firstAliens[i])
})