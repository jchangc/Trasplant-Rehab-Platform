var bLogout = document.getElementById('logoutButton');

bLogout.onclick = function(){
	console.log('Logging Out')
	firebase.auth().signOut();
	window.location = '../login.html';
	reload();
};