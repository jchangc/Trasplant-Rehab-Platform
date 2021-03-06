// var url = "https://transplant-rehab.firebaseio.com/";
// var firebaseRef = new Firebase(url);

var bLogout = document.getElementById('logoutButton');

//display journal question function
function displayQuestion() {
	firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {
			var pageTitle = document.getElementById("journalQ");
			pageTitle.innerHTML = " ";
			var userPlanName;
			var currUser = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref("User ID");
			var userRef = ref.child(currUser);

			//Getting the user's plan name
			userRef.on("value", function(snapshot) {
				userPlanName = snapshot.val().Plan;
			}, function (error) {
			   console.log("Error: " + error.code);
			});
			
			//Getting the Journal Question from Plans
			var planRef = firebase.database().ref("Plans");
			var theJournalQuestion;
			//loop through each journal entry stored
			planRef.on("value", function(snapshot) {
				console.log(snapshot.val());
				snapshot.forEach(function(child) {
					if (child.val().PlanName == userPlanName) {
						//retrieve the corresponding Education Plan Name
						theJournalQuestion = child.val().JournalQuestion;
						//console.log(child.val().EducationPlan);
						journalQ.innerHTML = child.val().JournalQuestion;

					}
				});

			}, function (error) {
				console.log("Error:" + error.code);
			});
		}else {
			console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		}
	});

}
//display past journal entries function
function displayPastEntries() {
	//Display Journal Entries

	firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {

 			var pastEntries = document.getElementById("displayContent");
			pastEntries.innerHTML = "";

			var currUser = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref("User ID");
			var currUserRef = ref.child(currUser);

			var journalRef = currUserRef.child("Journal");

			//loop through each journal entry stored
			journalRef.on("value", function(snapshot) {
				var journalNum = 1;
				snapshot.forEach(function(child) {
					if (child.val().content != null) {
						pastEntries.innerHTML += "<p> Journal" + " " + journalNum + " - " + child.val().date + " : "
											+ child.val().content + "</p>";
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

}

function saveText() {

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

		    var date = new Date();
			var day = date.getDate();
			var month = date.getMonth()+1
			var year = date.getFullYear();
			var dateStr = month + "/" + day + "/" + year

			var currUser = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref("User ID");
			var currUserRef = ref.child(currUser);

			var journalRef = currUserRef.child("Journal");
			var newJournal = journalRef.push();
			newJournal.set({
				content: String(text1),
				date: String(dateStr)
			});

			var pastEntries = document.getElementById("displayContent");
			pastEntries.innerHTML = " ";
			displayPastEntries();
			document.getElementById('text').value = "";

		 } else {
			console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		 }
	});
//****************************************************************************


}

displayPastEntries();
displayQuestion();

var saveButton = document.getElementById("save");
var exportButton = document.getElementById("export");

var doc = new jsPDF();
var specialElementHandlers = {
	'#class': function (element, renderer) {
            return true;
    	}
};


saveButton.onclick = function(){
	saveText();
};

exportButton.onclick = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1
	var yyyy = today.getFullYear();
	if(dd<10) {
   		dd='0'+dd
	} 

	if(mm<10) {
    	mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	doc.setFont("arial", "bold");
	doc.setFontSize(25);
	doc.text(20,20, "Journal Entries as of: " + today)
	doc.setFont("helvetica", "normal");
	doc.setFontSize(20);
    doc.fromHTML($('#displayContentTop').html(), 20, 25, {
        'width': 100,
        'elementHandlers': specialElementHandlers
    });

	doc.save('export.pdf');
};

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = 'login.html';
	reload();
};

