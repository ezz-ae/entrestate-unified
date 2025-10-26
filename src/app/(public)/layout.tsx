
import { MasterHeader } from "@/components/master-header";
import { MasterFooter } from "@/components/master-footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MasterHeader />
      <main className="flex-grow">{children}</main>
      <MasterFooter />
    </div>
  );
}
