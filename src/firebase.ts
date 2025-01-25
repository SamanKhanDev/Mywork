import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Auth uchun import

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyA2shojSxlpapvwo1tFoD7XYmEt6dbUAv4",
  authDomain: "mywork-60465.firebaseapp.com",
  projectId: "mywork-60465",
  storageBucket: "mywork-60465.firebasestorage.app",
  messagingSenderId: "635250549703",
  appId: "1:635250549703:web:c650938116dcd9b5d7efe2",
  measurementId: "G-X0TML8WTTB"
};

// Firebase ilovasini ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Auth obyekti

export { db, auth }; // Auth obyekti ham eksport qilinadi