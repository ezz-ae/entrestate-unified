
'use server';

import { db } from './firebase-admin';

export interface Project {
  id: string;
  name: string;
  [key: string]: any;
}

/**
 * Fetches a single project from the Firestore database by its document ID.
 * @param projectId The ID of the project to fetch.
 * @returns A promise that resolves to the project data or null if not found.
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  try {
    const docRef = db.collection('projects').doc(projectId);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.warn(`No project found with ID: ${projectId}`);
      return null;
    }

    const data = doc.data();
    return {
      id: doc.id,
      ...data
    } as Project;

  } catch (error) {
    console.error(`Error fetching project by ID "${projectId}":`, error);
    throw new Error('Failed to fetch project data from database.');
  }
}
