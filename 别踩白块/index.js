window.onload = function() {
    var go = document.getElementById('go');
    var main = document.getElementById('main');
    var timer = null;
    var speed = 10;
    var num = 0;
    var flag = true;
    var color = ['red', 'blue', 'green', 'yellow']

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
                clickDiv.style.backgroundColor = color[index];
                clickDiv.setAttribute('class', 'i');
            }
        }
    }

    function move() {
        bindClick();
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
                        alert('游戏结束,得分为:' + num);
                        clearInterval(timer);
                        flag = false;
                    }
                }
                main.removeChild(main.childNodes[len - 1]);
            }
        }, 50);

    }

    function clickStart() {
        num = 0;
        go.addEventListener('click', function() {
            go.style.display = 'none';
            move();
        }, false);
    }
    clickStart();

    function bindClick() {
        main.addEventListener('click', function(e) {
            if (flag == true) {
                var tar = e.target;
                if (tar.className === 'i') {
                    num++;
                    tar.style.backgroundColor = '#ccc';
                    tar.classList.remove('i');
                } else {
                    alert('游戏结束,得分为:' + num);
                    clearInterval(timer);
                }
            }
        }, false);
    }
};