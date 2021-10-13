// let alienIntervalId

// console.log('cells', cells)
console.log('gridMap', gridMap)

const moveAliens = () => {
//  alienIntervalId = setInterval(() => {
  Array.from(cells).map(cell => {
    // for(i=0; i<gridMap.length;i++){
    if(cell.classList.contains('alien')){
      let index = Array.from(cells).indexOf(cell)
      if(index % 10 === 0) {
        moveDown()
        return
      } else if(cells[index-1].classList.contains('alien')){
        cells[index].classList.remove('alien')
        console.log('cells[index-1]', cells[index-1])
        cells[index-1].classList.remove('alien')
        cells[index-1].classList.add('alien')
      } else {
        cells[index].classList.remove('alien')
        cells[index-1].classList.add('alien')
        console.log('cells[index-1]', cells[index-1])
      }
    // if(cell[i] === 'alien'){
    // cells[i].classList.remove('alien')
    // let previousCell = cells[i-1]
    // previousCell.classList.add('alien')
    }
  })
},3000)



// let alienIntervalId

const moveAliens = () => {
// alienIntervalId = setInterval(() => {
//  let moveLeft = true
//  let moveRight = false
 if(moveLeft === true) {
   for(i=0; i<gridMap.length;i++){
    console.log('cells[i]', cells[i])
    if(cells[i].classList.contains('alien')){
      if(gridMap[i] % 10 === 0) {
        moveDown()
        moveLeft = false
        moveRight = true
      }
    }
    cells[i].classList.remove('alien')
    let previousCell = cells[i-1]
    console.log('previousCell', previousCell)
    previousCell.classList.add('alien')
    console.log('cells[i-1]', cells[i-1])
    if(cells[i] % 10 === 0){
      moveDown()
      moveLeft = false
      moveRight = true
    }
  }
   }
  } 
 
// if(moveRight === true) {
//   for(i=0; i<cells.length;i++){
//    if(cells[i].classList.contains('alien')){
//    cells[i].classList.remove('alien')
//    cells[i+1].classList.add('alien')
//     if(cells[i] % 10 === 0){
//      moveDown()
//      moveRight = false
//      moveLeft = true
//     }
//    }
//   } 
//  }
// },3000)
// }

const moveDown = () => {
  Array.from(cells).map(cell => {
    console.log('cell', cell)
    if (cell.classList.contains('alien')) {
      let index = Array.from(cells).indexOf(cell)
      console.log('index', index)
      
      } if (cells[index+10].classList.contains('alien')){
        cells[index + 10].classList.remove('alien')
        cells[index].classList.remove('alien')
        cells[index + 10].classList.remove('alien')
        return
      } else {
      cells[index + 10].classList.add('alien')
      cells[index].classList.remove('alien')
      } 
    }     
  ) 
}




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

// console.log('cells[alienIndexes]', cells[alienIndexes])

// const newIndexes = (array, x) => {
//   return array.map((index) => index+x)
// }
// console.log('newIndexes(alienIndexes)', newIndexes(alienIndexes, -1))

const moveAliens = () => {
  alienIntervalId = setInterval(() => {
   let moveLeft = true
   let moveRight = false
   if(moveLeft === true) {
     for(i=0; i<gridMap.length;i++){
      console.log(gridMap[i])
      if(gridMap[i]==='alien' && gridMap[i] % 10 ===0){
        gridMap[i] = 'default'
        gridMap[(i+10)]= 'alien'
        console.log(gridMap)
        const newGridMap = () => {
          cells.forEach((cell, i) => {
          cell.classList.add(gridMap[i])
        })
        }
        newGridMap()
        moveLeft = false
        moveRight = true
       } else if (gridMap[i]==='alien'){
      gridMap[i] = 'default'
      gridMap[(i-1)]= 'alien'
      console.log(gridMap)
      const newGridMap = () => {
        cells.forEach((cell, i) => {
        cell.classList.add(gridMap[i])
      })
      }
      newGridMap()
    }
    } 
   } 
   if(moveLeft === true) {
   if(gridMap[i]==='alien' && gridMap[i] % 10 ===0){
    gridMap[i] = 'default'
    gridMap[(i+10)]= 'alien'
    console.log(gridMap)
    const newGridMap = () => {
      cells.forEach((cell, i) => {
      cell.classList.add(gridMap[i])
    })
    }
    newGridMap()
    moveLeft = false
    moveRight = true
   } else if (gridMap[i]==='alien'){
  gridMap[i] = 'default'
  gridMap[(i+1)]= 'alien'
  console.log(gridMap)
  const newGridMap = () => {
    cells.forEach((cell, i) => {
    cell.classList.add(gridMap[i])
  })
  }
  newGridMap()
}
   }
  },3000)
  }