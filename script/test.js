const array = [[0,1,2,3],
               [1,1,1,1]]

// console.log(array[0]);
// console.log(array[1]);
array.forEach((row,y)=>{
  if (row.every(elem => !!elem)) {
    console.log(array[y])
    array.pop()
    
    array[y] = array[y - 1]
    console.log(array[y]);

  }
})