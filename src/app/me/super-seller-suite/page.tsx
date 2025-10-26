
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { AppCard } from "@/components/super-seller-suite/app-card";
import { DealRoomAI } from "@/components/super-seller-suite/deal-room-ai";
import { BulkCloserAI } from "@/components/super-seller-suite/bulk-closer-ai";
import { RentIncomeCalculatorAI } from "@/components/super-seller-suite/rent-income-calculator-ai";
import { PropertyEvaluatorAI } from "@/components/super-seller-suite/property-evaluator-ai";
import { useState } from "react";
import { PropertyMarketerAI } from "@/components/super-seller-suite/property-marketer-ai";

export default function SuperSellerSuitePage() {
    const [selectedApp, setSelectedApp] = useState<string | null>(null);

    const apps = [
        { id: 'property-marketer-ai', title: 'Property Marketer AI', description: 'Generate a complete marketing kit for a property with a single click.' },
        { id: 'deal-room-ai', title: 'Deal Room AI', description: 'A powerful deal management system that can match offers, build full deal plans, and even generate negotiation strategies.' },
        { id: 'bulk-closer-ai', title: 'Bulk Closer AI', description: 'A powerful tool for investors, allowing them to analyze projects and identify the best bulk deal opportunities.' },
        { id: 'rent-income-calculator-ai', title: 'Rent Income Calculator AI', description: 'An invaluable tool for investors, allowing them to accurately forecast the potential rental income of an off-plan property.' },
        { id: 'property-evaluator-ai', title: 'Property Evaluator AI', description: 'An essential tool for sellers, providing them with an accurate, AI-powered valuation of their property.' },
    ];

    const renderApp = () => {
        switch (selectedApp) {
            case 'property-marketer-ai':
                return <PropertyMarketerAI />;
            case 'deal-room-ai':
                return <DealRoomAI />;
            case 'bulk-closer-ai':
                return <BulkCloserAI />;
            case 'rent-income-calculator-ai':
                return <RentIncomeCalculatorAI />;
            case 'property-evaluator-ai':
                return <PropertyEvaluatorAI />;
            default:
                return null;
        }
    };

    if (selectedApp) {
        return (
            <div>
                <PageHeader
                    title={apps.find(app => app.id === selectedApp)?.title || ''}
                    description={apps.find(app => app.id === selectedApp)?.description || ''}
                />
                <Button onClick={() => setSelectedApp(null)} className="mb-4">Back to Apps</Button>
                {renderApp()}
            </div>
        );
    }

    return (
        <div>
            <PageHeader
                title="SuperSellerSuite"
                description="A collection of generative AI apps for a new era of real estate."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {apps.map(app => (
                    <AppCard
                        key={app.id}
                        title={app.title}
                        description={app.description}
                        onLaunch={() => setSelectedApp(app.id)}
                    />
                ))}
            </div>
        </div>
    );
}
