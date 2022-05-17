import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {doc, getFirestore} from 'firebase/firestore'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUERMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

//파이어 베이스에서 auth 인스턴스를 불러옴.
export const auth = getAuth();

export const springSplitDB = doc(database, "DB", "SpringSplit");

export const messaging = getMessaging(app)

getToken(messaging, { vapidKey: process.env.REACT_APP_KEY_PAIR }).then((currentToken)=>{
  if(currentToken){
    console.log(currentToken);
    alert(currentToken);
  } else {
    console.log('no registration token available');
  }
}).catch(err=>{ console.error(err)});

// onMessage(messaging, (payload)=>{alert(payload)})

