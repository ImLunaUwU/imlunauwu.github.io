window.onload = function () {
		console.log("What are you doin´ in me swamp!?");
		console.log("If you read this, you're gay.");
		setTimeout(function(){
    document.getElementById("loading").id = 'loaded';
	document.getElementById("bodyloading").id = 'bodyloaded';
    console.log("Loading Complete!");
    }, 500);
	// Remove Overlay After Load 
		console.log("Loading gun.");
		setTimeout(function(){
    var el = document.getElementById('finishedloading');
el.remove();
    console.log("*kills load overlay*");
    }, 2000);
	
	// Remove After Load 
		console.log("Loading 2nd gun.");
		setTimeout(function(){
    var el = document.getElementById('suicidaljavascript');
el.remove();
    console.log("*commits die*");
    }, 2500);
}