"use client";

import { useAuth } from "@/hooks/useAuth";
import { toolsData } from "@/lib/tools-data";
import { ToolCard } from "@/lib/tools-client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MePage() {
    const { user } = useAuth();

    const activatedToolIds = user?.workspace?.activatedTools || [];
    const activatedTools = toolsData.filter(tool => activatedToolIds.includes(tool.id));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome back, {user?.displayName || 'User'}!
                </h1>
                <p className="text-muted-foreground">
                    Here are your activated tools. Access your command center and manage your ecosystem.
                </p>
            </div>

            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.05,
                        },
                    },
                }}
            >
                {activatedTools.length > 0 ? (
                    activatedTools.map((tool) => <ToolCard key={tool.id} {...tool} />)
                ) : (
                    <p className="text-muted-foreground col-span-full">
                        You have no activated tools. 
                        <Link href="/appstore" className="text-primary hover:underline ml-1">
                            Visit the Appstore to get started.
                        </Link>
                    </p>
                )}
            </motion.div>
        </div>
    );
}