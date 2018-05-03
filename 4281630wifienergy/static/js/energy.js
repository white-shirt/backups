var userId = $('#deviceId').val();
var energy = {
  creatEle: function () {
    var energyEle = $('<div id="energy"></div>');
    energyEle.css({
      'position': 'absolute',
      'top': '20px',
      'right': '10px',
      'width': '18px',
      'height': '36px',
      'background': 'url(./img/energy.png) no-repeat',
      'backgroundPosition': '0 0',
      'backgroundSize': 'cover',
      'z-index': 10000
    });
    $('body').prepend(energyEle);
  },
  changeEnergy: function (value) {
    var _this = $('#energy');
    if (value == '1.00') {
      _this.css({'backgroundPositionY': '0'});
    } else if (value == 0.00) {
      _this.css({'backgroundPositionY': '-148px'});
    } else {
      _this.css({'backgroundPositionY': (parseInt(value * 100 / 20) - 4) * 37 + 'px'});
    }
    var energyTimer = null;
    energyTimer = setInterval(function () {
      $.ajax({
        url: 'electricity/'+userId,
        type: 'GET',
        success: function (result) {
          energy.changeEnergy(result);
          clearInterval(energyTimer);
        },
        error: function () {
  
        }
      });
    }, 5000);
  }
};

var wifi = {
  creatEle: function () {
    var wifiEle = $('<div id="wifi"></div>');
    wifiEle.css({
      'position': 'absolute',
      'top': '70px',
      'right': '10px',
      'width': '18px',
      'height': '18px',
      'background': 'url(./img/WIFI.png) no-repeat',
      'backgroundPosition': '-18px 0',
      'backgroundSize': 'cover',
      'z-index': 10000  
    });
    $('body').prepend(wifiEle);
  },
  changeWifi: function (value) {
    var _this = $('#wifi');
    if (value == true) {
      _this.css({'backgroundPositionX': '-18px'});
    } else {
      _this.css({'backgroundPositionX': '0px'});
    }
    var wifiTimer = null;
    wifiTimer = setInterval(function () {
      $.ajax({
        url: 'deviceOnline',
        type: 'POST',
        data: {
          deviceid: userId
        },
        success: function (result) {
          wifi.changeWifi(result);
          clearInterval(wifiTimer);
          console.log('wifi');
        },
        error: function () {
  
        }
      });
    },5000);
  }
}

energy.creatEle();
energy.changeEnergy(1.00);
wifi.creatEle();
wifi.changeWifi(true);
