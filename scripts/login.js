(function()	{

	var config = {
    apiKey: "AIzaSyCK2L9denM40KSqqNExFrRnZhGpijcvgDc",
    authDomain: "transplant-rehab.firebaseapp.com",
    databaseURL: "https://transplant-rehab.firebaseio.com",
    storageBucket: "transplant-rehab.appspot.com",
    messagingSenderId: "592884792214"
  	};
  	firebase.initializeApp(config);
  	console.log(firebase.app().name);

  	const txtEmail = document.getElementById('txtEmail');
  	const txtPassword = document.getElementById('txtPassword');
  	var bLogin = document.getElementById('bLogin');

	// Login Event
	bLogin.addEventListener('click', e => {
		// Get Email and Password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(function(e){
			var errorCode = e.code;
			var errorMessage = e.message;
			var errorDisplay = document.getElementById('errorMessage');
			if(errorCode === 'auth/wrong-password'){
				// alert('Incorrect Password. Try again.');
				document.getElementById('errorMessage').classList.remove('hidden');
			}
			if(errorCode === 'auth/invalid-email'){
				// alert('Invalid Email. Try again.');
				document.getElementById('errorMessage').classList.remove('hidden');
			}
			console.log(e);
		});


	});
  	
  	// Auth listener
  	firebase.auth().onAuthStateChanged(user => {
  		if(user){
  			// match user to pending user
  			var txtEmail = document.getElementById('txtEmail').value;
  			var pending = firebase.database().ref("Pending");
			pending.on("value", function(snapshot) {
				snapshot.forEach(function(child) {
					if (child.val().Email === String(txtEmail)) {
						var currUser = firebase.auth().currentUser.uid;
						var ref = firebase.database().ref("User ID");
						var currUserRef = ref.child(currUser);

						var name = child.val().Name;
						var email = child.val().Email;
						var plan = child.val().Plan;

						currUserRef.set({
							Name: String(name),
							Email: String(email),
							Plan: String(plan),
							isAdmin: "No",
							Journal: ""
						});
						var journalRef = currUserRef.child("Journal");
			            journalRef.set({
			        		Entry1: " "
			            });
					}
				});
			}, function (error) {
				console.log("Error:" + error.code);
			});


  			bLogin.style.display = 'none'	
  			window.location = 'splash.html';
  			reload();
  		} 
  	});

}());