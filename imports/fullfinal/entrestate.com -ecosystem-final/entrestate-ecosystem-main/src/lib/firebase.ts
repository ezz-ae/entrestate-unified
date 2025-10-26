
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

interface FirebaseServices {
    app: FirebaseApp;
    auth: Auth;
    db: Firestore;
    analytics: Analytics | null;
}

let firebaseServices: FirebaseServices | null = null;

export const getFirebaseServices = (): FirebaseServices => {
  if (firebaseServices) {
    return firebaseServices;
  }

  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
        throw new Error('Firebase client configuration is missing or incomplete. Check your .env.local file.');
    }
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    let analytics = null;
    if (typeof window !== 'undefined' && isSupported()) {
        analytics = getAnalytics(app);
    }
    firebaseServices = { app, auth, db, analytics };
  } else {
    const app = getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    let analytics = null;
    if (typeof window !== 'undefined' && isSupported()) {
        analytics = getAnalytics(app);
    }
    firebaseServices = { app, auth, db, analytics };
  }
  
  return firebaseServices;
};

// You can also export the individual services if you prefer
export const firebaseApp = getFirebaseServices().app;
export const auth = getFirebaseServices().auth;
export const db = getFirebaseServices().db;
export const analytics = getFirebaseServices().analytics;
