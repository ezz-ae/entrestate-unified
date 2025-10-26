import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function GemPanelPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">GEM Panel - AI Job Monitor</h1>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">dev-a1b2c3d4</TableCell>
              <TableCell>compareProjects</TableCell>
              <TableCell><Badge>succeeded</Badge></TableCell>
              <TableCell>2 minutes ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">dev-e5f6g7h8</TableCell>
              <TableCell>generatePDF</TableCell>
              <TableCell><Badge variant="secondary">running</Badge></TableCell>
              <TableCell>10 minutes ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
