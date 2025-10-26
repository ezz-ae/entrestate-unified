
import { PageHeader } from "@/components/ui/page-header";
import { MarketSentimentCard } from "@/components/dashboard/market-sentiment-card";
import { EmergingTrendsCard } from "@/components/dashboard/emerging-trends-card";
import { KeyOpportunitiesCard } from "@/components/dashboard/key-opportunities-card";
import { ForecastCard } from "@/components/dashboard/forecast-card";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Cloud Dashboard"
        description="A real-time overview of the Dubai real estate market and your operations."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MarketSentimentCard />
        <EmergingTrendsCard />
        <KeyOpportunitiesCard />
        <ForecastCard />
      </div>
    </div>
  );
}
