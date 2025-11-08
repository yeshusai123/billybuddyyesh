import { GoogleGenerativeAI } from '@google/generative-ai';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const GEMINI_API_KEY = 'AIzaSyDdpwvosrDtfZKalBe3EbA82o-xofVR4gI';
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const MODEL_NAME = 'gemini-2.0-flash';

// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyAh01cQUE6qMNAQLELHcgOTteci2XDOoY0",
  authDomain: "cyberbully-report.firebaseapp.com",
  projectId: "cyberbully-report",
  storageBucket: "cyberbully-report.firebasestorage.app",
  messagingSenderId: "506302830342",
  appId: "1:506302830342:web:14866926917b7996d2b087",
  measurementId: "G-EXMVH82FFP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
