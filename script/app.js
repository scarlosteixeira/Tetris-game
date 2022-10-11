// * html variables
const canvas = document.querySelector('#main-game')
const ctx = canvas.getContext('2d')

const cellSize = 41 // this is the width and height in px for draw each tetromino single square. screen size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size
const playableArray = [] // 2d array to track pieces position
const nextPieces = [] // array with random pieces ready to be used
let inGamePiece = {}

const fallSpeed = 1
const lateralSpeed = 1

const tetrominosArray = ['i', 'l', 'o', 's', 't'] // list all possible tetrominos options
const tetrominos = {
  //tetrominos obj
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

for (let row = 0; row < 20; row++) {
  playableArray[row] = []

  for (let col = 0; col < 10; col++) {
    playableArray[row][col] = 0
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
    // console.log(nextPieces);
  }
  return nextPieces
}
function getPieces() {
  if (nextPieces.length <= 1) {
    setPieces()
  }
  inGamePiece = nextPieces[0]
  nextPieces.shift()
  // console.log(inGamePiece);
  // console.log(nextPieces);
  return inGamePiece
}

function pieceProps() {
  getPieces()

  // positioning the piece on the first row and on the middle column
  const row = 0 // always start on row 0 "top row"
  const col =
    playableArray[0].length / 2 - Math.ceil(inGamePiece.shape[0].length / 2) // get middle position of  the playable area, minus the offset of the middle piece lenght . this is for start to draw the piece on the middle of screen
  // console.log(col);
  return { row, col, shape: inGamePiece.shape, color: inGamePiece.color }
}
const piece = pieceProps()

function drawPiece() {
  // iterate through the piece.shape 2d array row by row
  for (let row = 0; row < piece.shape[0].length; row++) {
    for (let col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col]) {
        // if the array element is 1(true) draw a rectangle as cellSize value
        console.log(piece.shape[row][col])
        ctx.fillStyle = piece.color // get piece.color property and fill the rectangle
        ctx.fillRect(
          (piece.col + col) * cellSize,
          (piece.row + row) * cellSize,
          cellSize - 1,
          cellSize - 1
        )
      }
    }
  }
}

function drawField() {
  // draw the playfield
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize)
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // placePiece()
  drawField()
  drawPiece()
  requestAnimationFrame(update)
}

update()
