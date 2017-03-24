var Titles = [];
var Descriptions = [];

function saveSection() {
	var section = document.getElementById('sectiontitle').value; 
	var description = document.getElementById('description').value;

	Titles.push(String(section));
	Descriptions.push(String(description));

	document.getElementById('sectiontitle').value = "";
	document.getElementById('description').value = "";
}


function savePlan() {
	var database = firebase.database();
	 firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {

	 		var name = document.getElementById('pagetitle').value;
			var section = document.getElementById('sectiontitle').value; 
			var description = document.getElementById('description').value;

			Titles.push(String(section));
			Descriptions.push(String(description));

			var education = firebase.database().ref("Education");
			var newPlan = education.push();
			newPlan.set({
				Page: String(name)
			});

			for(i = 0; i < Titles.length; i++){
                var newSection = newPlan.push();
                newSection.set({
            		Title: String(Titles[i]), 
            		Description: String(Descriptions[i])
                });
            }

			document.getElementById('pagetitle').value = "";
			document.getElementById('sectiontitle').value = "";
			document.getElementById('description').value = "";

			console.log("clicked");

		 } else {
		 	console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
}

var addbutton = document.getElementById("addbutton");

addbutton.onclick = function(){saveSection()};

var savebutton = document.getElementById("submitbutton");

savebutton.onclick = function(){savePlan()};






