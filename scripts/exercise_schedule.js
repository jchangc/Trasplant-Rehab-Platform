// Create a "close" button and append it to each list item
var scheduleList = document.getElementsByClassName("schedule");
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var i;
var j;

// Populate with data
intitialize();
populate();

// Reset button
// var t;
// var listReset = [];
// for (t = 0; t < 7; t++) {
//     listReset[t] = document.getElementsByClassName("day")[t]
//     listReset[t].onclick = function(){
//     var content = this.nextElementSibling.getElementsByTagName("li")
//     for (b = 0; b < content.length; b++){
//         if(content[b].style.display == "none") content[b].removeAttribute("style");
//     }
//   }
// }

for (i = 0; i < scheduleList.length; i++) {
  scheduleList[i].addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      console.log(ev.target)

      // // Push to server to show that it's done!
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {

      //     var userId = firebase.auth().currentUser.uid;

      //     // Data to be set
      //     firebase.database().ref('User ID/' + userId).set({

      //     })
      //   }
      // })

    }
  }, false);
}


// Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var a;
// for (a = 0; a < close.length; a++) {
//   close[a].onclick = function() {
//     var par = this.parentElement;
//     par.style.display = "none";
//   }
// }


function populate() {
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

     
      //find the corresponding Education node 
      var exRef = firebase.database().ref("Plans");
      exRef.on("value", function(snapshot) {
          snapshot.forEach(function(child) {
            // console.log(child.child("PlanName").val())
            if (child.child("PlanName").val() == userPlanName) {
              var schedule = child.child("Schedule")
              var p;

              for (p = 0; p < 7; p++){
                var day = schedule.child(weekday[p])
                day.forEach(function(childSnapshot){
                  // Retreive data from database
                  var key = childSnapshot.key;

                  // Add this to the list
                  var list = document.getElementById(weekday[p])
                  var element = document.createElement("li")
                  element.innerHTML = key
                  list.append(element)
                })
              }
           }
        })
      })
    }
  })
}

function intitialize(){
      var config = {
        apiKey: "AIzaSyCK2L9denM40KSqqNExFrRnZhGpijcvgDc",
        authDomain: "transplant-rehab.firebaseapp.com",
        databaseURL: "https://transplant-rehab.firebaseio.com",
        storageBucket: "transplant-rehab.appspot.com",
        messagingSenderId: "592884792214"
      };
      firebase.initializeApp(config);
}