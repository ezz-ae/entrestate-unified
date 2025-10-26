
import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebaseAdmin';
import { saveUserData } from '@/services/database.server';
import { getUidFromRequest, ok, fail } from '@/lib/api-helpers';

export async function POST(req: NextRequest) {
  const adminDb = getAdminDb();
  const adminAuth = getAdminAuth();

  if (!adminDb || !adminAuth) {
    return fail("Firebase Admin is not initialized.", 503);
  }

  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);

    const body = await req.json();
    const { finalData, projectsToAdd } = body;

    // Save user data
    await saveUserData(uid, finalData);

    // Add shortlisted projects to user's library
    if (projectsToAdd && Array.isArray(projectsToAdd)) {
      const batch = adminDb.batch();
      for (const project of projectsToAdd) {
        const userProjectRef = adminDb.collection('users').doc(uid).collection('projects').doc(project.id);
        batch.set(userProjectRef, project, { merge: true });
      }
      await batch.commit();
    }

    return ok({ success: true });
  } catch (e: any) {
    console.error("Onboarding API error:", e);
    return fail(e);
  }
}
