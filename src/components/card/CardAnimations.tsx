"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CardCover from "./CardCover";
import CardInside from "./CardInside";
import { CardConfig, AnimationType, REAL_CARD_SIZE } from "@/data/cardOptions";

interface CardAnimationsProps {
    isOpen: boolean;
    onToggle: () => void;
    config: CardConfig;
    animationType: AnimationType;
}

// 折叠打开效果
function FoldAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className={cn("relative transition-all duration-700", isOpen ? "translate-x-[50%]" : "translate-x-0")}
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`,
                transformStyle: "preserve-3d"
            }}
            initial={false}
        >
            <div className="absolute inset-0 w-full h-full z-0">
                <CardInside config={config} />
            </div>
            <CardCover isOpen={isOpen} onToggle={onToggle} config={config} />
        </motion.div>
    );
}

// 翻转效果
function FlipAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative"
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`,
                perspective: "1500px"
            }}
        >
            <motion.div
                className="absolute inset-0 cursor-pointer"
                animate={{ rotateY: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12 }}
                onClick={onToggle}
                style={{ transformStyle: "preserve-3d" }}
            >
                <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                    <CardCover isOpen={false} onToggle={onToggle} config={config} />
                </div>
                <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <CardInside config={config} />
                </div>
            </motion.div>
        </motion.div>
    );
}

// 对折开门效果（Gatefold）
function GatefoldAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative"
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`,
                perspective: "1500px"
            }}
        >
            <div className="absolute inset-0 w-full h-full z-0">
                <CardInside config={config} />
            </div>

            <motion.div
                className="absolute inset-0 w-1/2 h-full cursor-pointer z-10"
                animate={{ rotateY: isOpen ? -180 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12 }}
                onClick={onToggle}
                style={{ transformStyle: "preserve-3d", transformOrigin: "left" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 rounded-l-xl shadow-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-white/20" />
                </div>
            </motion.div>

            <motion.div
                className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
                animate={{ rotateY: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12 }}
                onClick={onToggle}
                style={{ transformStyle: "preserve-3d", transformOrigin: "right" }}
            >
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500 via-purple-500 to-rose-400 rounded-r-xl shadow-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-white/20" />
                </div>
            </motion.div>
        </motion.div>
    );
}

// 手风琴效果（Accordion）
function AccordionAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative"
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`,
                perspective: "1500px"
            }}
        >
            <motion.div
                className="absolute top-0 left-0 w-full h-1/3"
                animate={{ rotateX: isOpen ? -180 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0 }}
                onClick={onToggle}
                style={{ transformStyle: "preserve-3d", transformOrigin: "top" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-fuchsia-500 rounded-t-xl shadow-xl" />
            </motion.div>

            <motion.div
                className="absolute top-1/3 left-0 w-full h-1/3"
                animate={{ rotateX: isOpen ? -180 : 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 12, delay: 0.1 }}
                onClick={onToggle}
                style={{ transformStyle: "preserve-3d", transformOrigin: "top" }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow-xl" />
            </motion.div>

            <motion.div
                className="absolute bottom-0 left-0 w-full h-1/3 cursor-pointer z-10"
                animate={{ rotateX: isOpen ? 0 : 0 }}
                onClick={onToggle}
            >
                <CardInside config={config} />
            </motion.div>
        </motion.div>
    );
}

// 同心结效果（Reveal）
function RevealAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative cursor-pointer"
            onClick={onToggle}
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`,
                perspective: "1500px"
            }}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isOpen ? 0 : 1,
                    rotate: isOpen ? 180 : 0,
                    opacity: isOpen ? 0 : 1
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                style={{ transformOrigin: "center" }}
            >
                <CardCover isOpen={false} onToggle={onToggle} config={config} />
            </motion.div>

            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isOpen ? 1 : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
            >
                <CardInside config={config} />
            </motion.div>
        </motion.div>
    );
}

// 旋转展开效果
function RotateAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative cursor-pointer"
            onClick={onToggle}
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`,
                perspective: "2000px"
            }}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isOpen ? 0.8 : 1,
                    rotateZ: isOpen ? 360 : 0,
                    opacity: isOpen ? 0 : 1
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                style={{ transformOrigin: "center" }}
            >
                <CardCover isOpen={false} onToggle={onToggle} config={config} />
            </motion.div>

            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isOpen ? 1 : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.3 }}
            >
                <CardInside config={config} />
            </motion.div>
        </motion.div>
    );
}

// 缩放揭示效果
function ZoomAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative cursor-pointer"
            onClick={onToggle}
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`
            }}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isOpen ? 2 : 1,
                    opacity: isOpen ? 0 : 1
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <CardCover isOpen={false} onToggle={onToggle} config={config} />
            </motion.div>

            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: isOpen ? 1 : 0.5,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            >
                <CardInside config={config} />
            </motion.div>
        </motion.div>
    );
}

// 滑动打开效果
function SlideAnimation({ isOpen, onToggle, config }: { isOpen: boolean; onToggle: () => void; config: CardConfig }) {
    return (
        <motion.div
            className="relative cursor-pointer overflow-hidden rounded-xl"
            onClick={onToggle}
            style={{
                width: `${REAL_CARD_SIZE.width}px`,
                height: `${REAL_CARD_SIZE.height}px`
            }}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    y: isOpen ? "-100%" : "0%",
                    opacity: isOpen ? 0 : 1
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
            >
                <CardCover isOpen={false} onToggle={onToggle} config={config} />
            </motion.div>

            <motion.div
                className="absolute inset-0"
                animate={{
                    y: isOpen ? "0%" : "100%",
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
            >
                <CardInside config={config} />
            </motion.div>
        </motion.div>
    );
}

export default function CardAnimations({ isOpen, onToggle, config, animationType }: CardAnimationsProps) {
    switch (animationType) {
        case 'fold':
            return <FoldAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'flip':
            return <FlipAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'gatefold':
            return <GatefoldAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'accordion':
            return <AccordionAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'reveal':
            return <RevealAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'rotate':
            return <RotateAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'zoom':
            return <ZoomAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        case 'slide':
            return <SlideAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
        default:
            return <FoldAnimation isOpen={isOpen} onToggle={onToggle} config={config} />;
    }
}
