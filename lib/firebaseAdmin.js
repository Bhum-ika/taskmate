// lib/firebaseAdmin.js

import admin from "firebase-admin";
import serviceAccount from "./firebase-service-account.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://task-manager-a9204.firebaseio.com", 
  });
}

const db = admin.firestore();

export { admin, db };
