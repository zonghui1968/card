"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShareControl() {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEmail = () => {
        const subject = encodeURIComponent("You've received a special card!");
        const body = encodeURIComponent(`Check out this card: ${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="fixed top-4 left-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
            >
                <Share2 className="w-6 h-6 text-indigo-500" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-12 left-0 bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-4 w-64 border border-zinc-200 dark:border-zinc-800"
                    >
                        <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Share this Card</h3>

                        <div className="flex flex-col gap-2">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-3 w-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-sm text-zinc-600 dark:text-zinc-300"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied Link!" : "Copy Link"}
                            </button>

                            <button
                                onClick={handleEmail}
                                className="flex items-center gap-3 w-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-sm text-zinc-600 dark:text-zinc-300"
                            >
                                <Mail className="w-4 h-4" />
                                Send via Email
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
