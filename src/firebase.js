import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3r6DMQp2KIX3a_GID_t9skQ6OF9ORnIo",
  authDomain: "prufy-1010.firebaseapp.com",
  projectId: "prufy-1010",
  storageBucket: "prufy-1010.firebasestorage.app",
  messagingSenderId: "871772496664",
  appId: "1:871772496664:web:041581fbfa715966c9346d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;

