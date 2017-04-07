window.onload = function(){
	firebase.auth().onAuthStateChanged(function(user) {
			if (user){
				var currUID = firebase.auth().currentUser.uid;
				console.log(currUID);
				var ref = firebase.database().ref("/User ID/" + currUID);
				ref.on("value", function(snapshot) {
					var isAdmin = snapshot.val().isAdmin
					console.log(isAdmin)

					if(isAdmin == "No"){
						window.location = '../splash.html';
	  					reload();
					}
				}, function (error) {
				   console.log("Error: " + error.code);
				});
			}
	});
}