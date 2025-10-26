import { WorkspaceHeader } from "@/components/workspace-header";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { AuthGuard } from "@/components/auth-guard";

interface WorkspaceLayoutProps {
    children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
    return (
        <AuthGuard>
            <div className="flex h-screen overflow-hidden">
                <WorkspaceSidebar />
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <WorkspaceHeader />
                    <main className="flex-1 p-4 md:p-8">{children}</main>
                </div>
            </div>
        </AuthGuard>
    );
}