import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "imovies-75f75",
  storageBucket: "imovies-75f75.appspot.com",
  messagingSenderId: "604455086637",
  appId: "1:604455086637:web:6c5a02fe96213441c0a6a4",
  measurementId: "G-RRHELW4MVT",
};

export const app = initializeApp(firebaseConfig);
