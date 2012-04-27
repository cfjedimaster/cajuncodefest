var $TITLE = "YSoFat?";
var $VIEW;

$(document).ready(function() {
	$VIEW = $("#viewArea");

	$("title").text($TITLE);

	console.log("Done");


	if(isKnown()) {
		alert("Not done, yo!");
	} else {
		loadView("welcome", function () {

			$("#beginButton").on("click", function() {
				loadView("profile_create",profileViewCreateHandler);
			});

		});
	}
});

//view events
function profileViewCreateHandler() {

	$("#createProfileButton").on("click", function () {
		var name = $("#name").val();
		var goal = $("input[name=goal]::checked").val();
		var weight = $("#weight").val();
		if(name == '') $("#name").parent().addClass("error");
		else $("#name").parent().removeClass("error");

		if(!goal) $("input[name=goal]").parent().parent().addClass("error");
		else $("input[name=goal]").parent().parent().removeClass("error");

		if(weight == '') $("#weight").parent().addClass("error");
		else $("#weight").parent().removeClass("error");

		if($(".error",$VIEW).length) {
			console.log("BAD");
		} else {
			storeProfile({name:name, goal:goal, weight: weight});
			loadView("main");
		}
		return false;
	});

}

//ui management
function loadView(src, callback) {
	$.get("views/"+src+".html", {}, function(res) {
		//possibly update title/history later
		$VIEW.html(res);
		if(callback) callback();
	});
}
//user management
function isKnown() {
	return localStorage["user"];
}

function storeProfile(name, goal, weight) {
	var p = {
		name: name, 
		goal: goal, 
		initialWeight: weight
	}
	localStorage["user"] = JSON.stringify(p);
}