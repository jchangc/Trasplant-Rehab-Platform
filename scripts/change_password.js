var savebutton = document.getElementById("submit");
var oldP = document.getElementById("email");
var oldP = document.getElementById("old_password");
var newP = document.getElementById("new_password");
var newPCheck = document.getElementById("new_password_check");
var bLogout = document.getElementById('logoutButton');
var confirmMsg = document.getElementById('confirm');
var logo = document.getElementById('logo')
var userInfo;
var userEmail;
var errorThrown = false;
var passwordChanged = false;

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			userInfo = firebase.auth().currentUser;
			userEmail = firebase.auth().currentUser.email;
		} else {
			console.log("No user signed in.")
		}
		    	// Obtaining isAdmin information
		var ref = firebase.database().ref("/User ID/" + userInfo.uid);
		ref.on("value", function(snapshot) {
		    isAdmin = snapshot.val().isAdmin
	    	var sidebarUser1 = document.getElementById('normalUserSidebar1');
	    	var sidebarUser2 = document.getElementById('normalUserSidebar2');
	    	var sidebarAdmin = document.getElementById('adminSidebar');
	    	var pass = document.getElementById('passwordSidebar')

		// Displaying the welcome message

			if(isAdmin == "Yes") {
				console.log(sidebarAdmin)
				sidebarAdmin.removeAttribute("style")
			} else {
				sidebarUser1.removeAttribute("style")
				sidebarUser2.removeAttribute("style")
			}
			    pass.style.removeProperty("display")
				pass.removeAttribute("style")

			}, function (error) {
				console.log("Error: " + error.code);
		});
});	

savebutton.onclick = function(){	

	// Make sure that old password checks out
    if (userEmail != document.getElementById('email').value){
			alert("Input email does not match user email.");
			return;
	} else if(document.getElementById('old_password').value == ""){
			alert("Please fill in old password field.")	
			return;
	} 
	const check = firebase.auth.EmailAuthProvider.credential(userEmail, oldP.value);
	const checkPromise = userInfo.reauthenticate(check)
	errorThrown = false;
	checkPromise.catch(function(e){
		console.log(e.message)
		console.log(e.code)
		if(e.code == 'auth/wrong-password'){
			alert("Current password is not correct. Re-enter please.")
			errorThrown = true;
		}
		if(e.code == 'auth/network-request-failed'){
			alert("Can't connect to server, please check your Internet connection.")
			errorThrown = true;
		}
	}); 

	setTimeout(function(){ 
		if (errorThrown == true) return;
		else if(document.getElementById('new_password').value == "" || document.getElementById('new_password_check').value == ""){
			alert("Please fill in both new password fields.")	
		} else if(document.getElementById('new_password').value.length < 6 || document.getElementById('new_password_check').value.length < 6){
			alert("Password not long enough.")	
		} else if(document.getElementById('new_password').value != document.getElementById('new_password_check').value){
			alert("Passwords do not match.")
		} else{
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					// Make the change
					console.log("PASSWORD UPDATE")
				    console.log("User is signed in, changing password.")
				    const promise = userInfo.updatePassword(newP.value);

					promise.catch(function(e){
						errorThrown = true;
						console.log("Error thrown.");
						var errorCode = e.code;
						var errorMessage = e.message;
						console.log(e.message)
					});
					passwordChanged = true;
				  } else {
				   console.log("No user signed in.")
				  }
			});	
		}
	}, 1000);

	setTimeout(function(){
		if(passwordChanged == false) return
		if(errorThrown == false && passwordChanged == true) {
			console.log("REAUTHENTICATE")
			const c = firebase.auth.EmailAuthProvider.credential(userEmail, newP.value);
			var finalcheck = userInfo.reauthenticate(c)
			finalcheck.catch(function(e){
				var errorCode = e.code;
				var errorMessage = e.message;
				console.log(e.message)
			})
			confirmMsg.classList.remove('hidden')
		}
	}, 3000);
};

bLogout.onclick = function(){
		console.log('Logging Out')
		firebase.auth().signOut();
		window.location = 'login.html';
  		reload();
};