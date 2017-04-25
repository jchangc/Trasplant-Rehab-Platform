var bLogout = document.getElementById('logoutButton');

var Titles = [];
var Descriptions = [];


var addMSG = document.getElementById('addSec');
var confirmMsg = document.getElementById('confirm');
var success = true;


function saveSection() {
	success = true;
	var section = document.getElementById('sectiontitle').value; 
	var description = document.getElementById('description').value;

	Titles.push(String(section));
	Descriptions.push(String(description));

	document.getElementById('sectiontitle').value = "";
	document.getElementById('description').value = "";

	alert("Section added. Please enter a new section.");

	// 	setTimeout(function(){
	// 	console.log("assessing whether to remove hidden")
	// 	if(success == true){
	// 		console.log("trying to remove hidden")
	// 		addMSG.classList.remove('hidden')
	// 	}
	// }, 1000)
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

			alert("Education plan has been successfully created.");


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

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = '../login.html';
	reload();
};




