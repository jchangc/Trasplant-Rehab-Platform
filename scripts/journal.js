// var url = "https://transplant-rehab.firebaseio.com/";
// var firebaseRef = new Firebase(url);

//display past journal entries function
function displayPastEntries() {
	//Display Journal Entries

	firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {
 			var pastEntries = document.getElementById("displayContent");
			pastEntries.innerHTML = " ";

			var currUser = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref("User ID");
			var currUserRef = ref.child(currUser);

			var journalRef = currUserRef.child("Journal");

			//loop through each journal entry stored
			journalRef.on("value", function(snapshot) {
				console.log(snapshot.val());
				var journalNum = 1;
				snapshot.forEach(function(child) {
					if (child.val().content != null) {
						pastEntries.innerHTML += "Journal" + " " + journalNum + ": "
											+ child.val().content + "<br>" + "<br>";
				    	journalNum++;
					}
				});

			}, function (error) {
				console.log("Error:" + error.code);
			});
		} else {
			console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
//**************************OFFLINE TEST**************************
	// var pastEntries = document.getElementById("displayContent");
	// pastEntries.innerHTML = " ";

	// //loop through each journal entry stored
	// var ref = firebase.database().ref("User ID");
	// var chloeRef = ref.child("ouYU7W1u0oZNWBaCAH9ynnoX3D92");

	// var journalRef = chloeRef.child("Journal");

	// journalRef.on("value", function(snapshot) {
	// 	console.log(snapshot.val());
	// 	var journalNum = 1;
	// 	snapshot.forEach(function(child) {
	// 		if (child.val().content != null) {
	// 			pastEntries.innerHTML += "Journal" + " " + journalNum + ": "
	// 								+ child.val().content + "<br>" + "<br>";
	// 	    	journalNum++;
	// 		}
	// 	});
	// 	//DataSnapshot journalSnapshot = chloeRef.child("Journal");
	// 	//Iterable<DataSnapshot> journalChildren = jsnapshot.getChildren();
	// 	// for (DataSnapshot journal : journalChildren) {
 //  // 			pastEntries.innerHTML = "Journal" + text1  + "<br>";

	// 	// }
	// }, function (error) {
	// 	console.log("Error:" + error.code);
	// });

 //  	//console.log("past entries");
  	//**************************OFFLINE TEST**************************

}

function saveText() {
	//initialize firebase 
	// var config = {
	//     aapiKey: "AIzaSyCK2L9denM40KSqqNExFrRnZhGpijcvgDc",
	//     authDomain: "transplant-rehab.firebaseapp.com",
	//     databaseURL: "https://transplant-rehab.firebaseio.com",
	//     storageBucket: "transplant-rehab.appspot.com",
	//     //messagingSenderId: "592884792214"
	// };
	// firebase.initializeApp(config);
	// console.log(firebase.app().name);

	// //obtaining user
	// // var currUser = firebase.auth().currentUser.uid;
	// // var usersRef = firebaseRef.child("User ID");
	// // var currRef = usersRef.child(currUser);
	// // var currJournal = currRef.child("Journal");

	//var date = Date();
	// var date = Date();
	// date = String(date);

	// var text = $('#text').val();


	//****************OFFLINE TESTNIG*************************
	// var text1 = document.getElementById('text').value; 

	// var ref = firebase.database().ref("User ID");
	// var chloeRef = ref.child("ouYU7W1u0oZNWBaCAH9ynnoX3D92");

	// var journalRef = chloeRef.child("Journal");
	// var newJournal = journalRef.push();
	// newJournal.set({
	// 	content: String(text1)
	// });


	// displayPastEntries();
	// document.getElementById('text').value = "";
	//****************OFFLINE TESTNIG*************************


	// // newJournal.set({
	// // 	"content": text
	// // });

	// console.log("clicked");


//*******************Uncomment when ready to deploy onto firebase**********

	//test 
	 var database = firebase.database();
	 firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {
	// 		var ref = firebase.database().ref("/User ID/" + userInfo.uid);
	// 		// var chloeRef = usersRef.child("ouYU7W1u0oZNWBaCAH9ynnoX3D92");
	// 		// chloeRef.update({
	// 		// 	"nickname": "chloe"
	// 		// });
	// 		ref.on("value",function(snapshot) {
	//     		var hasName = snapshot.hasChild("Name"); // true
	//     		var hasAge = snapshot.hasChild("age"); // false
 //  			});
	// 		console.log(hasName);
	// 		console.log(hasAge);
	// 		console.log("clicked");

			var text1 = document.getElementById('text').value; 

			var currUser = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref("User ID");
			var currUserRef = ref.child(currUser);

			var journalRef = currUserRef.child("Journal");
			var newJournal = journalRef.push();
			newJournal.set({
				content: String(text1)
			});


	// newJournal.set({
	// 	"content": text
	// });

			console.log("clicked");

		 } else {
			console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
//****************************************************************************


}
displayPastEntries();

var button = document.getElementById("button");

button.onclick = function(){saveText()};