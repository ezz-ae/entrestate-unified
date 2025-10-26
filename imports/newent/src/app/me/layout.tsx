
import React from 'react';
import { WorkspaceHeader } from '@/components/workspace-header';
import { GlobalChat } from '@/components/global-chat';
import { WorkspaceSidebar } from '@/components/workspace-sidebar';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
        {/* The main header for the entire /me section */}
        <WorkspaceHeader />
        <div className="flex flex-1 overflow-hidden">
            <WorkspaceSidebar />
            {/* Added pb-20 to ensure content is not covered by GlobalChat */}
            <main className="flex-1 overflow-y-auto pt-0 pb-20"> 
                 {children}
            </main>
        </div>
        {/* The Analog Bar (Global Chat) is persistent across the /me section */}
        <GlobalChat />
    </div>
  );
}
