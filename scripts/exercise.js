
function displayTitle() {
	//*******************SERVER************************
	firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {
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


			//Getting the Medication's Title from Plans
			var planRef = firebase.database().ref("Plans");

			var edRef = firebase.database().ref("Exercise Plans");
			edRef.on("value", function(snapshot) {
				snapshot.forEach(function(child) {
					if (child.val().PlanName == userPlanName) {
						//LOOP THROUGH ALL CONTENTS AND DISPLAY EACH ONE ACCORDINGLY	
						var childRef = edRef.child(child.key);
						console.log(childRef)
						childRef.on("value", function(snapshot) {
							snapshot.forEach(function(child) {

								//ADD DIVS FOR EACH CONTENT
								var Title = child.val().Title;
								var Description = child.val().Description;
								var VideoLink = child.val.VideoLink;
								var ImageLink = child.val.ImageLink;

								if (Title != null && Description != null) {
									
									var contentHolder = document.getElementById('contents')
									
									// The overall conatiner
									var row = document.createElement('div');
									div.className = "row";

									// Create anchor, add name
									var anchor = document.createElement('a');

									// Inner divs created here

									var innerDiv1 = document.createElement('div');
									innerDiv1.className = "col-md-7";
									innerDiv1.innerHTML = VideoLink;
									div.appendChild(innerDiv1);


									var innerDiv2 = document.createElement('div');
									innerDiv2.className = "col-sm-5";
									

									var p = document.createElement('p')
									p.innerHTML = Description;
									var h3 = document.createElement('h3');
									h3.innerHTML = Title;

									innerDiv2.appendChild(p);
									innerDiv.appendChild(h3);
									div.appendChild(innerDiv2);

									contentHolder.appendChild(div)
								}
							});
						}, function(error) {
							console.log("Error:" + error.code);
						});
					}
				});
			},function (error) {
				console.log("Error:" + error.code);
			});
		} else {
			console.log("No user logged in rn")
			window.location = 'login.html';
			reload();
		}
	});		
}


displayTitle();






