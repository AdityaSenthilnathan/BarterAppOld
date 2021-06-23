import firebase from 'firebase';
  var firebaseConfig = {
    apiKey: "AIzaSyApI8In5UEHKodExK5GWOdic4nheJuG2ok",
    authDomain: "barterapp-72f03.firebaseapp.com",
    databaseURL: "https://barterapp-72f03-default-rtdb.firebaseio.com",
    projectId: "barterapp-72f03",
    storageBucket: "barterapp-72f03.appspot.com",
    messagingSenderId: "441304931799",
    appId: "1:441304931799:web:69c50e48a1ff8ca55bff92"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();