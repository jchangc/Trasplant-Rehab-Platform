(function()	{

	var database = firebase.database();
	var bLogout = document.getElementById('logoutButton');

	firebase.auth().onAuthStateChanged(function(user) {
		if (user){
			var userInfo = firebase.auth().currentUser;
	    	var isAdmin;
	    	var username;
	    	var sidebarUser1 = document.getElementById('normalUserSidebar1');
	    	var sidebarUser2 = document.getElementById('normalUserSidebar2');
	    	var sidebarAdmin = document.getElementById('adminSidebar');



	    	// Obtaining isAdmin information
			var ref = firebase.database().ref("/User ID/" + userInfo.uid);
			ref.on("value", function(snapshot) {
				isAdmin = snapshot.val().isAdmin
				username = snapshot.val().Name;
			    console.log(snapshot.val());
			    
			    // Displaying the welcome message
  				var welcomeMsg = document.getElementById("username");
  				welcomeMsg.innerHTML = "Welcome, " + username + "."

			    if(isAdmin == "Yes") {
			    	sidebarUser1.style.display = 'none'
			    	sidebarUser2.style.display = 'none'
			    	sidebarAdmin.style.display = 'visible'
			    	console.log("LOL")
			    } else{
			    	sidebarUser1.style.display = 'visible'
			    	sidebarUser2.style.display = 'visible'
			    	sidebarAdmin.style.display = 'none'
			    	console.log("LOL2")
			    }

			}, function (error) {
			   console.log("Error: " + error.code);
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