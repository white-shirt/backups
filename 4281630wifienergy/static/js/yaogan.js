window.onload = function(){
	var outer = document.querySelector(".outer");
	var inner = document.querySelector(".inner");
	
	var initLeft = inner.offsetLeft;//155,就是left的值
	var initTop = inner.offsetTop;//155,就是top的值
	
	//圆心坐标
	var cenX = parseInt(outer.offsetLeft+0.5*outer.offsetWidth);
	var cenY = parseInt(outer.offsetTop+0.5*outer.offsetHeight);
	
	var timer = null;
	
	//alert(cenX+","+cenY);
	outer.addEventListener("touchstart",function(e){
		
		e.preventDefault();
		//手指落下的坐标，相对于(0,0)
		var pressX = parseInt(e.changedTouches[0].clientX - cenX);
		var pressY = -parseInt(e.changedTouches[0].clientY - cenY);
		//alert(pressX+","+pressY);
		
		outer.addEventListener("touchmove",function(e){
			e.preventDefault();
			e.stopPropagation();
			
			//手指移动后的坐标，相对于(0,0)
			var moveX = parseInt(e.changedTouches[0].clientX - cenX);
			var moveY = -parseInt(e.changedTouches[0].clientY - cenY);
			//console.log(moveX+","+moveY);
			
			//手指移动的差值,同时也是小圆移动后的圆心坐标（   相对于(0,0) ）
			var disX = moveX - pressX;
			var disY = moveY - pressY;
			
			//防止小圆溢出大圆的范围
			//小圆移动的距离（不能超过大圆的半径）
			var dis = Math.floor( Math.sqrt(disX*disX + disY*disY) );
			var outerR = outer.offsetWidth*0.5;//255
			//console.log(disX+","+disY);//-255到255的坐标
			if(dis>=outerR){
				//sinα = 对边/斜边,  在第1,2象限为正，在第3,4象限为负
				var angle = Math.abs(disY/dis);
				//console.log(angle);
				
				if(disY<0){
					disY = -parseInt(outerR*angle);
				}
				else{
					disY = parseInt(outerR*angle);
				}
				if(disX<0){
					disX = -Math.floor( Math.sqrt(outerR*outerR - disY*disY) );
				}
				else{
					disX = Math.floor( Math.sqrt(outerR*outerR - disY*disY) );
				}
			}
			//console.log(disX+","+disY);
			inner.style.left = (initLeft + disX) + "px";
			inner.style.top = (initTop - disY) + "px";
			
			//将此处的x,y值发送给硬件
			x = 2*Math.floor( Math.sqrt(2)*(disY+disX)/2 );
			y = 2*Math.floor( Math.sqrt(2)*(disY-disX)/2 );
			//console.log(x+","+y);
		});
	});
	outer.addEventListener("touchend",function(){
		inner.style.top = initTop + "px";
		inner.style.left = initLeft + "px";
		clearInterval(timer);
	})
}