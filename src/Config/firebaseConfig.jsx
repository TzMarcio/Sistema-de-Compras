import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmlQag3v3CgOmnOakQlkguSbNkcXJUew4",
  authDomain: "desenvolvimento-web-com-d2e93.firebaseapp.com",
  projectId: "desenvolvimento-web-com-d2e93",
  storageBucket: "desenvolvimento-web-com-d2e93.appspot.com",
  messagingSenderId: "766951000753",
  appId: "1:766951000753:web:c042f5d2367ee296f47090",
  measurementId: "G-9Q7VMCQCVN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
