"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Eye, EyeOff, Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIProviderConfig {
    id: 'google' | 'zhipu';
    name: string;
    icon: string;
    color: string;
    storageKey: string;
    description: string;
    apiUrl: string;
}

const AI_PROVIDERS: AIProviderConfig[] = [
    {
        id: 'google',
        name: 'Google AI',
        icon: '🔍',
        color: 'from-blue-500 to-purple-500',
        storageKey: 'google_api_key',
        description: 'Gemini AI 生成祝福语',
        apiUrl: 'https://aistudio.google.com/app/apikey'
    },
    {
        id: 'zhipu',
        name: '智谱AI',
        icon: '🤖',
        color: 'from-cyan-500 to-blue-500',
        storageKey: 'zhipu_api_key',
        description: 'GLM-4 生成祝福语',
        apiUrl: 'https://open.bigmodel.cn/usercenter/apikeys'
    }
];

interface ApiKeySettingsProps {
    onApiKeyChange: (provider: 'google' | 'zhipu', apiKey: string | null) => void;
}

export default function GoogleApiKeySettings({ onApiKeyChange }: ApiKeySettingsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeProvider, setActiveProvider] = useState<'google' | 'zhipu'>('google');
    const [apiKeys, setApiKeys] = useState<{ google: string; zhipu: string }>({ google: '', zhipu: '' });
    const [showKey, setShowKey] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [hasApiKeys, setHasApiKeys] = useState<{ google: boolean; zhipu: boolean }>({ google: false, zhipu: false });

    // 从localStorage加载已保存的API Keys
    useEffect(() => {
        AI_PROVIDERS.forEach(provider => {
            const savedKey = localStorage.getItem(provider.storageKey);
            if (savedKey) {
                setApiKeys(prev => ({ ...prev, [provider.id]: savedKey }));
                setHasApiKeys(prev => ({ ...prev, [provider.id]: true }));
                onApiKeyChange(provider.id, savedKey);
            }
        });
    }, [onApiKeyChange]);

    const handleSave = (providerId: 'google' | 'zhipu') => {
        const key = apiKeys[providerId];
        if (key.trim()) {
            const provider = AI_PROVIDERS.find(p => p.id === providerId)!;
            localStorage.setItem(provider.storageKey, key.trim());
            setHasApiKeys(prev => ({ ...prev, [providerId]: true }));
            onApiKeyChange(providerId, key.trim());
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    const handleClear = (providerId: 'google' | 'zhipu') => {
        const provider = AI_PROVIDERS.find(p => p.id === providerId)!;
        localStorage.removeItem(provider.storageKey);
        setApiKeys(prev => ({ ...prev, [providerId]: '' }));
        setHasApiKeys(prev => ({ ...prev, [providerId]: false }));
        onApiKeyChange(providerId, null);
    };

    const maskKey = (key: string) => {
        if (key.length <= 10) return key;
        return key.substring(0, 8) + "..." + key.substring(key.length - 4);
    };

    const activeProviderConfig = AI_PROVIDERS.find(p => p.id === activeProvider)!;

    return (
        <>
            {/* 设置按钮 */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 relative",
                    (hasApiKeys.google || hasApiKeys.zhipu)
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-110"
                        : "bg-white/80 dark:bg-black/80 hover:scale-110"
                )}
                title="AI 模型设置"
            >
                <Key className="w-5 h-5" />
                {(hasApiKeys.google || hasApiKeys.zhipu) && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>

            {/* 设置面板 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed top-20 right-4 w-96 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl z-50 p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-cyan-500" />
                                AI 模型设置
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* AI提供商选择 */}
                        <div className="flex gap-2 mb-4">
                            {AI_PROVIDERS.map(provider => (
                                <button
                                    key={provider.id}
                                    onClick={() => setActiveProvider(provider.id as 'google' | 'zhipu')}
                                    className={cn(
                                        "flex-1 px-3 py-2 rounded-xl font-medium transition-all text-sm",
                                        activeProvider === provider.id
                                            ? `bg-gradient-to-r ${provider.color} text-white`
                                            : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                    )}
                                >
                                    {provider.icon} {provider.name}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {/* API Key 输入 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    {activeProviderConfig.name} API Key
                                </label>
                                <div className="relative">
                                    <input
                                        type={showKey ? "text" : "password"}
                                        value={apiKeys[activeProvider]}
                                        onChange={(e) => setApiKeys(prev => ({ ...prev, [activeProvider]: e.target.value }))}
                                        placeholder={`输入您的 ${activeProviderConfig.name} API Key`}
                                        className={cn(
                                            "w-full px-4 py-3 pr-12 rounded-xl border-2 transition-all",
                                            "bg-white dark:bg-zinc-800",
                                            "border-gray-200 dark:border-zinc-700",
                                            `focus:border-${activeProvider === 'google' ? 'purple' : 'cyan'}-500 focus:ring-2 focus:ring-${activeProvider === 'google' ? 'purple' : 'cyan'}-200`,
                                            "text-gray-800 dark:text-gray-200"
                                        )}
                                    />
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* 状态提示 */}
                            {hasApiKeys[activeProvider] && !apiKeys[activeProvider] && (
                                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
                                    <Check className="w-4 h-4" />
                                    已保存: {maskKey(localStorage.getItem(activeProviderConfig.storageKey) || "")}
                                </div>
                            )}

                            {/* 功能说明 */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-800 rounded-xl p-3 space-y-2">
                                <p className="font-medium">{activeProviderConfig.icon} {activeProviderConfig.name} 功能：</p>
                                <p>{activeProviderConfig.description}</p>
                                <p className="text-[10px] opacity-70">
                                    获取API Key: <a href={activeProviderConfig.apiUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{activeProviderConfig.name} 控制台</a>
                                </p>
                            </div>

                            {/* 按钮 */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave(activeProvider)}
                                    disabled={!apiKeys[activeProvider].trim()}
                                    className={cn(
                                        "flex-1 px-4 py-3 rounded-xl font-medium transition-all",
                                        `bg-gradient-to-r ${activeProviderConfig.color} text-white`,
                                        "hover:shadow-lg hover:scale-105",
                                        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                                        "flex items-center justify-center gap-2"
                                    )}
                                >
                                    {isSaved ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            已保存
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            保存 API Key
                                        </>
                                    )}
                                </button>
                                {hasApiKeys[activeProvider] && (
                                    <button
                                        onClick={() => handleClear(activeProvider)}
                                        className="px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        清除
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
