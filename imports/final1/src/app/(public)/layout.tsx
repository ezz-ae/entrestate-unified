import MasterHeader from '@/src/components/master-header';
import MasterFooter from '@/src/components/master-footer';
import '../globals.css';
export default function PublicLayout({children}:{children:React.ReactNode}){
  return (<html lang="en"><body><MasterHeader/><main className="container py-10">{children}</main><MasterFooter/></body></html>);
}
