
'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Image from 'next/image'; // Import Image component

export const Logo = ({
  className,
  href = "/",
  logoSrc = "https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/Entrestat_com_logo.png?alt=media&token=0f5733c8-4b30-4c29-a167-a9766821d85e", // Updated logo URL
}: { className?: string, href?: string, logoSrc?: string }) => {
    const content = (
        <div className={cn("flex flex-col items-start", className)}> {/* Use flex-col to stack items */}
            <div className="relative w-[120px] h-[30px]"> {/* Adjusted size for the logo */}
                <Image 
                    src={logoSrc} 
                    alt="Entrestate Logo"
                    fill 
                    priority 
                    sizes="120px" // Added sizes prop
                    className="object-contain"
                />
            </div>
        </div>
    );

    return (
        <Link href={href} aria-label="Go to Homepage">
            {content}
        </Link>
    );
};
