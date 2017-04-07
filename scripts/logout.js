var bLogout = document.getElementById('logoutButton');
bLogout.addEventListener('click', e => {
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = 'login.html';
  	reload();
});