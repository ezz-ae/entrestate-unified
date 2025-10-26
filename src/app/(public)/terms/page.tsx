
import { PageHeader } from "@/components/ui/page-header";

export default function TermsPage() {
  return (
    <div>
      <PageHeader
        title="Terms of Service"
        description="Last updated: October 26, 2024"
      />
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl prose">
        <p>By accessing the website at https://www.entrestate.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        
        <h2>1. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Entrestate's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title...</p>

        <h2>2. Disclaimer</h2>
        <p>The materials on Entrestate's website are provided on an 'as is' basis. Entrestate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2>3. Limitations</h2>
        <p>In no event shall Entrestate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Entrestate's website...</p>
        
        {/* Add more sections as needed */}
      </div>
    </div>
  );
}
