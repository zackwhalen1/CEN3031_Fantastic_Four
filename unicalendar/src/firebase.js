import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBflPtn1W3bxVujcjXMk5guARzlkYZHtHg",
  authDomain: "unicalendar-91d9e.firebaseapp.com",
  projectId: "unicalendar-91d9e",
  storageBucket: "unicalendar-91d9e.firebasestorage.app",
  messagingSenderId: "456414827944",
  appId: "1:456414827944:web:4fe0c5a6ae4aaccc9eb99d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;