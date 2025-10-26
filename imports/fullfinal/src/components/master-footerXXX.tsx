
import Link from 'next/link';
import { Bot } from 'lucide-react';

export function MasterFooter() {
  return (
    <footer className="bg-muted/20 border-t">
      <div className="container mx-auto px-4 md:px-8 py-12 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Entrestate. All rights reserved. Powered by Gemini.</p>
        <div className="flex justify-center gap-4 mt-2">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
