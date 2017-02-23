(function()	{

	var database = firebase.database();
	var bLogout = document.getElementById('logoutButton');

	firebase.auth().onAuthStateChanged(function(user) {
		if (user){
			var userId = firebase.auth().currentUser.uid;
	    	email = user.email;
	    	console.log(userId);
	    	emailVerified = user.emailVerified;
	    	uid = user.uid; 

	    	return firebase.database().ref('/User ID/' + userId).once('value').then(function(snapshot) {
  			var username = snapshot.val().Name;
  			var namePlaceholder = document.getElementById("username");
  			namePlaceholder.innerHTML = "Welcome, " + username + "."
		});

		} else{
			console.log("no user logged in rn")
			window.location = 'login.html';
  			reload();
		}
	});


	bLogout.addEventListener('click', e => {
		console.log('Logging Out')
		firebase.auth().signOut();
		window.location = 'login.html';
  		reload();
	});

}());