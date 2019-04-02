console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {

  const width = 9
  const gameGrid = document.querySelector('.gameGrid')
  const squares = []
  const userMessage = document.querySelector('.userMessage')
  const startButton = document.querySelector('.start')
  const timerDisplay = document.querySelector('.time')
  const scoreDisplay = document.querySelector('.score')
  let timer = 0
  let score = 0
  let timesMoved = 0
  let gamePlay = null
  let playerIndex = 76
  let currentStep = 0

  // let aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25] // 8 x 3 grid, specific index values of grid
  // const moves = [1, 9, -1, 9]
  // let moveIndex = 0

  // make grid
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    gameGrid.appendChild(square)
  }

  // --  ?Move function to event listener on reset button click when working  --
  // !!timer function
  function displayTime() {
    // set timer count to screen
    timerDisplay.innerText = timer
    // adds one to timer count
    timer ++
  }

  // setInterval(() => {
  //   timesMoved++
  //   moveIndex = moveIndex === 3 ? 0 : moveIndex + 1
  //   moveAliens([moves[moveIndex]])
  // }, 750)

  // --  Move function to event listener on reset button click when working  --
  // !!set player on grid
  squares[playerIndex].classList.add('player')
  // !!move player function
  function movePlayer() {
    // find square with the class of player
    const player = squares.find(square => square.classList.contains('player'))
    // remove the class of player from the square
    player.classList.remove('player')
    // add player class to square the player should move
    squares[playerIndex].classList.add('player')
  }

  // !! play button keydown event listener
  startButton.addEventListener('click', () => {

    score = 0
    timer = 0
    let aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25]
    aliens.forEach(alien => squares[alien].classList.remove('alien1'))

    displayTime()
    const timerIntervalId = setInterval(displayTime, 1000)

    gamePlay = true

    // !!make aliens fill a portion of the grid
    function makeAliens() {
      // create a grid of 8 by 3
      aliens.forEach(alien => squares[alien].classList.add('alien1'))
    }
    makeAliens()

    aliens.forEach(alien => squares[alien].setAttribute('data-step', currentStep))

    // !!move aliens
    function moveAliens(dir) {
      currentStep = currentStep === 1 ? 0 : currentStep + 1
      if (gamePlay === true) {
        // remove the classes from the aliens
        aliens.forEach(alien => squares[alien].classList.remove('alien1'))
        // add 1 to each index
        aliens = aliens.map(alien => alien + dir)
        makeAliens()
        // update current step for styling
        aliens.forEach(alien => squares[alien].setAttribute('data-step', currentStep))
      }
      // stop aliens from leaving the board
      const lastAlien = aliens[aliens.length-1]
      if(lastAlien > 63) {
        clearInterval(alienIntervalId)
        gamePlay = false
      }
    }

    // !!alien move interval
    const alienIntervalId = setInterval(() => {
      console.log('aliens moving')
      timesMoved++
      // move aliens down
      if(timesMoved % 2 === 0) moveAliens(+9)
      // move aliens right
      else if(timesMoved % 8 === 1 || timesMoved % 8 === 5) moveAliens(+1)
      // move aliens left
      else if(timesMoved % 8 === 3 || timesMoved % 8 === 7) moveAliens(-1)
      // !!game over condition
      if (aliens[aliens.length-1] > 63) {
        userMessage.innerText = 'GAME OVER'
        gamePlay = false
        clearInterval(timerIntervalId)
        clearInterval(alienIntervalId) // might not need
      }
    }, 750)

    // !!move bullet function
    function moveBullet(fireIndex) {
      // let fireIndex = playerIndex - width
      const bulletIntervalId = setInterval(() => {
        // remove the class of fire from the square
        squares[fireIndex].classList.remove('fire')
        // move up one row
        fireIndex -= width
        // add fire class to square the fire should move
        if(squares[fireIndex]) {
          squares[fireIndex].classList.add('fire')
        }
        // if fireIndex is outside of sqaures array
        if(!squares[fireIndex]) {
          clearInterval(bulletIntervalId)
          return false
        }
        // if you've hit an alien...
        if(squares[fireIndex].classList.contains('alien1')) {
          clearInterval(bulletIntervalId)
          // splice the index from the alien array
          const alienIndex = aliens.indexOf(fireIndex)
          aliens.splice(alienIndex, 1)
          // remove bullet class
          squares[fireIndex].classList.remove('fire')
          // remove alien class
          squares[fireIndex].classList.remove('alien1')

          // show pop on death
          // add explosion class
          squares[fireIndex].classList.add('pop')
          // const pop =
          setInterval(() => {
            // remove explosion class
            squares[fireIndex].classList.remove('pop')
            // squares.forEach(i => squares[i].classList.remove('pop'))
          }, 100)
          // clearInterval(pop)

          // console.log('squares[fireIndex]', squares[fireIndex])
          fireIndex -= width
          // increment points
          score += 10
          scoreDisplay.innerText = score

          // !!game win condition
          if (aliens.length === 0) {
            gamePlay = false
            userMessage.innerText = 'You won!'
            clearInterval(timerIntervalId)
            clearInterval(alienIntervalId)
          }
        }
      }, 10)
    }

    // const randomAlien = Math.floor(Math.random() * aliens.length -1)
    //
    // // !!move bullet function
    // function alienBullet(randomAlien) {
    //   // let fireIndex = playerIndex - width
    //   const alienBulletIntervalId = setInterval(() => {
    //     // remove the class of fire from the square
    //     squares[randomAlien].classList.remove('fire')
    //     // move up one row
    //     randomAlien += width
    //     // add fire class to square the fire should move
    //     if(squares[randomAlien]) {
    //       squares[randomAlien].classList.add('fire')
    //     }
    //     // if fireIndex is outside of sqaures array
    //     if(!squares[randomAlien]) {
    //       clearInterval(alienBulletIntervalId)
    //       return false
    //     }
    //   }, 10)
    // }
    // alienBullet()
    //
    // setInterval(alienBullet, 100)

    // !!keydown event listeners
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 37:
        // left
          if(playerIndex % width > 0) {
            playerIndex--
            movePlayer()
          }
          break

        case 39:
        // right
          if(playerIndex % width < width -1) {
            playerIndex++
            movePlayer()
          }
          break

        case 38:
        // up
          if(gamePlay === true) {
            const fireIndex = playerIndex - width
            console.log(fireIndex, 'fire index')
            squares[fireIndex].classList.add('fire')
            moveBullet(fireIndex)
          }
          break

        case 32:
        // up
          if(gamePlay === true) {
            const fireIndex = playerIndex - width
            squares[fireIndex].classList.add('fire')
            moveBullet(fireIndex)
          }
          break
      }
    })
  })

  // startButton.addEventListener('onmouseleave', () => {
  //   startButton.style.display = 'none'
  // })

})
