
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/me/ei-os');
    }, [router]);

    return null; // or a loading spinner
}
