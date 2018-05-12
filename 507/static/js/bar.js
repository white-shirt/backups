window.onload = function(){
	
//************
//************
//第一页音乐播放进度条
//************
//************

	var bar1 = document.querySelector(".bar1"); 
	var leftbar1 = document.querySelector(".leftbar1"); 
	var btn1 = document.querySelector(".btn1");
	var curtime1 = document.querySelector(".curtime1");
	var endtime1 = document.querySelector(".endtime1");
	var nextMusic1 = document.querySelector(".nextMusic1");
	var lastMusic1 = document.querySelector(".lastMusic1");
	var startStop1 = document.querySelector(".startStop1");
	var timer1 = null;
	var isstop1;
	var count1;
	var curmin1;
	var cursec1;
	var duration1;
	nextMusic1.onclick = function(){
		duration1 = 270;
		clearInterval(timer1);
		count1 = 0;//音乐播放时间，总数为duration，单位秒
		curmin1 = 0;
		cursec1 = 0;
		isstop1 = false;
		reset1(duration1);
		timer1 = setInterval(schedule1,1000);
		startStop1.style.background = "url(../img/startStop1.png) no-repeat scroll top left";
		startStop1.style.backgroundSize = "100% 100%";
	}
	lastMusic1.onclick = function(){
		duration1 = 270;
		clearInterval(timer1);
		count1 = 0;//音乐播放时间，总数为duration，单位秒
		curmin1 = 0;
		cursec1 = 0;
		isstop1 = false;
		reset1(duration1);
		timer1 = setInterval(schedule1,1000);
		startStop1.style.background = "url(../img/startStop1.png) no-repeat scroll top left";
		startStop1.style.backgroundSize = "100% 100%";
	}
	startStop1.onclick = function(){
		if(!isstop1){
			isstop1 = !isstop1;
			clearInterval(timer1);
			startStop1.style.background = "url(../img/startStop2.png) no-repeat scroll top left";
			startStop1.style.backgroundSize = "100% 100%";
		}
		else{
			isstop1 = !isstop1;
			timer1 = setInterval(schedule1,1000);
			startStop1.style.background = "url(../img/startStop1.png) no-repeat scroll top left";
			startStop1.style.backgroundSize = "100% 100%";
		}
	}
	//下一首，上一首
	function reset1(duration1){
		leftbar1.style.width = 0+"px";
		btn1.style.left = 0+"px";
		curtime1.innerHTML = "00:00";
		//歌曲长度均小于10，不用做处理
		var min1 = parseInt(duration1/60);
		var sec1 = parseInt(duration1%60);
		endtime1.innerHTML = (min1>9?min1:"0"+min1)+":"+(sec1>9?sec1:"0"+sec1);
		//音乐播放进度条走动
	}
	//开始，停止播放
	function schedule1(){
		count1++;
		if(count1<=duration1){
			cursec1++;
			if(cursec1>59){
				curmin1++;
				cursec1 = 0;
			}
			curtime1.innerHTML = (curmin1>9?curmin1:"0"+curmin1)+":"+(cursec1>9?cursec1:"0"+cursec1);
			leftbar1.style.width = parseInt(count1/duration1*bar1.offsetWidth+0.5*btn1.offsetWidth)+"px";
			btn1.style.left = parseInt(count1/duration1*bar1.offsetWidth)+"px";
		}
	}
	
//************
//************
//第二页音乐播放进度条
//************
//************

	var bar2 = document.querySelector(".bar2"); 
	var leftbar2 = document.querySelector(".leftbar2"); 
	var btn2 = document.querySelector(".btn2");
	var curtime2 = document.querySelector(".curtime2");
	var endtime2 = document.querySelector(".endtime2");
	var nextMusic2 = document.querySelector(".nextMusic2");
	var lastMusic2 = document.querySelector(".lastMusic2");
	var startStop2 = document.querySelector(".startStop2");
	var timer2 = null;
	var isstop2;
	var count2;
	var curmin2;
	var cursec2;
	var duration2;
	nextMusic2.onclick = function(){
		duration2 = 101;
		clearInterval(timer2);
		count2 = 0;//音乐播放时间，总数为duration，单位秒
		curmin2 = 0;
		cursec2 = 0;
		isstop2 = false;
		reset2(duration2);
		timer2 = setInterval(schedule2,1000);
		startStop2.style.background = "url(../img/startStop1.png) no-repeat scroll top left";
		startStop2.style.backgroundSize = "100% 100%";
	}
	lastMusic2.onclick = function(){
		duration2 = 101;
		clearInterval(timer2);
		count2 = 0;//音乐播放时间，总数为duration，单位秒
		curmin2 = 0;
		cursec2 = 0;
		isstop2 = false;
		reset2(duration2);
		timer2 = setInterval(schedule2,1000);
		startStop2.style.background = "url(../img/startStop1.png) no-repeat scroll top left";
		startStop2.style.backgroundSize = "100% 100%";
	}
	startStop2.onclick = function(){
		if(!isstop2){
			isstop2 = !isstop2;
			clearInterval(timer2);
			startStop2.style.background = "url(../img/startStop2.png) no-repeat scroll top left";
			startStop2.style.backgroundSize = "100% 100%";
		}
		else{
			isstop2 = !isstop2;
			timer2 = setInterval(schedule2,1000);
			startStop2.style.background = "url(../img/startStop1.png) no-repeat scroll top left";
			startStop2.style.backgroundSize = "100% 100%";
		}
	}
	//下一首，上一首
	function reset2(duration2){
		leftbar2.style.width = 0+"px";
		btn2.style.left = 0+"px";
		curtime2.innerHTML = "00:00";
		//歌曲长度均小于10，不用做处理
		var min2 = parseInt(duration2/60);
		var sec2 = parseInt(duration2%60);
		endtime2.innerHTML = (min2>9?min2:"0"+min2)+":"+(sec2>9?sec2:"0"+sec2);
		//音乐播放进度条走动
	}
	//开始，停止播放
	function schedule2(){
		count2++;
		if(count2<=duration2){
			cursec2++;
			if(cursec2>59){
				curmin2++;
				cursec2 = 0;
			}
			curtime2.innerHTML = (curmin2>9?curmin2:"0"+curmin2)+":"+(cursec2>9?cursec2:"0"+cursec2);
			leftbar2.style.width = parseInt(count2/duration2*bar2.offsetWidth+0.5*btn1.offsetWidth)+"px";
			btn2.style.left = parseInt(count2/duration2*bar2.offsetWidth)+"px";
		}
	}
	
//************
//************
//第一页音量条
//************
//************

	var volumeBar1 = document.querySelector(".volumeBar1"); 
	var leftVolBar1 = document.querySelector(".leftVolBar1"); 
	var leftBtn1 = document.querySelector(".leftBtn1");
	volumeBar1.addEventListener("touchstart",function(e){
		e.stopPropagation();
		var x = e.changedTouches[0].clientX;
		var btnleft = leftBtn1.offsetLeft;
		//console.log(x);
		volumeBar1.addEventListener("touchmove",function(e){
			var wid =  e.changedTouches[0].clientX - x;
			var left = btnleft + wid;
			if(left<0){
				left = 0;
			}
			else if(left>(volumeBar1.offsetWidth - leftBtn1.offsetWidth)){
				left = volumeBar1.offsetWidth - leftBtn1.offsetWidth;
			}
			//console.log(left);
			leftBtn1.style.left = left + "px";
			leftVolBar1.style.width = left + "px";
		});
	});
	volumeBar1.addEventListener("touchend",function(){
		var per = parseInt(leftBtn1.offsetLeft/volumeBar1.offsetWidth*100);
		console.log(per)
	});
	
//************
//************
//第二页音量条
//************
//************

	var volumeBar2 = document.querySelector(".volumeBar2"); 
	var leftVolBar2 = document.querySelector(".leftVolBar2"); 
	var leftBtn2 = document.querySelector(".leftBtn2");
	volumeBar2.addEventListener("touchstart",function(e){
		e.stopPropagation();
		var x = e.changedTouches[0].clientX;
		var btnleft = leftBtn2.offsetLeft;
		//console.log(x);
		volumeBar2.addEventListener("touchmove",function(e){
			var wid =  e.changedTouches[0].clientX - x;
			var left = btnleft + wid;
			if(left<0){
				left = 0;
			}
			else if(left>(volumeBar2.offsetWidth - leftBtn2.offsetWidth)){
				left = volumeBar2.offsetWidth - leftBtn2.offsetWidth;
			}
			//console.log(left);
			leftBtn2.style.left = left + "px";
			leftVolBar2.style.width = left + "px";
		});
	});
	volumeBar2.addEventListener("touchend",function(){
		var per = parseInt(leftBtn2.offsetLeft/volumeBar2.offsetWidth*100);
		console.log(per)
	});
}