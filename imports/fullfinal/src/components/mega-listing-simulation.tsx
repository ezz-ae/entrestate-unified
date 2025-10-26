
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building, User, Info, TrendingUp, Calendar, Zap, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from './ui/separator';

const rawListings = [
  { id: 1, source: 'Bayut', title: 'Marina View Apt', price: 'AED 2.5M', agent: 'John D.', status: 'Active', size: '1,318 sqft', color: 'bg-blue-900/10' },
  { id: 2, source: 'P.Finder', title: '2BR Marina', price: 'AED 2,550,000', agent: 'Jane S.', status: 'Active', size: '1,320 sqft', color: 'bg-green-900/10' },
  { id: 3, source: 'Dubizzle', title: 'Stunning View Apt', price: '2.5M AED', agent: 'Self-listed', status: 'Active', size: '1,300 sqft', color: 'bg-purple-900/10' },
  { id: 4, source: 'Broker Site', title: 'Exclusive Marina 2 Bed', price: 'AED 2.49M', agent: 'Michael B.', status: 'Active', size: '1,318 sqft', color: 'bg-red-900/10' },
  { id: 5, source: 'P.Finder', title: 'Luxury Apt', price: 'AED 2,500,000', agent: 'Jane S.', status: 'Under Offer', size: '1,318 sqft', color: 'bg-green-900/10' },
  { id: 6, source: 'Facebook', title: '2BR For Sale Dubai Marina', price: 'Call for price', agent: 'Unknown', status: 'Active', size: 'N/A', color: 'bg-sky-900/10' },
  { id: 7, source: 'Prop.ae', title: 'High Floor 2-Bed', price: 'AED 2.51M', agent: 'Prop.ae Broker', status: 'Active', size: '1,325 sqft', color: 'bg-yellow-900/10' },
];

const unifiedListing = {
    title: 'Princess Tower, Dubai Marina',
    price: 'AED 2,500,000',
    type: '2 Bed, 3 Bath',
    size: '1,318 sqft',
    ref: 'AP345982',
    verified: true,
    qualityScore: 98,
    officialAgent: {
        name: 'Jane Smith',
        agency: 'Prestige Properties',
        verified: true,
    },
    projectDetails: {
        developer: 'Emaar Properties',
        handover: 'Ready',
        status: 'Available',
    },
    priceHistory: [
        { date: '2023-11', price: 'AED 2.45M' },
        { date: '2024-03', price: 'AED 2.48M' },
        { date: '2024-07', price: 'AED 2.50M' },
    ]
};

export const MegaListingSimulation = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div 
            className="w-full max-w-lg mx-auto group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className="w-full overflow-hidden bg-gradient-to-br from-muted/10 to-muted/50 rounded-2xl border border-border/20 backdrop-blur-lg"
            >
              <div className="p-4 md:p-6">
                <div 
                    className="w-full mx-auto cursor-pointer h-full min-h-[400px] relative"
                >
                    <AnimatePresence>
                        {!isHovered && (
                            <motion.div
                                key="raw-listings"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05 } }
                                }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {rawListings.map((listing, i) => (
                                    <motion.div
                                        key={listing.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 },
                                        }}
                                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={cn("p-3 rounded-md shadow-sm border border-transparent", listing.color)}>
                                            <p className="text-sm font-semibold truncate">{listing.title}</p>
                                            <p className="text-xs text-muted-foreground flex justify-between items-center mt-1">
                                                <span>{listing.source}</span>
                                                <span className="font-mono text-foreground">{listing.price}</span>
                                            </p>
                                            <p className="text-[10px] text-muted-foreground/80 mt-1">
                                                Agent: {listing.agent} 
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                key="unified-listing"
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <Card className="bg-card border-primary ring-2 ring-primary/20 shadow-lg w-full max-w-sm">
                                    <CardHeader className="p-5">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-xl flex items-center gap-2 text-primary">
                                                <Building className="h-6 w-6" />
                                                {unifiedListing.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-green-500 font-bold">
                                                <BadgeCheck className="h-5 w-5" />
                                                <span>{unifiedListing.qualityScore}%</span>
                                            </div>
                                        </div>
                                        <CardDescription className="text-xs text-muted-foreground font-mono mt-1">Ref: {unifiedListing.ref}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-5 pt-0 text-base space-y-4">
                                        <div className="flex justify-between items-baseline p-4 bg-secondary/30 rounded-lg">
                                            <span className="text-muted-foreground">Price:</span>
                                            <span className="font-bold text-3xl text-primary">{unifiedListing.price}</span>
                                        </div>
                                         <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><Info className="h-4 w-4"/>Details:</span>
                                            <span className="font-semibold text-foreground">{unifiedListing.type} / {unifiedListing.size}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><User className="h-4 w-4"/>Official Agent:</span>
                                            <span className="font-semibold text-foreground">{unifiedListing.officialAgent.name} (<span className="text-primary">{unifiedListing.officialAgent.agency}</span>)</span>
                                        </div>
                                        
                                        <Separator className="my-4" />

                                        <div>
                                            <h4 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-3">Project & Market Details</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground flex items-center gap-1"><Building className="h-4 w-4"/>Developer:</span>
                                                    <span className="font-semibold text-foreground">{unifiedListing.projectDetails.developer}</span>
                                                </div>
                                                 <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground flex items-center gap-1"><Calendar className="h-4 w-4"/>Handover:</span>
                                                    <span className="font-semibold text-foreground">{unifiedListing.projectDetails.handover}</span>
                                                </div>
                                                 <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground flex items-center gap-1"><Zap className="h-4 w-4"/>Status:</span>
                                                    <span className="font-semibold flex items-center gap-1 text-green-500"><CheckCircle className="h-4 w-4 text-green-500"/>{unifiedListing.projectDetails.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Separator className="my-4" />
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="h-4 w-4"/>Price Trend (3M):</span>
                                            <div className="flex gap-3 font-mono text-sm text-foreground">
                                                {unifiedListing.priceHistory.map(p=> <span key={p.date}>{p.price}</span>)}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                </div>
              </div>
            </div>
        </div>
    );
};
