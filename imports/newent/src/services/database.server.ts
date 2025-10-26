// server-only helpers (Node runtime)
import 'server-only';
import { getAdminDb } from '@/lib/firebaseAdmin';

const db = getAdminDb();

export async function saveUserData(uid: string, data: Record<string, any>) {
  await db.collection('users').doc(uid).set(data, { merge: true });
}

export async function getUserData(uid: string) {
  const snap = await db.collection('users').doc(uid).get();
  return snap.exists ? snap.data() : null;
}
