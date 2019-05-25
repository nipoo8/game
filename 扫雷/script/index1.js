window.onload = function() {
    var startbtn = document.getElementById('btn');
    var box = document.getElementById('box');
    var flagBox = document.getElementById('flagBox');
    var alertBox = document.getElementById('alertBox');
    var alertImg = document.getElementById('alertImg');
    var close = document.getElementById('close');
    var score = document.getElementById('score');
    var minesNum;
    var mineOver;
    var mineMap = [];
    var block;
    var startGameBool = true;

    bindEvent();

    function bindEvent() {
        startbtn.onclick = function() {
            if (startGameBool) {
                box.style.display = 'block';
                flagBox.style.display = 'block';
                init();
                startGameBool = false;
            }

        }
        box.oncontextmenu = function() {
            return false;
        }
        box.onmousedown = function(e) {
            var event = e.target;
            if (e.which == 1) {
                leftClick(event);
            } else if (e.which == 3) {
                rightClick(event);
            }
        }
        close.onclick = function() {
            alertBox.style.display = 'none';

            box.style.display = 'none';
            flagBox.style.display = 'none';
            box.innerHTML = '';
            startGameBool = true;
        }
    }

    function init() {
        minesNum = 10;
        mineOver = 10;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var con = document.createElement('div');
                con.classList.add('block');
                con.setAttribute('id', i + '-' + j);
                box.appendChild(con);
                mineMap.push({ mine: 0 });
            }
        }
        block = document.getElementsByClassName('block');
        while (minesNum) {
            var mineIndex = Math.floor(Math.random() * 100);
            if (mineMap[mineIndex].mine === 0) {
                mineMap[mineIndex].mine = 1;
                block[mineIndex].classList.add('lei');
                minesNum--;
            }
        }
    }

    function leftClick(dom) {
        if (dom.classList.contains('flag')) {
            return;
        }
        //如果是雷  结束
        var isLei = document.getElementsByClassName('lei');
        if (dom && dom.classList.contains('lei')) {
            for (var i = 0; i < isLei.length; i++) {
                isLei[i].classList.add('showLei');
            }
            setTimeout(function() {
                alertBox.style.display = 'block';
                alertImg.style.backgroundImage = 'url(../经典扫雷图片/over.jpg)';
            }, 800);
        } else {
            var n = 0;
            var arr = dom && dom.getAttribute('id').split('-');
            var arrX = arr && parseInt(arr[0]);
            // alert(arrX);
            var arrY = arr && parseInt(arr[1]);
            dom && dom.classList.add('num');
            dom.style.backgroundImage = 'none';
            //[i-1,j-1] [i-1,j] [i-1,j+1]
            //[i,j-1] [i,j] [i,j+1]
            //[i+1,j-1] [i+1,j] [i+1,j+1]
            for (var i = arrX - 1; i <= arrX + 1; i++) {
                for (var j = arrY - 1; j <= arrY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.classList.contains('lei')) {
                        n++;
                    }
                }
            }
            dom && (dom.innerHTML = n);
            if (n == 0) {
                for (var i = arrX - 1; i <= arrX + 1; i++) {
                    for (var j = arrY - 1; j <= arrY + 1; j++) {
                        var aroundBox = document.getElementById(i + '-' + j);
                        if (aroundBox && aroundBox.length != 0) {
                            if (!aroundBox.classList.contains('check')) {
                                aroundBox.classList.add('check');
                                leftClick(aroundBox);
                            }
                        }
                    }
                }
            }
        }
    }

    function rightClick(dom) {
        if (dom && dom.classList.contains('num')) {
            return;
        }
        dom.classList.toggle('flag');
        if (dom.classList.contains('lei') && dom.classList.contains('flag')) {
            mineOver--;
        }
        if (dom.classList.contains('lei') && !dom.classList.contains('flag')) {
            mineOver++;
        }
        score.innerHTML = mineOver;
        if (mineOver == 0) {
            alertBox.style.display = 'block';
            alertImg.style.backgroundImage = 'url(../经典扫雷图片/success.png)';
        }
    }
};