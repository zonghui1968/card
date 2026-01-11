"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Sparkles, RefreshCw, Image as ImageIcon, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { googleAIService, GeneratedMessage } from "@/services/googleAIService";
import { zhipuAIService, ZhipuGeneratedMessage } from "@/services/zhipuAIService";
import { imageGenerationService } from "@/services/imageGenService";

type AIProvider = 'google' | 'zhipu';

interface AIContentPanelProps {
    currentCardId: string;
    onMessageGenerated: (message: GeneratedMessage | ZhipuGeneratedMessage) => void;
    onImageGenerated: (imageUrl: string) => void;
    availableProviders?: AIProvider[];
}

export default function AIContentPanel({
    currentCardId,
    onMessageGenerated,
    onImageGenerated,
    availableProviders = ['google', 'zhipu']
}: AIContentPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationType, setGenerationType] = useState<'message' | 'image' | null>(null);
    const [customPrompt, setCustomPrompt] = useState("");
    const [selectedProvider, setSelectedProvider] = useState<AIProvider>('google');

    const generateMessage = async () => {
        setIsGenerating(true);
        setGenerationType('message');

        try {
            let message: GeneratedMessage | ZhipuGeneratedMessage;

            if (selectedProvider === 'google') {
                message = await googleAIService.generateCardMessage(
                    currentCardId,
                    customPrompt || undefined
                );
            } else {
                message = await zhipuAIService.generateCardMessage(
                    currentCardId,
                    customPrompt || undefined
                );
            }

            onMessageGenerated(message);
            setIsOpen(false);
        } catch (error) {
            console.error('生成祝福语失败:', error);
            alert(`生成祝福语失败：${error instanceof Error ? error.message : '未知错误'}`);
        } finally {
            setIsGenerating(false);
            setGenerationType(null);
        }
    };

    const generateImage = async () => {
        setIsGenerating(true);
        setGenerationType('image');

        try {
            const imageUrl = await imageGenerationService.generateImageForCard(
                currentCardId,
                customPrompt || undefined
            );
            onImageGenerated(imageUrl);
            setIsOpen(false);
        } catch (error) {
            console.error('生成图片失败:', error);
            alert('生成图片失败，请检查API Key设置');
        } finally {
            setIsGenerating(false);
            setGenerationType(null);
        }
    };

    const allProviders = [
        { id: 'google' as const, name: 'Google AI', icon: '🔍', color: 'from-blue-500 to-purple-500' },
        { id: 'zhipu' as const, name: '智谱AI', icon: '🤖', color: 'from-cyan-500 to-blue-500' }
    ];

    const providers = allProviders.filter(p => availableProviders.includes(p.id));

    return (
        <>
            {/* AI按钮 */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300",
                    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-110"
                )}
                title="AI 内容生成"
            >
                <Wand2 className="w-5 h-5" />
            </motion.button>

            {/* AI控制面板 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-20 right-16 w-96 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl z-50 p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                AI 内容生成
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* AI提供商选择 */}
                            {providers.length > 1 && (
                                <div className="flex gap-2">
                                    {providers.map(provider => (
                                        <button
                                            key={provider.id}
                                            onClick={() => setSelectedProvider(provider.id)}
                                            className={cn(
                                                "flex-1 px-3 py-2 rounded-xl font-medium transition-all text-sm",
                                                selectedProvider === provider.id
                                                    ? `bg-gradient-to-r ${provider.color} text-white`
                                                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                                            )}
                                        >
                                            {provider.icon} {provider.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* 当前使用的AI */}
                            {providers.length === 1 && (
                                <div className={cn(
                                    "text-center py-2 px-4 rounded-xl text-sm font-medium",
                                    `bg-gradient-to-r ${providers[0].color} text-white`
                                )}>
                                    {providers[0].icon} {providers[0].name}
                                </div>
                            )}

                            {/* 自定义提示词输入 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    自定义提示词（可选）
                                </label>
                                <textarea
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                    placeholder="例如：生日快乐，祝愿你永远年轻美丽..."
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl border-2 transition-all resize-none",
                                        "bg-white dark:bg-zinc-800",
                                        "border-gray-200 dark:border-zinc-700",
                                        "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800",
                                        "text-gray-800 dark:text-gray-200",
                                        "h-20"
                                    )}
                                />
                            </div>

                            {/* 生成按钮 */}
                            <div className="space-y-2">
                                <button
                                    onClick={generateMessage}
                                    disabled={isGenerating}
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl font-medium transition-all",
                                        "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                                        "hover:shadow-lg hover:scale-105",
                                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                                        "flex items-center justify-center gap-2"
                                    )}
                                >
                                    {isGenerating && generationType === 'message' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            生成中...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4" />
                                            生成祝福语
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={generateImage}
                                    disabled={isGenerating}
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl font-medium transition-all",
                                        "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
                                        "hover:shadow-lg hover:scale-105",
                                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                                        "flex items-center justify-center gap-2"
                                    )}
                                >
                                    {isGenerating && generationType === 'image' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            生成中...
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="w-4 h-4" />
                                            生成图片
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* 说明 */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-800 rounded-xl p-3">
                                <p className="font-medium mb-1">💡 提示：</p>
                                <ul className="space-y-1 text-[10px]">
                                    <li>• 使用 {selectedProvider === 'google' ? 'Google Gemini' : '智谱GLM-4'} AI 生成内容</li>
                                    <li>• 支持自定义提示词调整生成风格</li>
                                    <li>• 生成的内容会自动应用到当前卡片</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
