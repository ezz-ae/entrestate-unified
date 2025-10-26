
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ToolData } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

// Placeholder images, we'll map tools to these.
const placeholderImages = [
  '/images/creative/image-1.png',
  '/images/creative/image-2.png',
  '/images/creative/image-3.png',
  '/images/creative/image-4.png',
  '/images/creative/image-5.png',
];

interface CreativeCanvasProps {
    tools: ToolData[];
}

export function CreativeCanvas({ tools }: CreativeCanvasProps) {
  const toolsToShow = tools.slice(0, 5);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {toolsToShow.map((tool, i) => (
        <motion.div
          key={tool.id}
          className="absolute"
          initial={{
            x: '50%',
            y: '-50%',
            scale: 0.5,
            opacity: 0,
            rotate: Math.random() * 60 - 30,
          }}
          animate={{
            x: `${(i - Math.floor(toolsToShow.length / 2)) * 110}px`,
            y: '-50%',
            scale: i === Math.floor(toolsToShow.length / 2) ? 1.1 : 0.9,
            opacity: 1,
            rotate: (i - Math.floor(toolsToShow.length / 2)) * 10,
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            delay: i * 0.15,
          }}
          whileHover={{
            scale: 1.15,
            zIndex: 10,
            transition: { type: 'spring', stiffness: 300 },
          }}
        >
          <Card className="w-48 h-64 shadow-2xl relative overflow-hidden">
            <Image
              src={placeholderImages[i % placeholderImages.length]}
              alt={tool.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <CardContent className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="p-2 bg-white/20 rounded-lg w-fit mb-2 backdrop-blur-sm">
                    <DynamicIcon name={tool.iconName} className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm">{tool.title}</h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
