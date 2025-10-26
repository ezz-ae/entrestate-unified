import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs/promises';
import * as path from 'path';

// --- IMPORTANT ---
// 1. Download your service account key from Firebase Project Settings > Service accounts.
// 2. Save it as 'serviceAccountKey.json' in the 'scripts' directory.
// 3. Make sure 'scripts/serviceAccountKey.json' is in your .gitignore file.
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function seedProjects() {
  try {
    console.log('Reading projects from data/projects_full.json...');
    const jsonPath = path.join(process.cwd(), 'data', 'projects_full.json');
    const rawData = await fs.readFile(jsonPath, 'utf-8');
    const projects = JSON.parse(rawData);

    if (!Array.isArray(projects)) {
      throw new Error('JSON data is not an array.');
    }

    console.log(`Found ${projects.length} projects. Seeding to Firestore...`);

    const batch = db.batch();
    const collectionRef = db.collection('projects_catalog');

    projects.forEach((project) => {
      if (project.slug) {
        const docRef = collectionRef.doc(project.slug); // Use slug as document ID
        batch.set(docRef, project);
      }
    });

    await batch.commit();
    console.log('✅ Successfully seeded projects to Firestore!');
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    if ((error as any).code === 'ENOENT' && (error as any).path.includes('serviceAccountKey.json')) {
        console.error("\n--- Please ensure 'scripts/serviceAccountKey.json' exists. ---");
    }
  }
}

seedProjects();
