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

var confirmMsg = document.getElementById('confirm');


function deletePlan(){

	var success = true;
	var name = document.getElementById('planname').value;
	// Check that plan with same name does NOT already exist
	planStore.forEach(function(entry){
		entryLower = entry.toLowerCase();
		nameLower = name.toLowerCase();
		if (entryLower != nameLower) {
		    alert("Plan with name does not currently exist. Please check that plan exists.\n\nNOTE: plan names are NOT case sensitive.")
		    planDoesNotExist = true;
	    }
	});


	var exRef = firebase.database().ref("Plans");
    exRef.on("value", function(snapshot) {
        snapshot.forEach(function(child) {
            if (child.child("PlanName").val() == name) {
            	var key = child.key;
            	var ref = firebase.database().ref("/Plans/" + key)
            	var promise = ref.remove();

            	promise.catch(function(e){
					var errorCode = e.code;
					var errorMessage = e.message;
					console.log(e.message)
					success = false;
				})

				setTimeout(function(){
					console.log("assessing whether to remove hidden")
					if(success == true){
						console.log("trying to remove hidden")
						confirmMsg.classList.remove('hidden')
					}
				}, 1500)
            }
        })
    })
}

function modifyPlan() {
	var success = true;
	var planDoesNotExist = false;
	var database = firebase.database();
	var name = document.getElementById('planname').value;

	// Check that plan with same name does NOT already exist
	planStore.forEach(function(entry){
		entryLower = entry.toLowerCase();
		nameLower = name.toLowerCase();
		if (entryLower != nameLower) {
		    alert("Plan with name does not currently exist. Please check that plan exists.\n\nNOTE: plan names are NOT case sensitive.")
		    planDoesNotExist = true;
	    }
	});

	// Go on if plan name does not exist

	firebase.auth().onAuthStateChanged(function(user) {
		if (planDoesNotExist){
			return;
		} else if (user && !planDoesNotExist) {

			// Check whether anything new's been entered: 

	 		// Field data values
			var exercise = document.getElementById('selectexerciseplan').value; 
			var nutrition = document.getElementById('selectnutritionplan').value;
			var education = document.getElementById('selecteducationplan').value;
			var pain = document.getElementById('selectpainsurvey').value;

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
				EducationPlan: String(education)
			});

			console.log("Set Request Sent")

			promise.catch(function(e){
				var errorCode = e.code;
				var errorMessage = e.message;
				console.log(e.message)
				success = false;
			})

			setTimeout(function(){
				console.log("assessing whether to remove hidden")
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
	var exercises = firebase.database().ref("Exercise Plans/" + value);

	// Clear out old content
	exerciseElement.innerHTML = ""

    exercises.on("value", function(snapshot) {
    	// Extract names
    	snapshot.forEach(function(child) {
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
		if (child.key != null) {
			exercisePicker.innerHTML += "<option value=\"" + child.key + "\">" + child.key + "</option>";
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

extractPlanNames();

var modifybutton = document.getElementById("modifybutton");
var deletebutton = document.getElementById("deletebutton");

modifybutton.onclick = function(){modifyPlan()};
deletebutton.onclick = function(){deletePlan()};






