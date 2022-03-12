import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {doc, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId0: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUERMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export const auth = getAuth();

export const que = doc(database, "DB", "SpringSplit");