
'use client';

import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
         <div className="pt-24 text-center">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><FileText className="h-10 w-10" /></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Terms of Service
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                Please read these terms carefully before using our services.
            </p>
             <p className="text-sm text-muted-foreground mt-2"><em>Last Updated: July 29, 2024</em></p>
        </div>

        <div className="py-24">
            <div className="container max-w-screen-md mx-auto px-4">
                <Card className="shadow-2xl">
                    <CardContent className="p-8 md:p-12">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <section>
                                <h2>1. Agreement to Terms</h2>
                                <p>By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.</p>
                            </section>

                            <section>
                                <h2>2. Privacy Policy</h2>
                                <p>Please refer to our <Link href="/privacy">Privacy Policy</Link> for information on how we collect, use and disclose information from our users.</p>
                            </section>

                            <section>
                                <h2>3. Changes to Terms or Services</h2>
                                <p>We may update the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the updated Terms on the Site or through other communications. It’s important that you review the Terms whenever we update them or you use the Services.</p>
                            </section>

                            <section>
                                <h2>4. Who May Use the Services?</h2>
                                <p>You may use the Services only if you are 18 years or older and capable of forming a binding contract with Entrestate by mtc, and not otherwise barred from using the Services under applicable law.</p>
                            </section>
                            
                            <section>
                                <h2>5. Refund Policy</h2>
                                <p>Our refund policy is non-negotiable. In the event of an application or service failure, refunds will not be issued. We commit to making all reasonable efforts to restore service in a timely manner. Your subscription fee compensates for the ongoing availability and development of the suite, not for uninterrupted uptime.</p>
                            </section>

                            <section>
                                <h2>6. Contact Information</h2>
                                <p>If you have any questions about these Terms, please contact us at <a href="mailto:hello@entrestate.com">hello@entrestate.com</a>.</p>
                            </section>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
