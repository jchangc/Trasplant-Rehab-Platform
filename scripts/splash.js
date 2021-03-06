(function()	{

	var database = firebase.database();
	var bLogout = document.getElementById('logoutButton');
	var logo = document.getElementById('logo')

	firebase.auth().onAuthStateChanged(function(user) {
		if (user){
			var userInfo = firebase.auth().currentUser;
	    	var isAdmin;
	    	var username;
	    	var sidebarUser1 = document.getElementById('normalUserSidebar1');
	    	var sidebarUser2 = document.getElementById('normalUserSidebar2');
	    	var sidebarAdmin = document.getElementById('adminSidebar');
	    	var pass = document.getElementById('passwordSidebar')



	    	// Obtaining isAdmin information
			var ref = firebase.database().ref("/User ID/" + userInfo.uid);
			ref.on("value", function(snapshot) {
				isAdmin = snapshot.val().isAdmin
				username = snapshot.val().Name;
			    var name = document.getElementById("namePlaceholder")
			    name.innerHTML = username
			    
			    // Displaying the welcome message
  				var welcomeMsg = document.getElementById("username");
  				welcomeMsg.innerHTML = "Welcome, " + username + "."

			    if(isAdmin == "Yes") {
			    	console.log(sidebarAdmin)
			    	sidebarAdmin.removeAttribute("style")
			    } else {
			    	sidebarUser1.removeAttribute("style")
			    	sidebarUser2.removeAttribute("style")
			    }

			    pass.style.removeProperty("display")
			    logo.removeAttribute("style")

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