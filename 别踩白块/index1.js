window.onload = function() {
    var go = document.getElementById('go');
    var main = document.getElementById('main');
    var timer = null;
    var speed = 5;
    var num = 0;
    var flag = true;
    var colors = ['#000', 'red', 'yellow', '#f40'];

    //创建行和列
    function cDiv() {
        var oDiv = document.createElement('div');
        var index = Math.floor(Math.random() * 4);
        oDiv.setAttribute('class', 'row');

        for (var i = 0; i < 4; i++) {
            var iDiv = document.createElement('div');
            oDiv.appendChild(iDiv);
        }
        if (main.childNodes.length == 0) {
            main.appendChild(oDiv);
        } else {
            main.insertBefore(oDiv, main.childNodes[0]);
        }
        for (var i = 0; i < 4; i++) {
            if (i === index) {
                var clickDiv = main.childNodes[0].childNodes[index];
                clickDiv.style.backgroundColor = colors[index];
                clickDiv.setAttribute('class', 'i');
            }
        }
    }

    //运动函数
    function move() {
        clearInterval(timer);
        timer = setInterval(function() {
            var step = parseInt(main.offsetTop) + speed;
            main.style.top = step + 'px';
            if (parseInt(main.offsetTop) >= 0) {
                cDiv();
                main.style.top = '-150px';
            }
            var len = main.childNodes.length;
            if (len == 6) {
                for (var i = 0; i < 4; i++) {
                    if (main.childNodes[len - 1].childNodes[i].classList.contains('i')) {
                        alert('游戏结束,当前得分:' + num);
                        clearInterval(timer);
                        flag = false;
                    }
                }
                main.removeChild(main.childNodes[len - 1])
            }
        }, 20);
        bindEvent();
    }
    //点击开始
    function clickStart() {
        go.addEventListener('click', function() {
            go.style.display = 'none';
            //运动创建行和列
            move();
        }, false);
    }
    clickStart();

    //点击小方块  并判断
    function bindEvent() {
        main.addEventListener('click', function(e) {
            if (flag = true) {
                var tar = e.target;
                if (tar.className === 'i') {
                    num++;
                    tar.style.backgroundColor = '#ccc';
                    tar.classList.remove('i');
                } else {
                    alert('游戏结束,当前得分:' + num);
                    clearInterval(timer);
                    flag = false;
                }
                if (num % 10 == 0) {
                    speed++;
                }
            }
        })
    }
}