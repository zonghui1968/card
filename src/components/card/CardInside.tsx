"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { CardConfig } from "@/data/cardOptions";

interface CardInsideProps {
    config: CardConfig;
}

export default function CardInside({ config }: CardInsideProps) {
    return (
        <div className="w-full h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-lg shadow-xl overflow-hidden flex flex-col items-center p-6 border-l border-zinc-200 dark:border-zinc-800 relative">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply dark:mix-blend-overlay"></div>

            {/* Inner shadow for spine effect */}
            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none" />

            <div className="w-full flex-1 flex flex-col z-0 overflow-y-auto scrollbar-hide">
                {/* Media Section */}
                <div className="w-full aspect-video bg-zinc-100 rounded-md overflow-hidden shadow-sm mb-6 shrink-0 relative group">
                    {config.inside.mediaType === 'video' ? (
                        <video
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            autoPlay
                            src={config.inside.mediaUrl}
                        />
                    ) : (
                        <img
                            src={config.inside.mediaUrl}
                            alt="Card visual"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Text Content */}
                <div className="space-y-4 text-center px-2">
                    <h3 className={cn("text-xl font-bold text-zinc-800 dark:text-zinc-100 tracking-wide", config.theme.fontFamily)}>
                        {config.inside.title}
                    </h3>
                    <div className={cn("w-12 h-0.5 mx-auto opacity-50", config.theme.primaryColor.replace('text-', 'bg-'))}></div>

                    <div className={cn("text-zinc-600 dark:text-zinc-300 text-sm leading-7 space-y-4", config.theme.fontFamily)}>
                        {config.inside.message.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer / Signature */}
            <div className="mt-4 pt-4 w-full border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center shrink-0">
                <p className={cn("text-2xl rotate-[-2deg] opacity-90", config.theme.primaryColor)} style={{ fontFamily: 'cursive' }}>
                    {config.inside.signature}
                </p>
            </div>
        </div>
    );
}
