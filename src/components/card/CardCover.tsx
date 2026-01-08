"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { CardConfig } from "@/data/cardOptions";

interface CardCoverProps {
    isOpen: boolean;
    onToggle: () => void;
    config: CardConfig;
}

export default function CardCover({ isOpen, onToggle, config }: CardCoverProps) {
    return (
        <motion.div
            className="absolute inset-0 w-full h-full origin-left cursor-pointer z-10"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isOpen ? -180 : 0 }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 12,
                mass: 0.8,
                delay: 0.1
            }}
            onClick={onToggle}
        >
            {/* Front Face (Outside Cover) */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className={cn(
                    "w-full h-full rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 border-l-4 border-white/10 relative overflow-hidden bg-gradient-to-br",
                    config.theme.gradient
                )}>
                    {/* Texture/Pattern */}
                    <div
                        className="absolute inset-0 opacity-20 bg-repeat"
                        style={{ backgroundImage: `url('${config.cover.decorationTexture}')` }}
                    />

                    {/* Dynamic Shadow Overlay when closed */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

                    <div className="relative z-10 p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-center w-full max-w-[90%]">
                        <h1 className={cn(
                            "text-3xl md:text-5xl drop-shadow-md tracking-wider mb-4",
                            config.theme.fontFamily,
                            config.theme.textColor
                        )}>
                            {config.cover.title}
                        </h1>
                        <div className={cn(
                            "text-sm tracking-[0.2em] uppercase opacity-80",
                            config.theme.textColor
                        )}>
                            {config.cover.subtitle}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Face (Inside Left) */}
            <div
                className="absolute inset-0 w-full h-full bg-white dark:bg-zinc-800 rounded-lg shadow-xl overflow-hidden"
                style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                }}
            >
                <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10 opacity-50" />

                    <h2 className={cn("text-2xl mb-4 text-zinc-800 dark:text-zinc-200", config.theme.fontFamily)}>
                        A Special Message
                    </h2>
                    <p className={cn("italic leading-relaxed text-zinc-600 dark:text-zinc-400", config.theme.fontFamily)}>
                        "{config.inside.message[0]}"
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
