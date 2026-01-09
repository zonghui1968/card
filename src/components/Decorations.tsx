'use client';

import { Decoration, DecorationType } from '@/types/card';
import { useMemo } from 'react';

interface DecorationsProps {
  decorations: Decoration[];
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function Decorations({ decorations, colorScheme }: DecorationsProps) {
  // 为每个装饰生成唯一的动画延迟
  const getAnimationDelay = (index: number) => `${index * 0.1}s`;

  const renderDecoration = (decoration: Decoration, index: number) => {
    const { type, position, size, rotation, opacity } = decoration;
    const baseStyle = {
      position: 'absolute' as const,
      left: `${position.x}%`,
      top: `${position.y}%`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
      opacity,
      animation: `float 3s ease-in-out infinite`,
      animationDelay: getAnimationDelay(index)
    };

    switch (type) {
      case DecorationType.STARS:
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 24 24"
            fill={colorScheme.accent}
            className="drop-shadow-lg"
          >
            <defs>
              <filter id={`glow-${index}`}>
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path filter={`url(#glow-${index})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );

      case DecorationType.HEARTS:
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 24 24"
            fill={colorScheme.accent}
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient id={`heartGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorScheme.accent} />
                <stop offset="100%" stopColor={colorScheme.secondary} />
              </linearGradient>
            </defs>
            <path fill={`url(#heartGrad-${index})`} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );

      case DecorationType.FLOWERS:
        const petalCount = 5 + Math.floor(Math.random() * 3);
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 100 100"
            className="drop-shadow-md"
          >
            <defs>
              <radialGradient id={`flowerGrad-${index}`}>
                <stop offset="0%" stopColor={colorScheme.accent} />
                <stop offset="100%" stopColor={colorScheme.primary} />
              </radialGradient>
            </defs>
            {Array.from({ length: petalCount }).map((_, i) => {
              const angle = (360 / petalCount) * i;
              return (
                <ellipse
                  key={i}
                  cx="50"
                  cy="50"
                  rx="15"
                  ry="25"
                  fill={`url(#flowerGrad-${index})`}
                  opacity="0.7"
                  transform={`rotate(${angle} 50 50) translate(0 -10)`}
                />
              );
            })}
            <circle cx="50" cy="50" r="12" fill={colorScheme.accent} />
          </svg>
        );

      case DecorationType.BALLOONS:
        const balloonColors = [colorScheme.accent, colorScheme.primary, colorScheme.secondary];
        const balloonColor = balloonColors[index % balloonColors.length];
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 24 24"
            className="drop-shadow-lg"
          >
            <defs>
              <radialGradient id={`balloonGrad-${index}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="100%" stopColor={balloonColor} stopOpacity="1" />
              </radialGradient>
            </defs>
            <ellipse cx="12" cy="10" rx="8" ry="10" fill={`url(#balloonGrad-${index})`} stroke={colorScheme.primary} strokeWidth="0.5" />
            <path d="M12 20 L12 24" stroke={colorScheme.primary} strokeWidth="1" />
            <path d="M10 22 Q12 24 14 22" stroke={colorScheme.primary} strokeWidth="1" fill="none" />
          </svg>
        );

      case DecorationType.SNOWFLAKES:
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 100 100"
            fill="none"
            stroke={colorScheme.accent}
            strokeWidth="2"
            className="drop-shadow-md"
          >
            <g>
              <path d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M80 20 L20 80" />
              <path d="M50 20 L55 30 M50 20 L45 30 M50 80 L55 70 M50 80 L45 70" />
              <path d="M20 50 L30 55 M20 50 L30 45 M80 50 L70 55 M80 50 L70 45" />
            </g>
          </svg>
        );

      case DecorationType.LEAVES:
        const leafColors = [colorScheme.primary, colorScheme.secondary, '#4a7c59', '#6b8e23'];
        const leafColor = leafColors[index % leafColors.length];
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 100 100"
            className="drop-shadow-md"
          >
            <defs>
              <linearGradient id={`leafGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={leafColor} />
                <stop offset="100%" stopColor={colorScheme.primary} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#leafGrad-${index})`}
              d="M50 20 Q80 20 85 50 Q80 80 50 85 Q20 80 15 50 Q20 20 50 20 Z"
            />
            <path
              stroke={colorScheme.primary}
              strokeWidth="1"
              fill="none"
              d="M50 20 Q50 50 50 85"
              opacity="0.5"
            />
          </svg>
        );

      case DecorationType.CONFETTI:
        const confettiShapes = ['circle', 'square', 'triangle'];
        const shape = confettiShapes[index % confettiShapes.length];
        const confettiColors = [colorScheme.accent, colorScheme.primary, colorScheme.secondary, '#ffd700', '#ff69b4'];
        const confettiColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        if (shape === 'circle') {
          return (
            <div
              key={index}
              style={{
                ...baseStyle,
                width: `${size / 3}px`,
                height: `${size / 3}px`,
                borderRadius: '50%',
                backgroundColor: confettiColor,
                boxShadow: `0 0 6px ${confettiColor}`
              }}
            />
          );
        } else if (shape === 'square') {
          return (
            <div
              key={index}
              style={{
                ...baseStyle,
                width: `${size / 3}px`,
                height: `${size / 3}px`,
                backgroundColor: confettiColor,
                boxShadow: `0 0 6px ${confettiColor}`
              }}
            />
          );
        } else {
          return (
            <svg
              key={index}
              style={baseStyle}
              viewBox="0 0 24 24"
              className="drop-shadow-md"
            >
              <path
                d="M12 2 L22 20 L2 20 Z"
                fill={confettiColor}
              />
            </svg>
          );
        }

      case DecorationType.RIBBON:
        return (
          <svg
            key={index}
            style={baseStyle}
            viewBox="0 0 100 100"
            className="drop-shadow-lg"
          >
            <defs>
              <linearGradient id={`ribbonGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colorScheme.accent} />
                <stop offset="50%" stopColor={colorScheme.secondary} />
                <stop offset="100%" stopColor={colorScheme.accent} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#ribbonGrad-${index})`}
              d="M50 10 L60 40 L90 45 L65 65 L70 95 L50 80 L30 95 L35 65 L10 45 L40 40 Z"
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
      {decorations.map((decoration, index) => renderDecoration(decoration, index))}
    </div>
  );
}
