window.onload = function () {
	setTimeout(function(){
    document.getElementById("loading").id = 'loaded';
	document.getElementById("bodyloading").id = 'bodyloaded';
    console.log("Loading Complete!");
    }, 100);

	// Remove Overlay After Load
	setTimeout(function(){
    var el = document.getElementById('finishedloading');
	el.remove();

	// Fade-in body when the page has loaded
	$("body").fadeIn(2000);
	}, 1100);

	// Remove Load Script After Load
	setTimeout(function(){
    var el = document.getElementById('selfdelete');
	el.remove();
	}, 1200);
}