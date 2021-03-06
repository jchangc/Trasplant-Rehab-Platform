var bLogout = document.getElementById('logoutButton');

function displayTitle() {
	//*******************SERVER************************
	firebase.auth().onAuthStateChanged(function(user) {
	 	if (user) {
			var pageTitle = document.getElementById("pageTitle");
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
								if (Title != null && Description != null) {
									var contentHolder = document.getElementById('contents')
									var div = document.createElement('div');
									div.className = "container";

									var innerDiv1 = document.createElement('div');
									innerDiv1.className = "col-sm-3 title";
									innerDiv1.innerHTML = Title;
									div.appendChild(innerDiv1);

									var innerDiv2 = document.createElement('div');
									innerDiv2.className = "col-sm-7 description";
									innerDiv2.innerHTML = Description;
									var emptyLine = document.createElement('p');
									innerDiv2.appendChild(emptyLine);
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

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = 'login.html';
	reload();
};
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
		// 						if (Title != null && Description != null) {
		// 							//var container1 = document.createElement('container');
		// 							//document.getElementById("pageTite").appendChild(container1);


		// 							// var div = document.createElement('div');
		// 							// // document.getElementById("sectionTitle").appendChild(div);
		// 							// var newContent = document.createTextNode(Title);
		// 							// var newContent2 = document.createTextNode(Description);
		// 							// div.appendChild(newContent);
		// 							// div.appendChild(newContent2);
		// 							// document.getElementById('contents').appendChild(div);



		// 							var div1 = document.createElement('div');
		// 							document.getElementById("sectionTitle").appendChild(div1);
		// 							div1.id = 'sectionHeader';
		// 							div1.innerHTML = Title;
		// 							var div2 = document.createElement('div');
		// 							document.getElementById("sectionContent").appendChild(div2);
		// 							div2.id = 'description';
		// 							div2.innerHTML = Description;
		// 							div2.style.height = '150px';
		// 							var emptyDiv = document.createElement('div');
		// 							emptyDiv.style.height = '130px';
		// 							document.getElementById("sectionTitle").appendChild(emptyDiv);
		// 							var emptyDiv2 = document.createElement('div');
		// 							emptyDiv2.style.height = '10px';
		// 							document.getElementById("sectionContent").appendChild(emptyDiv2);
		// 						}
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
		


displayTitle();






