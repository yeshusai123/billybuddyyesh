// Gemini AI
import { GoogleGenerativeAI } from '@google/generative-ai';

// Firebase modular imports
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// --- Gemini AI setup ---
export const GEMINI_API_KEY = 'AIzaSyDdpwvosrDtfZKalBe3EbA82o-xofVR4gI';
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
export const MODEL_NAME = 'gemini-2.0-flash';

// --- Firebase configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyAh01cQUE6qMNAQLELHcgOTteci2XDOoY0",
  authDomain: "cyberbully-report.firebaseapp.com",
  projectId: "cyberbully-report",
  storageBucket: "cyberbully-report.appspot.com",
  messagingSenderId: "506302830342",
  appId: "1:506302830342:web:14866926917b7996d2b087",
  measurementId: "G-EXMVH82FFP"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
