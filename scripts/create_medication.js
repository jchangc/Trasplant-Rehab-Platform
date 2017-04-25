var bLogout = document.getElementById('logoutButton');

var Titles = [];
var Descriptions = [];

function saveSection() {
	var section = document.getElementById('sectiontitle').value; 
	var description = document.getElementById('description').value;

	Titles.push(String(section));
	Descriptions.push(String(description));

	document.getElementById('sectiontitle').value = "";
	document.getElementById('description').value = "";

	alert("Section added. Please enter another section");

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

			var medication = firebase.database().ref("Medication");
			var newPlan = medication.push();
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

			alert("Medication plan successfully created.");


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

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = '../login.html';
	reload();
};




