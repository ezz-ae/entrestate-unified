import '../globals.css';
import WorkspaceSidebar from '@/src/components/workspace-sidebar';
export default function WorkspaceLayout({children}:{children:React.ReactNode}){
  return (<html lang="en"><body><div className="flex"><WorkspaceSidebar/><main className="flex-1 p-8">{children}</main></div></body></html>);
}
