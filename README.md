# Tetris

![tetris logo](img/tetris-logo.png)

## Description

HTML, CSS and JavaScript based Tetris game, as part of General Assembly training on software development.

You can play here, my version of **[Tetris](https://s-carlos-teixeira.github.io/Tetris-game/)**.

## Getting Started

The project can be accessed at **[my Git Hub profile on Tetris-game repository.](https://github.com/S-Carlos-Teixeira/Tetris-game)** <br>
This project is open source and can be downloaded, used and modified by anyone, as far as credit is given.

Solo project, with 2 weeks deadline, splited as it follows: <br>

1. 3 days of whiteboarding and singing off.
2. 4 days for research, development and coding.
3. 2 days to get a minimum playable game.
4. 4 days for polishing, bug fixing and writing documentation.
5. 1 day for presentation of the concluded project.

## Technologies Used

* HTML
* CSS
* JavaScript
* VS Code
* Google Chrome

## Brief

Tetris is a puzzle game where the player has to fit different shaped blocks (called Tetriminos) together so that they make a complete line across the playing board. Once a line is achieved it is removed from the game board and the player's score is increased.

The player can move the Tetriminos left and right and rotate them clockwise in 90º increments.

The aim of the game is to get as many points as possible before the game board is filled with Tetriminos.

#### Requirements
* The game should stop if a Tetrimino fills the highest row of the game board
* The player should be able to rotate each Tetrimino about its own axis
* If a line is completed it should be removed and the pieces above should take its place

## Planning

A whiteboard was used to sketch and plan the project, it gives a brief idea of the project's challenges and how these can be addressed.

![Whiteboarding png ](./tetris-whiteboarding.png)

## Build/Code Process

#### Canvas 

Using canvas for this project was a personal challenge that, until then, had not been addressed in the course
You can see below a code snippet from canvas configuration for main and next piece screen width, height, and piece sizes, also an event listener to auto resize them when screen size changes.
```
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