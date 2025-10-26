import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Button>Add New Project</Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Leads</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Emaar Beachfront</TableCell>
              <TableCell><Badge>Active</Badge></TableCell>
              <TableCell>254</TableCell>
              <TableCell>2 hours ago</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sobha Hartland</TableCell>
              <TableCell><Badge variant="secondary">Paused</Badge></TableCell>
              <TableCell>1,283</TableCell>
              <TableCell>3 days ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
