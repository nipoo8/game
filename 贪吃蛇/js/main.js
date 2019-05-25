window.onload = function (){
    var oGame = document.getElementById('games');
    var seArr = [[10,9],[10,10],[10,11],[10,12]]; //储存蛇的数组，初始状态固定,第一个元素仅标记
    var seX = 10;    //储存蛇头x坐标
    var seY = 12;    //储存蛇头y坐标

    var gsX = 0;    //储存果实x坐标
    var gsY = 0;    //储存果实y坐标
    var speed = 0;  //储存速度
    var timer = null;   //储存定时器
    var way = 0;     //记录此时蛇运动方向

    var oBtn1 = document.getElementById('btn1'); //开始新游戏按钮
    //点击开始新游戏按钮事件
    oBtn1.addEventListener('click',function (){
        getGame();
    },false);
    //初始化游戏背景
    function getBack(){
        oGame.innerHTML = "";
        for(var i=0;i<3000;i++){
            var oDiv = document.createElement('div');
            oDiv.className = "backBulk";
            oDiv.style.backgroundColor = "#fef"
            oGame.appendChild(oDiv);
        }
    }
    //初始渲染
    function setPi(){
        var oDivs = oGame.getElementsByTagName('div');
        oDivs[seX*60+seY].style.backgroundColor = "#000";
        oDivs[seX*60+seY-1].style.backgroundColor = "#000";
        oDivs[seX*60+seY-2].style.backgroundColor = "#000";
    }
    //运动中渲染
    function setPirun(){
        var oDivs = oGame.getElementsByTagName('div');
        oDivs[seArr[0][0]*60+seArr[0][1]].style.backgroundColor = "#fef";
        //oDivs[seX*60+seY].style.backgroundColor = "#000";
        // for(var i=0;i<seArr.length-1;i++){
        //     oDivs[seArr[i][0]*60+seArr[i][1]].style.backgroundColor = "#fef";
        // }
        for(var j=1;j<seArr.length;j++){
            oDivs[seArr[j][0]*60+seArr[j][1]].style.backgroundColor = "#000";
        }
        // oDivs[seX*60+seY].style.backgroundColor = "#000";
        // oDivs[seArr[0][0]*60+seArr[0][1]].style.backgroundColor = "#fef";
    }
    //随机生成苹果
    function getApple(){
        gsX = parseInt(Math.random()*50);
        gsY = parseInt(Math.random()*60);
        for(var i=1;i<seArr.length;i++){
            if(gsX==seArr[i][0]&&gsY==seArr[i][1]){
                getApple();
                return;
            }
        }
        document.getElementsByTagName('span')[1].innerHTML = seArr.length-1;
        var oDivs = oGame.getElementsByTagName('div');
        oDivs[gsX*60+gsY].style.backgroundColor = "red";
    }
    function jug(){
        for(var i=1;i<seArr.length-1;i++){
            if(seArr[i][0]==seX&&seArr[i][1]==seY){
                alert('嗨呀，你死了 长度：'+document.getElementsByTagName('span')[1].innerHTML);
                clearInterval(timer);
                timer = null;
                return;
            }
        }
        if(seX<0||seX>=50||seY<0||seY>=60){
                alert('嗨呀，你死了 长度：'+document.getElementsByTagName('span')[1].innerHTML);
                clearInterval(timer);
                timer = null;
                return;
            }
    }
    //运动
    function gogogo(){
        timer = setInterval(function (){
            //改变数组

            switch(way){
                case 0:{
                    seArr.push([seX,++seY]);
                    if(seX!==gsX||seY!==gsY){
                        seArr.shift();
                    }
                    else{
                        getApple();
                    }
                }break;
                case 1:{
                    seArr.push([seX,seY--]);
                    if(seX!==gsX||seY!==gsY){
                        seArr.shift();
                    }
                    else{
                        getApple();
                    }
                }break;
                case 2:{
                    seArr.push([++seX,seY]);
                    if(seX!==gsX||seY!==gsY){
                        seArr.shift();
                    }
                    else{
                        getApple();
                    }
                }break;
                case 3:{
                    seArr.push([--seX,seY]);
                    if(seX!==gsX||seY!==gsY){
                        seArr.shift();
                    }
                    else{
                        getApple();
                    }
                }  break; 
            }
            jug();
            setPirun()  //渲染
        },speed);
    }
    

    //初始化游戏整体
    function getGame(){
        seX = 10;    
        seY = 12;
        seArr = [[10,9],[10,10],[10,11],[10,12]];
        if(timer){
            clearInterval(timer);
            timer = null;
        }
        way = 0;
        getBack();  //生成背景
        getSpeed(); //获取速度
        setPi();    //渲染
        getApple(); //随机生成苹果
        gogogo();   //运动
    }
    //获取速度
    function getSpeed(){
        var oChoose = document.getElementById('choose');
        switch(oChoose.value){
            case "LV1": speed = 300;break;
            case "LV2": speed = 200;break;
            case "LV3": speed = 120;break;
            case "LV4": speed = 80;break;
            case "LV5": speed = 50;break;
            case "LV6": speed = 30;break;
            case "LV7": speed = 20;break;
        }
    }

    //添加键盘按键效果
    document.onkeydown = function(event){
        var e = event || window.event;
        var keyCode = e.keyCode || e.which;
        //clearInterval(timer);
        //alert(keyCode);
        switch(keyCode){
            case 102:way=0;break;
            case 100:way=1;break;
            case 101:way=2;break;
            case 104:way=3;break;
        }
        //gogogo();
    }
}