
$(document).ready(function () {
    var deviceId = document.getElementById("deviceId").value;
    /* page1 js */
    /* 摇杆控制 */
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var wheel = document.querySelector('.wheel');
    var direction = document.querySelector('.direction');
    var wheelR = wheel.offsetWidth * 0.5;
    var directionR = direction.offsetWidth * 0.5;
    var cenX = wheel.offsetLeft + wheelR;
    var cenY = wheel.offsetTop + wheelR;
    var initDirectionLeft = parseInt(wheelR - directionR);
    var initDirectionTop = initDirectionLeft;
    var moveX;
    var moveY;
    var angle;
    var dis;
    var drtCurX;
    var drtCurY;
    var multiple = 100;
    var sendData = {};
    // 用来判断最后两个元素push的时间差
    var DataArr = [{"time":0}];
    var sendX;
    var sendY;

    init();
    /* 小圆滑动函数 */
    function move() {
        dis = parseInt(Math.sqrt(moveX * moveX + moveY * moveY));
        drtCurX = parseInt(wheelR * moveX / dis);
        drtCurY = parseInt(wheelR * moveY / dis);
        angle = moveY / moveX;
        if (dis <= wheelR) {
            controlDrt(moveX, moveY, angle);
        };
        /* 防溢出 */
        if (dis > wheelR) {
            moveX = drtCurX;
            moveY = drtCurY;
            direction.style.left = initDirectionLeft + moveX + 'px';
            direction.style.top = initDirectionTop - moveY + 'px';
            controlDrt(moveX, moveY, angle);
        };
    };
    /* 初始化小圆位置 */
    function init() {
        direction.style.left = initDirectionLeft + 'px';
        direction.style.top = initDirectionTop + 'px';
    };
    /* 固定小圆移动方向 */
    function controlDrt(X, Y, ratio) {
        if (Math.abs(ratio) < 1) {
            direction.style.left = initDirectionLeft + X + 'px';
            direction.style.top = initDirectionTop + 'px';
            if (X > 30) {
                sendData = { X: multiple, Y: multiple };
            } else if (X < -30) {
                sendData = { X: -multiple, Y: -multiple };
            }
        };
        if (Math.abs(ratio) > 1) {
            direction.style.left = initDirectionLeft + 'px';
            direction.style.top = initDirectionTop - Y + 'px';
            if (Y > 30) {
                sendData = { X: parseInt(multiple / 1.5), Y: multiple };
            } else if (Y < -30) {
                sendData = { X: multiple, Y: parseInt(multiple / 1.5) };
            }
        };
    };
    /* 摇杆控制结束 */
    /* 速度控制 */
	
    var speed = document.querySelector('.speed');
    var speedList = document.querySelectorAll('.list');
    var speedBg = document.querySelector('.speedBg');
    var speedBgWidth = document.querySelector('.speedBg').offsetWidth;
    var num = document.querySelector('.speed span');
    var speedR = speed.offsetWidth * 0.5;
    var speedCenX = parseInt(speed.offsetLeft + speedR);
    var speedCenY = parseInt(speed.offsetTop + speedR);
    var pressX;
    var pressY;
    var speedDis;
    var index;
    var count;
    var timer;
    var rate;
    var startTime;
    var lastTime;
    num.innerHTML = 120;
    var curNum = num.innerHTML * 1;
    for (var i = 0; i < speedList.length; i++) {
        speedList[i].index = i;
        speedList[i].addEventListener('touchstart', function (e) {
            e.preventDefault();
            switch (this.index) {
                case 0:
                    multiple = 50;
                    Addnum(50);
                    speedBg.style.backgroundPosition = '0 0';
                    break;
                case 1:
                    Addnum(80);
                    multiple = 80;
		    speedBg.style.backgroundPosition = -speedBgWidth + 'px 0';
                    break;
                case 2:
                    multiple = 160;
                    Addnum(160);
		    speedBg.style.backgroundPosition = -speedBgWidth * 3 + 'px 0';
                    break;
                case 3:
                    multiple = 120;
                    Addnum(120);
		    speedBg.style.backgroundPosition = -speedBgWidth * 2 + 'px 0';
                    break;
                default:
            };
        }, false);
    };
    var datatime;
    function time(){
    			 $.ajax({  
                     type : "POST",  // 提交方式
                     url : "xy",// 路径
                     data : {  
                    	 deviceId : deviceId,
                    	 x : 0,
                    	 y : 0
                     },
                     success : function(result) {
                     	
                     },
                     error : function(){
                    	 alert("指令遗失到外太空啦，再试一次吧~");
                     }
                 })
    }
    /* 手指点击 */
    wheel.addEventListener('touchstart', function (e) {
    	clearTimeout(datatime);
        e.preventDefault();
        startTime = Date.now();
        var curspeed = document.querySelector('.speed span').innerHTML;
        multiple = curspeed * 1;
    });
    /* 手指滑动 */
    var t = null;
    wheel.addEventListener('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearInterval(t);
        moveX = e.changedTouches[0].clientX - cenX;
        moveY = -(e.changedTouches[0].clientY - cenY);
        move();
// lastTime = Date.now();
        // 防止快速滑动后松手导致的顺序错乱
// if (lastTime - startTime > 300) {
// if (sendX != sendData.X || sendY != sendData.Y) {
// sendX = sendData.X;
// sendY = sendData.Y;
// DataArr.push({"time":Date.now()});
// // 防止手指滑动过快
// // if (DataArr[DataArr.length - 1].time - DataArr[DataArr.length - 2].time >
// 400) {
// // 这里是左右轮子速度值
// console.log(sendData)
// $.ajax({
// type : "POST", // 提交方式
// url : "xy",// 路径
// data : {
// deviceId : deviceId,
// x : sendData.X,
// y : sendData.Y
// },
// success : function(result) {
//			            	
// },
// error : function(){
// alert("请检查您当前的网络")
// }
// });
// // }
// }
// }
        t = setInterval(send, 20);
    });
    function send() {
        if (sendX !== sendData.X || sendY !== sendData.Y) {
            sendX = sendData.X;
            sendY = sendData.Y;
            $.ajax({  
	            type : "POST",  // 提交方式
	            url : "xy",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 x : sendData.X,
	           	 y : sendData.Y
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        }); 
        }
    }
    
    /* 手指松开 */
    wheel.addEventListener('touchend', function () {
        init();
        clearInterval(t);
        sendX = 0;
        sendY = 0; 
        sendData.X=0;
        sendData.Y=0;
        	 $.ajax({  
                 type : "POST",  // 提交方式
                 url : "xy",// 路径
                 data : {  
                	 	deviceId : deviceId,
                	 x : 0,
                	 y : 0
                 },
                 success : function(result) {
                 	
                 },
                 error : function(){
                	 alert("指令遗失到外太空啦，再试一次吧~");
                 }
             });
        	 datatime = setTimeout(time, 300);;
    });
    /* 档位数字变化 */
    function Addnum(newNum) {
        clearInterval(timer);
        timer = setInterval(function () {
            if (curNum > newNum) {
                rate = -5;
            } else if (curNum === newNum) {
                rate = 0;
            } else {
                rate = 5;
            }
            curNum += rate;
            num.innerHTML = curNum;
            if (curNum === newNum) {
                clearInterval(timer)
            }
        }, 50)
    };
    /* 档位数字变化结束 */
    /*
	 * page1 js结束
	 */
    /*
	 * page2 js
	 */
    /* 色环 */
    var color = document.querySelector('.color');
    var innercircle = document.querySelector('.innercircle');
    var $circle = $('.innercircle');
    var colorW = color.offsetWidth;
    var colorOffL = color.offsetLeft;
    var colorOffT = color.offsetTop;
    var circleW = innercircle.offsetWidth;
    // 小圆-圆心的距离
    var circleR = innercircle.offsetLeft - colorW * 0.5 + circleW * 0.5;
    var circleX;
    var circleY;
    // 圆心
    var colorCenX = colorOffL + colorW * 0.5;
    var colorCenY = colorOffT + colorW * 0.5;
    // 相对圆心
    var colorMoveX;
    var colorMoveY;
    var colorMoveR;
    var camber;
    var colortemp;
    var angle = 0;
    var emojIndex = { emoji: emojIndex };
    color.addEventListener('touchstart', function (e) {
        e.preventDefault();
    });
    color.addEventListener('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
        colorMoveX = e.changedTouches[0].clientX - colorCenX;
        colorMoveY = -(e.changedTouches[0].clientY - colorCenY);
        colorMoveR = Math.sqrt(colorMoveX * colorMoveX + colorMoveY * colorMoveY)
        camber = Math.atan2(-colorMoveY, colorMoveX);
        angle = parseInt(camber * 180 / Math.PI);
        if (angle < 0) {
            angle += 360;            
        };  
        angle = parseInt(angle / 360 * 255);
        circle();
        if (colortemp != angle) {
            colortemp = angle;
            // 这里是耳朵颜色值 angle = {earColor:angle}
            // console.log(angle);
           
            
        }
    });
    color.addEventListener('touchend', function () {
    	console.log(angle)
    	 $.ajax({  
	            type : "POST",  // 提交方式
	            url : "lightSendData",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 lightSendData : lightSendData,
	           	 angle : angle
	            },
	            success : function(result) {
	            	
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
    });
    /* 色环结束 */
    /* 亮度控制 */
    var lightBar = document.querySelector('.lightBar');
    var lightPressY;
    var lightDis;
    var curLight = 0;
    var lastLight;
    var initLight = 188;
    var lightMoveY;
    var lightSendData = 150;
    var lightTemp;
    var canvas1 = document.querySelector('#canvas1');
    var ctx1 = canvas1.getContext('2d');
    var r;
    canvas1.width = clientW;
    canvas1.height = clientH;
    PixelRatio(canvas1, ctx1);
    ctx1.translate(colorCenX, colorCenY)
    var canvas2 = document.querySelector('#canvas2');
    var ctx2 = canvas2.getContext('2d');
    canvas2.width = clientW;
    canvas2.height = clientH;
    PixelRatio(canvas2, ctx2);
    ctx2.translate(colorCenX, colorCenY)
    function drawbg() {
        r = colorW * 0.5 + 30;
        ctx1.save();
        ctx1.lineWidth = 5;
        ctx1.strokeStyle = '#222';
        ctx1.lineCap = 'round';
        ctx1.beginPath();
        ctx1.arc(0, 0, r, 135 * Math.PI / 180, 225 * Math.PI / 180);
        ctx1.stroke();
    };
    function drawSelect(initLight) {
        r = colorW * 0.5 + 30;
        ctx2.save();
        ctx2.lineWidth = 4;
        ctx2.strokeStyle = '#ffed3d';
        ctx2.lineCap = 'round';
        ctx2.beginPath();
        ctx2.clearRect(-colorCenX, -colorCenY, clientW, clientH);
        ctx2.arc(0, 0, r, 135 * Math.PI / 180, initLight * Math.PI / 180);
        ctx2.stroke();
    }
    drawbg();
    drawSelect(initLight);
    lightBar.addEventListener('touchstart', function (e) {
        e.preventDefault();
        lightPressY = e.changedTouches[0].clientY;
        lightBar.addEventListener('touchmove', function (e) {
            e.preventDefault();
            e.stopPropagation();
            lightMoveY = e.changedTouches[0].clientY;
            lightDis = -(lightMoveY - lightPressY);
            curLight = parseInt(initLight + (lightDis / 4));
            if (curLight > 225) {
                curLight = 225;
            } else if (curLight < 135) {
                curLight = 135;
            }
            lastLight = curLight;
            drawSelect(curLight);
            lightSendData = parseInt((curLight - 135) * 255 / 90);
            
        });
        lightBar.addEventListener('touchend', function () {
            initLight = lastLight;
            if (lightTemp != lightSendData) {
                lightTemp = lightSendData;
                // 这里是耳朵亮度值
                console.log(lightSendData)
                $.ajax({  
    	            type : "POST",  // 提交方式
    	            url : "lightSendData",// 路径
    	            data : {  
    	           	 	deviceId : deviceId,
    	           	 lightSendData : lightSendData,
    	           	 angle : angle
    	            },
    	            success : function(result) {
    	            	
    	            },
    	            error : function(){
    	           	 alert("指令遗失到外太空啦，再试一次吧~")
    	            }
    	        });
            }
        });
    })
    /* 亮度控制结束 */
    /* 圆点位置和颜色变化 */
    function circle() {
        circleY = colorMoveY * circleR / colorMoveR;
        circleX = colorMoveX * circleR / colorMoveR;
        $circle.css({
            'left': circleX + colorW * 0.5 - circleW * 0.5 + 'px',
            'top': -circleY + colorW * 0.5 - circleW * 0.5 + 'px',
        });
    };
    /* 圆点位置和颜色结束 */
    /* 表情选择 */
    var emojLists = document.querySelectorAll('.right-control .emojList');
    var emojli = document.querySelectorAll('.right-control .ul li');
    for (var i = 0; i < emojLists.length; i++) {
        emojLists[i].index = i;
        emojLists[i].addEventListener('click', function () {
            emojIndex.emoji = this.index;
            for (var j = 0; j < emojli.length; j++) {
                emojLists[j].className = 'emojList';    
            };
            this.setAttribute('class','emojList shadow');
            // 这里是表情选择emojIndex = {emoji:emojIndex};
            console.log(emojIndex.emoji);
            $.ajax({  
                type : "POST",  // 提交方式
                url : "expression",// 路径
                data : {  
               	 	deviceId : deviceId,
               	 emojimun : emojIndex.emoji
                },
                success : function(result) {
                	
                },
                error : function(){
               	 alert("指令遗失到外太空啦，再试一次吧~")
                }
            });
            
        });
    }
    /* 表情选择结束 */
    /*
	 * page2 js 结束
	 */
    /*
	 * page3 js 开始
	 */
    // 开关机
    var powerBtn = document.querySelector('.power li');
    var powerState = true;
    powerBtn.addEventListener('touchstart',function (e) {
        e.preventDefault();
    });
    powerBtn.addEventListener('touchmove',function (e) {
        e.stopPropagation();
    })
    powerBtn.addEventListener('touchend',function () {
        if (powerState) {
            powerBtn.style.backgroundImage = 'url(http://www.eggtoy.com/eggtoy/img/off.png)';
            powerState = false;   
        } else {
           alert('请在设备上开机哦');  
        }
        // 开机发true 关机发false
        console.log(powerState)
        $.ajax({  
            type : "POST",  // 提交方式
            url : "Shutdown",// 路径
            data : {  
           	 	deviceId : deviceId,
            },
            success : function(result) {
            	
            },
            error : function(){
           	 alert("指令遗失到外太空啦，再试一次吧~")
            }
        });
    })
    // 开关机 结束
    // 音量
    var spinBtn = document.querySelector('.spinBtn');
    var spinDot = document.querySelector('.spinDot');
    var spinBtnW = spinBtn.offsetWidth;
    var spinBtnR = spinBtnW * 0.5;
    var spinBtnCenX = spinBtn.offsetLeft + spinBtnR;
    var spinBtnCenY = spinBtn.offsetTop + spinBtnR;
    var spinMoveX;
    var spinMoveY;
    var powerCamber;
    var volumeData;
    var voDataTemp;
    var powerAngle=180;
    var powertemp=180;
    var lock0=0;
    var lock1=0;
    spinBtn.addEventListener('touchstart',function (e) {
        e.preventDefault();
    });
    spinBtn.addEventListener('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
        spinMoveX = e.changedTouches[0].clientX - spinBtnCenX;
        spinMoveY = -(e.changedTouches[0].clientY - spinBtnCenY);
        powerCamber = Math.atan2(-spinMoveY, spinMoveX);
        powerAngle = parseInt(powerCamber * 180 / Math.PI);
        
        if (powerAngle < 0) {
            powerAngle += 360;
        };
        if (powertemp != powerAngle) {
            if( powerAngle-powertemp>0)// 顺时针
            {
                if(powerAngle>320) lock0=1;
               else lock0=0;
            }
            else// 逆时针
            {
                if(powerAngle<5) lock1=1;
                else lock1=0;
            }
            powertemp = powerAngle;
            if(lock0==0&&lock1==0){
            // console.log('当前角度值:' + powerAngle);
            drawPowerSelect(powerAngle);
            spinDot.style.transform = 'rotate('+ (powerAngle -180) +'deg)';
            volumeData = 14 + 2 * Math.ceil(powerAngle / 40);
            if (voDataTemp != volumeData) {
                voDataTemp = volumeData;
                console.log('当前音量值:' + volumeData);
                $.ajax({  
                    type : "POST",  // 提交方式
                    url : "volumeData",// 路径
                    data : {  
                   	 	deviceId : deviceId,
                   	 	volumeData : volumeData
                    },
                    success : function(result) {
                    	
                    },
                    error : function(){
                   	 alert("指令遗失到外太空啦，再试一次吧~")
                    }
                });
            }
            };
        };
    });
    // 音量结束
    // canvas画圆
    var powerCanvas1 = document.querySelector('#powerCanvas1');
    var powerCanvas2 = document.querySelector('#powerCanvas2');
    var powerctx1 = powerCanvas1.getContext('2d');
    var powerctx2 = powerCanvas2.getContext('2d');
    powerCanvas1.width = clientW;
    powerCanvas1.height = clientH;
    powerCanvas2.width = clientW;
    powerCanvas2.height = clientH;
    var drawR;
    PixelRatio(powerCanvas1, powerctx1);
    PixelRatio(powerCanvas2, powerctx2);
    powerctx1.translate(spinBtnCenX,spinBtnCenY);
    powerctx2.translate(spinBtnCenX,spinBtnCenY);
    function powerDrawBg() {
        drawR = spinBtnR + 20;
        powerctx1.save();
        powerctx1.lineWidth = 5;
        powerctx1.strokeStyle = '#111';
        powerctx1.lineCap = 'round';
        powerctx1.beginPath();
        powerctx1.arc(0, 0, drawR, 0 * Math.PI / 180, 320 * Math.PI / 180);
        powerctx1.stroke();
    };
    powerDrawBg();
    drawPowerSelect(180);
    function drawPowerSelect(powerAngle) {
        powerctx2.save();
        powerctx2.lineWidth = 5;
        powerctx2.strokeStyle = '#0dfcff';
        powerctx2.lineCap = 'round';
        powerctx2.beginPath();
        powerctx2.clearRect(-spinBtnCenX, -spinBtnCenY, clientW, clientH);
        powerctx2.arc(0, 0, drawR, 0 * Math.PI / 180, powerAngle * Math.PI / 180);
        powerctx2.stroke();    
    };
    // canvas画圆结束
    /*
	 * page3 js 结束
	 */
    function PixelRatio(ele, electx) {
        var width = ele.width, height = ele.height;
        if (window.devicePixelRatio) {
            ele.style.width = width + "px";
            ele.style.height = height + "px";
            ele.height = height * window.devicePixelRatio;
            ele.width = width * window.devicePixelRatio;
            electx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    };
});
