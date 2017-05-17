var bLogout = document.getElementById('logoutButton');

var week = new Array(7);
week[0] =  "Sunday";
week[1] = "Monday";
week[2] = "Tuesday";
week[3] = "Wednesday";
week[4] = "Thursday";
week[5] = "Friday";
week[6] = "Saturday";

var store = new Array(7);
store[0] = {};
store[1] = {};
store[2] = {};
store[3] = {};
store[4] = {};
store[5] = {};
store[6] = {};

var planStore;
var success = true;
var confirmMsg = document.getElementById('confirm');

function savePlan() {
	var database = firebase.database();
	var name = document.getElementById('planname').value;
	var planExists = false;
	
	// Check that plan with same name does NOT already exist
	planStore.forEach(function(entry){
		entryLower = entry.toLowerCase();
		nameLower = name.toLowerCase();

		if (entryLower == nameLower) {
		    alert("Plan with name already exists. Please enter an alternative name.\n\nNOTE: plan names are NOT case sensitive.")
		    planExists = true;
	    }
	});

	// Go on if plan name does not exist

	firebase.auth().onAuthStateChanged(function(user) {
		if (planExists){
			return;
		} else if (user && !planExists) {

			console.log("Setting plan.")

	 		// Field data values
			var exercise = document.getElementById('selectexerciseplan').value; 
			var nutrition = document.getElementById('selectnutritionplan').value;
			var education = document.getElementById('selecteducationplan').value;
			var medication = document.getElementById('selectmedication').value;
			var journal = document.getElementById('journalQ').value;

			// Retrieve exercise data
			var scheduleData = document.getElementsByClassName("check")
			var i;
			var j;
			for (i = 0; i<scheduleData.length; i++){
				var exerciseName = scheduleData[i].id
				var exerciseData = scheduleData[i].children

				// Look at each checkbox to see if value is on
				for (j = 0; j < 7; j++){
					if (exerciseData[j*2].checked == true){
						store[j][exerciseName] = ""
					}
				} 
			}

			// Zeroing out the empty entries
			for (j = 0; j < 7; j++){
				if (jQuery.isEmptyObject(store[j])){
					store[j] = ""
				}
			} 

			console.log(journal);

			var plan = firebase.database().ref("Plans");
			var newPlan = plan.push();
			var promise = newPlan.set({
				PlanName: String(name),
				ExercisePlan: String(exercise),
				Schedule: {
					Monday : store[1],
					Tuesday: store[2],
					Wednesday: store[3],
					Thursday: store[4],
					Friday: store[5],
					Saturday: store[6],
					Sunday : store[0]
				},
				NutritionPlan: String(nutrition),
				EducationPlan: String(education),
				Medication: String(medication),
				JournalQuestion: String(journal)
			});

			console.log("Set Request Sent")

			promise.catch(function(e){
				var errorCode = e.code;
				var errorMessage = e.message;
				console.log(e.message)
				success = false;
			})

			setTimeout(function(){
				console.log("Assessing whether to show confirmation message.")
				if(success == true){
					console.log("trying to remove hidden")
					confirmMsg.classList.remove('hidden')
				}
			}, 1500)

		 } else {
		 	console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
}


// Fucntion to update the exercise bar dynamically.
function updateExercises(value) {
	console.log("updating exercises")
	var exerciseElement = document.getElementById("exercise_list")
	var exercises = firebase.database().ref("Exercise Plans");
	var exercise;

	exercises.on("value", function(snapshot) {
		snapshot.forEach(function(child) {
			if (child.val().PlanName == value) {
				exercise = firebase.database().ref("Exercise Plans/" + child.key);
			}
		});
	}, function (error) {
				console.log("Error:" + error.code);
	});

	// Clear out old content
	exerciseElement.innerHTML = ""

    exercise.on("value", function(snapshot) {
    	// Extract names
    	snapshot.forEach(function(child) {
    		if (child.child("Title").val() != null) {
	    		// Append label
	    		var exerciseLabel = document.createElement("p")
	    		exerciseLabel.innerHTML = "<b>" + child.child("Title").val() + "</b>" 
	    		exerciseElement.append(exerciseLabel)

	    		// Create holder
	    		var container = document.createElement("div")
	    		container.setAttribute("class", "check")
	    		container.setAttribute("id", child.child("Title").val())
	    		var i;

	    		// Create boxes
	    		for (i = 0; i < 7; i++){
	    			var box = document.createElement("input")
	    			box.setAttribute("type", "checkbox")
	    			box.setAttribute("id", child.child("Title").val() + " " +  i)
	    			var label = document.createElement('label')
	    			label.setAttribute("for", child.child("Title").val() + " " + i)
	    			label.innerHTML = "<span></span>" + week[i]
	    			container.append(box)
	    			container.append(label)
	    		}

	    		exerciseElement.append(container)
	    	}
        });
   });
}

function extractPlanNames(){	
	var plans = firebase.database().ref("Plans");
	plans.on("value", function(snapshot) {
		var numChildren = snapshot.numChildren();
		planStore = new Array(numChildren);
	    snapshot.forEach(function(child) {
	    	planStore[numChildren-1] = child.child("PlanName").val();
	    	numChildren--;
	    })
	})
}


var exercisePicker = document.getElementById('selectexerciseplan');
var exercises = firebase.database().ref("Exercise Plans");
exercises.on("value", function(snapshot) {
	snapshot.forEach(function(child) {
		if (child.val().PlanName != null) {
			exercisePicker.innerHTML += "<option value=\"" + child.val().PlanName + "\">" + child.val().PlanName + "</option>";
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

var medicationPicker = document.getElementById('selectmedication');
var medications = firebase.database().ref("Medication");
medications.on("value", function(snapshot) {
	snapshot.forEach(function(child) {
		if (child.val().Page != null) {
			medicationPicker.innerHTML += "<option>" + child.val().Page + "</option>";
		}
	});
}, function (error) {
				console.log("Error:" + error.code);
});

extractPlanNames();

var savebutton = document.getElementById("savebutton");

savebutton.onclick = function(){savePlan()};

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = '../login.html';
	reload();
};




