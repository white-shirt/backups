$(function(){
    (function (doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                    docEl.style.fontSize = '100px';
                }else{
                    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
                }
            };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    
    $(".show").click(function(){
		$(this).siblings(".hide").slideToggle();
		$(this).children("span").toggleClass("rotate1");
	});
	
	$('.titleClick').click(function(){
		var num = $('.titleClick').index($(this));
		$(".titleClickShow").eq(num).slideToggle();
		$(this).children("span").toggleClass("rotate1");
	});
});

