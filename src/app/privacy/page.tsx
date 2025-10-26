
'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
         <div className="pt-24 text-center">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><Shield className="h-10 w-10" /></div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Privacy Policy
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                Your privacy is our priority. This policy outlines how we collect, use, and protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-2"><em>Last Updated: October 26, 2023</em></p>
        </div>

        <div className="py-24">
            <div className="container max-w-screen-md mx-auto px-4">
                <Card className="shadow-2xl">
                    <CardContent className="p-8 md:p-12">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h2>Introduction</h2>
                            <p>Welcome to Entrestate AI. We are committed to protecting your privacy and ensuring you have a positive experience when using our services. This Privacy Policy applies to the Entrestate AI web application and services (collectively, our "Service") and governs our data collection, processing, and usage practices.</p>

                            <h2>Information We Collect</h2>
                            <p>We collect information to provide and improve our services to you. The types of information we collect depend on how you use our Service.</p>
                            <ul>
                                <li><strong>Personal Information:</strong> This includes your name, email address, and payment information when you subscribe to our Service.</li>
                                <li><strong>Content You Provide:</strong> This includes the text, documents, images, and other content you upload or provide to our AI tools for processing and content generation.</li>
                                <li><strong>Usage Data:</strong> We collect information on how you access and use the Service, such as your IP address, browser type, and actions you take within the application.</li>
                            </ul>

                            <h2>How We Use Your Information</h2>
                            <p>We use the collected data for various purposes:</p>
                            <ul>
                                <li>To provide and maintain our Service, including personalized AI insights.</li>
                                <li>To process your content and generate the outputs you request.</li>
                                <li>To notify you about changes to our Service.</li>
                                <li>To allow you to participate in interactive features of our Service.</li>
                                <li>To provide customer support and manage your account.</li>
                                <li>To monitor the usage of our Service and improve its functionality.</li>
                                <li>To detect, prevent, and address technical issues.</li>
                            </ul>
                            
                            <h2>Content Generation and AI Tools</h2>
                            <p>Our Service uses advanced AI models to generate content based on the information you provide. When you use our AI tools, your content is processed by our AI models to create new content, such as social media posts, blog articles, and marketing copy.</p>
                            <p>We do not use your content to train our AI models without your explicit consent. Your inputs and outputs are your own, and we are committed to keeping them private and secure.</p>

                            <h2>Your Data Rights</h2>
                            <p>You have certain rights regarding your personal information. These include:</p>
                            <ul>
                                <li>The right to access, update, or delete the information we have on you.</li>
                                <li>The right to have your information rectified if it is inaccurate or incomplete.</li>
                                <li>The right to object to our processing of your personal information.</li>
                                <li>The right to request that we restrict the processing of your personal information.</li>
                            </ul>
                            <p>If you wish to exercise any of these rights, please contact us at <a href="mailto:privacy@entrestate.com">privacy@entrestate.com</a>.</p>

                            <h2>Changes to This Privacy Policy</h2>
                            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
