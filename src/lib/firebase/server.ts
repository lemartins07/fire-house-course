import {
  initializeApp,
  cert,
  getApps,
  ServiceAccount,
} from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

const serviceAccount = {
  type: 'service_account',
  project_id: 'fire-house-49fa8',
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fire-house-49fa8.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
}

const currentApps = getApps()

const app = !currentApps.length
  ? initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    })
  : currentApps[0]

const firestore: Firestore = getFirestore(app)
const auth: Auth = getAuth(app)

export { app, firestore, auth }
