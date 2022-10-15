// * html variables
const canvas = document.querySelector('#main-game')
const showNextPiece = document.querySelector('#next-piece')
const ctx = canvas.getContext('2d')
const ctxShowNextPiece = showNextPiece.getContext('2d')
const cols = 10
const rows = 20
const cellSize = 41 // this is the width and height in px for draw each tetromino single square. screen size is 410x820 => width 410 / 10 col = 41 and height 820 / 20 rows = 41 => 41 row size x 41 col size
ctx.canvas.width = cols * cellSize;
ctx.canvas.height = rows * cellSize;
let frames = requestAnimationFrame(update)



const playableArray = [] // 2d array to track pieces position
const nextPieces = [] // array with random pieces ready to be used
let inGamePiece = {}

const fallSpeed = 100 // move piece down as fallSpeed value
let isPaused = false
const tetrominosArray = ['i', 'l', 'o', 's', 't'] // list all possible tetrominos options
// const tetrominosArray = ['s'] // list all possible tetrominos options
const tetrominos = {
  //tetrominos obj
  i: {
    name: 'i',
    shape0: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1]
    ],
    shape1: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    shape2: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1]
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
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1]
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
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
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
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 1]
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

for (let row = 0; row < 20; row++) {
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
  console.log(nextPieces);
  nextPieces.shift()
  console.log(nextPieces, nextPieces.length);
  console.log(inGamePiece);
  return inGamePiece
}

function pieceProps() {
  getPieces()

  // positioning the piece on the first row and on the middle column
  const row = 0 // always start on row 0 "top row"
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
  if (!isPaused) {
    if (count < shapes.length - 1) {
      count++
      piece.shape = shapes[count]
      console.log(piece, count)
    } else {
      count = 0
      piece.shape = shapes[count]
    }
  }
  return piece
}

let intervalId
function fallingSpeed() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      piece.row++
    }, fallSpeed)
  }
}
function restrictions () {
  let aux
  piece.shape.map((row,y)=>{
    row.map((col,x)=>{
      // console.log(`y${y}`);
      // console.log(`x${x}`);
      // console.log(`p.col${piece.col}`, `p.col+x${piece.col + x} `);
      // console.log(`p.row${piece.row}`, `p.row+y${piece.row + y} `);
      // console.log(`array row${playableArray[0].length}`);
      // console.log(`array${playableArray.length}`);
      // console.log(restrictions());
        
      if (piece.row + y >= playableArray.length){
        aux = false
      } else {
        aux = true
      }
      return aux
    })
  })
  return aux
}
let restricTrigged = restrictions()
//place piece on the playableArray
function placePiece() {
  let count = 0
  piece.shape.forEach((row, y) => {
    row.forEach((col, x) => {
      if (piece.shape[y][x] && !restricTrigged) {
        count++
        console.log(playableArray, count)
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

  nextPieces[1].shape0.forEach((row, y) => {
    row.forEach((col, x) => {
      if (nextPieces[1].shape0[y][x]) {
        ctxShowNextPiece.fillStyle = nextPieces[1].color
        ctxShowNextPiece.fillRect(
          (x + 3 - Math.ceil(nextPieces[1].shape0[0].length / 2)) * cellSize,
          (y+1) * cellSize,
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
        ctx.fillRect(
          (col) * cellSize,
          (row) * cellSize,
          cellSize - 1,
          cellSize - 1
        )
      }

    }
  }
}

function update() {
  frames = requestAnimationFrame(update)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctxShowNextPiece.clearRect(0, 0, showNextPiece.width, showNextPiece.height)
  drawField()
  drawPiece()
  fallingSpeed()
  restricTrigged = restrictions()
  // console.log(restrictions());
  if (!restricTrigged) {
    piece.row -- 
    placePiece()
  }

  // console.log(frames);
  
}

update()

document.addEventListener('keydown', e => {
  //move left+

  if (e.key === 'ArrowLeft') {
    piece.col--
  }
  
  //move right
  if (e.key === 'ArrowRight' ) {
    piece.col++
  }

  //rotate
  if (e.key === 'ArrowUp') {
    rotate()
  }

  //pause game
  if (e.key === 'Escape' && intervalId <= 0) {
    intervalId = 0
    isPaused = false
    fallingSpeed()
   
  } else if (e.key === 'Escape' && intervalId > 0) {
    clearInterval(intervalId)
    intervalId = -1
    isPaused = true
  
  }
})
