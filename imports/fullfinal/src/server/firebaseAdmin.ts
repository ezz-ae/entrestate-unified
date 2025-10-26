import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
export const app = getApps()[0] || initializeApp({ credential: applicationDefault() });
