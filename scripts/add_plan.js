function savePlan() {
	var database = firebase.database();
	 firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {

	 		var name = document.getElementById('planname').value;
			var exercise = document.getElementById('selectexerciseplan').value; 
			var numdays = document.getElementById('numdays').value;
			var nutrition = document.getElementById('selectnutritionplan').value;
			var education = document.getElementById('selecteducationplan').value;
			var pain = document.getElementById('selectpainsurvey').value;

			var plan = firebase.database().ref("Plans");
			var newPlan = plan.push();
			newPlan.set({
				PlanName: String(name),
				ExercisePlan: String(exercise),
				NumDays: String(numdays),
				NutritionPlan: String(nutrition),
				EducationPlan: String(education)
			});

			console.log("clicked");

		 } else {
		 	console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
}

// read from the database what nutrition/exercise/education pages we 
// have, and display them in the selection menus

var exercisePicker = document.getElementById('selectexerciseplan');
var exercises = firebase.database().ref("Exercise Plans");
exercises.on("value", function(snapshot) {
	snapshot.forEach(function(child) {
		if (child.val().PlanName != null) {
			exercisePicker.innerHTML += "<option>" + child.val().PlanName + "</option>";
		}
	});
}, function (error) {
				console.log("Error:" + error.code);
});

var nutritionPicker = document.getElementById('selectnutritionplan');
var nutritions = firebase.database().ref("Nutrition");
nutritions.on("value", function(snapshot) {
	snapshot.forEach(function(child) {
		if (child.val().PlanName != null) {
			nutritionPicker.innerHTML += "<option>" + child.val().PlanName + "</option>";
		}
	});
}, function (error) {
				console.log("Error:" + error.code);
});

var educationPicker = document.getElementById('selecteducationplan');
var educations = firebase.database().ref("Education");
educations.on("value", function(snapshot) {
	snapshot.forEach(function(child) {
		if (child.val().Page != null) {
			educationPicker.innerHTML += "<option>" + child.val().Page + "</option>";
		}
	});
}, function (error) {
				console.log("Error:" + error.code);
});

var savebutton = document.getElementById("savebutton");

savebutton.onclick = function(){savePlan()};






