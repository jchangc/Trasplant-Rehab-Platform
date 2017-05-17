var bLogout = document.getElementById('logoutButton');
var success = true;
var confirmMsg = document.getElementById('confirm');

var config = {
    apiKey: "AIzaSyCK2L9denM40KSqqNExFrRnZhGpijcvgDc",
    authDomain: "transplant-rehab.firebaseapp.com",
    databaseURL: "https://transplant-rehab.firebaseio.com",
    storageBucket: "transplant-rehab.appspot.com",
    messagingSenderId: "592884792214"
};
var currUID;
firebase.initializeApp(config);
var app = firebase.initializeApp(config, 'authApp');
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    currUID = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("/User ID/" + currUID);
    ref.on("value", function(snapshot) {
        var isAdmin = snapshot.val().isAdmin

        if(isAdmin == "No"){
        window.location = '../splash.html';
        window.reload();
    }
    }, function (error) {
        console.log("Error: " + error.code);
    });

    } else {
        window.location = '../login.html';
        window.reload();
    }
});

function savePatient() {
      	var database = firebase.database();
      	var email = document.getElementById('email').value;
      	var password = document.getElementById('password').value;
      	var authApp = app.auth();

      	authApp.createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {

       		// Obtain user id
       		var currUID = authApp.currentUser.uid;
       		var userList = firebase.database().ref("/User ID/" + currUID);

       		var firstname = document.getElementById('firstname').value;
       		var lastname = document.getElementById('lastname').value; 
       		var name = String(firstname) + " " + String(lastname);
       		var plan = document.getElementById('selectplan').value;
                  
                  var admincheck = document.getElementById('admincheck');
                  var adminstring;
                  if (admincheck.checked == true) {
                        adminstring = "Yes";
                  } else {
                        adminstring = "No";
                  }

       		userList.set({
       			Name: String(name),
       			Email: String(email),
       			Plan: String(plan),
       			isAdmin: String(adminstring),
       			Journal: "",
                        ExerciseRecord: ""
       		});

       		var journalRef = firebase.database().ref("/User ID/" + currUID).child("Journal");
       		journalRef.set({
       			Entry1: " "
       		});

            var exerciseRef = firebase.database().ref("/User ID/" + currUID).child("ExerciseRecord");
            exerciseRef.set({
                Entry1: " "
            });

       	})
      	.catch(function(error) {
       		// Error Handling
       		console.log("Failed to add user.");
       		alert("Failed to add user. ERROR: " + error.message);
       		console.log(error.code);
       		console.log(error.message);
       		success == false
       	});

       	setTimeout(function(){
			console.log("Assessing whether to show confirmation message.")
			if(success == true){
				console.log("Trying to remove hidden.")
				confirmMsg.classList.remove('hidden')
			}
		}, 1500)
}

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

savebutton.onclick = function(){

	// Check that fields are indeed filled in and done correctly.
	if(document.getElementById('firstname').value == "" || document.getElementById('lastname').value == ""){
		alert("Please enter a first name and/or last name.")
	} else if(document.getElementById('email').value == ""){
		alert("Please enter an email.")
	} else if(document.getElementById('password').value == "" || document.getElementById('password_check').value == ""){
		alert("Please fill both password fields.")
	} else if(document.getElementById('password').value != document.getElementById('password_check').value){
		alert("Passwords do not match.")
	} else if(document.getElementById('selectplan').value == ""){
		alert("Please select a valid plan.")
	} else{
		savePatient();
	}
};

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = '../login.html';
	reload();
};


