"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { Music, Settings, Volume2, VolumeX, Sparkles } from "lucide-react";
import BackgroundMusic from "./BackgroundMusic";
import ShareControl from "./ShareControl";
import CardAnimations from "./CardAnimations";
import GoogleApiKeySettings from "./GoogleApiKeySettings";
import AIContentPanel from "./AIContentPanel";
import { CARD_TYPES, CardConfig, AnimationType, ANIMATION_MODES, REAL_CARD_SIZE } from "@/data/cardOptions";
import { googleAIService, GeneratedMessage } from "@/services/googleAIService";
import { zhipuAIService, ZhipuGeneratedMessage } from "@/services/zhipuAIService";
import { imageGenerationService } from "@/services/imageGenService";

export default function CardWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentCardId, setCurrentCardId] = useState(CARD_TYPES[0].id);
    const [animationType, setAnimationType] = useState<AnimationType>('fold');
    const [showSettings, setShowSettings] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [showConfetti, setShowConfetti] = useState(false);
    const [customConfig, setCustomConfig] = useState<Partial<CardConfig> | null>(null);

    const activeConfig = customConfig && customConfig.id === currentCardId
        ? { ...CARD_TYPES.find(c => c.id === currentCardId)!, ...customConfig }
        : CARD_TYPES.find(c => c.id === currentCardId) || CARD_TYPES[0];

    // 处理API Key变化
    const handleApiKeyChange = (provider: 'google' | 'zhipu', apiKey: string | null) => {
        if (apiKey) {
            if (provider === 'google') {
                googleAIService.setApiKey(apiKey);
                imageGenerationService.setApiKey(apiKey);
            } else {
                zhipuAIService.setApiKey(apiKey);
            }
        } else {
            if (provider === 'google') {
                googleAIService.clearApiKey();
                imageGenerationService.clearApiKey();
            } else {
                zhipuAIService.clearApiKey();
            }
        }
    };

    // 处理AI生成的祝福语
    const handleMessageGenerated = (message: GeneratedMessage | ZhipuGeneratedMessage) => {
        setCustomConfig({
            id: currentCardId,
            inside: {
                ...activeConfig.inside,
                title: message.title,
                message: message.message,
                signature: message.signature
            }
        });
    };

    // 处理AI生成的图片
    const handleImageGenerated = (imageUrl: string) => {
        setCustomConfig({
            id: currentCardId,
            inside: {
                ...activeConfig.inside,
                mediaUrl: imageUrl
            }
        });
    };

    const toggleOpen = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (newState) {
            if (activeConfig.musicUrl) setIsPlaying(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1000);

            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: activeConfig.particles || undefined,
                gravity: 0.8,
                drift: 1
            });
        } else {
            setIsPlaying(false);
        }
    };

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-300, 300], [8, -8]);
    const rotateY = useTransform(x, [-300, 300], [-8, 8]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - rect.left - rect.width / 2;
        const mouseY = event.clientY - rect.top - rect.height / 2;
        x.set(mouseX);
        y.set(mouseY);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const getScaleForScreen = () => {
        if (typeof window === 'undefined') return 0.6;
        const screenWidth = window.innerWidth;
        const cardWidth = REAL_CARD_SIZE.width;
        const padding = 40;
        const availableWidth = screenWidth - padding;
        if (availableWidth >= cardWidth) return 1;
        return Math.max(0.35, availableWidth / cardWidth);
    };

    const scale = getScaleForScreen();

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 p-4 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full opacity-20"
                        style={{
                            width: Math.random() * 300 + 100,
                            height: Math.random() * 300 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: `radial-gradient(circle, ${activeConfig.theme.primaryColor.replace('text-', 'bg-')} 0%, transparent 70%)`
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.3, 0.1],
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <ShareControl />

            {/* 顶部控制栏 - 增强版 */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-4 right-4 flex gap-2 z-50"
            >
                <GoogleApiKeySettings onApiKeyChange={handleApiKeyChange} />

                <AIContentPanel
                    currentCardId={currentCardId}
                    onMessageGenerated={handleMessageGenerated}
                    onImageGenerated={handleImageGenerated}
                />

                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={cn(
                        "p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300",
                        showSettings ? "bg-purple-500 text-white" : "bg-white/80 dark:bg-black/80 hover:scale-110"
                    )}
                    title="动画设置"
                >
                    <Settings className="w-5 h-5" />
                </button>

                {activeConfig.musicUrl && (
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={cn(
                            "p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300",
                            isPlaying ? "bg-green-500 text-white animate-pulse" : "bg-white/80 dark:bg-black/80 hover:scale-110"
                        )}
                    >
                        <Music className="w-5 h-5" />
                    </button>
                )}
            </motion.div>

            {/* 增强的动画模式选择器 */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 px-6 py-5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl z-50 w-[95vw] max-w-md"
                    >
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center justify-between mb-4"
                        >
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-500" />
                                选择3D动画效果
                            </h3>
                        </motion.div>

                        <div className="grid grid-cols-4 gap-3 mb-4">
                            {ANIMATION_MODES.map((mode, i) => (
                                <motion.button
                                    key={mode.id}
                                    onClick={() => {
                                        setAnimationType(mode.id);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 min-w-[70px]",
                                        animationType === mode.id
                                            ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl scale-105"
                                            : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:scale-105"
                                    )}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <span className="text-3xl">{mode.icon}</span>
                                    <span className="text-xs font-medium text-center leading-tight">{mode.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs text-gray-500 dark:text-gray-400 text-center bg-gray-50 dark:bg-zinc-800 rounded-xl p-3"
                        >
                            当前：{ANIMATION_MODES.find(m => m.id === animationType)?.description}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {activeConfig.musicUrl && (
                <div key={activeConfig.musicUrl}>
                    <BackgroundMusic isPlaying={isPlaying} src={activeConfig.musicUrl} />
                </div>
            )}

            {/* Confetti overlay */}
            {showConfetti && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 pointer-events-none z-40"
                    style={{
                        background: `radial-gradient(circle, ${activeConfig.theme.primaryColor}20 0%, transparent 70%)`
                    }}
                />
            )}

            {/* 3D Scene Container - 增强版 */}
            <motion.div
                className="relative"
                style={{
                    width: `${REAL_CARD_SIZE.width}px`,
                    height: `${REAL_CARD_SIZE.height}px`,
                    perspective: "2000px",
                    rotateX: animationType === 'fold' ? (isOpen ? 0 : rotateX) : 0,
                    rotateY: animationType === 'fold' ? (isOpen ? 0 : rotateY) : 0,
                    scale: scale
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <CardAnimations
                        isOpen={isOpen}
                        onToggle={toggleOpen}
                        config={activeConfig}
                        animationType={animationType}
                    />
                </motion.div>
            </motion.div>

            {/* 提示文字 - 增强版 */}
            <motion.p
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center gap-2"
            >
                <span className="animate-bounce">
                    {isOpen ? "✨ 点击卡片关闭 ✨" : "🎴 点击卡片打开 🎴"}
                </span>
            </motion.p>

            {/* 卡片类型选择器 - 增强版 */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl z-50 flex items-center gap-2 overflow-x-auto max-w-[95vw] scrollbar-hide"
            >
                {CARD_TYPES.map((type, i) => (
                    <motion.button
                        key={type.id}
                        onClick={() => {
                            setCurrentCardId(type.id);
                            setIsOpen(false);
                            setIsPlaying(false);
                            setCustomConfig(null); // 清除自定义配置
                        }}
                        className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl min-w-[70px] transition-all duration-300 gap-1 relative",
                            currentCardId === type.id
                                ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-black/5"
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                    >
                        <type.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium whitespace-nowrap">{type.label}</span>
                        {currentCardId === type.id && (
                            <motion.div
                                className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                                layoutId="activeIndicator"
                            />
                        )}
                    </motion.button>
                ))}
            </motion.div>

            {/* 卡片信息显示 - 增强版 */}
            <motion.div
                className="fixed bottom-24 left-1/2 -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 text-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <span className="font-medium">📏 真实卡片：5" × 7"（{REAL_CARD_SIZE.width} × {REAL_CARD_SIZE.height}px）</span>
            </motion.div>
        </div>
    );
}
