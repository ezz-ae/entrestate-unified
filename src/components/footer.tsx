import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Entrestate</h3>
            <p className="text-sm text-muted-foreground mt-2">
              The operating system for real estate entrepreneurs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/whatsmap" className="text-sm text-muted-foreground hover:text-foreground">WhatsMap</Link></li>
              <li><Link href="/market-library" className="text-sm text-muted-foreground hover:text-foreground">Marketplace</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">Docs</Link></li>
              <li><Link href="/academy" className="text-sm text-muted-foreground hover:text-foreground">Academy</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Entrestate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
