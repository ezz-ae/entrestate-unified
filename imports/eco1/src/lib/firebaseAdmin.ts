// src/lib/firebaseAdmin.ts
import * as admin from 'firebase-admin';

let app: admin.app.App | null = null;

export function getAdminApp() {
  if (app) return app;
  try {
    // Prefer ADC (works on Firebase Hosting Web Frameworks / Cloud Functions)
    app = admin.initializeApp();
  } catch (e: any) {
    const jsonPath = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!jsonPath) throw e;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const svc = require(jsonPath);
    app = admin.initializeApp({ credential: admin.credential.cert(svc) });
  }
  return app!;
}

export function getAdminDb() {
  return getAdminApp().firestore();
}

export function getAdminAuth() {
  return getAdminApp().auth();
}

export async function verifyIdToken(authHeader?: string) {
  if (!authHeader) return null;
  const m = authHeader.match(/^Bearer\s+(.+)/i);
  if (!m) return null;
  try {
    const token = m[1];
    const decoded = await getAdminAuth().verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}