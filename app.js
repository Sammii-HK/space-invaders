console.log('JS loaded')

const width = 9
const squares = []
let gameGrid
let startMessages
let userMessage
let timerDisplay
let startButton
let scoreDisplay
let livesDisplay
let levelDisplay
let lives
let level
let timer = 0
let score = 0
let timesMoved = 0
let gamePlay = false
let playerIndex = 76
let currentStep = 0
let aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25]
let timerIntervalId
let alienIntervalId
let alienBulletIntervalId
// let alienFireIntervalId
const explosion = new Audio('sounds/explosion.wav')
const invaderkilled = new Audio('sounds/invaderkilled.wav')
const invader1 = new Audio('sounds/fastinvader1.wav')
const invader2 = new Audio('sounds/fastinvader2.wav')
const invader3 = new Audio('sounds/fastinvader3.wav')
const invader4 = new Audio('sounds/fastinvader4.wav')

// ***** make grid *****
function makeGrid() {
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    gameGrid.appendChild(square)
  }
}
// ***** set player on grid *****
function movePlayer(dir) {
  if (gamePlay) {
    squares[playerIndex].classList.remove('player')
    playerIndex += dir
    squares[playerIndex].classList.add('player')
  }
}
// ***** timer function *****
function displayTime() {
  timerDisplay.innerText = timer
  timer ++
}
// ***** clear grid *****
function clearGrid() {
  aliens.forEach(alien => squares[alien].classList.remove('alien1'))
  squares[playerIndex].classList.remove('lifeLost')
}
// ***** make aliens fill a portion of the grid *****
function makeAliens() {
  // create a grid of 8 by 3
  aliens.forEach(alien => squares[alien].classList.add('alien1'))
}
// ===================
// ***** move alien bullet function *****
function alienBullet() {
  let randomAlien = aliens[Math.floor(Math.random() * aliens.length)]
  console.log('randomAlien', randomAlien)
  if(squares[randomAlien]) {
    squares[randomAlien].classList.add('fire')
  }
  const alienFireIntervalId = setInterval(() => {
    squares[randomAlien].classList.remove('fire')
    if(!squares[randomAlien + width]) {
      clearInterval(alienFireIntervalId)
      return false
    }
    randomAlien += width
    if(squares[randomAlien]) {
      squares[randomAlien].classList.add('fire')
    }
    // =======
    if(squares[randomAlien].classList.contains('player') && lives > 0) {
      lives --
      livesDisplay.innerText = lives
      squares[randomAlien].classList.remove('fire')
      squares[playerIndex].classList.remove('player')
      squares[randomAlien].classList.add('lifeLost')
      explosion.play() // ***********
      setTimeout(() => {
        squares[randomAlien].classList.remove('lifeLost')
        squares[playerIndex].classList.add('player')
      }, 500)
      clearInterval(alienFireIntervalId)
    }
    // // ===========
    // if (lives === 0) {
    //   // const player = squares.find(square => square.classList.contains('player'))
    //   squares[playerIndex].classList.remove('player')
    //   squares[playerIndex].classList.add('pop')
    // }
    // // ==========
  }, 100)
}
// ===================
// ***** alien move interval *****
function alienMoveInterval() {
  const alienIntervalId = setInterval(() => {
    console.log('alienIntervalId')
    timesMoved++
    if(timesMoved % 2 === 0) {
      moveAliens(+9)
      invader1.play()
    } else if(timesMoved % 8 === 1 || timesMoved % 8 === 5) {
      moveAliens(+1)
      invader2.play()
    } else if(timesMoved % 8 === 3 || timesMoved % 8 === 7) {
      moveAliens(-1)
      invader3.play()
    }
    if (aliens[aliens.length-1] > 63 || lives === 0) {
      userMessage.innerText = 'GAME OVER. YOU LOSE'
      gamePlay = false
      level = 0
      clearInterval(timerIntervalId)
      clearInterval(alienIntervalId) // might not need
      clearInterval(alienBulletIntervalId)

      startButton.addEventListener('click', startGame)
      startButton.classList.remove('hidden')

      clearGrid()

      // ===========
      // const player = squares.find(square => square.classList.contains('player'))
      squares[playerIndex].classList.remove('player')
      squares[playerIndex].classList.add('lifeLost')
      // ==========

      // clearInterval(alienFireIntervalId) //!!!!!!!!!!
    }
  }, 750)
}
// ***** move aliens *****
function moveAliens(dir) {
  currentStep = currentStep === 1 ? 0 : currentStep + 1
  if (gamePlay) {
    aliens.forEach(alien => squares[alien].classList.remove('alien1'))
    aliens = aliens.map(alien => alien + dir)
    makeAliens()
    aliens.forEach(alien => squares[alien].setAttribute('data-step', currentStep))
  }
  const lastAlien = aliens[aliens.length-1]
  if(lastAlien > 63) {
    clearInterval(alienIntervalId)
    gamePlay = false
  }
}
// ***** move player bullet function *****
function moveBullet(fireIndex) {
  const bulletIntervalId = setInterval(() => {
    if(squares[fireIndex]) squares[fireIndex].classList.remove('fire')
    fireIndex -= width
    if(squares[fireIndex]) {
      squares[fireIndex].classList.add('fire')
    }
    if(!squares[fireIndex]) {
      clearInterval(bulletIntervalId)
      return false
    }
    // if alien is hit
    if(squares[fireIndex].classList.contains('alien1')) {
      clearInterval(bulletIntervalId)
      const alienIndex = aliens.indexOf(fireIndex)
      aliens.splice(alienIndex, 1)
      squares[fireIndex].classList.remove('fire')
      squares[fireIndex].classList.remove('alien1')
      invaderkilled.play() // *****************
      // ===================
      const popIndex = fireIndex
      squares[popIndex].classList.add('pop')
      setTimeout(() => {
        squares[popIndex].classList.remove('pop')
      }, 100)
      // ===================
      fireIndex -= width
      score += 10

      scoreDisplay.innerText = score
      if (aliens.length === 0) {
        gamePlay = false
        console.log(gamePlay)
        userMessage.innerText = 'GAME OVER. YOU WIN!'
        console.log(level)
        clearInterval(timerIntervalId)
        clearInterval(alienIntervalId)
        clearInterval(alienBulletIntervalId)

        startButton.addEventListener('click', startGame)
        startButton.classList.remove('hidden')

        // squares[playerIndex].classList.remove('player')
        // const playerDead = squares[playerIndex].classList.add('pop')
        // setTimeout(playerDead, 500)
        setTimeout(() => {
          squares[randomAlien].classList.remove('lifeLost')
          // squares[playerIndex].classList.add('player')
        }, 500)

        // clearInterval(alienFireIntervalId) //!!!!!!!!!
      }
    }
  }, 10)
}

function startGame() {
  clearGrid()

  gamePlay = true
  aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25]

  if(!gamePlay) {
    clearInterval(timerIntervalId)
    clearInterval(alienIntervalId)
    clearInterval(alienBulletIntervalId)
  }

  displayTime()
  makeAliens()
  moveAliens(0)
  movePlayer(0)
  alienBullet()
  alienMoveInterval()
  moveBullet()
  timerIntervalId = setInterval(displayTime, 1000)

  alienBulletIntervalId = setInterval(alienBullet, 500) //**!*@*@*

  score = 0
  timer = 0
  lives = 3
  level ++
  livesDisplay.innerText = lives
  levelDisplay.innerText = level
  timesMoved = 0

  userMessage.innerText = ''

  if (gamePlay) {
    startButton.removeEventListener('click', startGame)
    startButton.classList.add('hidden')
  }
}

// const moves = [1, 9, -1, 9]
// let moveIndex = 0
// setInterval(() => {
//   timesMoved++
//   moveIndex = moveIndex === 3 ? 0 : moveIndex + 1
//   moveAliens([moves[moveIndex]])
// }, 750)

document.addEventListener('DOMContentLoaded', () => {
  gameGrid = document.querySelector('.gameGrid')
  userMessage = document.querySelector('.userMessage')
  startButton = document.querySelector('.start')
  timerDisplay = document.querySelector('.time')
  scoreDisplay = document.querySelector('.score')
  levelDisplay = document.querySelector('.level')
  livesDisplay = document.querySelector('.lives')
  startMessages = document.querySelector('.startMessages')

  level = 0

  if (!gamePlay) {
    startButton.addEventListener('click', startGame)
    startButton.classList.remove('hidden')
  }

  makeGrid()

  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      // left
      case 37:
        if(playerIndex % width > 0) {
          movePlayer(-1)
        }
        break
      // right
      case 39:
        if(playerIndex % width < width -1) {
          movePlayer(+1)
        }
        break
      // up
      case 38:
        if(gamePlay === true) {
          const fireIndex = playerIndex - width
          console.log(fireIndex, 'fire index')
          squares[fireIndex].classList.add('fire')
          moveBullet(fireIndex)
        }
        break
      // space
      case 32:
        if(gamePlay === true) {
          const fireIndex = playerIndex - width
          squares[fireIndex].classList.add('fire')
          moveBullet(fireIndex)
        }
        break
    }
  })
})
