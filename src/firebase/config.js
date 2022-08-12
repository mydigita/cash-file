import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import '@firebase/auth';
import '@firebase/firestore';

// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//     measurementId: ""
//   };


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app()
}

// firebase.initializeApp(firebaseConfig);

export { firebase };