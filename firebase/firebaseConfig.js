// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_VcFjp0oSwKarBl_eED9MWpIsxEVCy1M",
  authDomain: "task-manager-a9204.firebaseapp.com",
  projectId: "task-manager-a9204",
  storageBucket: "task-manager-a9204.firebasestorage.app",
  messagingSenderId: "864208127615",
  appId: "1:864208127615:web:a1c1179370ed18e99d614a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app); 

export { auth, provider ,db,app};