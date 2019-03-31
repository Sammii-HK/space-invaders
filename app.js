console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {

  let timesMoved = 0
  const width = 9
  const gameGrid = document.querySelector('.gameGrid')
  const squares = []

  // const timer = 0
  // let score = 0

  // 8 x 3 grid, specific index values of grid
  let aliens = [0,1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,18,19,20,21,22,23,24,25]

  // const moves = [1, 9, -1, 9]
  // let moveIndex = 0

  let gamePlay = true

  let playerIndex = 76
  let fireIndex = playerIndex - width
  console.log('fireIndex', fireIndex)

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
    const lastAlien = aliens[23]
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

  // gamePlay = false
  // function fire() {
  //   setInterval(() => {
  //     // squares[fireIndex].classList.add('fire')
  //     // find sqaure with class of fire
  //     const fire = squares.find(square => square.classList.contains('fire'))
  //     // remove class from square
  //     fire.classList.remove('fire')
  //
  //     // add fire class to square in row above
  //     squares[fireIndex].classList.add('fire')
  //   }, 750)
  // }
  function moveBullet() {
    // squares[fireIndex].classList.add('fire')
    // find sqaure with class of fire
    // const firePosition = squares.find(square => square.classList.contains('fire'))
    // const firePosition = squares.indexOf('fireIndex')
    // remove class from square
    // firePosition.classList.remove('fire')
    // squares[fireIndex].classList.remove('fire')
    // while(fireIndex - width >= 0) {
    // fireIndex.classList.remove('fire')
    // fireIndex -= width
    // // add fire class to square in row above
    // // squares[fireIndex].classList.add('fire')
    // fireIndex.classList.add('fire')

    // while(gamePlay === true) {
    // find square with the class of player

    setInterval(() => {
      while(fireIndex - width >= 0) {
        const bulletPos = squares.find(square => square.classList.contains('fire'))
        // remove the class of fire from the square
        bulletPos.classList.remove('fire')
        // move up one row
        fireIndex -= width
        console.log('fireIndex', fireIndex)
        // add fire class to square the fire should move
        squares[fireIndex].classList.add('fire')
        return fireIndex
      }
    }, 750)
  }

  // setInterval(() => {
  //   timesMoved++
  //   moveIndex = moveIndex === 3 ? 0 : moveIndex + 1
  //   moveAliens([moves[moveIndex]])
  // }, 750)

  setInterval(() => {
    timesMoved++
    // move aliens down
    if(timesMoved % 2 === 0) moveAliens(+9)
    // move aliens right
    else if(timesMoved % 8 === 1 || timesMoved % 8 === 5) moveAliens(+1)
    // move aliens left
    else if(timesMoved % 8 === 3 || timesMoved % 8 === 7) moveAliens(-1)
    // set firing on an interval
    // else if(gamePlay === true) fire()
  }, 750)

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

      // case 38:
      // // up
      //   while(fireIndex - width >= 0) {
      //     setInterval(() => {
      //       fireIndex -= width
      //       fire()
      //     }, 750)
      //   }
      //   break
      //
      case 38:
      // up
        if(gamePlay = true) {
          fireIndex = playerIndex - width
          // while(fireIndex - width >= 0) {
          squares[fireIndex].classList.add('fire')
          // setInterval(moveBullet(), 750)
          moveBullet()
        }
        break
    }

  })
  // setInterval(fire(), 750)



})


// ==  MVP  ==
// --make grid
// --make aiens move() function
// --run aliens move() at set interval
// --make turretMove() function
// --make gunFire() function
// run gunFire() function at set interval (*within a key down listener*)
// --create keydown addEventListener for left, right and fire!
// if bullet hits alien, remove class from both function
// set game conditions
