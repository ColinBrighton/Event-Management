import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getReactNativePersistence, initializeAuth ,getAuth} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
    apiKey: "AIzaSyBGfrqBGcRZj9Kw8TK0UuT9HRVumAw8yCg",
    authDomain: "eventmanagement-66c67.firebaseapp.com",
    projectId: "eventmanagement-66c67",
    storageBucket: "eventmanagement-66c67.appspot.com",
    messagingSenderId: "304655048313",
    appId: "1:304655048313:web:5cc977893bf7b87c9c7ea8",
    measurementId: "G-WPBKE3DHN8"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);