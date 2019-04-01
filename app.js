console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {

  let timesMoved = 0
  const width = 9
  const gameGrid = document.querySelector('.gameGrid')
  const squares = []

  const timerDisplay = document.querySelector('.time')
  let timer = 0
  let score = 0

  // 8 x 3 grid, specific index values of grid
  let aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25]

  // const moves = [1, 9, -1, 9]
  // let moveIndex = 0

  const gamePlay = true

  let playerIndex = 76
  // let fireIndex = playerIndex - width
  // console.log('fireIndex', fireIndex)

  // let intervalId = 0

  // make grid
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    gameGrid.appendChild(square)
  }

  // --  Move function to event listener on reset button click when working  --
  // make aliens fill a portion of the grid
  function makeAliens() {
    // create a grid of 8 by 3
    aliens.forEach(alien => squares[alien].classList.add('alien1'))
  }
  makeAliens()

  function moveAliens(dir) {
    const lastAlien = aliens[aliens.length-1]
    // if (gamePlay === true) {
    if (gamePlay === true && lastAlien <= 70) {
      // remove the classes from the aliens
      aliens.forEach(alien => squares[alien].classList.remove('alien1'))
      // add 1 to each index
      aliens = aliens.map(alien => alien + dir)

      makeAliens()
    }
  }

  // set player on grid
  squares[playerIndex].classList.add('player')

  function movePlayer() {
    // find square with the class of player
    const player = squares.find(square => square.classList.contains('player'))
    // remove the class of player from the square
    player.classList.remove('player')

    // add player class to square the player should move
    squares[playerIndex].classList.add('player')
  }

  function moveBullet(fireIndex) {
    // let fireIndex = playerIndex - width
    const intervalId = setInterval(() => {

      // remove the class of fire from the square
      squares[fireIndex].classList.remove('fire')
      // move up one row
      fireIndex -= width

      // if fireIndex is outside of sqaures array
      if(!squares[fireIndex]) {
        clearInterval(intervalId)
        return false
      }


      // if you've hit an alien...
      if(squares[fireIndex].classList.contains('alien1')) {
        // console.log(squares[fireIndex].classList.contains('alien1'))
        // clear the interval for the bullet
        clearInterval(intervalId)

        // remove bullet class
        squares[fireIndex].classList.remove('fire')

        // remove alien class
        squares[fireIndex].classList.remove('alien1')
        console.log('squares[fireIndex]', squares[fireIndex])
        fireIndex -= width

        // splice the index from the alien array
        // aliens.splice(fireIndex, 1)
        aliens.splice(squares[fireIndex], 1)

        // increment points
        score =+ 10
      }


      // add fire class to square the fire should move
      if(squares[fireIndex]) {
        squares[fireIndex].classList.add('fire')
      }
    }, 10)
  }

  // setInterval(() => {
  //   timesMoved++
  //   moveIndex = moveIndex === 3 ? 0 : moveIndex + 1
  //   moveAliens([moves[moveIndex]])
  // }, 750)

  setInterval(() => {
    console.log('aliens moving')
    timesMoved++
    // move aliens down
    if(timesMoved % 2 === 0) moveAliens(+9)
    // move aliens right
    else if(timesMoved % 8 === 1 || timesMoved % 8 === 5) moveAliens(+1)
    // move aliens left
    else if(timesMoved % 8 === 3 || timesMoved % 8 === 7) moveAliens(-1)
  }, 750)

  function displayTime() {
    // set timer count to screen
    timerDisplay.innerText = timer
    // adds one to timer count
    timer ++
    // get the current time
    // const currentTime = new Date()
    // currentTime.getSeconds()
    // set the clock face innerText to be the current time
    // timerDisplay.innerText = currentTime.toLocaleTimeString()
  }

  displayTime()

  // EVERY SECOND (1000 ms) =========================================
  setInterval(displayTime, 1000)


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
    }

  })



})


// ==  MVP  ==
// --make grid
// --make aiens move() function
// --run aliens move() at set interval
// --make turretMove() function
// --make gunFire() function
// --run gunFire() function at set interval (*within a key down listener*)
// --create keydown addEventListener for left, right and fire!
// --ability to fire multiple bullets
// if bullet hits alien, remove class from both function
// set game conditions
