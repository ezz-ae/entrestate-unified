
'use server';

import { getAuth } from "firebase-admin/auth";
import { headers } from "next/headers";

async function getUserIdFromRequest(req: Request) {
    const authorization = headers().get('Authorization');
    if (authorization?.startsWith("Bearer ")) {
        const idToken = authorization.split("Bearer ")[1];
        try {
            const decodedToken = await getAuth().verifyIdToken(idToken);
            return decodedToken.uid;
        } catch (error) {
            console.error("Error verifying ID token:", error);
            return null;
        }
    }
    return null;
}

export async function runFlow(flowId: string, params: Record<string, any>): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/run`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // This is a simplified auth example; in a real app, you'd handle token refresh
            'Authorization': headers().get('Authorization') || '',
        },
        body: JSON.stringify({ flowId, params }),
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`API Error: ${errorBody.error || 'Unknown error'}`);
    }

    return response.json();
}
