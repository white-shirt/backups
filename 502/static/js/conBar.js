window.onload = function(){

//************
//************
//眼睛亮度
//************
//************

	var eyeBar = document.querySelector(".eyeBar"); 
	var leftEyeBar = document.querySelector(".leftEyeBar"); 
	var leftEyeBtn = document.querySelector(".leftEyeBtn");
	eyeBar.addEventListener("touchstart",function(e){
		e.stopPropagation();
		var x = e.changedTouches[0].clientX;
		var btnleft = leftEyeBtn.offsetLeft;
		//console.log(x);
		eyeBar.addEventListener("touchmove",function(e){
			var wid =  e.changedTouches[0].clientX - x;
			var left = btnleft + wid;
			if(left<0){
				left = 0;
			}
			else if(left>(eyeBar.offsetWidth - leftEyeBtn.offsetWidth)){
				left = eyeBar.offsetWidth - leftEyeBtn.offsetWidth;
			}
			//console.log(left);
			leftEyeBtn.style.left = left + "px";
			leftEyeBar.style.width = left + "px";
		});
	});
	eyeBar.addEventListener("touchend",function(){
		var per = parseInt(leftEyeBtn.offsetLeft/eyeBar.offsetWidth*100);
		console.log(per)
	});
	
//************
//************
//耳朵亮度
//************
//************

	var earBar = document.querySelector(".earBar"); 
	var leftEarBar = document.querySelector(".leftEarBar"); 
	var leftEarBtn = document.querySelector(".leftEarBtn");
	earBar.addEventListener("touchstart",function(e){
		e.stopPropagation();
		var x = e.changedTouches[0].clientX;
		var btnleft = leftEarBtn.offsetLeft;
		//console.log(x);
		earBar.addEventListener("touchmove",function(e){
			var wid =  e.changedTouches[0].clientX - x;
			var left = btnleft + wid;
			if(left<0){
				left = 0;
			}
			else if(left>(earBar.offsetWidth - leftEarBtn.offsetWidth)){
				left = earBar.offsetWidth - leftEarBtn.offsetWidth;
			}
			//console.log(left);
			leftEarBtn.style.left = left + "px";
			leftEarBar.style.width = left + "px";
		});
	});
	earBar.addEventListener("touchend",function(){
		var per = parseInt(leftEarBtn.offsetLeft/earBar.offsetWidth*100);
		console.log(per)
	});
}