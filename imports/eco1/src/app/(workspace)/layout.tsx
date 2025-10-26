
'use client';

import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { WorkspaceHeader } from "@/components/workspace-header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup direction="horizontal" className="h-screen max-h-screen items-stretch">
            <ResizablePanel defaultSize={15} minSize={10} maxSize={20}>
                <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={85}>
                <div className="flex flex-col h-full">
                    <WorkspaceHeader />
                    <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0 md:gap-8">
                        {children}
                    </main>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
  );
}
