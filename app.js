console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {

  const width = 9
  const gameGrid = document.querySelector('.gameGrid')
  const squares = []
  const userMessage = document.querySelector('.userMessage')
  const startButton = document.querySelector('.start')
  const timerDisplay = document.querySelector('.time')
  const scoreDisplay = document.querySelector('.score')
  const livesDisplay = document.querySelector('.lives')
  let timer = 0
  let score = 0
  let timesMoved = 0
  let gamePlay = null
  let playerIndex = 76
  let currentStep = 0

  // ***** make grid *****
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    gameGrid.appendChild(square)
  }
  // ***** timer function *****
  function displayTime() {
    timerDisplay.innerText = timer
    timer ++
  }

  // setInterval(() => {
  //   timesMoved++
  //   moveIndex = moveIndex === 3 ? 0 : moveIndex + 1
  //   moveAliens([moves[moveIndex]])
  // }, 750)

  // ***** set player on grid *****
  squares[playerIndex].classList.add('player')
  function movePlayer() {
    const player = squares.find(square => square.classList.contains('player'))
    player.classList.remove('player')
    squares[playerIndex].classList.add('player')
  }

  // ***** play button keydown event listener *****
  startButton.addEventListener('click', start)

  function start() {

    if(gamePlay) {
      startButton.preventDefault()
    }

    score = 0
    timer = 0
    let lives = 3
    let aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25]

    aliens.forEach(alien => squares[alien].classList.remove('alien1'))

    displayTime()
    const timerIntervalId = setInterval(displayTime, 1000)

    gamePlay = true

    // ***** make aliens fill a portion of the grid *****
    function makeAliens() {
      // create a grid of 8 by 3
      aliens.forEach(alien => squares[alien].classList.add('alien1'))
    }
    makeAliens()

    aliens.forEach(alien => squares[alien].setAttribute('data-step', currentStep))

    // const moves = [1, 9, -1, 9]
    // let moveIndex = 0

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

    // ===================
    // ***** move alien bullet function *****
    function alienBullet() {
      let randomAlien = aliens[Math.floor(Math.random() * aliens.length)]
      console.log('randomAlien', randomAlien)
      if(squares[randomAlien]) {
        squares[randomAlien].classList.add('fire')
      }
      const alienFireIntervalId = setInterval(() => {
        console.log('alienfire')
        squares[randomAlien].classList.remove('fire')
        randomAlien += width
        if(squares[randomAlien]) {
          squares[randomAlien].classList.add('fire')
        }
        if(!squares[randomAlien]) {
          clearInterval(alienFireIntervalId)
          return false
        }
        // =======
        if(squares[randomAlien].classList.contains('player')) {
          livesDisplay.innerText = lives
          lives --
          squares[randomAlien].classList.remove('fire')
          squares[playerIndex].classList.remove('player')
          squares[randomAlien].classList.add('pop')
          setInterval(() => {
            squares[randomAlien].classList.remove('pop')
            squares[playerIndex].classList.add('player')
          }, 300)
          clearInterval(alienFireIntervalId)
        }
        // ===========
        if (lives < 1) {
          // const player = squares.find(square => square.classList.contains('player'))
          squares[playerIndex].classList.remove('player')
          squares[playerIndex].classList.add('pop')
        }
        // ==========
      }, 100)
    }
    alienBullet()
    const alienBulletIntervalId = setInterval(alienBullet, 500) //was 500
    // ===================

    // ***** alien move interval *****
    const alienIntervalId = setInterval(() => {
      console.log('alienBulletIntervalId')
      timesMoved++
      if(timesMoved % 2 === 0) moveAliens(+9)
      else if(timesMoved % 8 === 1 || timesMoved % 8 === 5) moveAliens(+1)
      else if(timesMoved % 8 === 3 || timesMoved % 8 === 7) moveAliens(-1)
      if (aliens[aliens.length-1] > 63 || lives === 0) {
        userMessage.innerText = 'GAME OVER'
        gamePlay = false
        clearInterval(timerIntervalId)
        clearInterval(alienIntervalId) // might not need
        clearInterval(alienBulletIntervalId)
      }
    }, 750)

    // ***** move player bullet function *****
    function moveBullet(fireIndex) {
      const bulletIntervalId = setInterval(() => {
        console.log('bulletIntervalId')
        squares[fireIndex].classList.remove('fire')
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
          fireIndex -= width
          score += 10

          // ===================
          squares[fireIndex].classList.add('pop')
          setInterval(() => {
            squares[fireIndex].classList.remove('pop')
          }, 300)
          // ===================

          scoreDisplay.innerText = score
          if (aliens.length === 0) {
            gamePlay = false
            console.log(gamePlay)
            userMessage.innerText = 'You won!'
            clearInterval(timerIntervalId)
            clearInterval(alienIntervalId)
            clearInterval(alienBulletIntervalId)
          }
        }
      }, 10)
    }

    // ***** keydown event listeners *****
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        // left
        case 37:
          if(playerIndex % width > 0) {
            playerIndex--
            movePlayer()
          }
          break
        // right
        case 39:
          if(playerIndex % width < width -1) {
            playerIndex++
            movePlayer()
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
  }
})
