import firebase from "firebase/app";
import "firebase/auth";

const app = !firebase.apps.length ? firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appID: import.meta.env.VITE_APP_ID
}) : firebase.app();

export default firebase;
