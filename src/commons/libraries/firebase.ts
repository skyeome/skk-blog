// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoY493BC1RvwWQUMdsI50vFwJVzvHEBlw",
  authDomain: "skk-blog.firebaseapp.com",
  projectId: "skk-blog",
  storageBucket: "skk-blog.appspot.com",
  messagingSenderId: "773833552258",
  appId: "1:773833552258:web:0172f6a2cd29eefce69f9b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
