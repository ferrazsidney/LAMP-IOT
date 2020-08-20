const { Board, Led } = require("johnny-five");

var firebase = require("firebase");

const board = new Board();

board.on("ready", () => {
  const led = new Led(13);

  board.repl.inject({
    led
  });

  var firebaseConfig = {
    apiKey: "AIzaSyCFlgbsmqyxsFFBmrbEY7RZwOKduKEHKzw",
    authDomain: "iot-test-81764.firebaseapp.com",
    databaseURL: "https://iot-test-81764.firebaseio.com",
    projectId: "iot-test-81764",
    storageBucket: "iot-test-81764.appspot.com",    
  };

  firebase.initializeApp(firebaseConfig);

  var starCountRef = firebase.database().ref('led').on('value', function(snapshot) {
    let acende = snapshot.val();

    if (acende == 'on'){
        led.on();
    }else{
        led.off();
    }
  });
});