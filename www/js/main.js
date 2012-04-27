var $TITLE = "YSoFat?";

$(document).ready(function() {
	$("title").text($TITLE);
	//$("#siteName").text($TITLE);
	console.log("Done");

	//Setup the ViewNavigator
	window.viewNavigator = new ViewNavigator( '#viewArea' );	

	if(isKnown()) {
		alert("Not done, yo!");
	} else {
		$.get("views/welcome.html", {}, function(res) {
			console.log(res);
			var view = {title:"Welcome", view:$(res), backLabel:"Back"};
			window.viewNavigator.pushView(view);
		});
	}
});

function isKnown() {
	return localStorage["username"];
}