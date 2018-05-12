 $(window).load(function() {
 	(function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
	// Swiper加载
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal',
	    loop: false,
	    pagination : '.swiper-pagination',
	    mousewheelControl : true,
	    resistance: true,
	    resistanceRatio : 0,
	});
	// 获取onenet deviceid
	var deviceId = document.getElementById("deviceId").value;
	// 歌曲列表
	var listMusic = document.querySelector(".listMusic");
	var musicList = document.querySelector(".musicList");
	var page1 = document.querySelector(".page1");
	var pagination = document.querySelector(".swiper-pagination");
	// 获取音乐列表
	var musicObj;
	var storyObj;
	var Songflag = false;
	var Storyflag = false;
	$.ajax({
	   url: "http://www.eggtoy.com/eggtoy/json/music.json",// json文件位置
	   type: "GET",// 请求方式为get
	   dataType: "json", // 返回数据格式为json
	   async: false,
	   success: function(data) {// 请求成功完成后要执行的方法
	       // each循环 使用$.each方法遍历返回的数据date
	       musicObj = data.music;
	       $.each(data.music, function(i, item) {
	            var str1 = '<li num="'+item.num+'" duration="'+item.duration+'">' + item.name + '</li>';
	            $(".musicList ul").append(str1);
	       })
	       storyObj = data.story;
	       $.each(data.story, function(i, item) {
	            var str2 = '<li num="'+item.num+'" duration="'+item.duration+'">' + item.name + '</li>';
	            $(".storyList ul").append(str2);
	       })
	   }
	})
	listMusic.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	listMusic.addEventListener("touchend",function(){
		var oHeight = $(".musicList ul li").height();
		$(".musicList ul").scrollTop((activeMusicNum-3)*oHeight);
		musicList.style.transform = "translateY(0)";
		musicList.style.transition = "0.2s";
		pagination.style.display = "none";
	})
	page1.addEventListener("touchstart",function(){
		musicList.style.transform = "translateY(6.4rem)";
		musicList.style.transition = "0.2s";
		pagination.style.display = "block";
	})
	musicList.addEventListener("touchstart",function(e){
		e.stopPropagation();
	})
	
	// 当前音乐播放的num
	var activeMusicNum = 1;
	$(".musicList ul").on("click","li",function(){
		$(".musicName").html("");
		$(".musicName").html($(this).html());
		$(this).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
		activeMusicNum = $(this).index()+1;
		// 歌曲列表上的点播
		console.log("当前点播的歌曲是+"+activeMusicNum);
		initTitle("story");
		btnStatue == true?(motion=1):(motion=0);
		$.ajax({  
            type : "POST",  // 提交方式
            url : "Song",// 路径
            data : {  
           	 	deviceId : deviceId,
                activeMusicNum : activeMusicNum,
                motion : motion
            },
           success : function(result) {
            	console.log(result.deviceId);
            	if(result.deviceId === null || result.deviceId === ""){
            		
            	}else{
            		
            	}
            },
            error : function(){
           	 alert("指令遗失到外太空啦，再试一次吧~")
            }
        }); 
		newMusic();
	})
	// 故事列表
	var listStory = document.querySelector(".listStory");
	var storyList = document.querySelector(".storyList");
	var page2 = document.querySelector(".page2");

	listStory.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	listStory.addEventListener("touchend",function(){
		var oHeight = $(".musicList ul li").height();
		$(".storyList ul").scrollTop((activeStoryNum-3)*oHeight);
		storyList.style.transform = "translateY(0)";
		storyList.style.transition = "0.2s";
		pagination.style.display = "none";
	})
	page2.addEventListener("touchstart",function(){
		storyList.style.transform = "translateY(6.4rem)";
		storyList.style.transition = "0.2s";
		pagination.style.display = "block";
	})
	storyList.addEventListener("touchstart",function(e){
		e.stopPropagation();
	})
	// 当前音乐播放的num
	var activeStoryNum = 1;
	$(".storyList ul").on("click","li",function(){
		$(".storyName").html("");
		$(".storyName").html($(this).html());
		$(this).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
		activeStoryNum = $(this).index()+1;
		newStory();
		console.log("当前故事为+"+activeStoryNum);
		initTitle("music");
		btnStatue == true?(motion=1):(motion=0);
		$.ajax({  
            type : "POST",  // 提交方式
            url : "Story",// 路径
            data : {  
           	 	deviceId : deviceId,
           	 activeStoryNum : activeStoryNum,
           	 motion : motion
            },
            success : function(result) {
            	console.log(result.SongLikeProperty);
            },
            error : function(){
           	 alert("指令遗失到外太空啦，再试一次吧~")
            }
        });
	})
	
	// 第一页歌曲频谱
	var voiceBox1Timer;
	var voiceBox1 = document.querySelector('.voiceBox1');
	var boxW = voiceBox1.offsetWidth;
	var ulNum = 15;
	var ulWidth = Math.floor(boxW / 15 - 2);
	for (var i = 0; i < ulNum; i++) {
		var newUl = document.createElement('ul');
		newUl.style.width = ulWidth + 'px';
		voiceBox1.appendChild(newUl);
	}
	var ul = document.querySelectorAll('.voiceBox1 ul');
	function init() {
		$('.voiceBox1 ul li').remove();
		ul.forEach(addEle);
	};
	function addEle(item) {
		var ranNum = Math.ceil(5 * Math.random());
		for (var i = 0; i < ranNum; i++) {
			var newLi = document.createElement('li');
			newLi.style.width = ulWidth + 'px';
			item.appendChild(newLi);
		}
	}
	init();
	function Mmove() {
		clearInterval(voiceBox1Timer);
		voiceBox1Timer = setInterval(init, 350);
	}

	// 第二页故事频谱
	var voiceBox2Timer;
	var voiceBox2 = document.querySelector('.voiceBox2');
	var Box2Ul = document.querySelector('.voiceBox2 ul');
	var liNum = Math.floor(boxW / 6);
	var liNumIndex = 0;
	for (var i = 0; i < liNum; i++) {
		var newLi = document.createElement('li');
		newLi.style.height = Math.ceil(40 * Math.random()) + 'px';
		Box2Ul.appendChild(newLi);
	};
	var Box2Li = document.querySelectorAll('.voiceBox2 ul li');
	function Box2move() {
		for (var i = 0; i < Box2Li.length; i++) {
			liNumIndex = i;
			Box2Li[liNumIndex].style.height = Math.ceil(40 * Math.random()) + 'px';
		}
	};

	function Smove() {
		clearInterval(voiceBox2Timer);
		voiceBox2Timer = setInterval(Box2move, 300);
	}
	
	
	
	
	// 第一页音乐播放进度条
	var bar1 = document.querySelector(".bar1"); 
	var leftbar1 = document.querySelector(".leftbar1"); 
	var btn1 = document.querySelector(".btn1");
	var curtime1 = document.querySelector(".curtime1");
	var endtime1 = document.querySelector(".endtime1");
	var nextMusic1 = document.querySelector(".nextMusic1");
	var lastMusic1 = document.querySelector(".lastMusic1");
	var startStop1 = document.querySelector(".startStop1");
	var musicName = document.querySelector(".musicName");
	var timer1 = null;
	var isstop1 = true;
	var isover1 = false;
	var count1;
	var curmin1;
	var cursec1;
	var count2;
	var curmin2;
	var cursec2;
	var musicNeverPlay = true;
	var lastTime = 0;
	var deltaTime;
	var now;
	var int = 1;
	function delay() {
		now = Date.now();
		deltaTime = now - lastTime;
		lastTime = now;
		return deltaTime;
	}
	nextMusic1.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	nextMusic1.addEventListener("touchend",function(){
		deltaTime = delay();
		if (deltaTime > 1000) {
	// if(mmStatue){
	// activeMusicNum = activeMusicNum;
	// }
	// else{
	// activeMusicNum = activeMusicNum+1>musicObj.length?1:activeMusicNum+1;
	// }
			activeMusicNum = activeMusicNum+1>musicObj.length?1:activeMusicNum+1;
			newMusic();
			$(".musicList ul li").eq(activeMusicNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
			musicNeverPlay = false;
			console.log("下一首");
			initTitle("story");
			btnStatue == true?(motion=1):(motion=0);
			 $.ajax({
				 type : "POST", // 提交方式
				 url : "Song",// 路径
				 data : {
				 deviceId : deviceId,
				 activeMusicNum : activeMusicNum,
				 motion : motion
			 },
			 success : function(result) {
				 console.log(result);
			 },
			 error : function(){
				 alert("指令遗失到外太空啦，再试一次吧~")
			 }
			 });
		}
	})
	lastMusic1.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	lastMusic1.addEventListener("touchend",function(){
		deltaTime = delay();
		if (deltaTime > 1000) {
	// if(mmStatue){
	// activeMusicNum = activeMusicNum;
	// }
	// else{
	// activeMusicNum = activeMusicNum-1<1?musicObj.length:activeMusicNum-1;
	// }
			activeMusicNum = activeMusicNum-1<1?musicObj.length:activeMusicNum-1;
			newMusic();
			$(".musicList ul li").eq(activeMusicNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
			musicNeverPlay = false;
			console.log("上一首");
			initTitle("story");
			btnStatue == true?(motion=1):(motion=0);
			 $.ajax({
				 type : "POST", // 提交方式
				 url : "Song",// 路径
				 data : {
				 deviceId : deviceId,
				 activeMusicNum : activeMusicNum,
				 motion : motion
			 },
			 success : function(result) {
				 console.log(result);
			 },
			 error : function(){
				 alert("指令遗失到外太空啦，再试一次吧~")
			 }
			 });
		}
	})
	startStop1.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
		Storyflag = false;
		Songflag = true;
	})
	
	musicName.innerHTML = musicObj[activeMusicNum-1].name;
	startStop1.addEventListener("touchend",function(){
		initTitle("story");
		if(musicNeverPlay){
			newMusic();
			musicNeverPlay = false;
		}
		else{
			Music(activeMusicNum);
		}
		$(".musicList ul li").eq(activeMusicNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
		console.log("歌曲开始")
		btnStatue == true?(motion=1):(motion=0);
		if(int === 1){
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "Song",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 activeMusicNum : 1,
	           	 motion : motion
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
			int = 2;
		}
	})
	// 开始一首新的歌曲
	function newMusic(){
		btnStatue == true?(motion=1):(motion=0);
		if(!isstop2){
			Story();
		}
		clearInterval(timer1);
		// 频谱
		Mmove()
		// 频谱结束
		// 把音乐和故事的进度条时间都清零
		count1 = 0;
		curmin1 = 0;
		cursec1 = 0;
		count2 = 0;
		curmin2 = 0;
		cursec2 = 0;
		// 清零结束
		isstop1 = false;
		isover1 = false;
		musicNeverPlay = false;
		musicName.innerHTML = musicObj[activeMusicNum-1].name;
		duration1 = musicObj[activeMusicNum-1].duration;
		// 进度条清零
		leftbar1.style.width = 0+"px";
		btn1.style.left = 0+"px";
		curtime1.innerHTML = "00:00";
		leftbar2.style.width = 0+"px";
		btn2.style.left = 0+"px";
		curtime2.innerHTML = "00:00";
		// 进度条清零结束
		// 歌曲长度均小于10，不用做处理
		var min1 = parseInt(duration1/60);
		var sec1 = parseInt(duration1%60);
		endtime1.innerHTML = (min1>9?min1:"0"+min1)+":"+(sec1>9?sec1:"0"+sec1);
		timer1 = setInterval(function(){
			count1++;
			console.log("总时长： " + duration1 + typeof(parseInt(duration1)));
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
			else{	
				isover1 = true;
				if(mmStatue){
					newMusic();
					console.log("单曲循环");
				
				  $.ajax({ 
					  type : "POST", 
					  // 提交方式
					  url : "Song",
					  // 路径
					  data : {
						  deviceId : deviceId, 
						  activeMusicNum : activeMusicNum,
						  motion: motion 
						  },
				  success : function(result) { 
					  console.log(result);
					  console.log("413单曲循环")
					  }, 
				  error :function(){ 
					  alert("指令遗失到外太空啦，再试一次吧~") } 
					  });
				}
				else{
					activeMusicNum = activeMusicNum+1>musicObj.length?1:activeMusicNum+1;
					console.log(activeMusicNum);
					 $.ajax({
						 type : "POST", // 提交方式
						 url : "Song",// 路径
						 data : {
						 deviceId : deviceId,
						 activeMusicNum : activeMusicNum,
						 motion : motion
					 },
					 success : function(result) {
						 console.log(result);
					 },
					 error : function(){
						 alert("指令遗失到外太空啦，再试一次吧~")
					 }
					 });
					newMusic();
				}
				
			}
			//
			if(mmStatue && duration1 == cursec1){
				console.log(activeMusicNum);
			}
		},1000);
		$(".musicList ul li").eq(activeMusicNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
		// 14 43
		/*
		 * $.ajax({ type : "POST", // 提交方式 url : "Song", // 路径 data : { deviceId
		 * :deviceId, activeMusicNum : activeMusicNum }, success
		 * :function(result) { console.log(result); $('.notice').append("<span>447ajax</span><br>") },
		 * error : function(){ alert("请检查您当前的网络") } });
		 */
			
		startStop1.style.background = "url(http://www.eggtoy.com/eggtoy/img/startStop1.png) no-repeat scroll top left";
		startStop1.style.backgroundSize = "100% 100%";
	}
	// 暂停播放或开始播放
	function Music(){
		btnStatue == true?(motion=1):(motion=0);
		// 暂停播放
		// 播放音乐时 重置故事的进度时间和进度条
		count2 = 0;
		curmin2 = 0;
		cursec2 = 0;
		leftbar2.style.width = 0+"px";
		btn2.style.left = 0+"px";
		curtime2.innerHTML = "00:00";
		if(!isstop1){
			isstop1 = true;
			clearInterval(timer1);
			clearInterval(voiceBox1Timer);
			startStop1.style.background = "url(http://www.eggtoy.com/eggtoy/img/startStop2.png) no-repeat scroll top left";
			startStop1.style.backgroundSize = "100% 100%";
			console.log("歌曲暂停");
			if (Songflag) {
				Songflag = false;
				btnStatue == true?(motion=1):(motion=0);
				$.ajax({  
		            type : "POST",  // 提交方式
		            url : "pauseSwitch",// 路径
		            data : {  
		           	 	deviceId : deviceId,
		           	 	id : 0,
		           	 motion : motion
		            },
		            success : function(result) {
		            	console.log("482歌曲暂停")
		            },
		            error : function(){
		           	 alert("指令遗失到外太空啦，再试一次吧~")
		            }
		        });
			}
			
		}
		else{ 
			btnStatue == true?(motion=1):(motion=0);
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "pauseSwitch",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 	id : 1,
	           	 motion : motion
	            },
	            success : function(result) {
	            	console.log("500歌曲播放")
	            },
	            error : function(){
	           	 alert("请检查您当前的网络")
	            }
	        });
			if(!isstop2){
				Story();
			}
			Mmove();
			isstop1 = false;
			timer1 = setInterval(function(){
				count1++;
				if(count1<=musicObj[activeMusicNum-1].duration){
					cursec1++;
					if(cursec1>59){
						curmin1++;
						cursec1 = 0;
					}
					curtime1.innerHTML = (curmin1>9?curmin1:"0"+curmin1)+":"+(cursec1>9?cursec1:"0"+cursec1);
					leftbar1.style.width = parseInt(count1/musicObj[activeMusicNum-1].duration*bar1.offsetWidth+0.5*btn1.offsetWidth)+"px";
					btn1.style.left = parseInt(count1/musicObj[activeMusicNum-1].duration*bar1.offsetWidth)+"px";
				}
				else{
					isover1 = true;
					if(mmStatue){
						newMusic();
					}
					else{
						activeMusicNum = activeMusicNum+1>musicObj.length?1:activeMusicNum+1;
						 $.ajax({
							 type : "POST", // 提交方式
							 url : "Song",// 路径
							 data : {
							 deviceId : deviceId,
							 activeMusicNum : activeMusicNum,
							 motion : motion
						 },
						 success : function(result) {
							 console.log(result);
						 },
						 error : function(){
							 alert("指令遗失到外太空啦，再试一次吧~")
						 }
						 });
						newMusic();
					}
				}
			},1000);
			startStop1.style.background = "url(http://www.eggtoy.com/eggtoy/img/startStop1.png) no-repeat scroll top left";
			startStop1.style.backgroundSize = "100% 100%";
			console.log("歌曲开始");
		}
		console.log("mmStatue: " + mmStatue)
	}
	
	
	
	// 第二页音乐播放进度条
	var bar2 = document.querySelector(".bar2"); 
	var leftbar2 = document.querySelector(".leftbar2"); 
	var btn2 = document.querySelector(".btn2");
	var curtime2 = document.querySelector(".curtime2");
	var endtime2 = document.querySelector(".endtime2");
	var nextMusic2 = document.querySelector(".nextMusic2");
	var lastMusic2 = document.querySelector(".lastMusic2");
	var startStop2 = document.querySelector(".startStop2");
	var storyName = document.querySelector(".storyName");
	var timer2 = null;
	var isstop2 = true;
	var isover2 = false;
	var storyNeverPlay = true;
	nextMusic2.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	nextMusic2.addEventListener("touchend",function(){
		deltaTime = delay();
		if (deltaTime > 1000) {
	// if(msStatue){
	// activeStoryNum = activeStoryNum;
	// }
	// else{
	// activeStoryNum = activeStoryNum+1>storyObj.length?1:activeStoryNum+1;
	// }
			activeStoryNum = activeStoryNum+1>storyObj.length?1:activeStoryNum+1;
			newStory();
			$(".storyList ul li").eq(activeStoryNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
			storyNeverPlay = false;
			console.log("下一首");
			initTitle("music");
			btnStatue == true?(motion=1):(motion=0);
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "Story",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 activeStoryNum : activeStoryNum,
	           	 motion : motion
	            },
	            success : function(result) {
	            	console.log(result);
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
	})
	lastMusic2.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	lastMusic2.addEventListener("touchend",function(){
		deltaTime = delay();
		if (deltaTime > 1000) {
	// if(msStatue){
	// activeStoryNum = activeStoryNum;
	// }
	// else{
	// activeStoryNum = activeStoryNum-1<1?storyObj.length:activeStoryNum-1;
	// }
			activeStoryNum = activeStoryNum-1<1?storyObj.length:activeStoryNum-1;
			newStory();
			$(".storyList ul li").eq(activeStoryNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
			storyNeverPlay = false;
			console.log("故事上一首");
			initTitle("music");
			btnStatue == true?(motion=1):(motion=0);
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "Story",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 activeStoryNum : activeStoryNum,
	           	 motion : motion
	            },
	            success : function(result) {
	            	console.log(result);
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
	})
	startStop2.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
		Songflag = false;
		Storyflag = true;
	})
	storyName.innerHTML = storyObj[activeStoryNum-1].name;
	var long = 1;
	startStop2.addEventListener("touchend",function(){
		initTitle("music");
		if(storyNeverPlay){
			newStory();
			storyNeverPlay = false;
		}
		else{
			Story(activeStoryNum);
		}
		$(".storyList ul li").eq(activeStoryNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
		
		if(long ===1){
			btnStatue == true?(motion=1):(motion=0);
		$.ajax({  
            type : "POST",  // 提交方式
            url : "Story",// 路径
            data : {  
           	 	deviceId : deviceId,
           	 activeStoryNum : 1,
           	 motion : motion
            },
            success : function(result) {
            },
            error : function(){
           	 alert("指令遗失到外太空啦，再试一次吧~")
            }
        });
		long = 2;
		}
	})
	// 开始一首新的歌曲
	function newStory(){
		if(!isstop1){
			Music();
		}
		clearInterval(timer2);
		// 故事频谱
		Smove();
		// 故事频谱结束
		count1 = 0;
		curmin1 = 0;
		cursec1 = 0;
		count2 = 0;
		curmin2 = 0;
		cursec2 = 0;
		isstop2 = false;
		isover2 = false;
		storyNeverPlay = false;
		storyName.innerHTML = storyObj[activeStoryNum-1].name;
		duration2 = storyObj[activeStoryNum-1].duration;
		leftbar2.style.width = 0+"px";
		btn2.style.left = 0+"px";
		curtime2.innerHTML = "00:00";
		leftbar1.style.width = 0+"px";
		btn1.style.left = 0+"px";
		curtime1.innerHTML = "00:00";
		// 歌曲长度均小于10，不用做处理
		var min2 = parseInt(duration2/60);
		var sec2 = parseInt(duration2%60);
		endtime2.innerHTML = (min2>9?min2:"0"+min2)+":"+(sec2>9?sec2:"0"+sec2);
		timer2 = setInterval(function(){
			count2++;
			if(count2<=duration2){
				cursec2++;
				if(cursec2>59){
					curmin2++;
					cursec2 = 0;
				}
				curtime2.innerHTML = (curmin2>9?curmin2:"0"+curmin2)+":"+(cursec2>9?cursec2:"0"+cursec2);
				leftbar2.style.width = parseInt(count2/duration2*bar2.offsetWidth+0.5*btn2.offsetWidth)+"px";
				btn2.style.left = parseInt(count2/duration2*bar2.offsetWidth)+"px";
			}
			else{
				isover2 = true;
				if(msStatue){
				}
				else{
					activeStoryNum = activeStoryNum+1>storyObj.length?1:activeStoryNum+1;
				}
				$(".storyList ul li").eq(activeStoryNum-1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
			}
		},1000);
		startStop2.style.background = "url(http://www.eggtoy.com/eggtoy/img/startStop1.png) no-repeat scroll top left";
		startStop2.style.backgroundSize = "100% 100%";
	}
	// 暂停播放或开始播放
	function Story(){
		// 暂停播放
		count1 = 0;
		curmin1 = 0;
		cursec1 = 0;
		leftbar1.style.width = 0+"px";
		btn1.style.left = 0+"px";
		curtime1.innerHTML = "00:00";
		if(!isstop2){
			isstop2 = true;
			clearInterval(timer2);
			clearInterval(voiceBox2Timer);
			startStop2.style.background = "url(http://www.eggtoy.com/eggtoy/img/startStop2.png) no-repeat scroll top left";
			startStop2.style.backgroundSize = "100% 100%";
			console.log("故事暂停")
			if (Storyflag) {
				Storyflag = false;
				btnStatue == true?(motion=1):(motion=0);
				$.ajax({  
		            type : "POST",  // 提交方式
		            url : "pauseSwitch",// 路径
		            data : {  
		           	 	deviceId : deviceId,
		           	 	id : 2,
		           	 motion : motion
		            },
		            success : function(result) {
		            },
		            error : function(){
		           	 alert("指令遗失到外太空啦，再试一次吧~")
		            }
		        });
			}
			
		}
		else{
			if(!isstop1){
				Music();
			}
			// 故事频谱
			Smove();
			// 故事频谱结束
			isstop2 = false;
			timer2 = setInterval(function(){
				count2++;
				if(count2<=storyObj[activeStoryNum-1].duration){
					cursec2++;
					if(cursec2>59){
						curmin2++;
						cursec2 = 0;
					}
					curtime2.innerHTML = (curmin2>9?curmin2:"0"+curmin2)+":"+(cursec2>9?cursec2:"0"+cursec2);
					leftbar2.style.width = parseInt(count2/storyObj[activeStoryNum-1].duration*bar2.offsetWidth+0.5*btn2.offsetWidth)+"px";
					btn2.style.left = parseInt(count2/storyObj[activeStoryNum-1].duration*bar2.offsetWidth)+"px";
				}
				else{
					isover2 = true;
					if(msStatue){
						newStory();
					}
					else{
						activeStoryNum = activeStoryNum+1>storyObj.length?1:activeStoryNum+1;
						newStory();
					}
				}
			},1000);
			startStop2.style.background = "url(http://www.eggtoy.com/eggtoy/img/startStop1.png) no-repeat scroll top left";
			startStop2.style.backgroundSize = "100% 100%";
			console.log("故事开始")
			btnStatue == true?(motion=1):(motion=0);
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "pauseSwitch",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 	id : 3,
	           	 motion : motion
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
	}
	
	
	// 第一页音量条
	var volumeBar1 = document.querySelector(".volumeBar1"); 
	var leftVolBar1 = document.querySelector(".leftVolBar1"); 
	var leftBtn1 = document.querySelector(".leftBtn1");
	var MusicvolumeIcon = document.querySelector(".MusicvolumeIcon");
	// 第二页音量条
	var volumeBar2 = document.querySelector(".volumeBar2"); 
	var leftVolBar2 = document.querySelector(".leftVolBar2"); 
	var leftBtn2 = document.querySelector(".leftBtn2");
	var StoryvolumeIcon = document.querySelector(".StoryvolumeIcon");
	// 初始音量条
	leftBtn1.style.left = 50 + "px";
	leftVolBar1.style.width = 50 + "px";
	leftBtn2.style.left = 50 + "px";
	leftVolBar2.style.width = 50 + "px";
	// 初始化音量条结束
	
	MusicvolumeIcon.addEventListener("touchstart",function(e){
		e.stopPropagation();
		var x = e.changedTouches[0].clientX;
		var btnleft = leftBtn1.offsetLeft;
		/*
		 * leftBtn1.style.left = (x-volumeBar1.offsetLeft) + "px";
		 * leftVolBar1.style.width = (x-volumeBar1.offsetLeft) + "px";
		 */
		MusicvolumeIcon.addEventListener("touchmove",function(e){
			e.preventDefault();
			var wid =  e.changedTouches[0].clientX - x;
			var left = (x-volumeBar1.offsetLeft) + wid;
			if(left<20){
				left = 20;
			}
			else if(left>(volumeBar1.offsetWidth - leftBtn1.offsetWidth)){
				left = volumeBar1.offsetWidth - leftBtn1.offsetWidth;
			}
			// console.log(left);
			leftBtn1.style.left = left + "px";
			leftVolBar1.style.width = left + "px";
			leftBtn2.style.left = left + "px";
			leftVolBar2.style.width = left + "px";
		});
	});
	MusicvolumeIcon.addEventListener("touchend",function(){
		var per = parseInt(leftBtn1.offsetLeft/volumeBar1.offsetWidth*15);
		console.log(per+"歌曲音量");
		$.ajax({  
            type : "POST",  // 提交方式
            url : "voice",// 路径
            data : {  
           	 	deviceId : deviceId,
           	 volumeData : per
            },
            success : function(result) {
            },
            error : function(){
           	 alert("指令遗失到外太空啦，再试一次吧~")
            }
        });
	});
	
	StoryvolumeIcon.addEventListener("touchstart",function(e){
		e.stopPropagation();
		var x = e.changedTouches[0].clientX;
		var btnleft = leftBtn2.offsetLeft;
		StoryvolumeIcon.addEventListener("touchmove",function(e){
			e.preventDefault();
			var wid =  e.changedTouches[0].clientX - x;
			var left = (x-volumeBar2.offsetLeft) + wid;
			if(left<20){
				left = 20;
			}
			else if(left>(volumeBar2.offsetWidth - leftBtn2.offsetWidth)){
				left = volumeBar2.offsetWidth - leftBtn2.offsetWidth;
			}
			// console.log(left);
			leftBtn2.style.left = left + "px";
			leftVolBar2.style.width = left + "px";
			leftBtn1.style.left = left + "px";
			leftVolBar1.style.width = left + "px";
		});
	});
	StoryvolumeIcon.addEventListener("touchend",function(){
		var per = parseInt(leftBtn2.offsetLeft/volumeBar2.offsetWidth*15);
		console.log(per+"故事音量")
		$.ajax({  
            type : "POST",  // 提交方式
            url : "voice",// 路径
            data : {  
           	 	deviceId : deviceId,
           	 volumeData : per
            },
            success : function(result) {
            },
            error : function(){
           	 alert("指令遗失到外太空啦，再试一次吧~")
            }
        });
	});
	// switch开关控制
	var btnBox = document.querySelector(".btnBox");
	var slideBtn = document.querySelector(".btnBox .slideBtn");
	var btnStatue = true;
	btnBox.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
		if(!btnStatue){
			slideBtn.style.transform = "translateX(0)";
			slideBtn.style.backgroundImage = "url(http://www.eggtoy.com/eggtoy/img/slideBtnOn.png)";
			slideBtn.style.transition = "0.1s";
			btnStatue = !btnStatue;
			console.log("运动");
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "motion",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 	motion : 1
	            },
	            success : function(result) {
	            	
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
		else{
			slideBtn.style.transform = "translateX(-0.51rem)";
			slideBtn.style.backgroundImage = "url(http://www.eggtoy.com/eggtoy/img/slideBtnOff.png)";
			slideBtn.style.transition = "0.1s";
			btnStatue = !btnStatue;
			console.log("不运动2");
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "motion",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 	motion : 0
	            },
	            success : function(result) {
	            	
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
	})
	
	// 播放模式切换
	var mMusic = document.querySelector(".modeMusic");
	var mmStatue = false;
	mMusic.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	mMusic.addEventListener("touchend",function(){
		if(!mmStatue){
			mMusic.style.background = "url(http://www.eggtoy.com/eggtoy/img/mode.png) no-repeat scroll top left";
			mMusic.style.backgroundSize = "100% 100%";
			mmStatue = !mmStatue;
			console.log("歌曲单曲播放1");
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "music",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	    loop : 1
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
		else{
			mMusic.style.background = "url(http://www.eggtoy.com/eggtoy/img/mode1.png) no-repeat scroll top left";
			mMusic.style.backgroundSize = "100% 100%";
			mmStatue = !mmStatue;
			console.log("歌曲循环播放1");
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "music",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	    loop : 0
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
			
		}
	})
	var mStory = document.querySelector(".modeStory");
	var msStatue = false;
	mStory.addEventListener("touchstart",function(e){
		e.preventDefault();
		e.stopPropagation();
	})
	mStory.addEventListener("touchend",function(){
		if(!msStatue){
			mStory.style.background = "url(http://www.eggtoy.com/eggtoy/img/mode.png) no-repeat scroll top left";
			mStory.style.backgroundSize = "100% 100%";
			msStatue = !msStatue;
			console.log("故事单曲播放1")
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "loop",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	    loop : 1
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
		else{
			mStory.style.background = "url(http://www.eggtoy.com/eggtoy/img/mode1.png) no-repeat scroll top left";
			mStory.style.backgroundSize = "100% 100%";
			msStatue = !msStatue;
			console.log("故事循环播放1")
			$.ajax({  
	            type : "POST",  // 提交方式
	            url : "loop",// 路径
	            data : {  
	           	 	deviceId : deviceId,
	           	 	loop : 0
	            },
	            success : function(result) {
	            },
	            error : function(){
	           	 alert("指令遗失到外太空啦，再试一次吧~")
	            }
	        });
		}
	});
/*
 * function initTitle (a) { if (a == "music") { musicName.innerHTML =
 * musicObj[0].name; $(".musicList ul
 * li").eq(0).css({"background":"#86b1ce"}).siblings().css("background","#517e9e"); }
 * else { storyName.innerHTML = storyObj[0].name; $(".storyList ul
 * li").eq(0).css({"background":"#86b1ce"}).siblings().css("background","#517e9e"); } }
 */
	function initTitle(a) {
		if (a == "music") {
			musicName.innerHTML = musicObj[0].name;
			$(".musicList ul li").eq(0).css({ "background": "#86b1ce" }).siblings().css("background", "#517e9e");
			duration1 = musicObj[0].duration;
			var min1 = parseInt(duration1 / 60);
			var sec1 = parseInt(duration1 % 60);
			endtime1.innerHTML = (min1 > 9 ? min1 : "0" + min1) + ":" + (sec1 > 9 ? sec1 : "0" + sec1);
			activeMusicNum = 1;
		} else {
			storyName.innerHTML = storyObj[0].name;
			$(".storyList ul li").eq(0).css({ "background": "#86b1ce" }).siblings().css("background", "#517e9e");
			duration2 = storyObj[0].duration;
			var min2 = parseInt(duration2 / 60);
			var sec2 = parseInt(duration2 % 60);
			endtime2.innerHTML = (min2 > 9 ? min2 : "0" + min2) + ":" + (sec2 > 9 ? sec2 : "0" + sec2);
			activeStoryNum = 1;
		}
	}
});

