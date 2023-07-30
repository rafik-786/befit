// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcGBWC_ngY3MlXFGxGpfhb6WqSpERpFqE",
  authDomain: "befit-b25f6.firebaseapp.com",
  projectId: "befit-b25f6",
  storageBucket: "befit-b25f6.appspot.com",
  messagingSenderId: "969211112211",
  appId: "1:969211112211:web:891acb8b4565bc73e288e6",
  measurementId: "G-EZ5DH1KNSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireStoreDatabase = getFirestore(app);

export default fireStoreDatabase;
