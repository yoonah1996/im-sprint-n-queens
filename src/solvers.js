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
  for (let i = 0; i < n; i++) {   //루트에 자식을 n개 넣는다.
    let childSolution = JSON.parse(JSON.stringify(solution)); // 초기값 복사
    childSolution[j][i] = 1;
    if (!this.hasAnyRowConflicts(n, childSolution) || !this.hasAnyColConflicts(n, childSolution)) {
      if(j === n) return childSolution;
      let childmatrix = new MatrixTree(childSolution); //루트에 넣을 자식 생성
      if (j < n) {
        this.findMatrix(childmatrix, j + 1);
        matrixTree.children.push(childmatrix);  // 자식 넣는 문
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
window.countNRooksSolutions = function (n) {
  var solutionCount = undefined; // fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// n이 주어졌을 때 n queens 문제의 해답 한 개를 반환합니다.
// 반환 값은 체스 판을 나타내는 2차원 배열입니다.
window.findNQueensSolution = function (n) {
  var solution = undefined; // fixme

  console.log(
    'Single solution for ' + n + ' queens:',
    JSON.stringify(solution),
  );
  return solution;
};

// n이 주어졌을 때 n queens 문제의 전체 해답 개수를 반환합니다.
// 반환 값은 정수입니다.
window.countNQueensSolutions = function (n) {
  var solutionCount = undefined; // fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
