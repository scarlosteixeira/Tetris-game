// * html variables
const canvas = document.getElementById("main-game")
const ctx = canvas.getContext("2d")


const pixelSize = 32 // this is the width and height in px for draw each tetromino single square.  
const playableArray = []
let frameCount = null;  // keep track of the animation frame so we can cancel it
let gameOver = false;
let count = 0;
const tetrominosOptions = [ "i", "l", "o", "s", "t" ]
const tetrominos = {
  "i": {
    shape: [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ],
    color: 'cyan', 
  },
  "l": { 
    shape: [
      [0,0,1],
      [1,1,1],
      [0,0,0]
    ],
    color: "orange",
  },
  "o": {
    shape: [
      [1,1],
      [1,1]
    ],
    color: 'yellow',
  },
  "s": {
    shape: [
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ],
    color: "green",
  },
  "t": {
    shape: [
      [0,1,0],
      [1,1,1],
      [0,0,0]
    ],
    color: "purple",
  },
}

function randomTetromino() {
  const randNum = Math.floor(Math.random()  * tetrominosOptions.length )
  const name = tetrominosOptions[randNum]
  return tetrominos[name]
  // return randNum
}
console.log(randomTetromino());
// populate the empty state
for (let row = 0; row < 20; row++) {
  playableArray[row] = []

  for (let col = 0; col < 10; col++) {
    playableArray[row][col] = 0
  }
}
console.log(playableArray)