
import { NextRequest, NextResponse } from 'next/server';
import { admin, db } from '@/lib/firebaseAdmin';

interface Note {
    id: string;
    content: string;
    authorName: string;
    authorImage: string;
    timestamp: admin.firestore.FieldValue;
    likes: number;
    likedBy: string[];
}

// GET - Fetch all community notes
export async function GET(req: NextRequest) {
    try {
        const snapshot = await db.collection('community-insights').orderBy('timestamp', 'desc').get();
        
        const notes = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                content: data.content,
                authorName: data.authorName,
                authorImage: data.authorImage,
                timestamp: data.timestamp.toDate().toISOString(), // Convert to ISO string
                likes: data.likes || 0,
                likedBy: data.likedBy || [],
            };
        });

        return NextResponse.json({ ok: true, data: notes });

    } catch (error: any) {
        console.error("Error fetching notes:", error);
        return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST - Create a new community insight
export async function POST(req: NextRequest) {
    try {
        const idToken = req.headers.get('authorization')?.split('Bearer ')[1];
        if (!idToken) {
            return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const user = await admin.auth().getUser(uid);

        const body = await req.json();
        const { content } = body;

        if (!content || typeof content !== 'string') {
            return NextResponse.json({ ok: false, error: 'Invalid content' }, { status: 400 });
        }

        const newNote = {
            content: content,
            authorUid: uid,
            authorName: user.displayName || 'Anonymous',
            authorImage: user.photoURL || '/images/default-avatar.png', // Provide a default avatar
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            likedBy: [],
        };

        const docRef = await db.collection('community-insights').add(newNote);

        return NextResponse.json({ ok: true, data: { id: docRef.id, ...newNote } });

    } catch (error: any) {
        console.error("Error creating note:", error);
        if (error.code === 'auth/id-token-expired') {
            return NextResponse.json({ ok: false, error: 'Token expired' }, { status: 401 });
        }
        return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
