# Tetris

![tetris logo](img/tetris-logo.png)

## Description

HTML, CSS and JavaScript based Tetris game, as part of General Assembly’s Software Engineering Immersive course.


You can play here, my version of **[Tetris](https://s-carlos-teixeira.github.io/Tetris-game/)**.

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


Tetris is a puzzle game where the player has to fit different shaped blocks (called Tetriminos) together so that they make a complete line across the playing board. Once a line is achieved, it is removed from the game board and the player's score is increased.


The player can move the Tetriminos left and right and rotate them clockwise in 90º increments.


The aim of the game is to get as many points as possible before the game board is filled with Tetriminos.


#### Requirements
* The game should stop if a Tetrimino fills the highest row of the game board
* The player should be able to rotate each Tetrimino about its own axis
* If a line is completed, it should be removed and the pieces above should take its place


## Planning


A digital whiteboard (Scalidraw) was used to sketch and plan the project, it gives a brief idea of the project's challenges and how these can be addressed. As the layout of the game and witch programing resources are viable to solve addressed problems. Eg. How do I track Tredominos position on the playable field?
How do I implement collision between walls and pieces?

![Whiteboarding png ](./tetris-whiteboarding.png)

## Technical Reference

The Tetris Wiki is a great resource for anyone interested in learning more about the game and its history. It also has a great section on the technical aspects of the game, including the scoring system and the different Tetriminos. **[Tetris Wiki](https://tetris.fandom.com/wiki/Tetris_Wiki)**


## Build/Code Process

* The project was built using HTML, CSS and JavaScript. The game was built using the canvas element, which is a part of the HTML5 specification. It allows for dynamic, scriptable rendering of 2D shapes and bitmap images. **[Canvas MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)**

* The starting point was to create a playable field. The playable field is a 10x20 grid, with 2 additional rows, out of visible area, where the pieces are created and start to fall from this point. The grid is created using a nested for loop, where the outer loop creates the rows and the inner loop creates the columns and sets the field as empty giving the adresses the value 0. 

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

* The basic variables for the game are set, such as the playable field array, as shown above and the cavas context. The playable field array is used to track the position of the pieces on the field and to check for collisions. The Tedrominos are created as an object that contains all possible shapes for each piece, the name and the color. 

``` javascript
// canvas context
const canvas = document.querySelector('#main-game')
const ctx = canvas.getContext('2d')

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
  },

```

* 




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