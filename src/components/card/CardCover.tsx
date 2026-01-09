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
                    "w-full h-full rounded-xl shadow-2xl flex flex-col items-center justify-center p-8 border-l-4 border-white/10 relative overflow-hidden bg-gradient-to-br",
                    config.theme.gradient
                )}>
                    {/* Animated Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-30 bg-repeat animate-pulse"
                        style={{
                            backgroundImage: `url('${config.cover.decorationTexture}')`,
                            animationDuration: '3s'
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />

                    {/* Decorative Border */}
                    <div className="absolute inset-4 border-2 border-white/20 rounded-lg pointer-events-none" />
                    <div className="absolute inset-6 border border-white/10 rounded-lg pointer-events-none" />

                    {/* Icon */}
                    {config.cover.icon && (
                        <motion.div
                            className="relative z-10 mb-6"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className="text-7xl drop-shadow-2xl">{config.cover.icon}</span>
                        </motion.div>
                    )}

                    {/* Content */}
                    <div className="relative z-10 p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm text-center w-full max-w-[90%]">
                        <motion.h1
                            className={cn(
                                "text-4xl md:text-5xl drop-shadow-md tracking-wider mb-4",
                                config.theme.fontFamily,
                                config.theme.textColor
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {config.cover.title}
                        </motion.h1>
                        <motion.div
                            className={cn(
                                "text-sm tracking-[0.2em] uppercase opacity-90",
                                config.theme.textColor
                            )}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            transition={{ delay: 0.4 }}
                        >
                            {config.cover.subtitle}
                        </motion.div>

                        {/* Decorative Line */}
                        <motion.div
                            className={cn(
                                "w-16 h-0.5 mx-auto mt-6 rounded-full",
                                config.theme.accentColor?.replace('text-', 'bg-') || 'bg-white/50'
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: 64 }}
                            transition={{ delay: 0.6, type: "spring" }}
                        />
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30" />
                </div>
            </div>

            {/* Back Face (Inside Left) */}
            <div
                className="absolute inset-0 w-full h-full bg-white dark:bg-zinc-800 rounded-xl shadow-xl overflow-hidden"
                style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                }}
            >
                {/* Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-5 bg-repeat"
                    style={{ backgroundImage: `url('${config.theme.pattern}')` }}
                />

                <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10 opacity-50" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className={cn("text-3xl mb-6 text-zinc-800 dark:text-zinc-200", config.theme.fontFamily)}>
                            特别寄语
                        </h2>
                        <div className={cn("w-12 h-0.5 mx-auto mb-6", config.theme.primaryColor.replace('text-', 'bg-'))} />
                        <p className={cn("text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 italic", config.theme.fontFamily)}>
                            "{config.inside.message[0]}"
                        </p>

                        {/* Decorative Element */}
                        <div className="mt-8 flex gap-2 justify-center">
                            {config.particles?.slice(0, 3).map((color, i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: color }}
                                    animate={{
                                        y: [0, -10, 0],
                                        opacity: [1, 0.5, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
