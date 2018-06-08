var loginBtn = $('#login');
var unionid = $('#unionid').val();
var nickname = $('#nickname').val();
var headimgurl = $('#headimgurl').val();
var name;
var pwd;
var boundform = {
  phonestatus: false,
  pwdstatus: false,
  phonereg: /^[1][3,4,5,7,8][0-9]{9}$/,
  pwdreg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
  check: function () {
    name = $('#user_name').val();
    pwd = $('#password').val();
    confirmPwd = $('#confirmPwd').val();
    if (name === '') {
      boundform.phonestatus = false;
    } else {
      if (boundform.phonereg.exec(name)) {
        boundform.phonestatus = true;
      } else {
        showError('.error', '手机号格式不正确');
        boundform.phonestatus = false;
      }
    }
    if (pwd === '' || confirmPwd === '') {
      boundform.pwdstatus = false;
    } else if (pwd !== confirmPwd) {
      showError('.error', '两次密码不一致');
      boundform.pwdstatus = false;
    } else {
      if (boundform.pwdreg.exec(pwd)) {
        boundform.pwdstatus = true;
      } else {
        showError('.error', '密码格式不正确');
        boundform.pwdstatus = false;
      }
    }
  },
  submit: function () {
    boundform.check();
    if (boundform.phonestatus && boundform.pwdstatus) {
      console.log('绑定成功');
      $.ajax({
        url: 'registered',
        type: 'POST',
        data: {
          phoneAccount: name,
          password: pwd
        },
        success: function (result) {
          if (result.success) {
            $.ajax({
              url: 'boundPhone',
              type: 'post',
              data: {
                phone_account: name,
                password: pwd,
                unionid: unionid,
                nickname: nickname,
                headimgurl: headimgurl
              },
              success: function (result) {
                var data = result;
                console.log(data);
                try {
                  parseData(data);  
                } catch (err){
                  console.log(err.message);
                }
              },
              error: function () {
      
              }
            })
          }
          
          if (result.error) {
            alert("请检查您的网络");
          }
        }
      })
    } else {
      $("#login_form").addClass('shake_effect');
      setTimeout(function () {
        $("#login_form").removeClass('shake_effect');
      },1000)
    }
  }
};

function showError(ele, string) {
  var error = $(ele);
  error.css({'display': 'inline-block'});
  error.html(string);
  setTimeout(function () {
    error.css({'display':'none'})
  }, 2000);
};

function parseData (data) {
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
    eqObj.flag += (eqData[i].state == true) ? (eqData[i].state = 1) : (eqData[i].state = 0);
    eqObj.Mac += eqData[i].mac.substr(6, 6);
    eqObj.Did += eqData[i].deviceId;
  }
  var postData = '%7b"unic":'+ '"' + userObj.nickname + '"'
               + ',' + '"uImg":' + '"' + userObj.headimgurl + '"'
               + ',' + '"uAge":' + '"' + userObj.age + '"'
               + ',' + '"uGra":' + '"' + userObj.grade + '"'
               + ',' + '"uSex":' + '"' + userObj.sex + '"'
               + ',' + '"uBir":' + '"' + userObj.Birthday + '"'
               + ',' + '"eq":' + '"' + eqObj.Num + '"'
               + ',' + '"flag":' + '"' + eqObj.flag + '"'
               + ',' + '"mac":' + '"' + eqObj.Mac + '"'
               + ',' + '"Did":' + '"' + eqObj.Did + '"' + '%7d';
//  alert(window.location.href = 'http://eggtoy.51118518.com/choose.html?' + postData);
  window.location.href = 'http://eggtoy.51118518.com/choose.html?' + postData;
  
}

loginBtn.click(boundform.submit);

