'use client';

import { CardType, CardTheme } from '@/types/card';

interface CardSelectorProps {
  selectedType: CardType;
  selectedTheme: CardTheme;
  onTypeChange: (type: CardType) => void;
  onThemeChange: (theme: CardTheme) => void;
  recipient?: string;
  sender?: string;
  onRecipientChange: (value: string) => void;
  onSenderChange: (value: string) => void;
  onGenerate: () => void;
}

const CARD_TYPES = [
  { value: CardType.BIRTHDAY, label: '生日贺卡', emoji: '🎂' },
  { value: CardType.WEDDING, label: '新婚贺卡', emoji: '💒' },
  { value: CardType.CONGRATULATIONS, label: '祝贺贺卡', emoji: '🎉' },
  { value: CardType.THANK_YOU, label: '感谢贺卡', emoji: '🙏' },
  { value: CardType.NEW_YEAR, label: '新年贺卡', emoji: '🎊' },
  { value: CardType.VALENTINE, label: '情人节贺卡', emoji: '💕' },
  { value: CardType.CHRISTMAS, label: '圣诞贺卡', emoji: '🎄' },
  { value: CardType.CUSTOM, label: '定制贺卡', emoji: '✨' }
];

const THEMES = [
  { value: CardTheme.ELEGANT, label: '优雅', description: '简约优雅' },
  { value: CardTheme.CUTE, label: '可爱', description: '活泼可爱' },
  { value: CardTheme.MODERN, label: '现代', description: '现代时尚' },
  { value: CardTheme.VINTAGE, label: '复古', description: '怀旧复古' },
  { value: CardTheme.NATURE, label: '自然', description: '清新自然' }
];

export default function CardSelector({
  selectedType,
  selectedTheme,
  onTypeChange,
  onThemeChange,
  recipient,
  sender,
  onRecipientChange,
  onSenderChange,
  onGenerate
}: CardSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        选择卡片类型
      </h2>

      {/* 卡片类型选择 */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {CARD_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => onTypeChange(type.value)}
            className={`
              flex flex-col items-center p-4 rounded-xl transition-all duration-300
              ${selectedType === type.value
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <span className="text-3xl mb-2">{type.emoji}</span>
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {/* 主题选择 */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800">选择主题风格</h3>
      <div className="grid grid-cols-5 gap-3 mb-8">
        {THEMES.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className={`
              p-3 rounded-lg transition-all duration-300
              ${selectedTheme === theme.value
                ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <div className="text-sm font-medium">{theme.label}</div>
            <div className={`text-xs ${selectedTheme === theme.value ? 'text-white/80' : 'text-gray-500'}`}>
              {theme.description}
            </div>
          </button>
        ))}
      </div>

      {/* 收件人和发件人输入 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            收件人（可选）
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => onRecipientChange(e.target.value)}
            placeholder="输入收件人姓名"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            发件人（可选）
          </label>
          <input
            type="text"
            value={sender}
            onChange={(e) => onSenderChange(e.target.value)}
            placeholder="输入您的姓名"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* 生成按钮 */}
      <button
        onClick={onGenerate}
        className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
      >
        ✨ 生成贺卡
      </button>
    </div>
  );
}
