    var config = {
        apiKey: "AIzaSyCK2L9denM40KSqqNExFrRnZhGpijcvgDc",
        authDomain: "transplant-rehab.firebaseapp.com",
        databaseURL: "https://transplant-rehab.firebaseio.com",
        storageBucket: "transplant-rehab.appspot.com",
        messagingSenderId: "592884792214"
      };
      var currUID;
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          currUID = firebase.auth().currentUser.uid;
          var ref = firebase.database().ref("/User ID/" + currUID);
      ref.on("value", function(snapshot) {
        var isAdmin = snapshot.val().isAdmin

          if(isAdmin == "No"){
            window.location = '../splash.html';
            window.reload();
          }
          }, function (error) {
            console.log("Error: " + error.code);
          });

        } else {
            window.location = '../login.html';
            window.reload();
        }
  });