'use client';

import { useState } from 'react';
import type { Card } from '@/types/card';
import { CardType, CardTheme } from '@/types/card';
import { generateCard, regenerateCardMessage, changeCardTheme } from '@/services/cardGenerator';
import CardSelector from '@/components/CardSelector';
import CardView from '@/components/Card';

export default function Home() {
  const [selectedType, setSelectedType] = useState<CardType>(CardType.BIRTHDAY);
  const [selectedTheme, setSelectedTheme] = useState<CardTheme>(CardTheme.ELEGANT);
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [showCard, setShowCard] = useState(false);

  const handleGenerate = () => {
    const newCard = generateCard(selectedType, selectedTheme, recipient || undefined, sender || undefined);
    setCurrentCard(newCard);
    setShowCard(true);
  };

  const handleRegenerateMessage = () => {
    if (currentCard) {
      setCurrentCard(regenerateCardMessage(currentCard));
    }
  };

  const handleChangeTheme = (theme: CardTheme) => {
    if (currentCard) {
      setCurrentCard(changeCardTheme(currentCard, theme));
      setSelectedTheme(theme);
    }
  };

  const handleBackToSelection = () => {
    setShowCard(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100">
      {/* 头部 */}
      <header className="py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          🎴 数字贺卡生成器
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          使用AI生成精美的个性化贺卡
        </p>
      </header>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 pb-12">
        {!showCard ? (
          <>
            {/* 卡片选择器 */}
            <CardSelector
              selectedType={selectedType}
              selectedTheme={selectedTheme}
              onTypeChange={setSelectedType}
              onThemeChange={setSelectedTheme}
              recipient={recipient}
              sender={sender}
              onRecipientChange={setRecipient}
              onSenderChange={setSender}
              onGenerate={handleGenerate}
            />

            {/* 功能说明 */}
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white/80 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                ✨ 功能特色
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">🤖</span>
                  <span><strong>AI智能生成：</strong>大语言模型随机生成独特祝福语</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎨</span>
                  <span><strong>精美图案：</strong>自动生成装饰图案，视觉美观</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📐</span>
                  <span><strong>真实尺寸：</strong>标准5x7英寸卡片比例（350x490像素）</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎵</span>
                  <span><strong>背景音乐：</strong>匹配不同卡片类型的音乐</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔄</span>
                  <span><strong>3D翻转效果：</strong>点击卡片查看正反面</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            {/* 操作按钮 */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleBackToSelection}
                className="px-6 py-3 bg-white rounded-xl shadow hover:shadow-lg transition-all font-medium text-gray-700"
              >
                ← 返回选择
              </button>
              <button
                onClick={handleRegenerateMessage}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow hover:shadow-lg transition-all font-medium"
              >
                🔄 重新生成祝福语
              </button>
            </div>

            {/* 快速换主题 */}
            <div className="mb-6 flex gap-2 flex-wrap justify-center">
              <span className="text-gray-600 font-medium mr-2">快速换主题：</span>
              {[
                { value: CardTheme.ELEGANT, label: '优雅' },
                { value: CardTheme.CUTE, label: '可爱' },
                { value: CardTheme.MODERN, label: '现代' },
                { value: CardTheme.VINTAGE, label: '复古' },
                { value: CardTheme.NATURE, label: '自然' }
              ].map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleChangeTheme(theme.value)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedTheme === theme.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>

            {/* 卡片展示 */}
            {currentCard && (
              <CardView card={currentCard} />
            )}

            {/* 提示 */}
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>💡 提示：点击卡片可翻转查看背面</p>
              <p className="mt-1">🎵 点击右上角按钮控制背景音乐</p>
            </div>
          </div>
        )}
      </div>

      {/* 页脚 */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>使用 Next.js + React + TypeScript 构建 | AI驱动的贺卡生成器</p>
      </footer>
    </main>
  );
}
