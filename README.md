# Tetris

![tetris logo](img/tetris-logo.png)


## Description


HTML, CSS and JavaScript based Tetris game, as part of General Assembly’s Software Engineering Immersive course.


Tetris is a puzzle game where the player has to fit different shaped blocks (called Tetrominoes) together so that they make a complete line across the playing board. Once a line is achieved, it is removed from the game board and the player's score is increased.


The player can move the Tetrominoes left and right and rotate them clockwise in 90º increments.


The aim of the game is to get as many points as possible before the game board is filled with Tetrominoes.


You can play here, my version of **[Tetris](https://scarlosteixeira.github.io/Tetris-game/)**.

## Getting Started

The project can be accessed on **[my GitHub profile on Tetris-game repository.](https://github.com/scarlosteixeira/Tetris-game)** <br>
This project is open source and can be downloaded, used and modified by anyone, as far as credit is given.

Solo project, to be completed within 2 weeks, split as it follows: <br>

1. 3 days of whiteboarding and singing off.
2. 4 days for research, development and coding.
3. 2 days to get a minimum playable game.
4. 4 days for polishing, bug fixing and writing documentation.
5. 1 day to present the completed project.

## Technologies Used

* **[HTML 5](https://developer.mozilla.org/en-US/docs/Web/HTML)**
* **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)**
* **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
* **[VS Code](https://code.visualstudio.com/docs)**
* **[Google Chrome](https://www.google.com/chrome/)**
* **[GitHub](https://docs.github.com/en)**
* **[Excalidraw](https://github.com/excalidraw/excalidraw#documentation)**

## Brief 

Your app must:


* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **JavaScript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)


## Requirements


* The game should stop if a Tetrimino fills the highest row of the game board
* The player should be able to rotate each Tetrimino about its own axis
* If a line is completed it should be removed and the pieces above should take its place


## Suggested enhancements


* Responsive design
* Speed increases over time
* Persistent leaderboard using `localStorage`


## Planning


A digital whiteboard (Excalidraw) was used to sketch and plan the project; it gives a brief idea of the project's challenges and how these can be addressed such as the layout of the game and which programming resources are viable to solve mentioned problems. Eg. How do I track Tedrominos position on the playable field?
How do I implement a collision between walls and pieces?


![Whiteboarding png ](./tetris-whiteboarding.png)

## Technical Reference

The Tetris Wiki is a great resource for anyone interested in learning more about the game and its history. It also has a great section on the technical aspects of the game, including the scoring system and the different Tetriminos. **[Tetris Wiki](https://tetris.fandom.com/wiki/Tetris_Wiki)**


## Build/Code Process

I built the project using HTML, CSS and JavaScript; as well as using the canvas element, which is a part of the HTML5 specification. It allows for dynamic, scriptable rendering of 2D shapes and bitmap images. **[Canvas MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)**

I spent 3 days on development and coding of the fundamental blocks of the game, such as the playable field, the pieces, the functions that control pieces randomization, the array of next pieces, the piece in game, and the canvas elements to show the field and pieces. The process was as follows:

* I started creating a playable field. The playable field is a 10x20 grid, with 2 additional rows, out of the visible area, where the pieces are created and start to fall from this point. The grid is created using a nested for loop, where the outer loop creates the rows and the inner loop creates the columns and sets the field as empty giving the addresses the value 0. 

``` javascript
// creates playableArray from row index -2 to 19 and populates these rows 10 "columns" indexes. set these indexes equals to 0.
let playableArray = [] // 2d array to track pieces position

for (let row = -2; row < 20; row++) {
  playableArray[row] = []

  for (let col = 0; col < 10; col++) {
    playableArray[row][col] = 0
  }
}
```

* I created all the basic variables and functions that are required to represent the game pieces and to manage how they are generated. The variables contain essential information about the pieces, including their shape, colour, and name. The functions, on the other hand, govern the pieces' flow, such as how they are randomized, the next pieces to be used, the current in-game piece, and the properties of each piece. <br>In essence, these functions handle the creation and manipulation of objects and arrays that control how the pieces flow in the game. 

You can see below an example of the variables and functions that control the pieces flow:
``` javascript
//tetrominos obj
const tetrominos = {
  
  i: {
    name: 'i',
    shape0: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    shape1: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    color: 'cyan',
    }, ...
    }

const tetrominosArray = ['i', 'l', 'o', 's', 'z', 'j', 't'] // list all possible tetrominos options. This array contains the names of the tetrominos objects.

// generate a random number to choose a piece on the tedrominos obj
function randomPiece() {
  // get a random number between 0 and 6
  const randNum = Math.floor(Math.random() * tetrominosArray.length)
  // get the name of the piece from the tetrominosArray
  const name = tetrominosArray[randNum]
  // return the piece from the tetrominos obj
  return tetrominos[name]
}

// create an array with 6 Tedrominos
function setPieces() {
  // iterate over the nextPieces array and push a random piece on it 6 times.
  for (let i = 0; i <= 6; i++) {
    nextPieces.push(randomPiece())
  }
  // return the array
  return nextPieces
}

// get the first piece from nextPiece array
function getPieces() {
  // if the nextPieces array has less than 2 pieces, call the setPieces function to create a new array with 6 pieces
  if (nextPieces.length <= 2) {
    setPieces()
  }
  // get the first piece from the array and set it to the inGamePiece variable
  inGamePiece = nextPieces[0]
  // remove the first piece from the array
  nextPieces.shift()
  // return the inGamePiece
  return inGamePiece
}

```
*  I implemented the basic canvas elements and functions to draw the game on the canvas element. At this stage, I was able to draw the playable field and the falling piece. However, I still needed to work on implementing restrictions and collisions to prevent the piece from falling through the playable field and walls.

In this code snippet, I have created the canvas elements and defined the ```update()``` function, which is called by ```requestAnimationFrame``` to update the game state and draw the game on the canvas element.

The ```requestAnimationFrame``` method is used to create an animation loop that constantly updates the canvas with the current game state. The ```ctx.clearRect()``` method is used to clear the canvas on each update. Additionally, ```drawField()``` and ```drawPiece()``` functions are called to draw the playable field and the falling game piece respectively.

Lastly, the ```rAFId``` variable is assigned to ```requestAnimationFrame(update)``` to start the animation loop and begin the game.

``` javascript
// canvas context
const canvas = document.querySelector('#main-game')
const ctx = canvas.getContext('2d')

function update() { // update function to be called by requestAnimationFrame to update the game state and draw the game on the canvas element.
  rAFId = requestAnimationFrame(update)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctxShowNextPiece.clearRect(0, 0, showNextPiece.width, showNextPiece.height)
  drawField()
  drawPiece()
}
//! game start
rAFId = requestAnimationFrame(update)
```
During the next two days, I focused on creating the MVP (Minimum Viable Product) version of the game. This version includes the essential functionalities, such as the restrictions and collisions, piece control, and line clearing function.

* These functions enforce restrictions on the movement of game pieces within the playable field by checking for collisions with walls and other pieces. The restrictions are divided into two main groups: field restrictions, which comprise the side walls and bottom, and piece restrictions, which check for collisions with other pieces. Each function returns a Boolean value indicating whether a restriction or collision has occurred, and this value is then used to control the movement of the game piece.

The following code snippet shows some of the functions that check for collisions with walls and other pieces.

``` javascript
//restrictions

function restrictionLeft() {
  //sets isLeft to false
  let isLeft = false
  //loops through the piece shape
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      //if the piece shape is not empty and the piece column is less or equal to 0 (first column), sets isLeft to true
      if (piece.shape[y][x] && piece.col + x <= 0) {
        isLeft = true
      }
    })
  })
  return isLeft
}

function pieceColision() {
  let isColision = false
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (piece.shape[y][x]) {
        // check if the actual piece collides with some piece that is placed in the playable field array, if so, set isColision to true. 
        if (playableArray[piece.row + y + 1][piece.col + x]) {
          isColision = true
        }
      }
    })
  })

  return isColision
}
```
* The game's piece control system uses keydown events to move the piece accordingly. When a key is pressed, a corresponding function is called to move the piece in the desired direction by changing its position in the playable field array. For example, pressing the left arrow key moves the piece to the left, and pressing the right arrow key moves it to the right. The functions also check for restrictions, such as collision with other pieces or the sides of the field, before moving the piece. If a restriction is detected, the piece is moved back to its previous position. Additionally, the game allows the player to rotate the piece by pressing the up arrow key, as long as the rotation does not violate any restrictions.

``` javascript
document.addEventListener('keydown', e => {
  //move left
  if (e.key === 'ArrowLeft' && !restrictionLeft() && !isPaused) {
    //if the piece is not colliding with the left wall, move the piece to the left
    piece.col--
    //if the piece is colliding with another piece, move the piece back to the right
    if (pieceColision()) {
      piece.col++
    }
  }

  //move right
  if (e.key === 'ArrowRight' && !restrictionRight() && !isPaused) {
    piece.col++
    if (pieceColision()) {
      piece.col--
    }
  }

  //rotate
  if (e.key === 'ArrowUp' && rotateRestriction() && !isPaused) {
    rotate()
  }
})
```

During the polishing process, I added several new features to the basic game, including a score and level system, a game over screen, a next piece preview, a pause function, and a restart button. It took me 4 days to implement these new functionalities and make the necessary adjustments to the existing functions. I also spent time fixing bugs that arose during the development process.

* In order to draw the next piece preview, I utilised a separate instance of Canvas. Specifically, I defined a new Canvas element called ```showNextPiece``` and obtained its context using the ```getContext()``` method. Then, I implemented the ```drawPiece()``` function to draw the preview of the next game piece. Inside this function, I used a nested loop to iterate through the cells of the next piece's shape and fill the cells with the piece's corresponding colour. Finally, I used some maths calculations to position the piece preview correctly on the Canvas.

``` javascript
  // * next piece preview
  const showNextPiece = document.querySelector('#next-piece')
  const ctxShowNextPiece = showNextPiece.getContext('2d')

function drawPiece() {
  // draw the piece in the next piece preview
  nextPieces[0].shape0.forEach((row, y) => {
    row.forEach((col, x) => {
      if (nextPieces[0].shape0[y][x]) {
        ctxShowNextPiece.fillStyle = nextPieces[0].color
        ctxShowNextPiece.fillRect(
          (x + 3.5 - Math.ceil(nextPieces[0].shape0[0].length / 2)) * cellSize,
          (y + 1.4) * cellSize,
          cellSize - 1,
          cellSize - 1
        )
      }
    })
  })
}
```
* I added a score system that calculates the score geometrically based on the number of removed rows, and a level system that increases by 1 for every 10 lines cleared. The score is displayed on the screen using a DOM element. <br><br>To implement the score system, I defined a gameScore function that takes the number of removed lines and calculates the score using the formula num = Math.pow(removedLines, 2) * 100, where num is the score and removedLines is the number of removed lines. The function then adds the score to the score variable and displays it on the screen using a DOM element.<br><br> For the level system, I defined a levelUp function that checks if the isRemoved variable is set true by the removeLine function and if the number of removed lines accumulated in the removedLinesAcc variable is divisible by 10. If both conditions are true, the function increases the level variable by 1 and increases the speed of the falling pieces by decreasing the fallSpeed variable. The function then displays the updated level and the number of removed lines on the screen using DOM elements. The isRemoved variable is reset to false after each check to prevent multiple level increases for a single set of removed lines.
``` javascript

// game score
let score = 0
function gameScore() {
  // get the square of the removed lines and multiply by 100
  const num = Math.pow(removedLines, 2) * 100
  // reset the removed lines to 0
  removedLines = 0
  // add the score to the game score
  score += num
  // display the score
  scoreDisplay.innerHTML = score
}

// game level
let level = 1
// accumulator for removed lines to increase the level and display it on the screen.
let removedLinesAcc = 0
// set the fall speed
let setFallSpeed = 30

// increase the level and the fall speed
function levelUp() {
  //show the removed lines on the screen
  linesDisplay.innerHTML = removedLinesAcc
  
  // when the is Removed variable is set true by the removeLine function and the removed lines accumulator is divisible by 10 (every 10 lines removed),  increase the level and the fall speed.
  if (isRemoved && removedLinesAcc % 10 === 0) {
    // increase the fall speed by 2, as the fallSpeed variable decreases the speed of the piece increases.
    setFallSpeed -= 2
    fallSpeed = setFallSpeed
    // increase the level
    level += 1
  }
  // reset the isRemoved variable to false
  isRemoved = false
  // display the level
  levelDisplay.innerHTML = level
}
```
* I display the game over screen when the falling piece can no longer move, and I replace the playable field array data with the game over message. To do this, I check if any piece exceeds the top row of the playableArray, it`s given by a logical test thats check if the row -1 of the playable array has any element different of 0, ```if (playableArray[-1].some((elem => elem !== 0)))```. If it does, I stop the game loop and set the isGameOver variable to true. I then create a game over array that contains the game over message in a colourful pattern. After that, I set the playableArray to the game over array, clear the canvas, and draw the game over screen using the drawField() function. Finally, I return the isGameOver variable.

``` javascript
// sets the game over screen 
function gameOver() {
  // if any piece exceed the playableArray top row, the game is over
  if (playableArray[-1].some((elem => elem !== 0))) {
    // stop the game loop
    cancelAnimationFrame(rAFId)
    // set the game over screen to true
    isGameOver = true
    // game over array 
    const gameOverArray = [
      // this is a bidimensional array that draws the game over message. Check it on my code.
    ]
    // set the playableArray to the game over array
    playableArray = gameOverArray
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw the game over screen
    drawField()
  }
  return isGameOver
}
```
The game over screen is displayed as below:
<br>

![Game Over png ](./game-over-screen.png)

This is the finished game!

![Finished Game png ](./tetris.png)



## Challenges

#### Canvas 

When working on my project, I faced a personal challenge of using canvas, which had not been addressed in the course. Due to limited time, I had to quickly learn how to use it and implement it in my project.

I wrote the following code snippet to configure the canvas for the main and next piece screens. Firstly, I set the canvas width to about 20% of the user's screen size using ctx.canvas.width = window.innerWidth * 0.214 and the canvas height to twice the width using ctx.canvas.height = ctx.canvas.width * 2. Since the playable field has 10 columns and 20 rows, I also defined the canvas size for the next piece. I then calculated the cell size, which is the width and height in pixels for drawing each tetromino single square, by dividing the width of the canvas by 10.

To make the interface dynamic and responsive, I added an event listener to the window that listens for a resize event. When triggered, the canvas sizes are recalculated using the same formulas as before, and the cell size is updated accordingly.

Overall, I successfully used canvas in my project, and with the help of this code snippet, I was able to configure the canvas to adapt to different screen sizes.

``` javascript
// * canvas sizing
ctx.canvas.width = window.innerWidth * 0.214  // sets canvas width as per user screen size by about 20% of it.
ctx.canvas.height = ctx.canvas.width * 2 // sets canvas height to twice the width. 
The playable field has 10 columns (width) and 20 rows (height)
ctxShowNextPiece.canvas.width = window.innerWidth * 0.14
ctxShowNextPiece.canvas.height = ctxShowNextPiece.canvas.width / 1.37
let cellSize = ctx.canvas.width / 10 // this is the width and height in px for drawing each tetromino single square. Eg. Canvas size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size


window.addEventListener('resize', ()=>{
  ctx.canvas.width = window.innerWidth * 0.21
  ctx.canvas.height = ctx.canvas.width * 2
  cellSize = ctx.canvas.width / 10
  ctxShowNextPiece.canvas.width = window.innerWidth * 0.13
  ctxShowNextPiece.canvas.height = ctxShowNextPiece.canvas.width / 1.37
  console.log(window.innerWidth, ctx.canvas.width);
  console.log(window.innerHeight, ctx.canvas.height);
})
```

## Wins

* I employed a divide and conquer approach to tackle the problem, which involved breaking it down into smaller, more manageable sub-problems that I could solve one by one. To accomplish this, I split the project into functions that had specific responsibilities and utilized them as needed throughout the project.

* Throughout the course, I learned a variety of JavaScript concepts that I was able to put into practice during this project. As a result, I feel much more confident in my ability to apply these concepts to real-world problems.


## Key Learnings/Takeaways

* I learned how to use canvas, but I still need to practise more to improve my skills.
* I have a better understanding of how to use arrays and objects in JavaScript. 
* I learned how to structure my HTML and CSS to get my elements to display the way I wanted them to.
* I understand how to iterate over bidimensional arrays.

## Bugs
  Side collision detection between pieces is not working properly.

  The problem occurs when you have a placed piece and this piece has an open cell below it. when you try to push a playable piece against this piece, one square of the playable piece will be placed inside the placed piece, but it is still falling down and will fit the free space below the placed piece.

  Due to the time constraints, I was not able to fix this bug.

  ![Bug png ](./bug-piece-placed.png)

## Future Improvements

* Fix the side collision detection between pieces bug.
* Make the game responsive.
* Add a scoreboard.
