import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function initFirebase(){
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  
  const firebaseApps = getApps()
  const firebaseApp = firebaseApps.length === 0 ? initializeApp(firebaseConfig) : firebaseApps[0]!;
  const auth = getAuth();
  
  return {
    app: firebaseApp,
    auth
  }
}