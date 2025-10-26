
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Cookie } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiesPolicyPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <PageHeader
          title="Cookie Policy"
          description="Understanding how we use cookies to improve your experience."
          icon={<Cookie className="h-8 w-8" />}
        />
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Our Use of Cookies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-lg text-muted-foreground">
                    <p>
                        At Entrestate, we use cookies to enhance your browsing experience, analyze site traffic, and deliver personalized content. This policy provides detailed information about how and why we use them.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground">What Are Cookies?</h3>
                    <p>
                        Cookies are small text files stored on your device (computer, tablet, mobile phone) when you visit a website. They are widely used to make websites work more efficiently and to provide information to the site owners.
                    </p>

                    <h3 className="text-xl font-semibold text-foreground">Types of Cookies We Use</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                        </li>
                        <li>
                            <strong>Performance and Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.
                        </li>
                        <li>
                            <strong>Functionality Cookies:</strong> These enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                        </li>
                        <li>
                            <strong>Marketing Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
                        </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground">Managing Your Preferences</h3>
                    <p>
                        You can manage your cookie preferences at any time through the cookie consent banner. Most web browsers also allow you to control cookies through their settings.
                    </p>

                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
