
// 获取onenet deviceid
var devId = document.getElementById("deviceId").value;
//记录当前状态
var playMode = 'music';
var volumeNum;
var musicStatus = { startflag: 0, sportflag: 1, loopflag: 0, musicIndex: 1, curTime: 0, totalTime: 0 };
var storyStatus = { startflag: 0, sportflag: 0, loopflag: 0, storyIndex: 1, curTime: 0, totalTime: 0 };
//初始化页面
var init = {
	musicName: $('.musicName'),
	musicObj: null,
	storyObj: null,
	startBtn: $('.start'),
	startBtnW: $('.start').width(),
	last: $('.last'),
	next: $('.next'),
	mode: $('.mode'),
	volumeIcon: $('.volumeIcon'),
	volumeBar: $('.volumeBar1'),
	volumeBarW: $('.volumeBar1').width(),
	leftVolBar: $('.leftVolBar1'),
	leftVolBarW: $('.leftVolBar1').width(),
	leftBtn: $('.leftBtn1'),
	leftBtnL: $('.leftBtn1').position().left,
	musicList: $('.musicList ul li'),
	modeW: $('.mode').width(),
	btnBox: $('.btnBox'),
	btnBoxW: $('.btnBox').width(),
	slideBtn: $('.slideBtn'),
	slideBtnW: $('.slideBtn').width(),
	slideBtnL: $('.slideBtn').position().left,
	opMusicImg: $('.opMusicImg'),
	opMusicImgW: $('.opMusicImg').width(),
	opStoryImg: $('.opStoryImg'),
	getMusic: function () {
		$('.musicList ul').empty();
		$.ajax({
			url: "http://www.eggtoy.com/eggtoy/json/music.json",
			type: "GET",
			dataType: "json",
			async: false,
			success: function (data) {
				init.musicObj = data.music;
				$.each(data.music, function (i, item) {
					var str1 = '<li num="' + item.num + '" duration="' + item.duration + '">' + item.name + '</li>';
					$(".musicList ul").append(str1);
					init.musicName.html(data.music[musicStatus.musicIndex - 1].name);
				});
				$(".musicList ul li").on('click', function (event) {
					var _this = this;
					event.stopPropagation();
					storyStatus.curTime = 0;
					musicStatus.curTime = 0;
				        storyStatus.totalTime = 0;
					chooseList(_this);
					autoplay();
					sendOrder.sendMusic('list');
					$(".musicList ul li").eq(musicStatus.musicIndex - 1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
				});
			}
		});
	},
	getStory: function () {
		$('.musicList ul').empty();
		$.ajax({
			url: "http://www.eggtoy.com/eggtoy/json/music.json",
			type: "GET",
			dataType: "json",
			async: false,
			success: function (data) {
				init.storyObj = data.story;
				$.each(data.story, function (i, item) {
					var str2 = '<li num="' + item.num + '" duration="' + item.duration + '">' + item.name + '</li>';
					$(".musicList ul").append(str2);
					init.musicName.html(data.story[storyStatus.storyIndex - 1].name);
				});
				$(".musicList ul li").on('click', function (event) {
					var _this = this;
					event.stopPropagation();
					storyStatus.curTime = 0;
					musicStatus.curTime = 0;
					musicStatus.totalTime = 0;
					chooseList(_this);
					autoplay();
					sendOrder.sendStory('list');
					$(".musicList ul li").eq(storyStatus.storyIndex - 1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
				});
			}
		});
	},
	keepMusicStatus: function () {
		init.btnBox.css({ 'display': 'block' });
		init.opMusicImg.css({ 'display': 'block' });
		init.opStoryImg.css({ 'display': 'none' });
		switchBtn('startBtn', musicStatus.startflag);
		switchBtn('sport', musicStatus.sportflag);
		switchBtn('loop', musicStatus.loopflag);
	},
	keepStoryStatus: function () {
		init.btnBox.css({ 'display': 'none' });
		init.opMusicImg.css({ 'display': 'none' });
		init.opStoryImg.css({ 'display': 'block' });
		switchBtn('startBtn', storyStatus.startflag);
		switchBtn('loop', storyStatus.loopflag);
	},
	initMusicStatus: function () {
		musicStatus.startflag = 0,
		musicStatus.sportflag = 1,
		musicStatus.loopflag = 0,
		musicStatus.musicIndex = 1,
		musicStatus.curTime = 0,
		musicStatus.totalTime = 0;
	},
	initStoryStatus: function () {
		storyStatus.startflag = 0,
		storyStatus.sportflag = 0,
		storyStatus.loopflag = 0,
		storyStatus.storyIndex = 1,
		storyStatus.curTime = 0,
		storyStatus.totalTime = 0;
	}
}
init.getMusic();
//歌曲列表按钮
var listmove = {
	listMusic: $('.listMusic'),
	musicListBox: $('.musicList'),
	moveup: function () {
		listmove.musicListBox.animate({
			'bottom': '-37%'
		}, 'normal', function () {
			$('.mask').css({ 'display': 'block' });
		});
		if (playMode === 'music') $(".musicList ul li").eq(musicStatus.musicIndex - 1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
		if (playMode === 'story') $(".musicList ul li").eq(storyStatus.storyIndex - 1).css({"background":"#86b1ce"}).siblings().css("background","#517e9e");
	},
	movedown: function () {
		listmove.musicListBox.animate({
			'bottom': '-100%'
		}, 'normal', function () {
			$('.mask').css({ 'display': 'none' });
		});	
	}
};
listmove.listMusic.click(listmove.moveup);
$('.mask').click(listmove.movedown);
//music&story切换
var switchMode = {
	cate: $('.cate'),
	tap: function () {
		var cateW = switchMode.cate.width();
		if (playMode === 'music') {
			switchMode.cate.css({ 'backgroundPosition': -cateW + 'px 0' });
			init.getStory();
			init.keepStoryStatus();
			playMode = 'story';
		} else {
			switchMode.cate.css({ 'backgroundPosition': '0 0' });
			init.getMusic();
			init.keepMusicStatus();
			playMode = 'music';
		}
	}
};
switchMode.cate.click(function () {
	switchMode.tap();
	changeVoice();
});
//last start next controlBtn
var control = {
	start: function () {
		if (playMode === 'music') {
			init.initStoryStatus();
			switchBtn('startBtn', storyStatus.startflag);
			if (musicStatus.startflag === 0) {
				musicStatus.startflag = 1;
				switchBtn('startBtn', musicStatus.startflag);
			} else{
				musicStatus.startflag = 0;
				switchBtn('startBtn', musicStatus.startflag);
			}
			musicStatus.totalTime = init.musicObj[musicStatus.musicIndex - 1].duration * 1;
		} else {
			init.initMusicStatus();
			switchBtn('startBtn', musicStatus.startflag);
			if (storyStatus.startflag === 0) {
				storyStatus.startflag = 1;
				switchBtn('startBtn', storyStatus.startflag);
			} else {
				storyStatus.startflag = 0;
				switchBtn('startBtn', storyStatus.startflag);
			}
			storyStatus.totalTime = init.storyObj[storyStatus.storyIndex - 1].duration * 1;
		}
	},
	last: function () {
		if (playMode === 'music') {
			init.initStoryStatus();
			switchBtn('startBtn', 1);
			musicStatus.startflag = 1;
			if (musicStatus.musicIndex === 1) {
				musicStatus.musicIndex = init.musicObj.length;
			} else {
				musicStatus.musicIndex--;
			}
			init.musicName.html(init.musicObj[musicStatus.musicIndex - 1].name);
			musicStatus.curTime = 0;
			musicStatus.totalTime = init.musicObj[musicStatus.musicIndex - 1].duration * 1;
		} else {
			init.initMusicStatus();
			switchBtn('startBtn', 1);
			storyStatus.startflag = 1;
			if (storyStatus.storyIndex === 1) {
				storyStatus.storyIndex = init.storyObj.length;
			} else {
				storyStatus.storyIndex--;
			}
			init.musicName.html(init.storyObj[storyStatus.storyIndex - 1].name);
			storyStatus.curTime = 0;
			storyStatus.totalTime = init.storyObj[storyStatus.storyIndex - 1].duration * 1;
		}
	},
	next: function () {
		if (playMode === 'music') {
			init.initStoryStatus();
			switchBtn('startBtn', 1);
			musicStatus.startflag = 1;
			if (musicStatus.musicIndex === init.musicObj.length) {
				musicStatus.musicIndex = 1;
			} else {
				musicStatus.musicIndex++;
			}
			init.musicName.html(init.musicObj[musicStatus.musicIndex - 1].name);
			musicStatus.curTime = 0;
			musicStatus.totalTime = init.musicObj[musicStatus.musicIndex - 1].duration * 1;
		}
		if (playMode === 'story') {
			init.initMusicStatus();
			switchBtn('startBtn', 1);
			storyStatus.startflag = 1;
			if (storyStatus.storyIndex === init.storyObj.length) {
				storyStatus.storyIndex = 1;
			} else {
				storyStatus.storyIndex++;
			}
			init.musicName.html(init.storyObj[storyStatus.storyIndex - 1].name);
			storyStatus.curTime = 0;
			storyStatus.totalTime = init.storyObj[storyStatus.storyIndex - 1].duration * 1;
		}
	},
	sport: function () {
		(musicStatus.sportflag === 1) ? musicStatus.sportflag = 0 : musicStatus.sportflag = 1;
		switchBtn('sport', musicStatus.sportflag);
	},
	loop: function () {
		if (playMode === 'music') {
			(musicStatus.loopflag === 0) ? musicStatus.loopflag = 1 : musicStatus.loopflag = 0;
			switchBtn('loop', musicStatus.loopflag);
		} else {
			(storyStatus.loopflag === 0) ? storyStatus.loopflag = 1 : storyStatus.loopflag = 0;
			switchBtn('loop', storyStatus.loopflag);
		}
	}
};	
var play = {
	musicTimer: null,
	storyTimer: null,
	musicCurIndex: null,
	storyCurIndex: null,
	musicClock: function () {
		musicStatus.curTime += 0.1;
		musicStatus.curTime = musicStatus.curTime.toFixed(1) * 1;
		console.log(musicStatus.curTime)
		if (musicStatus.curTime === musicStatus.totalTime) {
			musicStatus.curTime = 0;
			if (musicStatus.loopflag === 1) musicStatus.musicIndex--;
			init.initStoryStatus();
			if (playMode === 'story') switchBtn('startBtn', 0);
			if (playMode === 'music') switchBtn('startBtn', 1);
			musicStatus.startflag = 1;
			if (musicStatus.musicIndex === init.musicObj.length) {
				musicStatus.musicIndex = 1;
			} else {
				musicStatus.musicIndex++;
			}
			if (playMode === 'story') init.storyObj[0].name;
			if (playMode === 'music') init.musicName.html(init.musicObj[musicStatus.musicIndex - 1].name);
			musicStatus.curTime = 0;
			musicStatus.totalTime = init.musicObj[musicStatus.musicIndex - 1].duration * 1;
			sendOrder.sendMusic('next');
		}	
	},
	storyClock: function () {
		storyStatus.curTime += 0.1;
		storyStatus.curTime = storyStatus.curTime.toFixed(1) * 1;
		console.log(storyStatus.curTime)
		if (storyStatus.curTime === storyStatus.totalTime) {
			storyStatus.curTime = 0;
			if (storyStatus.loopflag === 1) {
				storyStatus.storyIndex--;
			}
			init.initMusicStatus();
			if (playMode === 'story') switchBtn('startBtn', 1);
			if (playMode === 'music') switchBtn('startBtn', 0);
			storyStatus.startflag = 1;
			if (storyStatus.storyIndex === init.storyObj.length) {
				storyStatus.storyIndex = 1;
			} else {
				storyStatus.storyIndex++;
			}
			if (playMode === 'music') init.musicObj[0].name;
			if (playMode === 'story') init.musicName.html(init.storyObj[storyStatus.storyIndex - 1].name);
			storyStatus.curTime = 0;
			storyStatus.totalTime = init.storyObj[storyStatus.storyIndex - 1].duration * 1;
			sendOrder.sendStory('next');
		}
	},
	musicPlay: function () {
		clearInterval(play.musicTimer);
		play.musicCurIndex = musicStatus.musicIndex;
		if (musicStatus.startflag === 1) {
			play.musicClock();
			play.musicTimer = setInterval(play.musicClock, 100);
		}
		if (musicStatus.startflag === 0) clearInterval(play.musicTimer);
	},
	storyPlay: function () {
		clearInterval(play.storyTimer);
		play.storyCurIndex = storyStatus.storyIndex;
		if (storyStatus.startflag === 1) {
			play.storyClock();
			play.storyTimer = setInterval(play.storyClock, 100);
		}
		if (storyStatus.startflag === 0) clearInterval(play.storyTimer);
	}
};
init.startBtn.click(function () {
	if (playMode === 'music') sendOrder.sendMusic('startBtn');
	if (playMode === 'story') sendOrder.sendStory('startBtn');
	control.start();
	changeVoice();
	autoplay();
});
init.last.click(function () {
	control.last();
	changeVoice();
	autoplay();
	if (playMode === 'music') sendOrder.sendMusic('last');
	if (playMode === 'story') sendOrder.sendStory('last');
});
init.next.click(function () {
	control.next();
	changeVoice();
	autoplay();
	if (playMode === 'music') sendOrder.sendMusic('next');
	if (playMode === 'story') sendOrder.sendStory('next');
});
init.mode.click(function () {
	control.loop();
	if (playMode === 'music') sendOrder.sendMusic('loop');
	if (playMode === 'story') sendOrder.sendStory('loop');
});
init.slideBtn.click(function () {
	if (playMode === 'music') sendOrder.sendMusic('sport');
	if (playMode === 'story') sendOrder.sendStory('sport');
	control.sport();
});
init.volumeIcon.on('touchstart', function (event) {
	event.stopPropagation();
	var lastW = $('.leftVolBar1').width();
	var curW;
	var disX;
	var x = event.changedTouches[0].clientX;
	init.volumeIcon.on('touchmove', function (event) {
		disX = event.changedTouches[0].clientX - x;
		curW = lastW + disX;
		if (curW <= 20) curW = 20;
		if (curW > init.volumeBarW) curW = init.volumeBarW;
		init.leftVolBar.css({ 'width': curW + 'px' });
		init.leftBtn.css({ 'left': curW + 'px' });
		volumeNum = parseInt( 15 + curW / init.volumeBarW * 15);
	})	
});
init.volumeIcon.on('touchend', function () {
		sendOrder.sendVolume(volumeNum);
})
function autoplay() {
	if ((playMode === 'music' && storyStatus.totalTime === 0)||(playMode === 'story' && storyStatus.totalTime === 0)) {
		clearInterval(play.storyTimer);
		play.musicPlay();
	}
	if ((playMode === 'story' && musicStatus.totalTime === 0)||(playMode === 'music' && musicStatus.totalTime === 0)) {
		clearInterval(play.musicTimer);
		play.storyPlay();
	}
};
function switchBtn(ele, status) {
	if (ele === 'startBtn') {
		if (status === 0) init.startBtn.css({ 'backgroundPosition': -init.startBtnW + 'px 0' });
		if (status === 1) init.startBtn.css({ 'backgroundPosition': '0 0' });
	}
	if (ele === 'sport') {
		if (status === 1) {
			init.slideBtn.css({
				'backgroundPosition': -init.slideBtnW + 'px 0',
				'left': init.slideBtnL + 'px'
			});
		}
		if (status === 0) {
			init.slideBtn.css({
				'backgroundPosition': '0 0',
				'left': init.slideBtnL - init.slideBtnW + 'px'
			});
		}
	}
	if (ele === 'loop') {
		if (status === 0) init.mode.css({ 'backgroundPosition': '0 0' });
		if (status === 1) init.mode.css({ 'backgroundPosition': -init.modeW + 'px 0' });
	}
};

function chooseList(obj) {
	if (playMode === 'music') {
		init.initStoryStatus();
		switchBtn('startBtn', 1);
		musicStatus.startflag = 1;
		init.musicName.html(obj.innerHTML);
		musicStatus.musicIndex = obj.getAttribute('num') * 1;
		musicStatus.totalTime = obj.getAttribute('duration') * 1;
	} else {
		init.initMusicStatus();
		switchBtn('startBtn', 1);
		storyStatus.startflag = 1;
		init.musicName.html(obj.innerHTML);
		storyStatus.storyIndex = obj.getAttribute('num') * 1;
		storyStatus.totalTime = obj.getAttribute('duration') * 1;
	}
	changeVoice();
};

//频谱
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
function initvoice() {
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
initvoice();
function voiceMove() {
	clearInterval(voiceBox1Timer);
	voiceBox1Timer = setInterval(initvoice, 350);
};
function changeVoice() {
	if (playMode === 'music') {
		if (musicStatus.startflag === 0) clearInterval(voiceBox1Timer);	
		if (musicStatus.startflag === 1) voiceMove();
	} else {
		if (storyStatus.startflag === 0) clearInterval(voiceBox1Timer);
		if (storyStatus.startflag === 1) voiceMove();
	}
};
//频谱结束
//发送命令
var sendOrder = {
	cmdData: null,
	Data: null,
	firstclick: 1,
	startData: null,
	loopData: null,
	sportData: null,
	sendMusic: function (ele) {
		sendOrder.cmdData = 12;
		if (ele === 'startBtn') {
			(musicStatus.startflag === 0) ? sendOrder.startData = 3 : sendOrder.startData = 2;
			if (sendOrder.firstclick === 1 && musicStatus.totalTime === 0 && storyStatus.totalTime === 0) {
				sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [1, musicStatus.musicIndex, musicStatus.sportflag, musicStatus.loopflag] };
				console.log(sendOrder.Data);
				sendOrder.firstclick = 2;
			} else {
				sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [sendOrder.startData, musicStatus.sportflag, musicStatus.loopflag] };
				console.log(sendOrder.Data);
			}
		}
		if (ele === 'next' || ele === 'last' || ele === 'list') {
			sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [1, musicStatus.musicIndex, musicStatus.sportflag, musicStatus.loopflag] };
			console.log(sendOrder.Data);
		}
		if (ele === 'loop') {
			(musicStatus.loopflag === 0) ? sendOrder.loopData = 5 : sendOrder.loopData = 4;
			sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [sendOrder.loopData] };
			console.log(sendOrder.Data);
		}
		if (ele === 'sport') {
			(musicStatus.sportflag === 1) ? sendOrder.sportData = 7 : sendOrder.sportData = 6;
			sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [sendOrder.sportData] };
			console.log(sendOrder.Data);
		}
		sendAjax();
	},
	sendStory: function (ele) {
		sendOrder.cmdData = 13;
		if (ele === 'startBtn') {
			(storyStatus.startflag === 0) ? sendOrder.startData = 3 : sendOrder.startData = 2;
			if (sendOrder.firstclick === 1 && musicStatus.totalTime === 0 && storyStatus.totalTime === 0) {
				sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [1, storyStatus.storyIndex, storyStatus.sportflag, storyStatus.loopflag] };
				console.log(sendOrder.Data);
				sendOrder.firstclick = 2;
			} else {
				sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [sendOrder.startData, storyStatus.sportflag, storyStatus.loopflag] };
				console.log(sendOrder.Data);
			}
		}
		if (ele === 'next' || ele === 'last' || ele === 'list') {
			sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [1, storyStatus.storyIndex, storyStatus.sportflag, storyStatus.loopflag] };
			console.log(sendOrder.Data);
		}
		if (ele === 'loop') {
			(storyStatus.loopflag === 0) ? sendOrder.loopData = 5 : sendOrder.loopData = 4;
			sendOrder.Data = { 'cmd': sendOrder.cmdData, 'data': [sendOrder.loopData] };
			console.log(sendOrder.Data);
		}
		sendAjax();
	},
	sendVolume: function (ele) {
		sendOrder.Data = { 'cmd': 11, 'data': [ele] };
		console.log(sendOrder.Data);
		sendAjax();
	}
}
function sendAjax() {
	console.log(sendOrder.Data)
	$.ajax({
		url: 'BlocklyOnenet',
		type: 'POST',
		async: false,
		traditional : true,
		data: {
			'deviceId': devId,
			'cmd': sendOrder.Data.cmd,
			'BlocklyData': sendOrder.Data.data
		},
		success: function () {

		},
		error: function () {
			alert('指令遗失到外太空啦，再试一次吧~');
		}
	});
}
function hideBtn() {
	if (musicStatus.startflag === 1 && playMode === 'story') {
		init.mode.css({ 'visibility': 'hidden' });
	}
	if (musicStatus.startflag === 1 && playMode === 'music') {
		init.mode.css({ 'visibility': 'visible' });
		init.btnBox.css({ 'visibility': 'visible' });
	}
	if (storyStatus.startflag === 1 && playMode === 'music') {
		init.mode.css({ 'visibility': 'hidden' });
		init.btnBox.css({ 'visibility': 'hidden' });
	}
	if (storyStatus.startflag === 1 && playMode === 'story') {
		init.mode.css({ 'visibility': 'visible' });
		init.btnBox.css({ 'visibility': 'visible' });
	}
}
setInterval(hideBtn, 200);
$(document).click(function () {
	console.log(musicStatus, storyStatus);
})
