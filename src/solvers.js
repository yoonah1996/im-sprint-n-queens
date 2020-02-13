/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// n이 주어졌을 때 n rooks 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
// rowIndex = 0, n=1, arr=[1]
window.hasRowConflictAt = function (rowIndex, n, arr) {
  let flag = false;
  for (let i = 0; i < n; i++) {
    if (arr[rowIndex][i] === 1) {
      if (flag === false) {
        flag = true;
      } else {
        return true;
      }
    }
  }
  return false; // fixme
}

// 체스 판 위에 행 충돌이 하나라도 있는지 검사합니다.
// n=1 arr=[1]
window.hasAnyRowConflicts = function (n, arr) {
  for (let i = 0; i < n; i++) {
    if (this.hasRowConflictAt(i, n, arr) === true) return true;
  }
  return false; // fixme
}

// COLUMNS - run from top to bottom
// --------------------------------------------------------------
//
// 주어진 열(colIndex)에 충돌하는 말이 있는지 확인합니다.
window.hasColConflictAt = function (colIndex, n, arr) {
  let flag = false;
  for (let i = 0; i < n; i++) {
    if (arr[i][colIndex] === 1) {
      if (flag === false) {
        flag = true;
      } else {
        return true;
      }
    }
  }
  return false; // fixme
}

// 체스 판 위에 열 충돌이 하나라도 있는지 검사합니다.
window.hasAnyColConflicts = function (n, arr) {
  for (let i = 0; i < n; i++) {
    if (this.hasColConflictAt(i, n, arr) === true) return true;
  }
  return false; // fixme
}

window.MatrixTree = function (matrix) {
  this.matrix = matrix;
  this.children = []; // fix me
};
MatrixTree.prototype.addChild = function (matrix) {
  const newTreeNode = new MatrixTree(matrix);
  this.children.push(newTreeNode);
};

window.findMatrix = function (matrixTree, j , n) {
  for (let i = 0; i < n; i++) {   // 인자로 받은 matrixTree에 자식을 n개 넣기 위한 for문 작성
    let childSolution = JSON.parse(JSON.stringify(matrixTree.matrix)); // 깊은 복사를 위해 matrixTree의 matrix프로퍼티의 배열을 JSON.stringify를 통해 문자열로 변환 후 다시 JSON.parse를 통해 배열로 반환
    childSolution[j][i] = 1; // 복사된 부모 체스판에서 row가 j이고 col이 i인곳에 0대신 1을 넣는다(체스말 올리기)
    if ((this.hasAnyRowConflicts(n, childSolution) === false) && (this.hasAnyColConflicts(n, childSolution) === false)) { // n rook이기 때문에 열과 행만 검사
      if(j === n - 1) return childSolution; // 만약 j가 n-1이면 반환 (j는 열에 해당하는 index이고 n은 횟수이기 때문에 n-1은 인덱스의 마지막을 뜻함으로 j가 마지막 인덱스 즉 모든 열에 말을 위치했다고 가정)
      let childmatrix = new MatrixTree(childSolution); //부모에에 넣을 자식 생성
      if (j < n) { //열 index인 j가 n by n의 2차원 배열 안에 있는 값일 때 실행
        let result = this.findMatrix(childmatrix, j + 1, n); // findMatrix에 자식matrix, 열하나가 증가된 j의 인덱스 값과 배열의 크기인 n을 넣고 만약 반환값이 있으면 result에 저장
        if(Array.isArray(result)){ //만약 result에 해답인 배열이 반환이 되면 
          return result; // result를 리턴 이 리턴문은 recursive를 타고 위로 계속되며 리턴된다.
        }
        matrixTree.children.push(childmatrix);  //리턴된 자식노드를 부모노드에 children배열에 넣는다.
      }
    }
  }
}

window.solutionMatrixCount = function (matrixTree, j , n, solutionCount) {
  for (let i = 0; i < n; i++) {   // 인자로 받은 matrixTree에 자식을 n개 넣기 위한 for문 작성
    let childSolution = JSON.parse(JSON.stringify(matrixTree.matrix)); // 깊은 복사를 위해 matrixTree의 matrix프로퍼티의 배열을 JSON.stringify를 통해 문자열로 변환 후 다시 JSON.parse를 통해 배열로 반환
    childSolution[j][i] = 1; // 복사된 부모 체스판에서 row가 j이고 col이 i인곳에 0대신 1을 넣는다(체스말 올리기)
    if ((this.hasAnyRowConflicts(n, childSolution) === false) && (this.hasAnyColConflicts(n, childSolution) === false)) { // n rook이기 때문에 열과 행만 검사
      if(j === n - 1) {
        solutionCount[0] += 1;
       } // 만약 j가 n-1이면 반환 (j는 열에 해당하는 index이고 n은 횟수이기 때문에 n-1은 인덱스의 마지막을 뜻함으로 j가 마지막 인덱스 즉 모든 열에 말을 위치했다고 가정)
      
      let childmatrix = new MatrixTree(childSolution); //부모에에 넣을 자식 생성
      if (j < n) { //열 index인 j가 n by n의 2차원 배열 안에 있는 값일 때 실행
        if((j=== n-1) && (i === n-1)) return "finished";
        let result = this.solutionMatrixCount(childmatrix, j + 1, n, solutionCount); // findMatrix에 자식matrix, 열하나가 증가된 j의 인덱스 값과 배열의 크기인 n을 넣고 만약 반환값이 있으면 result에 저장
        if(result === "finished"){ //만약 result에 해답인 배열이 반환이 되면 
          return result; // result를 리턴 이 리턴문은 recursive를 타고 위로 계속되며 리턴된다.
        }
        matrixTree.children.push(childmatrix);  //리턴된 자식노드를 부모노드에 children배열에 넣는다.
      }
    }
  }
}



window.findNRooksSolution = function (n) {
  var solution = [];  // 이차원 배열을 반환하기 위해 빈배열을 만듬
  let newArr = [];  // solution배열에 넣을 일차 빈배열을 만듬
  for (let i = 0; i < n; i++) { // newarr에 0을 n번 넣기 위해서
    newArr.push(0);   // 0을 넣는문
  }
  for (let i = 0; i < n; i++) { // solution에 newarr를 n번 넣는다.
    solution.push(newArr); // newarr를 넣는 문
  }

  let rootMatrix = new MatrixTree(solution); // 해답트리에 루트생성
  solution = this.findMatrix(rootMatrix, 0, n);
  
  
  


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// [
//  [1,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0],
//  [0,0,0,0]
// ]

// n이 주어졌을 때 n rooks 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
// window.countNRooksSolutions = function (n) {
//   var solutionCount = [0]; // fixme
//   var solution = [];  // 이차원 배열을 반환하기 위해 빈배열을 만듬
//   let newArr = [];  // solution배열에 넣을 일차 빈배열을 만듬
//   for (let i = 0; i < n; i++) { // newarr에 0을 n번 넣기 위해서
//     newArr.push(0);   // 0을 넣는문
//   }
//   for (let i = 0; i < n; i++) { // solution에 newarr를 n번 넣는다.
//     solution.push(newArr); // newarr를 넣는 문
//   }

//   let rootMatrix = new MatrixTree(solution); // 해답트리에 루트생성
//   this.solutionMatrixCount(rootMatrix, 0, n,solutionCount);
//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount[0]);
//   return solutionCount[0];
// };

window.countNRooksSolutions = function (n) {
  var solutionCount = 0; // fixme
  let board = new Board({n:n});
  recursion = function(rowIndex) {
    if(rowIndex === n){
      solutionCount++;
      return;
    }
    for(let i = 0; i < n; i++){
      board.togglePiece(rowIndex, i);
      if(!board.hasAnyRooksConflicts()) {
        recursion(rowIndex + 1);
      }
      board.togglePiece(rowIndex, i);
    }
  }
  recursion(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.hasMajorDiagonalConflictAt= function(colI) {
  let flag = false;
  let arr = this.rows();
  for(let row=0; row < arr.length; row++){
    for(let col = colI; col < arr.length; col++){
      if(colI === (col-row)){
        if(arr[row][col] === 1){
          if(flag === false){
            flag = true;
          }else{
            return true;
          }
        }
      }      
    }
  }
  return false; // fixme
}

// 체스 판 위에 주대각선 충돌이 하나라도 있는지 검사합니다.
window.hasAnyMajorDiagonalConflicts = function() {
  let arr = this.rows();
  for(let row=0; row<arr.length; row++){
    for(let col=0; col<arr.length; col++){
      let majorDiagonalColumnIndexAtFirstRow = this._getFirstRowColumnIndexForMajorDiagonalOn(row,col);
      if(this.hasMajorDiagonalConflictAt(majorDiagonalColumnIndexAtFirstRow) === true) return true;
    }
  }
  return false; // fixme
}

// Minor Diagonals - go from top-right to bottom-left
// --------------------------------------------------------------
//
// 주어진 반대각선에 충돌하는 말이 있는지 확인합니다.
window.hasMinorDiagonalConflictAt = function(minorDiagonalColumnIndexAtFirstRow) {
  let flag = false;
  let arr = this.rows();
  for(let row = 0; row < arr.length; row++){
    for(let col = minorDiagonalColumnIndexAtFirstRow; col >= 0; col--){
      if(minorDiagonalColumnIndexAtFirstRow === (row+col)){
        if(arr[row][col] === 1){
          if(flag === false){
            flag = true;
          }else{
            return true;
          }
        }
      }
    }
  }
}

// 체스 판 위에 반대각선 충돌이 하나라도 있는지 검사합니다.
window.hasAnyMinorDiagonalConflicts = function() {
  let arr = this.rows();
  for(let row=0; row<arr.length; row++){
    for(let col=0; col<arr.length; col++){
      let minorDiagonalColumnIndexAtFirstRow = this._getFirstRowColumnIndexForMinorDiagonalOn(row,col);
      if(this.hasMinorDiagonalConflictAt(minorDiagonalColumnIndexAtFirstRow) === true) return true;
    }
  }
  return false; // fixme
}

window.findNQueensMatrix = function (matrixTree, j , n) {
  for (let i = 0; i < n; i++) {   // 인자로 받은 matrixTree에 자식을 n개 넣기 위한 for문 작성
    let childSolution = JSON.parse(JSON.stringify(matrixTree.matrix)); // 깊은 복사를 위해 matrixTree의 matrix프로퍼티의 배열을 JSON.stringify를 통해 문자열로 변환 후 다시 JSON.parse를 통해 배열로 반환
    childSolution[j][i] = 1; // 복사된 부모 체스판에서 row가 j이고 col이 i인곳에 0대신 1을 넣는다(체스말 올리기)
    if ((this.hasAnyRowConflicts(n, childSolution) === false) && (this.hasAnyColConflicts(n, childSolution) === false)) { // n rook이기 때문에 열과 행만 검사
      if(j === n - 1) return childSolution; // 만약 j가 n-1이면 반환 (j는 열에 해당하는 index이고 n은 횟수이기 때문에 n-1은 인덱스의 마지막을 뜻함으로 j가 마지막 인덱스 즉 모든 열에 말을 위치했다고 가정)
      let childmatrix = new MatrixTree(childSolution); //부모에에 넣을 자식 생성
      if (j < n) { //열 index인 j가 n by n의 2차원 배열 안에 있는 값일 때 실행
        let result = this.findNQueensMatrix(childmatrix, j + 1, n); // findMatrix에 자식matrix, 열하나가 증가된 j의 인덱스 값과 배열의 크기인 n을 넣고 만약 반환값이 있으면 result에 저장
        if(Array.isArray(result)){ //만약 result에 해답인 배열이 반환이 되면 
          return result; // result를 리턴 이 리턴문은 recursive를 타고 위로 계속되며 리턴된다.
        }
        matrixTree.children.push(childmatrix);  //리턴된 자식노드를 부모노드에 children배열에 넣는다.
      }
    }
  }
}


// n이 주어졌을 때 n queens 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
window.findNQueensSolution = function (n) {
  var solution = [];  // 이차원 배열을 반환하기 위해 빈배열을 만듬
  let newArr = [];  // solution배열에 넣을 일차 빈배열을 만듬
  for (let i = 0; i < n; i++) { // newarr에 0을 n번 넣기 위해서
    newArr.push(0);   // 0을 넣는문
  }
  for (let i = 0; i < n; i++) { // solution에 newarr를 n번 넣는다.
    solution.push(newArr); // newarr를 넣는 문
  }

  let rootMatrix = new MatrixTree(solution); // 해답트리에 루트생성
  solution = this.findNQueensMatrix(rootMatrix, 0, n);
  


  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution),
  );
  return solution;
};

// n이 주어졌을 때 n queens 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; // fixme
  let board = new Board({n:n});
  recursion = function(rowIndex) {
    if(rowIndex === n){
      solutionCount++;
      return;
    }
    for(let i = 0; i < n; i++){
      board.togglePiece(rowIndex, i);
      if(!board.hasAnyQueensConflicts()) {
        recursion(rowIndex + 1);
      }
      board.togglePiece(rowIndex, i);
    }
  }
  recursion(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
