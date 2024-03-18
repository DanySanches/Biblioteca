import firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyAMnVaZQ5BEqWdpFSpNwSOJpYxbDgQrzRc",
    authDomain: "libp2-10a24.firebaseapp.com",
    projectId: "libp2-10a24",
    storageBucket: "libp2-10a24.appspot.com",
    messagingSenderId: "1081965385219",
    appId: "1:1081965385219:web:2046456279cb0e51f62036"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();