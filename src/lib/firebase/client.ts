// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { Auth, getAuth } from 'firebase/auth'
import { FirebaseStorage, getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAaYkJZET3O4S-SC2bHVHNAsE-piRJveOU',
  authDomain: 'fire-house-49fa8.firebaseapp.com',
  projectId: 'fire-house-49fa8',
  storageBucket: 'fire-house-49fa8.firebasestorage.app',
  messagingSenderId: '250013322506',
  appId: '1:250013322506:web:ffcd5fcf2374c6cc87bef3',
  measurementId: 'G-KELVRDVW8V',
}

// Initialize Firebase
const currentApps = getApps()

const app = !currentApps.length ? initializeApp(firebaseConfig) : currentApps[0]
// const analytics = getAnalytics(app)

const auth: Auth = getAuth(app)
const storage: FirebaseStorage = getStorage(app)

export { auth, storage }
