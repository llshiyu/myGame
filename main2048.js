board = [];//游戏数据
score = 0;//游戏分数
const mapSize = 4;//
needNewPoint = 0;

$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneUseablePoint();
    generateOneUseablePoint();
    print();
}

//初始化
function init() {
    for (let i = 1; i <= mapSize; i++) {
        for (let j = 1; j <= mapSize; j++) {
            $('#gridContainer').append('<div class="grid-cell" id="grid-cell-' + i + '-' + j + '"></div>');
        }
    }
    //通过js设置每个小个子的位置
    for (let i = 1; i <= mapSize; i++) {
        for (let j = 1; j <= mapSize; j++) {
            let gridCell = $('#grid-cell-' + i + '-' + j);//获取每一格小格子
            gridCell.css('top', getPosTop(i, j));//通过传入坐标值计算相应的top值，函数在support2048.js中
            gridCell.css('left', getPosLeft(i, j));//通过传入坐标值计算相应的left值
        }
    }
    // 设置每一格的初始值为0
    for (let x = 0; x <= mapSize + 1; x++) {
        board[x] = [];
        for (let y = 0; y <= mapSize + 1; y++) {
            board[x][y] = 0;
        }
    }
    //边界
    for (let x = 0; x <= mapSize + 1; x++) {
        for (let y = 0; y <= mapSize + 1; y++) {
            if (x === 0 || y === 0 || x === mapSize + 1 || y === mapSize + 1) {
                board[x][y] = 99999;
            }
        }
    }
    //每一次初始化的时候新建number-cell
    updateBoardView();
}

//根据board变量的值对前端的 number-cell 进行操作
function updateBoardView() {
    $('.number-cell').remove();
    for (let i = 1; i <= mapSize; i++) {
        for (let j = 1; j <= mapSize; j++) {
            $('#gridContainer').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            let theNumberCell = $('#number-cell-' + i + '-' + j);
            if (board[i][j] === 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                //把number-cell放到grid-cell的中间位置
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                //把number-cell放到grid-cell的中间位置
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                //不同数值的不同背景色  不同文字颜色  在support2048.js
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }

}


//如果有空位随机生成一个
function generateOneUseablePoint() {
    let point, x, y;
    //判断当前位置是否可用
    while (true) {
        point = generateOnePoint();
        x = parseInt(point / mapSize) + 1;
        y = parseInt(point % mapSize) + 1;
        if (board[x][y] !== 0) {
            continue;
        }
        board[x][y] = Math.random() < 0.5 ? 2 : 4;
        //展示数字时的动画效果 show_animation2048.js
        showNumberWithAnimation(x, y, board[x][y]);
        break;
    }

}

function generateOnePoint() {
    return parseInt(Math.random() * mapSize * mapSize);
}

//获取玩家按下键盘信息
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            //如果不能向左移动  moveleft返回值为false  能   true
            moveLeft();
            break;
        case 38://up
            moveUp();
            break;
        case 39://right
            moveRight();
            break;
        case 40://down
            moveDown();
            break;
        default:
            break;
    }
    if (1 === needNewPoint) {
        generateOneUseablePoint();
        needNewPoint = 0;
    }
    updateBoardView();
    if (isgameover()) {
        alert("game over!");
    }
    print();
});

function moveLeft() {
    move(mapSize + 1, mapSize + 1, 0, -1);
}

function moveRight() {
    move(0, 0, 0, 1);
}

function moveUp() {
    move(mapSize + 1, mapSize + 1, -1, 0);
}

function moveDown() {
    move(0, 0, 1, 0);
}

function move(x, y, dx, dy) {
    for (let i = x; i < x + mapSize; i++) {
        for (let j = y; j < y + mapSize; j++) {
            moveAndMorge(Math.abs(i - mapSize), Math.abs(j - mapSize), dx, dy);
        }
    }
}

/**
 * 移动目标到最终位置，并且能合并就合并
 * @param x 目前点的x坐标
 * @param y 目前点的y坐标
 * @param dx 去下一个点x要移动的位置
 * @param dy 去下一个点y要移动的位置
 */
/**
 *
 * @param x
 * @param y
 * @param dx
 * @param dy
 */
function moveAndMorge(x, y, dx, dy) {
    if (board[x][y] === 0) {
        return;
    }
    // 如果不能移动且合并，直接返回
    if (board[x + dx][y + dy] !== 0 && board[x][y] !== board[x + dx][y + dy]) {
        return;
    }
    console.log("x:", x, "y:", y, "dx:", dx, "dy:", dy);
    //会发生有效行为，则需要生成新的点
    needNewPoint = 1;

    num = board[x][y];
    //移动，直到不能移动
    while (board[x + dx][y + dy] === 0) {
        board[x][y] = 0;
        x += dx;
        y += dy;
        board[x][y] = num;
    }

    //合并
    if (board[x + dx][y + dy] === num) {
        board[x][y] = 0;
        x += dx;
        y += dy;
        board[x][y] += num;
    }
}

// function move(x, y) {
//     for (let z = 0; z < mapSize; z++) {
//         for (let i = 1; i <= mapSize; i++) {
//             for (let j = 1; j <= mapSize; j++) {
//                 if (board[i][j] !== 0 && board[i + x][j + y] === 0) {
//                     board[i + x][j + y] = board[i][j];
//                     board[i][j] = 0;
//                     needNewPoint = 1;
//                     // showMoveAnimation(i, j, i + x, j + y);
//                 }
//             }
//         }
//     }
//     merge(x, y);
// }

function merge(x, y) {
    let t = false;
    for (let i = 1; i <= mapSize; i++) {
        for (let j = 1; j <= mapSize; j++) {
            if (board[i + x][j + y] === board[i][j] && board[i][j] !== 0) {
                board[i + x][j + y] += board[i][j];
                board[i][j] = 0;
                t = true;
                needNewPoint = 1;
                // showMoveAnimation(i, j, i + x, j + y);
            }
        }
    }
    if (t) {
        move(x, y);
    }
}

//判断当前游戏是否结束
function isgameover() {
    for (let x = 1; x <= mapSize; x++) {
        for (let y = 1; y <= mapSize; y++) {
            if (0 === board[x][y] || board[x][y] === board[x - 1][y] || board[x][y] === board[x][y - 1]) {
                return 0;
            }
        }
    }
    return 1;
}

function print() {
    for (let x of board) {
        console.log(x);
    }
}