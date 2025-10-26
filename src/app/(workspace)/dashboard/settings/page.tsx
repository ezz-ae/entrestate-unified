import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader><CardTitle>My Profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Mahmoud Ezz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="mahmoud@example.com" disabled />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workspace" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Workspace Settings</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Workspace settings will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader><CardTitle>Billing & Subscription</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Billing information will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
