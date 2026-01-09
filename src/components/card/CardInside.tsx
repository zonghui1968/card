"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { CardConfig } from "@/data/cardOptions";

interface CardInsideProps {
    config: CardConfig;
}

export default function CardInside({ config }: CardInsideProps) {
    return (
        <div className="w-full h-full bg-[#fdfbf7] dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden flex flex-col p-8 border-l border-zinc-200 dark:border-zinc-800 relative">
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply dark:mix-blend-overlay"></div>

            {/* Animated Particles Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {config.particles && config.particles.map((color, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full opacity-30"
                        style={{
                            backgroundColor: color,
                            left: `${20 + i * 15}%`,
                            top: `${Math.random() * 80 + 10}%`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Inner shadow for spine effect */}
            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none" />

            <div className="w-full flex-1 flex flex-col z-10 overflow-y-auto scrollbar-hide">
                {/* Media Section */}
                <motion.div
                    className="w-full aspect-video bg-zinc-100 rounded-xl overflow-hidden shadow-lg mb-6 shrink-0 relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
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
                        <>
                            <img
                                src={config.inside.mediaUrl}
                                alt="Card visual"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                    )}

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className="space-y-6 text-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.h3
                        className={cn("text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-wide mb-2", config.theme.fontFamily)}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {config.inside.title}
                    </motion.h3>

                    <motion.div
                        className={cn("w-16 h-0.5 mx-auto", config.theme.primaryColor.replace('text-', 'bg-'))}
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        transition={{ delay: 0.6, type: "spring" }}
                    />

                    <motion.div
                        className={cn("text-zinc-700 dark:text-zinc-300 text-base leading-8 space-y-4", config.theme.fontFamily)}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {config.inside.message.map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </motion.div>

                    {/* Decorative Icons */}
                    {config.cover.icon && (
                        <motion.div
                            className="flex justify-center gap-4 mt-4"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {[...Array(3)].map((_, i) => (
                                <span
                                    key={i}
                                    className="text-2xl opacity-60"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                >
                                    {config.cover.icon}
                                </span>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Footer / Signature */}
            <motion.div
                className="mt-6 pt-4 w-full border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <motion.p
                    className={cn("text-3xl rotate-[-2deg] opacity-90", config.theme.primaryColor)}
                    style={{ fontFamily: 'cursive' }}
                    whileHover={{ scale: 1.1, rotate: [0, -3, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    {config.inside.signature}
                </motion.p>

                {/* Signature underline */}
                <motion.div
                    className={cn("w-20 h-0.5 mt-2 rounded-full", config.theme.primaryColor.replace('text-', 'bg-'))}
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ delay: 1.2, type: "spring" }}
                />
            </motion.div>
        </div>
    );
}
