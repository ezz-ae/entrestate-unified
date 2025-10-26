
import { PageHeader } from "@/components/ui/page-header";
import { UnifiedMarketRegistry } from "@/components/listing-portal/unified-market-registry";

export default function MarketLibraryPage() {
    return (
        <div>
            <PageHeader
                title="Market Library"
                description="A public project intelligence section, providing a wealth of data and insights into the Dubai real estate market."
            />
            <div className="p-8">
                <UnifiedMarketRegistry />
            </div>
        </div>
    );
}
