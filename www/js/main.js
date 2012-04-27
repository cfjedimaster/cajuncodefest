var $TITLE = "YSoFat?";
var $VIEW;
var dbController;

$(document).ready(function() {


	dbController = new DBController();
	
	$VIEW = $("#viewArea");
	$("title").text($TITLE);

	//todo: loading screen animation
	dbController.init("main","db/initial.sql",appReady);

	function appReady() {
		console.log("Done with db and running appReady");

		if(isKnown()) {
			loadView("main");
		} else {
			loadView("welcome", function () {

				$("#beginButton").on("click", function() {
					loadView("profile_create",profileViewCreateHandler);
				});

			});
		}
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