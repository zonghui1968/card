'use client';

import { useState, useRef, useEffect } from 'react';
import type { Card } from '@/types/card';
import { CARD_DIMENSIONS, getResponsiveCardSize } from '@/types/card';
import Decorations from './Decorations';

interface CardProps {
  card: Card;
  onFlip?: () => void;
  showMusicControl?: boolean;
  onDownload?: () => void;
}

export default function Card({ card, onFlip, showMusicControl = true, onDownload }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMusic, setHasMusic] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [cardSize, setCardSize] = useState<{ width: number; height: number; ratio: number }>(CARD_DIMENSIONS.desktop);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 响应式尺寸更新
  useEffect(() => {
    const updateSize = () => {
      setCardSize(getResponsiveCardSize());
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const toggleMusic = () => {
    if (!audioRef.current || !hasMusic) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // 音乐文件不存在或无法播放
        setHasMusic(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioError = () => {
    setHasMusic(false);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    try {
      // 使用html2canvas需要安装，这里先实现基础版本
      // 实际使用时需要: npm install html2canvas
      onDownload?.();

      // 简单的分享功能
      const shareData = {
        title: '数字贺卡',
        text: card.message,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // 降级到复制链接
        await navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板！');
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const cardStyle = {
    width: `${cardSize.width}px`,
    height: `${cardSize.height}px`
  };

  return (
    <div className="relative" style={cardStyle}>
      <audio
        ref={audioRef}
        src={card.musicUrl}
        loop
        onError={handleAudioError}
        onEnded={() => setIsPlaying(false)}
      />

      {/* 顶部控制按钮 */}
      <div className="absolute -top-12 right-0 flex gap-2">
        {/* 下载/分享按钮 */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: card.colorScheme.primary }}
          title={isDownloading ? '处理中...' : '下载/分享贺卡'}
        >
          {isDownloading ? (
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
        </button>

        {/* 音乐控制按钮 */}
        {showMusicControl && (
          <button
            onClick={toggleMusic}
            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: card.colorScheme.primary }}
            title={hasMusic ? (isPlaying ? '暂停音乐' : '播放音乐') : '音乐文件不可用'}
            disabled={!hasMusic}
          >
            {hasMusic ? (
              isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* 卡片容器 - 3D翻转效果 */}
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={handleFlip}
      >
        {/* 卡片正面 */}
        <div
          className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden backface-hidden"
          style={{
            backgroundColor: card.colorScheme.background,
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* 装饰图案层 */}
          <Decorations decorations={card.decorations} colorScheme={card.colorScheme} />

          {/* 内容层 */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            {/* 卡片类型标题 */}
            <div
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: card.colorScheme.primary }}
            >
              {getCardTypeLabel(card.type)}
            </div>

            {/* 祝福语 */}
            <div
              className="text-2xl font-medium leading-relaxed"
              style={{ color: card.colorScheme.text }}
            >
              {card.message}
            </div>

            {/* 收件人和发件人 */}
            {(card.recipient || card.sender) && (
              <div className="mt-8 space-y-2">
                {card.recipient && (
                  <div
                    className="text-sm"
                    style={{ color: card.colorScheme.secondary }}
                  >
                    致：{card.recipient}
                  </div>
                )}
                {card.sender && (
                  <div
                    className="text-sm"
                    style={{ color: card.colorScheme.secondary }}
                  >
                    —— {card.sender}
                  </div>
                )}
              </div>
            )}

            {/* 点击提示 */}
            <div
              className="absolute bottom-4 text-xs"
              style={{ color: card.colorScheme.secondary }}
            >
              点击卡片查看背面
            </div>
          </div>

          {/* 边框装饰 */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              border: `3px solid ${card.colorScheme.accent}`,
              opacity: 0.3
            }}
          />
        </div>

        {/* 卡片背面 */}
        <div
          className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden backface-hidden flex items-center justify-center"
          style={{
            backgroundColor: card.colorScheme.secondary,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="text-center p-8">
            <div
              className="text-6xl mb-4"
              style={{ color: card.colorScheme.accent }}
            >
              🎁
            </div>
            <div
              className="text-xl font-medium"
              style={{ color: card.colorScheme.background }}
            >
              {getGreetingEmoji(card.type)}
            </div>
            <div
              className="text-sm mt-4"
              style={{ color: card.colorScheme.background }}
            >
              点击返回正面
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCardTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    birthday: '生日贺卡',
    wedding: '新婚贺卡',
    congratulations: '祝贺贺卡',
    thank_you: '感谢贺卡',
    new_year: '新年贺卡',
    valentine: '情人节贺卡',
    christmas: '圣诞贺卡',
    custom: '定制贺卡'
  };
  return labels[type] || '贺卡';
}

function getGreetingEmoji(type: string): string {
  const greetings: Record<string, string> = {
    birthday: '🎂 生日快乐！',
    wedding: '💒 新婚快乐！',
    congratulations: '🎉 恭喜恭喜！',
    thank_you: '🙏 感谢有你！',
    new_year: '🎊 新年快乐！',
    valentine: '💕 情人节快乐！',
    christmas: '🎄 圣诞快乐！',
    custom: '✨ 祝福满满！'
  };
  return greetings[type] || '祝福满满！';
}
