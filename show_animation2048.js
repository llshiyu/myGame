//展示数字时的动画效果
function showNumberWithAnimation(i, j, randNumber) {
    var numberCell = $('#number-cell-' + i + '-' + j);
    //设置不同数字的不同颜色值并且把数字放进去
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);
    //设置每一格的动画，宽高从0--100px，重新设置下top和left值

    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },500);

}
//移动数字时的动画 从 1--2
function showMoveAnimation(fromx,fromy,tox,toy) {
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);

}