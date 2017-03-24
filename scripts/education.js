
function displayTitle() {
	//*******************SERVER************************
	firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {
			var pageTitle = document.getElementById("pageTitle");
			pageTitle.innerHTML = " ";
			var userPlanName;
			var ref = firebase.database().ref("/User ID/" + userInfo.uid);
			//Getting the user's plan name
			ref.on("value", function(snapshot) {
				userPlanName = snapshot.val().Plan;
			}, function (error) {
			   console.log("Error: " + error.code);
			});

			//Getting the Education's Title from Plans
			var planRef = firebase.database().ref("Plans");
			var EducationName;
			//loop through each journal entry stored
			planRef.on("value", function(snapshot) {
				console.log(snapshot.val());
				snapshot.forEach(function(child) {
					if (child.val().PlanName == userPlanName) {
						//retrieve the corresponding Education Plan Name
						EducationName = child.val().EducationPlan;
						//console.log(child.val().EducationPlan);
						pageTitle.innerHTML = child.val().EducationPlan;

					}
				});

			}, function (error) {
				console.log("Error:" + error.code);
			});
		//FOR DISPLAYING CONTENTS
			//find the corresponding Education node 
			var edRef = firebase.database().ref("Education");
			edRef.on("value", function(snapshot) {
				snapshot.forEach(function(child) {
					if (child.val().Page == EducationName) {
						//LOOP THROUGH ALL CONTENTS AND DISPLAY EACH ONE ACCORDINGLY	
						var childRef = edRef.child(child.key);
						childRef.on("value", function(snapshot) {
							snapshot.forEach(function(child) {
								//ADD DIVS FOR EACH CONTENT
								var Title = child.val().Title;
								var Description = child.val().Description;
								var div1 = document.createElement('div');
								document.body.appendChild(div1);
								div1.id = 'sectionHeader';
								div1.innerHTML = Title;
								var div2 = document.createElement('div');
								document.body.appendChild(div2);
								div2.id = 'description';
								div2.innerHTML = Description;

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
	//*******************SERVER************************
	//*******************OFFLINE************************
		// //FOR DISPLAYING TITLE
		// 	var pageTitle = document.getElementById("pageTitle");
		// 	pageTitle.innerHTML = " ";
		// 	var userPlanName;
		// 	var ref = firebase.database().ref("User ID");
		// 	var chloeRef = ref.child("5M3VFjUTHVTw09HcI7o0IiDneFt1");

		// 	//Getting the user's plan name
		// 	chloeRef.on("value", function(snapshot) {
		// 		userPlanName = snapshot.val().Plan;
		// 	}, function (error) {
		// 	   console.log("Error: " + error.code);
		// 	});

		// 	//Getting the Education's Title from Plans
		// 	var planRef = firebase.database().ref("Plans");
		// 	var EducationName;
		// 	//loop through each journal entry stored
		// 	planRef.on("value", function(snapshot) {
		// 		console.log(snapshot.val());
		// 		snapshot.forEach(function(child) {
		// 			if (child.val().PlanName == userPlanName) {
		// 				//retrieve the corresponding Education Plan Name
		// 				EducationName = child.val().EducationPlan;
		// 				console.log(EducationName);
		// 				pageTitle.innerHTML = child.val().EducationPlan;

		// 			}
		// 		});

		// 	}, function (error) {
		// 		console.log("Error:" + error.code);
		// 	});

		// //FOR DISPLAYING CONTENTS
		// 	//find the corresponding Education node 
		// 	var edRef = firebase.database().ref("Education");
		// 	edRef.on("value", function(snapshot) {
		// 		snapshot.forEach(function(child) {
		// 			if (child.val().Page == EducationName) {
		// 				//LOOP THROUGH ALL CONTENTS AND DISPLAY EACH ONE ACCORDINGLY	
		// 				var childRef = edRef.child(child.key);
		// 				childRef.on("value", function(snapshot) {
		// 					snapshot.forEach(function(child) {
		// 						//ADD DIVS FOR EACH CONTENT
		// 						var Title = child.val().Title;
		// 						var Description = child.val().Description;
		// 						var div1 = document.createElement('div');
		// 						document.body.appendChild(div1);
		// 						div1.id = 'sectionHeader';
		// 						div1.innerHTML = Title;
		// 						var div2 = document.createElement('div');
		// 						document.body.appendChild(div2);
		// 						div2.id = 'description';
		// 						div2.innerHTML = Description;

		// 					});
		// 				}, function(error) {
		// 					console.log("Error:" + error.code);
		// 				});
		// 			}
		// 		});
		// 	},function (error) {
		// 		console.log("Error:" + error.code);
		// 	});
	//*******************OFFLINE************************
		
}


displayTitle();






