// 卡片类型枚举
export enum CardType {
  BIRTHDAY = 'birthday',
  WEDDING = 'wedding',
  CONGRATULATIONS = 'congratulations',
  THANK_YOU = 'thank_you',
  NEW_YEAR = 'new_year',
  VALENTINE = 'valentine',
  CHRISTMAS = 'christmas',
  CUSTOM = 'custom'
}

// 卡片主题
export enum CardTheme {
  ELEGANT = 'elegant',
  CUTE = 'cute',
  MODERN = 'modern',
  VINTAGE = 'vintage',
  NATURE = 'nature'
}

// 装饰图案类型
export enum DecorationType {
  FLOWERS = 'flowers',
  STARS = 'stars',
  HEARTS = 'hearts',
  BALLOONS = 'balloons',
  SNOWFLAKES = 'snowflakes',
  LEAVES = 'leaves',
  CONFETTI = 'confetti',
  RIBBON = 'ribbon'
}

// 卡片颜色方案
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

// 装饰图案
export interface Decoration {
  type: DecorationType;
  position: { x: number; y: number };
  size: number;
  rotation: number;
  opacity: number;
}

// 卡片数据
export interface Card {
  id: string;
  type: CardType;
  theme: CardTheme;
  message: string;
  recipient?: string;
  sender?: string;
  colorScheme: ColorScheme;
  decorations: Decoration[];
  musicUrl: string;
  createdAt: Date;
}

// 卡片尺寸（标准卡片：5x7英寸 = 127x178mm）
export const CARD_DIMENSIONS = {
  desktop: {
    width: 350,
    height: 490,
    ratio: 5 / 7
  },
  tablet: {
    width: 300,
    height: 420,
    ratio: 5 / 7
  },
  mobile: {
    width: 280,
    height: 392,
    ratio: 5 / 7
  }
} as const;

// 获取响应式卡片尺寸
export function getResponsiveCardSize(): { width: number; height: number; ratio: number } {
  if (typeof window === 'undefined') {
    return CARD_DIMENSIONS.desktop;
  }

  const width = window.innerWidth;
  if (width < 640) {
    return CARD_DIMENSIONS.mobile;
  } else if (width < 1024) {
    return CARD_DIMENSIONS.tablet;
  }
  return CARD_DIMENSIONS.desktop;
}
