// * html variables
const canvas = document.querySelector('#main-game')
const ctx = canvas.getContext('2d')

const pixelSize = 32 // this is the width and height in px for draw each tetromino single square.

const playableArray = []
const frameCount = null
const count = 0
const gameOver = false
const nextPieces = []
const tetrominosArray = ['i', 'l', 'o', 's', 't'] // list all possible tetrominos options 
const tetrominos = { //tetrominos obj
  i: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: 'cyan'
  },
  l: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'orange'
  },
  o: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'yellow'
  },
  s: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: 'green'
  },
  t: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: 'purple'
  }
}

function randomPiece() {
  const randNum = Math.floor(Math.random() * tetrominosArray.length)
  const name = tetrominosArray[randNum]
  return tetrominos[name]
}

function setPieces() {
  for (let i = 0; i < 5; i++) {
    nextPieces.push(randomPiece())
    console.log(nextPieces);   
  }
}
function getPieces(){

}

// populate the empty state
for (let row = 0; row < 20; row++) {
  playableArray[row] = []

  for (let col = 0; col < 10; col++) {
    playableArray[row][col] = 0
  }
}
