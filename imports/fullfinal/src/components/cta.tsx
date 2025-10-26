import Link from "next/link";
import { Button } from "./ui/button";

export function CTA() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Join the new era of real estate. Sign up today.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/signup">Sign Up for Free</Link>
        </Button>
      </div>
    </section>
  );
}
