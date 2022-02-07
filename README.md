# Space Invaders – SEI Project 1

A faithful recreation of the original arcade game Space Invaders, built with Javascript. The game features include, keyboard controls, numbered lives, sounds and even progressively difficult levels.

## Details

### Timeframe

7 days

### Technologies Used

* JavaScript (ES6)
* HTML5
* CSS
* Git
* GitHub
* Javascript audio

### App Overview

The app aimed to fully replicate the original arcade game and built purely with vanilla Javascript.

[**Link to live site**](https://sammii.dev/space-invaders/)

![image](https://user-images.githubusercontent.com/40900195/55617060-34d5ac80-578b-11e9-9278-06a6a0485bc5.png)

#### Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

#### Development Process

1. To start creating the game I used JavaScript to create a grid, by setting a value for width and then creating div elements while the index value was less than width * width.
1. I then pushed these divs to an empty array and then appended them to the grid game container in my html.
1. I then created an aliens array, which included the index values of the squares on the grid, to apply the alien class to these specific squares on the grid.
1. I created displays for score, time, lives and level which update when the values are altered.
1. I created keydown event listeners to allow the player to move and fire when the corresponding keys are pressed.
1. I then created a set interval, which ran through a moves array, to move the aliens right, down, left and down. It loops over this array and then continues to move the aliens, until they reach the last row.
1. The aliens fire by using Math.random to choose a random index within the aliens array to choose which alien should fire back.
1. If the player is hit by alien fire, the lives value is reduced by one.
1. When the aliens reach the last row or when the player has 0 lives, this calls the game end function which clears the grid of aliens, changes the player to display an exploded turret.
1. This then displays a 'Play Again' button, which allows the player to restart the game from level 1 and resets the score, timer, lives and levels values.
1. If all of the aliens have been killed, which means the alien array has a length of 0, the level has been one.
1. Once a level has been won, this then displays a 'Next Level' button, which when pressed, allows the player to start the next level, and resets the score, lives and timer values.

#### Functionality

##### Controls

* Player movements: ← → keys
* Fire control: ↑ key & space bar

##### Game Instructions

1. Click on the start game button
![start-game](https://user-images.githubusercontent.com/40900195/55618431-69973300-578e-11e9-8eae-1a74593fbb30.png)
1. Use the left and right arrow keys to move the player. You can fire using the up arrow key and the space bar.
![fire-action](https://user-images.githubusercontent.com/40900195/55618541-aebb6500-578e-11e9-9321-78210fc8f7c5.png)
1. If you run out of lives, or the aliens invade the planet then its game over.
![game-over](https://user-images.githubusercontent.com/40900195/55618568-c7c41600-578e-11e9-915c-2888111298b6.png)
1. If you manage to kill all of the aliens, you win that level and can progress onto the next level.
![you-win](https://user-images.githubusercontent.com/40900195/55618605-e1655d80-578e-11e9-8c21-2cd49fd25bee.png)
1. As you progress through the levels, they get harder as the aliens move faster with each level, increasing the difficulty. Each level the lives get reset.
![next-level](https://user-images.githubusercontent.com/40900195/55618685-08bc2a80-578f-11e9-9bb2-208cc4c79701.png)
1. The game is an infinite loop, which means there is no end of the game, the aim is to survive as long as possible and defeat as many waves of alien invaders as you can.
![no-end](https://user-images.githubusercontent.com/40900195/55618901-8d0ead80-578f-11e9-88ef-822d5457354f.png)

### Challenges & Achievements

As this was my first JavaScript project I encountered many difficulties:

* All of the visuals were created in JavaScript so did not exist on page load
* I chose this project so I could practice setIntervals as I needed to cement my learning, and this project contained many and it was difficult to manage so many which were running at once, but at different times

During this project I had multiple wins, these include:

* I have learnt so much during this project and I am really happy with what I have managed to achieve with my new JavaScript knowledge
* I thought the extra design features, such as the flash on game load and the 'Start Game' button added to the user experience of the game

## Future enhancements

* To create a leaderboard using localStorage
* To apply different aliens within the game, so they are not all of the same type
* To set additional aliens at different point values
* To add in the UFO which comes into the game play at random intervals
* To add in the barricades and recreate the original arcade game as closely as possible
* When levels are increased, to maintain points and time values from the previous levels
  
