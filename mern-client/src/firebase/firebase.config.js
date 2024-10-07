// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkkMvm4hzK0Ky75e2I-jkG83QwiGQp8lw",
  authDomain: "mern-book-inventory-9869b.firebaseapp.com",
  projectId: "mern-book-inventory-9869b",
  storageBucket: "mern-book-inventory-9869b.appspot.com",
  messagingSenderId: "521437977559",
  appId: "1:521437977559:web:81b1c8cf4bf1811c738992",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
