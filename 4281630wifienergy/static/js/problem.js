window.onload = function(){
	$('.question').on("click",function(){
		var num = $('.question').index($(this));
		$(".answer").eq(num).slideToggle('fast');
		$(this).children("span").toggleClass("rotate90").css("transition","0.4s");
	})
}
