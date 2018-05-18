
var editor = ace.edit('editor');
var JavaScriptMode = ace.require('ace/mode/javascript').Mode;
editor.session.setMode(new JavaScriptMode());
editor.setTheme('ace/theme/textmate');
editor.setValue('/*enter code here*/');
editor.setShowPrintMargin(false);
var start = {
  startBtn: $('.start'),
  send: function () {
    if (SetTime.flag()) {
      var userCode = editor.getValue();
      aieggy.codeArr = new Array();
      try {
        eval(userCode);
      }
      catch (err) {
        console.log(err.message);
      }
      if (aieggy.codeArr.length > 0) {
        for (var i = 0; i < aieggy.codeArr.length; i++) {
          aieggy.codeArr[i].data.unshift(i);
        };
        var firstOrder = { "cmd": 0, "data": [aieggy.codeArr.length] }
        aieggy.codeArr.unshift(firstOrder);
      };
      console.log(aieggy.codeArr);
    }
  }
};

var description = {
  state: false,
  desBtn: $('.description'),
  desWrap: $('.desWrap'),
  tap: function () {
    if (!description.state) {
      description.desWrap.animate({ 'bottom': '0' }, 'fast', 'linear', function () {
        description.state = true;
      });
    } else {
      description.desWrap.animate({ 'bottom': -100 + '%' }, 'fast', 'linear', function () {
        description.state = false;
      });
    }
  },
  init: function () {
    var num = 27;
    var width = $('.desWrap').width();
    var desList = $('<ul class="desList"></ul>');
    desList.css({ 'width': width + 'px', 'height': 92 + '%' });
    description.desWrap.append(desList);
    var listW = width / 4;
    for (var i = 0; i < num; i++) {
      var list = $('<li class="list" data_index="' + i + '">' + '</li>');
      list.index = i;
      list.css({
        'width': listW + 'px',
        'height': listW + 'px',
        'margin-top': '15px',
        'background': 'url(./img/course.png)',
        'backgroundPosition': '0 ' + -listW * i + 'px',
        'backgroundSize': listW + 'px'
      });
      desList.append(list);
    }
  },
  click: function () {
    return $(this).attr('data_index');
  }
};

description.init();
description.desBtn.click(description.tap);
start.startBtn.click(start.send);
$('.list').click(description.click)

