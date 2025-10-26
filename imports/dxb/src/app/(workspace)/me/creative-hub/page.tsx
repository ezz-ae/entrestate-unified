
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { AssetManager } from "@/components/creative-hub/asset-manager";
import { TemplateLibrary } from "@/components/creative-hub/template-library";
import { PDFEditor } from "@/components/creative-hub/pdf-editor";
import { LandingPageBuilder } from "@/components/creative-hub/landing-page-builder";
import { AIBrandCreator } from "@/components/creative-hub/ai-brand-creator";
import { Separator } from "@/components/ui/separator";

export default function CreativeHubPage() {
  return (
    <div className="p-4 md:p-8">
      <PageHeader
        title="Creative Intelligence Suite"
        description="Your brand-aware, generative marketing studio, powered by Gemini."
      />
      <main className="mt-6 space-y-8">
        
        <AIBrandCreator />
        
        <Separator />

        <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
                <h2 className="text-2xl font-bold mb-4">Template Library</h2>
                <TemplateLibrary />
            </div>
            <div className="md:col-span-4 space-y-8">
                 <h2 className="text-2xl font-bold mb-4">Generative Tools</h2>
                <PDFEditor />
                <LandingPageBuilder />
            </div>
        </div>

        <Separator />

        <div>
            <h2 className="text-2xl font-bold mb-4">Asset Manager</h2>
            <AssetManager />
        </div>
        
      </main>
    </div>
  );
}
