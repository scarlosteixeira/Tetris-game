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
const cols = 10
const rows = cols * 2
const cellSize = 41 // this is the width and height in px for draw each tetromino single square. screen size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size
ctx.canvas.width = cols * cellSize
ctx.canvas.height = rows * cellSize

const playableArray = [] // 2d array to track pieces position
const nextPieces = [] // array with random pieces ready to be used
let inGamePiece = {}
// let rotateShape = []
let rAFId = null // keep track of animation frame
let fps = 0
let fallSpeed = 30 // move piece down as fallSpeed value
let isPaused = false
// const tetrominosArray = ['i', 'l', 'o', 's','z','j','t'] // list all possible tetrominos options
const tetrominosArray = ['o',"i"] // list all possible tetrominos options
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
  for (let i = 0; i <= 6; i++) {
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
    color: inGamePiece.color,
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
    piece.shape = shapes[count]
    // console.log(piece, count)
  } else {
    count = 0
    piece.shape = shapes[count]
  }
  return piece.shape
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
      if ( piece.shape[y][x]) {
        if (playableArray[piece.row + y + 1][piece.col + x] ) {
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
      playableArray.splice(y,1)
      playableArray.unshift([0,0,0,0,0,0,0,0,0,0])
      isRemoved = true
      levelUp()
    }
  })
  return playableArray
}

let score = 0
function gameScore() {
  const num = Math.pow(removedLines,2) * 100
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
    setFallSpeed --
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
  rAFId = requestAnimationFrame(update)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctxShowNextPiece.clearRect(0, 0, showNextPiece.width, showNextPiece.height)
  drawField()
  drawPiece()
  fallingSpeed()
  
  if (restrictionBottom() || pieceColision()) {
    count = 0 // set shape to initial estate
    placePiece()
    // console.log(playableArray)
    removeLine()
    gameScore()
  }
}

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
  if (e.key === 'ArrowLeft' && !restrictionLeft() ) {
    piece.col--
    if (pieceColision()) {
      piece.col++
    }
  }

  //move right
  if (e.key === 'ArrowRight' && !restrictionRight() ) {
    piece.col++
    if (pieceColision()) {
      piece.col--
    }
  }

  //rotate
  if (e.key === 'ArrowUp') {
    rotate()
  }

  // speed up drop
  if (e.key === 'ArrowDown') {
    if (!restrictionBottom() || !pieceColision()) {
      if (piece.row < 17) {
        fallSpeed = - 20
      }
    }
  }

  //pause game
  if (e.key === 'Escape' && !isPaused) {
    rAFId = requestAnimationFrame(update)
    console.log(isPaused)
    isPaused = true

  } else if (e.key === 'Escape' && isPaused > 0) {
    cancelAnimationFrame(rAFId)
    console.log(isPaused)
    isPaused = false    
  }
})

document.addEventListener('keyup', (e)=>{
  if (e.key === 'ArrowDown'){
    fallSpeed = setFallSpeed
  }

})

