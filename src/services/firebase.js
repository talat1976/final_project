import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBaGkIYTsV8OHgD8Wc6ofMGisePtz1xVbk",
    authDomain: "final-project-5ced3.firebaseapp.com",
    databaseURL: "https://final-project-5ced3-default-rtdb.firebaseio.com",
    projectId: "final-project-5ced3",
    storageBucket: "final-project-5ced3.appspot.com",
    messagingSenderId: "770502238338",
    appId: "1:770502238338:web:9245c72c7798e3b1e4949b",
    measurementId: "G-7CYVNFJW9S"
};

const app = firebase.initializeApp(firebaseConfig);

export const firebaseDB = app.firestore()
export const firebaseStorage = app.storage().ref()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp