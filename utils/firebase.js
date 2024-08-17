import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCRlWlKhbGcSFv-gQTKUgxK_8taAy1sOAw",
    authDomain: "rkmission-68095.firebaseapp.com",
    projectId: "rkmission-68095",
    storageBucket: "rkmission-68095.appspot.com",
    messagingSenderId: "429281606092",
    appId: "1:429281606092:web:58f6bb0f0d5d08ca334569",
    measurementId: "G-F99JVQRCDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;