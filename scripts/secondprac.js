const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 94
let width = 10
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0


const allCellsArray = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,
  10,11,12,13,14,15,16,17,
  20,21,22,24,24,25,26,27
]

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      allCellsArray[alienInvaders[i]].classList.add('alien')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    allCellsArray[alienInvaders[i]].classList.remove('alien')
  }
}

allCellsArray[currentShooterIndex].classList.add('player')


function moveShooter(e) {
  allCellsArray[currentShooterIndex].classList.remove('player')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  allCellsArray[currentShooterIndex].classList.add('player')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (allCellsArray[currentShooterIndex].classList.contains('alien', 'player')) {
    // resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (allCellsArray.length)) {
      // resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    // resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 2000)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    allCellsArray[currentLaserIndex].classList.remove('bullet')
    currentLaserIndex -= width
    allCellsArray[currentLaserIndex].classList.add('bullet')

    if (allCellsArray[currentLaserIndex].classList.contains('alien')) {
      allCellsArray[currentLaserIndex].classList.remove('bullet')
      allCellsArray[currentLaserIndex].classList.remove('alien')
      allCellsArray[currentLaserIndex].classList.add('explosion')

      setTimeout(()=> allCellsArray[currentLaserIndex].classList.remove('explosion'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      // results++
      // resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 1000)
  }
}

document.addEventListener('keydown', shoot)