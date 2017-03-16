var url = "https://transplant-rehab.firebaseio.com/";
var firebaseRef = new Firebase(url);

function saveText() {
	var currUser = firebase.auth().currentUser.uid;
	var usersRef = firebaseRef.child("User ID");
	var currRef = usersRef.child(currUser);
	var currJournal = currRef.child("Journal");
	var date = Date();

	var text = $('#text').val();

	var newJournal = currJournal.push();
	newJournal.set({
		Date: date, 
		Content: text
	});
	evt.preventDefault();
	//console.log("clicked");
}

var button = document.getElementById("button");

button.onclick = function(){saveText()};