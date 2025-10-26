import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from "lucide-react";

export default function MarketCloudPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Market Cloud Intelligence</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price/Sqft (Dubai)</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED 1,850</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
            <div className="h-32 mt-4 bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground">
              [Line Chart Placeholder]
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Off-Plan vs. Ready Sales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62% Off-Plan</div>
            <p className="text-xs text-muted-foreground">Trending up in Q4</p>
            <div className="h-32 mt-4 bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground">
              [Bar Chart Placeholder]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
