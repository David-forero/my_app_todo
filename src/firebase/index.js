import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCI7MubU8rcQffugqVxMHWbsJNjjF5fK5E",
    authDomain: "todo-app-4506c.firebaseapp.com",
    projectId: "todo-app-4506c",
    storageBucket: "todo-app-4506c.appspot.com",
    messagingSenderId: "639335022083",
    appId: "1:639335022083:web:9a53db01baeb954e43d836"
  };

firebase.initializeApp(firebaseConfig);

export default firebase