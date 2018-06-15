var hrefData = {
  DataObj: function () {
    var href = window.location.href;
    var index = href.indexOf('?');
    var DataStr = decodeURI(href.substr(index + 1, href.length));
    var DataObj = JSON.parse(DataStr);
    return DataObj;
  }
}

//console.log(hrefData.DataObj());

var eqInfo = {
  Mac: new Array(),
  Did: new Array(),
	flag: new Array(),
	uImg: '',
	uNic: '',
	uAge: '',
	uGra: '',
	uSex: '',
	uBir: ''
}

function showWxInfo(obj) {
  $('.logoImg').css({ 'background': 'url(' + obj.uImg + ')', 'backgroundSize': '100% 100%' });
  $('.logoNick').html(obj.unic + ' : 已绑定' + obj.eq + '台设备');
};


function showequipment(obj) {
  for (var i = 0; i < obj.eq; i++) {
    eqInfo.Mac.push(obj.mac.substr(i * 6, 6));
    eqInfo.Did.push(obj.Did.substr(i * 8, 8));
		eqInfo.flag.push(obj.flag.substr(i * 1, 1));
    var list = $('<li class="list" index=' + i + '>'
      + '<span class="liImg"' + 'style' + '=' + "background:url(./img/logo" + Math.floor(5 * Math.random()) + '.jpg);' + "background-size:100%;" + '>' + '</span>'
      + '<p class="title">蛋仔' + eqInfo.Mac[i] + '</p>'
      + '<span class=' + ((eqInfo.flag[i] == 1) ? 'online' : 'off') + '></span>'
      + '</li>');
    $('.ul').append(list);
	}
	eqInfo.uImg = obj.uImg;
	eqInfo.uNic = obj.unic;
	eqInfo.uAge = obj.uAge;
	eqInfo.uGra = obj.uGra;
	eqInfo.uSex = obj.uSex;
	eqInfo.uBir = obj.uBir;
}
console.log(eqInfo);

if ($('#result').val()) {
	var data = $('#result').val();
	(function parseData() {
	    var eqData = JSON.parse(data.split('&')[0]);
	    var userData = JSON.parse(data.split('&')[1]);
	    var eqObj = { Num: eqData.length, flag: '', Mac: '', Did: '' };
	    var userObj = {
	      nickname: userData[0].userName,
	      headimgurl: userData[0].useravatar,
	      age: userData[0].userAge,
	      grade: userData[0].userGrade,
	      sex: userData[0].userSex,
	      Birthday: userData[0].userBirthday
	    };
	    for (var i = 0; i < eqData.length; i++) {
	      eqObj.flag += (eqData[i].state === true) ? (eqData[i].state = 1) : (eqData[i].state = 0);
	      eqObj.Mac += eqData[i].mac.substr(6, 6);
	      eqObj.Did += eqData[i].deviceId;
	    };
	    var postData = '{"unic":'+ '"' + userObj.nickname + '"'
	                + ',' + '"uImg":' + '"' + userObj.headimgurl + '"'
	                + ',' + '"uAge":' + '"' + userObj.age + '"'
	                + ',' + '"uGra":' + '"' + userObj.grade + '"'
	                + ',' + '"uSex":' + '"' + userObj.sex + '"'
	                + ',' + '"uBir":' + '"' + userObj.Birthday + '"'
	                + ',' + '"eq":' + '"' + eqObj.Num + '"'
	                + ',' + '"flag":' + '"' + eqObj.flag + '"'
	                + ',' + '"mac":' + '"' + eqObj.Mac + '"'
	                + ',' + '"Did":' + '"' + eqObj.Did + '"' + '}';
	    var DataStr = postData;
	    var DataObj = JSON.parse(DataStr);
	    showWxInfo(DataObj);
	    showequipment(DataObj);
	  })();
} else {
	try {
		  showWxInfo(hrefData.DataObj());
		  showequipment(hrefData.DataObj());
		} catch (err) {
		  console.log(err.message)
		}
};


$('body').on('click', '.list', function () {
  if (eqInfo.flag[$(this).attr('index')] === '1') {
    console.log('成功跳转',eqInfo.Mac[$(this).attr('index')], eqInfo.Did[$(this).attr('index')]);
		window.location.href = 'http://www.eggtoy.com/eggtoy/edu.html?' + '%7b"userName":' + '"' + eqInfo.uNic + '"'
																	+ ',' + '"useravatar":' + '"' + eqInfo.uImg + '"'
																	+ ',' + '"userAge":' + '"' + eqInfo.uAge + '"'
																	+ ',' + '"userGrade":' + '"' + eqInfo.uGra + '"'
																	+ ',' + '"userSex":' + '"' + eqInfo.uSex + '"'
																	+ ',' + '"userBirthday":' + '"' + eqInfo.uBir + '"'
																	+ ',' + '"mac":' + '"' + eqInfo.Mac[$(this).attr('index')] + '"'
																	+ ',' + '"deviceId":' + '"' + eqInfo.Did[$(this).attr('index')] + '"' + '%7d'
  } else {
    alert('请开启您的设备');
  }
});
