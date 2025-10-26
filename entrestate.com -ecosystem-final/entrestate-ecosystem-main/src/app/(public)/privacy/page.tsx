
import { PageHeader } from "@/components/ui/page-header";

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        description="Last updated: October 26, 2024"
      />
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl prose">
        <p>Your privacy is important to us. It is Entrestate's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
        
        <h2>1. Information We Collect</h2>
        <p>Log data: Like most website operators, we collect information that your browser sends whenever you visit our website. This log data may include information such as your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
        <p>Personal Information: We may ask you for personal information, such as your name, email address, and contact details, when you register for an account, subscribe to our newsletter, or contact us.</p>

        <h2>2. Use of Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Entrestate and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.</p>

        <h2>3. Information Sharing</h2>
        <p>We do not share your personal information with companies, organizations, or individuals outside of Entrestate except in the following cases: with your consent, for external processing, or for legal reasons.</p>
        
        <h2>4. Security</h2>
        <p>We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.</p>
        
        {/* Add more sections as needed */}
      </div>
    </div>
  );
}
