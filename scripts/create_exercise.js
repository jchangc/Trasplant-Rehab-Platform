var Exercises = [];
var Descriptions = [];
var Images = [];
var Videos = [];

function saveExercise() {
	var exercise = document.getElementById('exercisename').value; 
	var description = document.getElementById('description').value;
	var image = document.getElementById('imagelink').value;
	var video = document.getElementById('videolink').value;

	Exercises.push(String(exercise));
	Descriptions.push(String(description));
	Images.push(String(image));
	Videos.push(String(video));

	document.getElementById('exercisename').value = "";
	document.getElementById('description').value = "";
	document.getElementById('imagelink').value = "";
	document.getElementById('videolink').value = "";

	alert("Exercise added. Please enter another excercise.");
}

function savePlan() {
	var database = firebase.database();
	 firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {

	 		var name = document.getElementById('planname').value;
			var exercise = document.getElementById('exercisename').value; 
			var description = document.getElementById('description').value;
			var image = document.getElementById('imagelink').value;
			var video = document.getElementById('videolink').value;

			Exercises.push(String(exercise));
			Descriptions.push(String(description));
			Images.push(String(image));
			Videos.push(String(video));

			var exercises = firebase.database().ref("Exercise Plans");
			var newPlan = exercises.push();
			newPlan.set({
				PlanName: String(name)
			});

			for(i = 0; i < Exercises.length; i++){
                var newSection = newPlan.push();
                newSection.set({
            		Title: String(Exercises[i]), 
            		Description: String(Descriptions[i]),
            		ImageLink: String(Images[i]),
            		VideoLink: String(Videos[i])
                });
            }

			document.getElementById('planname').value = "";
			document.getElementById('exercisename').value = "";
			document.getElementById('description').value = "";
			document.getElementById('imagelink').value = "";
			document.getElementById('videolink').value = "";

			console.log("clicked");

			alert("Exercise plan successfully created.");


		 } else {
			console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
}

var addbutton = document.getElementById("addbutton");

addbutton.onclick = function(){saveExercise()};

var savebutton = document.getElementById("submitbutton");

savebutton.onclick = function(){savePlan()};






