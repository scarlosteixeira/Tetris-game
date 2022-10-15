// * html variables
const speedUp = document.querySelector('#speedUp')
const speedDown = document.querySelector('#speedDown')
const canvas = document.querySelector('#main-game')
const showNextPiece = document.querySelector('#next-piece')
const ctx = canvas.getContext('2d')
const ctxShowNextPiece = showNextPiece.getContext('2d')
const cols = 10
const rows = 20
const cellSize = 41 // this is the width and height in px for draw each tetromino single square. screen size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size
ctx.canvas.width = cols * cellSize
ctx.canvas.height = rows * cellSize

const playableArray = [] // 2d array to track pieces position
const nextPieces = [] // array with random pieces ready to be used
let inGamePiece = {}
let rotateShape = []
let fps = 0
let fallSpeed = 10 // move piece down as fallSpeed value
let isPaused = false
// const tetrominosArray = ['i', 'l', 'o', 's', 't'] // list all possible tetrominos options
const tetrominosArray = ['i'] // list all possible tetrominos options
const tetrominos = {
  //tetrominos obj
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
    color: 'cyan'
  },
  l: {
    name: 'l',
    shape0: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    shape1: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    shape2: [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    shape3: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ],
    color: 'orange'
  },
  o: {
    name: 'o',
    shape0: [
      [1, 1],
      [1, 1]
    ],
    shape1: [
      [1, 1],
      [1, 1]
    ],
    shape2: [
      [1, 1],
      [1, 1]
    ],
    shape3: [
      [1, 1],
      [1, 1]
    ],
    color: 'yellow'
  },
  s: {
    name: 's',
    shape0: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    shape1: [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    shape2: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    shape3: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
    ],
    color: 'green'
  },
  t: {
    name: 't',
    shape0: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    shape1: [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ],
    shape2: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    shape3: [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ],
    color: 'purple'
  }
}

for (let row = -2; row < 20; row++) {
  playableArray[row] = []

  for (let col = 0; col < 10; col++) {
    playableArray[row][col] = 0
  }
}

// generate a random number to choose a piece on the tedrominos obj
function randomPiece() {
  const randNum = Math.floor(Math.random() * tetrominosArray.length)
  const name = tetrominosArray[randNum]
  return tetrominos[name]
}

function setPieces() {
  for (let i = 0; i <= 10; i++) {
    nextPieces.push(randomPiece())
  }
  // console.log(nextPieces);
  return nextPieces
}

function getPieces() {
  if (nextPieces.length <= 2) {
    setPieces()
  }
  inGamePiece = nextPieces[0]

  // console.log(nextPieces);
  nextPieces.shift()
  // console.log(nextPieces, nextPieces.length);
  // console.log(inGamePiece);
  return inGamePiece
}

function pieceProps() {
  getPieces()

  // positioning the piece on the first row and on the middle column
  const row = -2 // always start on row 0 "top row"
  const col =
    playableArray[0].length / 2 - Math.ceil(inGamePiece.shape0[0].length / 2) // get middle position of  the playable area, minus the offset of the middle piece lenght . this is for start to draw the piece on the middle of screen

  return {
    name: inGamePiece.name,
    row,
    col,
    shape: inGamePiece.shape0,
    color: inGamePiece.color
  }
}
let piece = pieceProps()

let count = 0
function rotate() {
  const shapes = [
    inGamePiece.shape0,
    inGamePiece.shape1,
    inGamePiece.shape2,
    inGamePiece.shape3
  ]
  if (count < shapes.length - 1) {
    count++
    rotateShape = shapes[count]
    console.log(piece, count)
  } else {
    count = 0
    rotateShape = shapes[count]
  }
  return rotateShape
}

function fallingSpeed() {
  if (fps > fallSpeed) {
    fps = 0
    piece.row++
  } else {
    fps ++
  }
}

function restrictions(pieceShape, pieceRow, pieceCol) {
  let aux = true
  pieceShape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (
        (pieceShape[y][x] && pieceCol + x < 0) || // restriction to left
        (pieceShape[y][x] && pieceCol + x >= cols) || // restriction to right
        (pieceShape[y][x] && pieceRow + y >= rows) || // restriction to bottom
        (pieceShape[y][x] && playableArray[pieceRow + y][pieceCol + x]) // piece colision
      ) {
        aux = false
      }
    })
  })
  return aux
}

//place piece on the playableArray
function placePiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (piece.shape[y][x]) {
        // console.log(playableArray)
        playableArray[piece.row + y][piece.col + x] = piece.color
      }
    })
  })
  piece = pieceProps()
}

function drawPiece() {
  // iterate through the piece.shape 2d array row by row
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (piece.shape[y][x]) {
        // if the array element is 1(true) draw a rectangle as cellSize value
        ctx.fillStyle = piece.color // get piece.color property and fill the rectangle
        ctx.fillRect(
          (piece.col + x) * cellSize,
          (piece.row + y) * cellSize,
          cellSize - 1,
          cellSize - 1
        )
      }
    })
  })

  nextPieces[0].shape0.forEach((row, y) => {
    row.forEach((col, x) => {
      if (nextPieces[0].shape0[y][x]) {
        ctxShowNextPiece.fillStyle = nextPieces[0].color
        ctxShowNextPiece.fillRect(
          (x + 3 - Math.ceil(nextPieces[0].shape0[0].length / 2)) * cellSize,
          (y + 1) * cellSize,
          cellSize - 1,
          cellSize - 1
        )
      }
    })
  })
}

function drawField() {
  // draw the playfield
  let color
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize)
      ctxShowNextPiece.strokeRect(
        col * cellSize,
        row * cellSize,
        cellSize,
        cellSize
      )
      if (playableArray[row][col]) {
        color = playableArray[row][col]
        ctx.fillStyle = color
        ctx.fillRect(col * cellSize, row * cellSize, cellSize - 1, cellSize - 1)
      }
    }
  }
}

function update() {
  requestAnimationFrame(update)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctxShowNextPiece.clearRect(0, 0, showNextPiece.width, showNextPiece.height)
  drawField()
  drawPiece()
  fallingSpeed()
  if (!restrictions(piece.shape, piece.row, piece.col)) {
    count = 0 // set shape to initial estate
    piece.row--
    placePiece()
  }

  
}

update()
speedUp.addEventListener('click', ()=>{
  fallSpeed -= 1
  console.log(fallSpeed);
})
speedDown.addEventListener('click', ()=>{

  fallSpeed += 2
  console.log(fallSpeed);

})
document.addEventListener('keydown', e => {

  //move left
  if (e.key === 'ArrowLeft') {
    piece.col--
    if (!restrictions(piece.shape, piece.row, piece.col)) {
      piece.col++
    }
  }

  //move right
  if (e.key === 'ArrowRight') {
    piece.col++
    if (!restrictions(piece.shape, piece.row, piece.col)) {
      piece.col--
    }
  }

  //rotate
  if (e.key === 'ArrowUp') {
    rotate()
    // console.log(piece.shape);
    // const shape = rotate()
    // console.log(shape.shape);
    if (restrictions(rotateShape, piece.row, piece.col)) {
      piece.shape = rotateShape
    }
  }

  //pause game
  if (e.key === 'Escape' && !isPaused) {
    isPaused = false
  } else if (e.key === 'Escape' && isPaused > 0) {
    isPaused = true
    cancelAnimationFrame(update)
  }
})
