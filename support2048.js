//获取每一个小格子的具体位置
//top = 距离顶部padding 20 +（格子的高度和该格子对的padding-bottom）* 上面有几个
//left同理
function getPosTop(i, j) {
    return 20 + (i-1) * 120;
}
function getPosLeft(i, j) {
    return 20 + (j-1) * 120;
}
//设置不同数字的不同展示颜色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return '#eee4da';
            break;
        case 4:
            return '#ede0c8';
            break;
        case 8:
            return '#f2b179';
            break;
        case 16:
            return '#f59563';
            break;
        case 32:
            return '#f67c5f';
            break;
        case 64:
            return '#f65e3b';
            break;
        case 128:
            return '#edcf72';
            break;
        case 256:
            return '#edcc61';
            break;
        case 512:
            return '#9c0';
            break;
        case 1024:
            return '#33b5e5';
            break;
        case 2048:
            return '#09c';
            break;
        case 4096:
            return '#a6c';
            break;
        case 8192:
            return '#93c';
            break;
    }
    return 'black';
}
function getNumberColor(number) {
    if (number <= 4) {
        return '#776e65';
    }
    return 'white';
}
//判断有没有空位
function nospace(board) {
    for(var i=1;i<= mapSize;i++){
        for(var j=1;j<= mapSize;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
