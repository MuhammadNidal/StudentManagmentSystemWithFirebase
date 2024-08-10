// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQIT9G2g9zoHE3PeeTgRAvxgkPgWEbMQs",
  authDomain: "student-managment-system-1878e.firebaseapp.com",
  projectId: "student-managment-system-1878e",
  storageBucket: "student-managment-system-1878e.appspot.com",
  messagingSenderId: "1016985036846",
  appId: "1:1016985036846:web:40da50d671882e4c3d97bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
export {db};