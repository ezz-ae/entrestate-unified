
'use client';

import { MasterHeader } from '@/components/master-header';
import { MasterFooter } from '@/components/master-footer';
import DiscoverPage from './(public)/discover/page'; // Corrected import path

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MasterHeader />
      <main className="flex-grow">
        <DiscoverPage />
      </main>
      <MasterFooter />
    </div>
  );
}
