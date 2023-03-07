# Tetris

![tetris logo](img/tetris-logo.png)

## Description

## Description


HTML, CSS and JavaScript based Tetris game, as part of General Assembly’s Software Engineering Immersive course.


Tetris is a puzzle game where the player has to fit different shaped blocks (called Tetrominoes) together so that they make a complete line across the playing board. Once a line is achieved, it is removed from the game board and the player's score is increased.


The player can move the Tetrominoes left and right and rotate them clockwise in 90º increments.


The aim of the game is to get as many points as possible before the game board is filled with Tetrominoes.


You can play here, my version of **[Tetris](https://scarlosteixeira.github.io/Tetris-game/)**.

## Getting Started

The project can be accessed on **[my Git Hub profile on Tetris-game repository.](https://github.com/scarlosteixeira/Tetris-game)** <br>
This project is open source and can be downloaded, used and modified by anyone, as far as credit is given.

Solo project, to be completed within 2 weeks, split as it follows: <br>

1. 3 days of whiteboarding and singing off.
2. 4 days for research, development and coding.
3. 2 days to get a minimum playable game.
4. 4 days for polishing, bug fixing and writing documentation.
5. 1 day to present the completed project.

## Technologies Used

* HTML
* CSS
* JavaScript
* VS Code
* Google Chrome

## Brief 

Your app must:


* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
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


A digital whiteboard (Scalidraw) was used to sketch and plan the project, it gives a brief idea of the project's challenges and how these can be addressed. As the layout of the game and witch programing resources are viable to solve addressed problems. Eg. How do I track Tredominos position on the playable field?
How do I implement collision between walls and pieces?

![Whiteboarding png ](./tetris-whiteboarding.png)

## Technical Reference

The Tetris Wiki is a great resource for anyone interested in learning more about the game and its history. It also has a great section on the technical aspects of the game, including the scoring system and the different Tetriminos. **[Tetris Wiki](https://tetris.fandom.com/wiki/Tetris_Wiki)**


## Build/Code Process

I built the project using HTML, CSS and JavaScript; as well as using the canvas element, which is a part of the HTML5 specification. It allows for dynamic, scriptable rendering of 2D shapes and bitmap images. **[Canvas MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)**

I used 3 days on development and coding of the fundamental blocks of the game, such as the playable field, the pieces, the functions that controls pieces randomization, the array of next pieces, the piece in game, and the canvas elements to shown the field and pieces. The proccess was as follows:

* I started creating a playable field. The playable field is a 10x20 grid, with 2 additional rows, out of visible area, where the pieces are created and start to fall from this point. The grid is created using a nested for loop, where the outer loop creates the rows and the inner loop creates the columns and sets the field as empty giving the adresses the value 0. 

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
<br>

* I created the basic variables for the game, such as the ``tedrominos`` objects, that contains all possible shapes for each piece, it name and color. I worked on the pieces flow control variables and functions, where the variables are ``tedrominosArray``, ``nextPieces``, ``inGamePiece``, and ``piece`` and the functions are ``randomPiece()`` , ``setPieces()``, ``getPieces()``, ``pieceProps()``.

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
    shape2: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    shape3: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    color: 'cyan',
    }, ...
    }

const tetrominosArray = ['i', 'l', 'o', 's', 'z', 'j', 't'] // list all possible tetrominos options. This array contains the names of the tetrominos objects.

const nextPieces = [] // array with random pieces ready to be used generated from tedrominos obj

let inGamePiece = {} // piece from nextPiece array to be placed at game main field

let piece = pieceProps() // in game piece, holds the piece properties and position

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

// creates the obj to be used by all functions on the game
function pieceProps() {
  // call the getPieces function to get the first piece from the nextPieces array
  getPieces()
  // positioning the piece on the first row (-2 index) and on the middle column
  const row = -2 //start 2 rows above the row 0 "top row", creates the efect of the piece is getting in the game board.
  const col =
    playableArray[0].length / 2 - Math.ceil(inGamePiece.shape0[0].length / 2) // get middle position of  the playable area, minus the offset of the middle piece lenght . this is for start to draw the piece on the middle of screen.

  // return the obj with the piece properties and the position
  return {
    name: inGamePiece.name,
    row,
    col,
    shape: inGamePiece.shape0,
    nextShape: inGamePiece.shape1,
    color: inGamePiece.color,
  }
}
```
* I had set the basic canvas elements and functions to draw the game on the canvas element. At this point I had the playable field drawn and the piece falling without any restrictions or collisions, it means that the piece was falling through the playable field and the walls.
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

* The restrictions for the piece moviment in the field are made by functions that check for collisions with the walls and other pieces. The functions are called on keydown events and the piece is moved accordingly. The piece is moved by changing the piece's position on the playable field array. 

``` javascript
//restrictions

function restrictionLeft() {
  //sets isLeft to false
  let isLeft = false
  //loops through the piece shape
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      //if the piece shape is not empty and the piece column is less or equal to 0, sets isLeft to true
      if (piece.shape[y][x] && piece.col + x <= 0) {
        isLeft = true
      }
    })
  })
  return isLeft
}

function restrictionRight() {
  let isRight = false
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      //if the piece shape is not empty and the piece column is greater or equal to 9, sets isRight to true
      if (piece.shape[y][x] && piece.col + x >= cols - 1) {
        isRight = true
      }
    })
  })
  return isRight
}

function restrictionBottom() {
  let isBottom = false
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      //if the piece shape is not empty and the piece row is greater or equal to 19, sets isBottom to true
      if (piece.shape[y][x] && piece.row + y === rows - 1) {
        isBottom = true
      }
    })
  })
  return isBottom
}

function pieceColision() {
  let isColision = false
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (piece.shape[y][x]) {
        // check if the actual piece colides with some piece is placed in the playable field array, if so, sets isColision to true. 
        if (playableArray[piece.row + y + 1][piece.col + x]) {
          isColision = true
        }
      }
    })
  })

  return isColision
}



```




## Challenges

#### Canvas 

Using canvas for this project was a personal challenge that, until then, had not been addressed in the course
You can see below a code snippet from canvas configuration for main and next piece screen width, height, and piece sizes, also an event listener to auto resize them when screen size changes.

``` javascript
// * canvas sizing
ctx.canvas.width = window.innerWidth * 0.214  // sets canvas width as per user screen size by about 20% of it.
ctx.canvas.height = ctx.canvas.width * 2 // sets canvas height to twice the width. 
The playable field has 10 columns (width) and 20 rows (height)
ctxShowNextPiece.canvas.width = window.innerWidth * 0.14
ctxShowNextPiece.canvas.height = ctxShowNextPiece.canvas.width / 1.37
let cellSize = ctx.canvas.width / 10 // this is the width and height in px for draw each tetromino single square.  
Eg. Canvas size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size


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