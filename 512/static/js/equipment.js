window.onload = function() {
	var Datas = document.getElementById("DeviceId").value;
	console.log(Datas);
	var view = document.getElementById("view").value;

	var Data = JSON.parse(Datas);
	console.log(Data);
	var num = Data.length;
	var eqNum = document.querySelector(".eqNum span");
	var ul = document.querySelector(".ul");
	var list = document.querySelector(".list");
	eqNum.innerHTML = "当前绑定" + num + "台设备";
	var ostate;
	for (var i = 0; i < num; i++) {
		var ranNum = Math.floor(5 * Math.random());
		var newList = list.cloneNode(true);
		ul.appendChild(newList);
		$("li:first-child").siblings().removeClass("hide");
		newList.querySelector(".title span").innerHTML = Data[i].mac.substr(6, 6);
		newList.querySelector(".liImg").style.backgroundImage = 'url(../eggtoy/img/logo'
				+ ranNum + '.jpg)';
		console.log(Data[i].mac)
		console.log(Data[i].state)
		if (Data[i].state == true)
			ostate = "on";
		else
			ostate = "off";
		$(".online").eq(i + 1).addClass(ostate)
		newList.index = i;
		newList.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log(view)
			if (Data[this.index].state == false) {
				alert("请开启您的设备")
			}
			if (Data[this.index].state == true) {
				// console.log(this.index)点击标签的索引号
				var sendData = Data[this.index];
				console.log(sendData);

				window.location.href = "http://www.eggtoy.com/eggtoy/" + view
						+ "?deviceId=" + sendData.deviceId + "&volume="
						+ sendData.volume;
			}
		})
	}
}
