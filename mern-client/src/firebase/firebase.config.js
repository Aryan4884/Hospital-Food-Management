// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuNScCXJGg7VzHmbGrRedbvYNSheWLyUU",
  authDomain: "hospital-food-management.firebaseapp.com",
  projectId: "hospital-food-management",
  storageBucket: "hospital-food-management.firebasestorage.app",
  messagingSenderId: "810914221896",
  appId: "1:810914221896:web:260a520269e8c0a457ed7d",
  measurementId: "G-XVQGY5NGQK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
