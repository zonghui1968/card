import { Card, CardType, CardTheme, Decoration, DecorationType } from '@/types/card';
import { MESSAGES, COLOR_SCHEMES, MUSIC_MAP, DECORATION_PATTERNS } from '@/data/messages';

// 存储历史记录
const cardHistory: Card[] = [];

/**
 * 随机生成祝福语
 */
export function generateMessage(type: CardType): string {
  const messages = MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * 使用AI生成祝福语（增强版 - 模拟大语言模型生成）
 * 在实际应用中，这里可以调用真实的AI API
 */
export function generateAIMessage(type: CardType, recipient?: string, sender?: string): string {
  const baseMessages = MESSAGES[type];

  // AI风格变体生成器
  const aiVariations = [
    // 原始消息
    (msg: string) => msg,
    // 添加情感前缀
    (msg: string) => {
      const prefixes = ['💝 ', '✨ ', '🌟 ', '💫 ', '🎉 ', '🌈 '];
      return prefixes[Math.floor(Math.random() * prefixes.length)] + msg;
    },
    // 添加祝福后缀
    (msg: string) => {
      const suffixes = [
        '祝福满满！',
        '心想事成！',
        '万事如意！',
        '好运连连！',
        '幸福安康！'
      ];
      return msg + suffixes[Math.floor(Math.random() * suffixes.length)];
    },
    // 强调语气
    (msg: string) => msg.replace(/！/g, '！！'),
    // 添加温暖表达
    (msg: string) => `愿这份祝福${msg.slice(0, 2)} === '愿' ? msg : '带给你温暖与欢乐，' + msg}`,
  ];

  const template = baseMessages[Math.floor(Math.random() * baseMessages.length)];
  const variation = aiVariations[Math.floor(Math.random() * aiVariations.length)];
  let message = variation(template);

  // 根据是否有收件人名称进行个性化
  if (recipient) {
    const prefixes = [
      `亲爱的${recipient}：`,
      `${recipient}，`,
      `致${recipient}——`,
      `嘿，${recipient}！`
    ];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    message = `${prefix}${message}`;
  }

  // 如果有发件人，可以添加署名提示
  if (sender && Math.random() > 0.7) {
    message = message.replace(/！/g, `——来自${sender}的祝福！`);
  }

  return message;
}

/**
 * 生成装饰图案（优化版）
 */
export function generateDecorations(type: CardType, count: number = 20): Decoration[] {
  const patterns = DECORATION_PATTERNS[type];
  const decorations: Decoration[] = [];

  // 确保装饰分布均匀
  const gridSize = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const decorationType = patterns[Math.floor(Math.random() * patterns.length)];

    // 使用网格系统避免过度聚集
    const gridX = (i % gridSize) / gridSize;
    const gridY = Math.floor(i / gridSize) / gridSize;
    const randomness = 0.15; // 15%的随机偏移

    decorations.push({
      type: decorationType,
      position: {
        x: (gridX + (Math.random() - 0.5) * randomness) * 100,
        y: (gridY + (Math.random() - 0.5) * randomness) * 100
      },
      size: 12 + Math.random() * 35,
      rotation: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.6
    });
  }

  return decorations;
}

/**
 * 随机选择音乐
 */
export function selectMusic(type: CardType): string {
  const musicList = MUSIC_MAP[type];
  return musicList[Math.floor(Math.random() * musicList.length)];
}

/**
 * 生成完整卡片
 */
export function generateCard(
  type: CardType,
  theme: CardTheme,
  recipient?: string,
  sender?: string
): Card {
  const message = generateAIMessage(type, recipient, sender);
  const colorScheme = COLOR_SCHEMES[theme];
  const decorations = generateDecorations(type);
  const musicUrl = selectMusic(type);

  const card: Card = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    type,
    theme,
    message,
    recipient,
    sender,
    colorScheme,
    decorations,
    musicUrl,
    createdAt: new Date()
  };

  // 添加到历史记录
  cardHistory.unshift(card);
  if (cardHistory.length > 20) {
    cardHistory.pop(); // 保留最近20个
  }

  return card;
}

/**
 * 重新生成卡片消息（保留其他设置）
 */
export function regenerateCardMessage(card: Card): Card {
  const newMessage = generateAIMessage(card.type, card.recipient, card.sender);

  // 生成新的装饰图案以保持新鲜感
  const newDecorations = generateDecorations(card.type);

  const updatedCard: Card = {
    ...card,
    message: newMessage,
    decorations: newDecorations,
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    createdAt: new Date()
  };

  // 更新历史记录
  const historyIndex = cardHistory.findIndex(c => c.id === card.id);
  if (historyIndex !== -1) {
    cardHistory[historyIndex] = updatedCard;
  }

  return updatedCard;
}

/**
 * 更换卡片主题
 */
export function changeCardTheme(card: Card, newTheme: CardTheme): Card {
  const updatedCard: Card = {
    ...card,
    theme: newTheme,
    colorScheme: COLOR_SCHEMES[newTheme],
    decorations: generateDecorations(card.type),
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    createdAt: new Date()
  };

  // 更新历史记录
  const historyIndex = cardHistory.findIndex(c => c.id === card.id);
  if (historyIndex !== -1) {
    cardHistory[historyIndex] = updatedCard;
  }

  return updatedCard;
}

/**
 * 获取历史记录
 */
export function getCardHistory(): Card[] {
  return [...cardHistory];
}

/**
 * 清空历史记录
 */
export function clearCardHistory(): void {
  cardHistory.length = 0;
}

/**
 * 从历史记录恢复卡片
 */
export function restoreCardFromHistory(cardId: string): Card | null {
  const card = cardHistory.find(c => c.id === cardId);
  return card ? { ...card } : null;
}
