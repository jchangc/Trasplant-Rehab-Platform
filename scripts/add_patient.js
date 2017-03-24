function savePlan() {
	var database = firebase.database();
	 firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {

	 		var firstname = document.getElementById('firstname').value;
			var lastname = document.getElementById('lastname').value; 
			var name = String(firstname) + " " + String(lastname);
			var email = document.getElementById('email').value;
			var plan = document.getElementById('selectplan').value;

			var users = firebase.database().ref("User ID");
			var newUser = users.push();
			newUser.set({
				Name: String(name),
				Email: String(email),
				Plan: String(plan),
				IsAdmin: "No",
				Journal: ""
			});
			var journalRef = newUser.child("Journal");
            journalRef.set({
        		Entry1: " "
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

var planPicker = document.getElementById('selectplan');

var plans = firebase.database().ref("Plans");
plans.on("value", function(snapshot) {
	snapshot.forEach(function(child) {
		if (child.val().PlanName != null) {
			planPicker.innerHTML += "<option>" + child.val().PlanName + "</option>";
		}
	});
}, function (error) {
	console.log("Error:" + error.code);
});

var savebutton = document.getElementById("savebutton");

savebutton.onclick = function(){savePlan()};






