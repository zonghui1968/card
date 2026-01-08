"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import CardCover from "./CardCover";
import CardInside from "./CardInside";
import confetti from "canvas-confetti";
import { Music, Maximize2, Minimize2 } from "lucide-react";
import BackgroundMusic from "./BackgroundMusic";
import ShareControl from "./ShareControl";

import { CARD_TYPES, CardConfig } from "@/data/cardOptions";

export default function CardWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentCardId, setCurrentCardId] = useState(CARD_TYPES[0].id);

    const activeConfig = CARD_TYPES.find(c => c.id === currentCardId) || CARD_TYPES[0];

    // Trigger open/close
    const toggleOpen = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState && !isPlaying) {
            if (activeConfig.musicUrl) setIsPlaying(true);
            // Fire confetti on open
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: activeConfig.id === 'invitation' ? ['#FFD700', '#FFF'] : undefined // Custom per type
            });
        }
    };

    // Parallax Tilt State
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-300, 300], [10, -10]);
    const rotateY = useTransform(x, [-300, 300], [-10, 10]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position relative to center
        const mouseX = event.clientX - rect.left - width / 2;
        const mouseY = event.clientY - rect.top - height / 2;

        x.set(mouseX);
        y.set(mouseY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-[#f0f0f0] dark:bg-[#111] p-4 perspective-1000 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Controls / Overlay */}
            <ShareControl />
            <div className="fixed top-4 right-4 flex gap-2 z-50">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                >
                    <Music className={cn("w-6 h-6", isPlaying ? "text-green-500 animate-pulse" : "text-gray-400")} />
                </button>
            </div>

            {activeConfig.musicUrl && (
                // Key to reset music when url changes
                <div key={activeConfig.musicUrl}>
                    <BackgroundMusic isPlaying={isPlaying} src={activeConfig.musicUrl} />
                </div>
            )}

            {/* 3D Scene Container */}
            <motion.div
                className="relative w-[300px] h-[400px] md:w-[400px] md:h-[550px]"
                style={{
                    perspective: "1500px",
                    rotateX: isOpen ? 0 : rotateX,
                    rotateY: isOpen ? 0 : rotateY,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    className={cn(
                        "relative w-full h-full transition-all duration-700",
                        isOpen ? "translate-x-[50%]" : "translate-x-0"
                    )}
                    initial={false}
                >
                    {/* The "Inside" Right Page (Base) */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        <CardInside config={activeConfig} />
                    </div>

                    {/* The Folding Cover (Left Page + Front Cover) */}
                    <CardCover isOpen={isOpen} onToggle={toggleOpen} config={activeConfig} />
                </motion.div>
            </motion.div>

            <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm animate-bounce mb-8">
                {isOpen ? "Tap cover to close" : "Tap card to open"}
            </p>

            {/* Card Type Selector Dock */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl z-50 flex items-center gap-3 overflow-x-auto max-w-[95vw]">
                {CARD_TYPES.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => {
                            setCurrentCardId(type.id);
                            setIsOpen(false);
                            setIsPlaying(false);
                        }}
                        className={cn(
                            "flex flex-col items-center justify-center p-2 rounded-xl min-w-[70px] transition-all duration-300 gap-1",
                            currentCardId === type.id
                                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 scale-110"
                                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-black/5"
                        )}
                    >
                        <type.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium whitespace-nowrap">{type.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
