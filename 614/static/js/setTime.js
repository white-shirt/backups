var SetTime = {
  lastTime: 0,
  curTime: null,
  disTime: null,
  clickFlag: true,
  flag: function () {
    SetTime.curTime = Date.now();
    SetTime.disTime = SetTime.curTime - SetTime.lastTime;
    SetTime.lastTime = SetTime.curTime;
    if (SetTime.disTime > 800) {
      return true;
    }
    return false;
  }
};