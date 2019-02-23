import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBgbg6DaOp_QpixC53E3snVxV3YHKHe7-U",
    authDomain: "pa-chat-0720.firebaseapp.com",
    databaseURL: "https://pa-chat-0720.firebaseio.com",
    projectId: "pa-chat-0720",
    storageBucket: "pa-chat-0720.appspot.com",
    messagingSenderId: "997999594813"
  };
  firebase.initializeApp(config);

  export default firebase;