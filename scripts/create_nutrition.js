var Foods = [];
var Descriptions = [];
var Images = [];

function saveExercise() {
	var food = document.getElementById('foodname').value; 
	var description = document.getElementById('description').value;
	var image = document.getElementById('imagelink').value;

	Foods.push(String(food));
	Descriptions.push(String(description));
	Images.push(String(image));

	document.getElementById('foodname').value = "";
	document.getElementById('description').value = "";
	document.getElementById('imagelink').value = "";
}

function savePlan() {
	var database = firebase.database();
	 firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {

	 		var name = document.getElementById('planname').value;
			var food = document.getElementById('foodname').value; 
			var description = document.getElementById('description').value;
			var image = document.getElementById('imagelink').value;

			Foods.push(String(food));
			Descriptions.push(String(description));
			Images.push(String(image));

			var nutrition = firebase.database().ref("Nutrition");
			var newPlan = nutrition.push();
			newPlan.set({
				PlanName: String(name)
			});

			for(i = 0; i < Foods.length; i++){
                var newSection = newPlan.push();
                newSection.set({
            		Title: String(Foods[i]), 
            		Description: String(Descriptions[i]),
            		ImageLink: String(Images[i]),
                });
            }

			document.getElementById('planname').value = "";
			document.getElementById('foodname').value = "";
			document.getElementById('description').value = "";
			document.getElementById('imagelink').value = "";

			console.log("clicked");

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






