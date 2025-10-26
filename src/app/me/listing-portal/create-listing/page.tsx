
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloneListingForm } from "@/components/listing-portal/clone-listing-form";

export default function CreateListingPage() {
    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Create a New Listing"
                description="Use our AI tools to create a high-performing listing from a URL or from scratch."
            >
                <Link href="/me/listing-portal">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </PageHeader>
            <main className="mt-6 max-w-2xl mx-auto">
                <CloneListingForm />
            </main>
        </div>
    );
}
