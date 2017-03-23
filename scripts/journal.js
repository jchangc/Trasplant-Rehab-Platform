// var url = "https://transplant-rehab.firebaseio.com/";
// var firebaseRef = new Firebase(url);

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
	// var text1 = document.getElementById('text').value; 

	// // // //adding new journal entry
	// // // var newJournal = currJournal.push();
	// // // newJournal.set({
	// // // 	Date: date, 
	// // // 	Content: text
	// // // });
	// // // evt.preventDefault();

	// var ref = firebase.database().ref("User ID");
	// var chloeRef = ref.child("ouYU7W1u0oZNWBaCAH9ynnoX3D92");
	// // chloeRef.update({
	// // 	"Entry1": String(text1)
	// // });
	// var journalRef = chloeRef.child("Journal");
	// var newJournal = journalRef.push();
	// newJournal.set({
	// 	content: String(text1)
	// });


	// // newJournal.set({
	// // 	"content": text
	// // });

	// console.log("clicked");




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
		// 	console.log("No user logged in rn")
		// 	window.location = 'login.html';
		// 	reload();
		 }
	});

}

var button = document.getElementById("button");

button.onclick = function(){saveText()};