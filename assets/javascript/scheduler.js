  // Initialize Firebase
   var config = {
    apiKey: "AIzaSyDnMai1Ye93ova2RcbqUie0xE6RBC06CjI",
    authDomain: "train-scheduler-caf9c.firebaseapp.com",
    databaseURL: "https://train-scheduler-caf9c.firebaseio.com",
    projectId: "train-scheduler-caf9c",
    storageBucket: "",
    messagingSenderId: "971691453496"
  };
  firebase.initializeApp(config);

    var database = firebase.database();
    var nextArrival = "";
    var minutesAway = "";
  
  $(document).ready(function() {
  //Button for adding train.
  $("#submit").on("click",function(event) {
      //Grab input from user.
    event.preventDefault();
    
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#first-train').val().trim();
    var frequency = $('#frequency').val().trim();
    var freq = parseInt(frequency);

    var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDifference = moment().diff(moment(timeConverted), "minutes");
    var remainder = timeDifference % freq;
    var minutesAway = freq - remainder;
    var nextArrival = moment().add(minutesAway, "minutes");
    var nextTrainFormatted = moment(nextArrival).format("HH:mm");

    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      nextTrainFormatted: nextTrainFormatted,
      minutesAway: minutesAway
    });
   
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    
     $("#showTrainData").append("<tr><td>" + childSnapshot.val().trainName + "</td>" + 
                     "<td>" + childSnapshot.val().destination + "</td>" +
                     "<td>" + childSnapshot.val().frequency + "</td>" +
                     "<td>" + childSnapshot.val().nextTrainFormatted + "</td>" +
                     "<td>" + childSnapshot.val().minutesAway + "</td>");
    
  });

});

  