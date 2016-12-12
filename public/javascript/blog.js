

$(document).ready(function(){

	//logo styling
	$("#logo").hover(function(){
		$(this).addClass("logo-hover");

	}, function(){
		$(this).removeClass("logo-hover");
	})

	// navbar menu
	$("#logo").click(function(){
			$("#menu-butts").toggle();
	})



//===================================
// Gray Submit Page

$('#blackImage').change(function(){
	var blackImgSrc = $('#blackImage').val();
	$('#black-img').attr("src", blackImgSrc);
});

$('#whiteImage').change(function(){
	var whiteImgSrc = $('#whiteImage').val();
	$('#white-img').attr("src", whiteImgSrc);
});

//===================================
// Post Submit Page

$('#post-img-link').change(function(){
	//on post submit Page
	var imgSrc = $('#post-img-link').val();
	$('#post-img').attr("src", imgSrc);
	console.log(imgSrc);
});

$(window).scroll(function(e){
	var editorToolbar = $('.mce-toolbar-grp');
	var isFixed = (editorToolbar.css('position') == 'fixed');

	if($(this).scrollTop() > 520 && !isFixed){
		editorToolbar.css({'position': 'fixed', 'top': '0px'});
	}

	if($(this).scrollTop() < 520 && isFixed){
		editorToolbar.css({'position': 'static', 'top': '0px'});

	}

})

})



