// * html variables
// const speedUp = document.querySelector('#speedUp')
// const speedDown = document.querySelector('#speedDown')

const scoreDisplay = document.querySelector('#score-display')

const levelDisplay = document.querySelector('#level-display')

const linesDisplay = document.querySelector('#lines-display')

const canvas = document.querySelector('#main-game')

const showNextPiece = document.querySelector('#next-piece')

const ctx = canvas.getContext('2d')

const ctxShowNextPiece = showNextPiece.getContext('2d')

// * canvas sizing
ctx.canvas.width = window.innerWidth * 0.214  // sets canvas width as per user screen size by about 20% of it.
ctx.canvas.height = ctx.canvas.width * 2 // sets canvas height to twice the width. the playable field has 10 columns (width) and 20 rows (height)
ctxShowNextPiece.canvas.width = window.innerWidth * 0.14
ctxShowNextPiece.canvas.height = ctxShowNextPiece.canvas.width / 1.37
let cellSize = ctx.canvas.width / 10 // this is the width and height in px for draw each tetromino single square.  Eg. Canvas size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size


window.addEventListener('resize', ()=>{
  ctx.canvas.width = window.innerWidth * 0.21
  ctx.canvas.height = ctx.canvas.width * 2
  cellSize = ctx.canvas.width / 10
  ctxShowNextPiece.canvas.width = window.innerWidth * 0.13
  ctxShowNextPiece.canvas.height = ctxShowNextPiece.canvas.width / 1.37
  console.log(window.innerWidth, ctx.canvas.width);
  console.log(window.innerHeight, ctx.canvas.height);
})

//* game global variables
const cols = 10 // number of columns on the array

const rows = cols * 2 // number of rows on the array

let playableArray = [] // 2d array to track pieces position

const nextPieces = [] // array with random pieces ready to be used generated from tedrominos obj

let inGamePiece = {} // piece from nextPiece array to be placed at game main field

let rAFId = null // keep track of animation frame

let fps = 0

let fallSpeed = 30 // move piece down as fallSpeed value

let isGameOver = false 

let isPaused = false

const tetrominosArray = ['i', 'l', 'o', 's', 'z', 'j', 't'] // list all possible tetrominos options
// const tetrominosArray = ['o',"i"] // list all possible tetrominos options

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
    color: 'cyan',
  },
  j: {
    name: 'j',
    shape0: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    shape1: [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    shape2: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ],
    shape3: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    color: 'blue',
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
    color: 'orange',
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
    color: 'yellow',
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
    color: 'green',
  },

  z: {
    name: 'z',
    shape0: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    shape1: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ],
    shape2: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ],
    shape3: [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ],
    color: 'red',
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
    color: 'purple',
  },
}

// creates playableArray from row index -2 to 19 and populates these rows 10 "columns" indexes. set these indexes equals to 0.

for (let row = -2; row < 20; row++) {
  playableArray[row] = []

  for (let col = 0; col < 10; col++) {
    playableArray[row][col] = 0
  }
}

//! functions

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
let piece = pieceProps() // in game piece

let count = 0 // couter to set the piece shape index

// rotates in game piece
function rotate() {
  // list all possible shapes of a particular piece
  const shapes = [
    inGamePiece.shape0,
    inGamePiece.shape1,
    inGamePiece.shape2,
    inGamePiece.shape3
  ]
  // if the count is less than the shapes array length, increase the count by 1
  if (count < shapes.length - 1) {
    count++
  // if the count is equal to the shapes array length, set the count to 0
  } else if (count % 3 === 0) {
    count = 0
  }
  // set the current shape index to the count 
  const currentRotationIndex = count
  // set the next shape index to the count + 1 (next shape)
  let nextRotationIndex = currentRotationIndex + 1
  // if the next shape index is equal to the shapes array length, set the next shape index to 0 (first shape).
  if (currentRotationIndex === 3) {
    nextRotationIndex = 0
  }
  // set the piece shape to the current shape index
  piece.shape = shapes[currentRotationIndex]
  // set the piece next shape to the next shape index
  piece.nextShape = shapes[nextRotationIndex]
  // return the piece shape
  return piece.shape
}

function rotateRestriction() {
  let isRotated = true
  piece.nextShape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (
        (piece.nextShape[y][x] && piece.col + x < 0) ||
        (piece.nextShape[y][x] && piece.col + x > cols - 1) ||
        (piece.nextShape[y][x] &&
          playableArray[piece.row + y + 1][piece.col + x]) ||
        (piece.nextShape[y][x] && playableArray[piece.row + y][piece.col + x])
      ) {
        isRotated = false
      }
    })
  })
  return isRotated
}

function fallingSpeed() {
  if (fps > fallSpeed) {
    fps = 0
    piece.row++
  } else {
    fps++
  }
}

function restrictionLeft() {
  let isLeft = false
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
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
      // console.log(piece.row + y)
      // console.log(col + piece.col);
      // console.log(piece.col , piece.row);
      if (piece.shape[y][x]) {
        if (playableArray[piece.row + y + 1][piece.col + x]) {
          // || playableArray[piece.row + y][piece.col + x]
          isColision = true
        }
      }
    })
  })

  return isColision
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

let removedLines = 0
let isRemoved = false
function removeLine() {
  playableArray.forEach((row, y) => {
    if (playableArray[y].every(elem => elem !== 0)) {
      removedLines++
      removedLinesAcc++
      playableArray.splice(y, 1)
      playableArray.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      isRemoved = true
      levelUp()
    }
  })
  return playableArray
}

let score = 0
function gameScore() {
  const num = Math.pow(removedLines, 2) * 100
  removedLines = 0
  score += num
  scoreDisplay.innerHTML = score
}

let level = 1
let removedLinesAcc = 0
let setFallSpeed = 30

function levelUp() {
  linesDisplay.innerHTML = removedLinesAcc
  // console.log(level);
  if (isRemoved && removedLinesAcc % 10 === 0) {
    setFallSpeed -= 2
    // console.log(setFallSpeed);
    fallSpeed = setFallSpeed
    level += 1
  }
  isRemoved = false
  levelDisplay.innerHTML = level
}


function drawPiece() {
  // iterate through the piece.shape 2d array row by row
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      // if the array element is 1(true) draw a rectangle as cellSize value
      if (piece.shape[y][x]) {
        // get piece.color property and fill the rectangle
        ctx.fillStyle = piece.color 
        // draw the rectangle
        ctx.fillRect(
          // x and y coordinates of the rectangle
          (piece.col + x) * cellSize,
          (piece.row + y) * cellSize,
          // width and height of the rectangle
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
          (x + 3.5 - Math.ceil(nextPieces[0].shape0[0].length / 2)) * cellSize,
          (y + 1.4) * cellSize,
          cellSize - 1,
          cellSize - 1
        )
      }
    })
  })
}

// draw the playfield
function drawField() {
  let color
  // iterate through the playableArray 2d array row by row
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      // set the fill color to grey
      ctx.fillStyle = "#ccc"
      // set the stroke color to black
      ctx.strokeStyle = "black"
      // draw the rectangle borders
      ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize)
      // draw the rectangle fill
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)

      // if the array element is not 0(false) draw a rectangle as cellSize value
      if (playableArray[row][col]) {
        // get the color from the playableArray
        color = playableArray[row][col]
        // fill the rectangle with the color
        ctx.fillStyle = color
        // draw the rectangle
        ctx.fillRect(col * cellSize, row * cellSize, cellSize - 1, cellSize - 1)
      }
    }
  }
}

function gameOver() {
  if (playableArray[-1].some((elem => elem !== 0))) {
    cancelAnimationFrame(rAFId)
    isGameOver = true
    const gameOverArray = [
      [0, "red", "red", "red", "red", 0, 0, "blue", 0, 0],
      [0, "red", 0, 0, 0, 0, "blue", 0, "blue", 0],
      [0, "red", 0, "red", "red", 0, "blue", "blue", "blue", 0],
      [0, "red", 0, 0, "red", 0, "blue", 0, "blue", 0],
      [0, "red", "red", "red", "red", 0, "blue", 0, "blue", 0],
      [0, "green", 0, 0, "green", 0, "orange", "orange", "orange", 0],
      [0, "green", "green", "green", "green", 0, "orange", 0, 0, 0],
      [0, "green", "green", "green", "green", 0, "orange", "orange", "orange", 0],
      [0, "green", 0, 0, "green", 0, "orange", 0, 0, 0],
      [0, "green", 0, 0, "green", 0, "orange", "orange", "orange", 0],
      [0, "yellow", "yellow", "yellow", 0, "purple", 0, 0, "purple", 0],
      [0, "yellow", 0, "yellow", 0, "purple", 0, 0, "purple", 0],
      [0, "yellow", 0, "yellow", 0, "purple", 0, 0, "purple", 0],
      [0, "yellow", 0, "yellow", 0, 0, "purple", "purple", 0, 0],
      [0, "yellow", "yellow", "yellow", 0, 0, "purple", "purple", 0, 0],
      [0, "orange", "orange", "orange", 0, 0, "cyan", "cyan", "cyan", 0],
      [0, "orange", 0, 0, 0, 0, "cyan", 0, "cyan", 0],
      [0, "orange", "orange", "orange", 0, 0, "cyan", "cyan", "cyan", 0],
      [0, "orange", 0, 0, 0, 0, "cyan", "cyan", 0, 0],
      [0, "orange", "orange", "orange", 0, 0, "cyan", 0, "cyan", 0]
    ]
    playableArray = gameOverArray
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawField()
  }
  return isGameOver
}

function update() {
  rAFId = requestAnimationFrame(update)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctxShowNextPiece.clearRect(0, 0, showNextPiece.width, showNextPiece.height)
  drawField()
  drawPiece()

  if (!isPaused) {
    fallingSpeed()
  }

  if (restrictionBottom() || pieceColision()) {
    count = 0 // set shape to initial estate
    gameOver()
    placePiece()
    // console.log(playableArray)
    removeLine()
    gameScore()
    
  }
}

//! event listeners
// speedUp.addEventListener('click', () => {
//   fallSpeed -= 1
//   console.log(fallSpeed)
// })
// speedDown.addEventListener('click', () => {
//   fallSpeed += 2
//   console.log(fallSpeed)
// })

document.addEventListener('keydown', e => {
  //move left
  if (e.key === 'ArrowLeft' && !restrictionLeft() && !isPaused) {
    piece.col--
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

  // speed up drop
  if (e.key === 'ArrowDown' && !isPaused) {
    if (!restrictionBottom() || !pieceColision()) {
      if (piece.row < 17) {
        fallSpeed = -10
      }
    }
  }

  //start game
  if (e.key === 'Enter') {
    window.location.reload()
  }

  // pause game
  if (e.key === 'Escape' && !isPaused) {
    // console.log(isPaused)
    isPaused = true
  } else if (e.key === 'Escape' && isPaused > 0) {
    // console.log(isPaused)
    isPaused = false
  }
})

// speed up drop, set to current game speed when you release the ArrowDown btn.
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowDown') {
    fallSpeed = setFallSpeed
  }
})

//! game start
rAFId = requestAnimationFrame(update)