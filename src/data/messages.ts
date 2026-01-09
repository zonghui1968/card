import { CardType, CardTheme, ColorScheme, DecorationType } from '@/types/card';

// 中文祝福语库
export const MESSAGES: Record<CardType, string[]> = {
  [CardType.BIRTHDAY]: [
    '生日快乐！愿你的每一天都充满阳光和欢笑！',
    '祝你生日快乐，愿你心想事成，万事如意！',
    '生日快乐！愿你新的一岁里平安喜乐，福气满满！',
    '愿你的生日充满无限的欢乐，愿你今天的回忆温馨，愿你今天的梦想甜美！',
    '生日快乐！愿你的生活如诗般美好，如画般绚烂！',
    '在这特殊的日子里，祝你生日快乐，愿你永远年轻，永远热泪盈眶！',
    '愿你的生日如星光般璀璨，愿你的未来如彩虹般绚丽！',
    '祝你生日快乐，愿所有的幸福都围绕着你！',
    '生日快乐！愿你被世界温柔以待，愿你眼中有光，心中有爱！',
    '愿你的每一个愿望都能实现，生日快乐！'
  ],
  [CardType.WEDDING]: [
    '恭喜你们喜结良缘！愿你们永浴爱河，白头偕老！',
    '祝福你们新婚快乐！愿你们携手共度美好人生！',
    '恭喜新婚！愿你们的爱情如美酒般醇厚，如钻石般永恒！',
    '祝福你们！愿你们执子之手，与子偕老，幸福美满！',
    '新婚快乐！愿你们相敬如宾，永结同心！',
    '恭喜你们！愿你们的婚姻生活幸福美满，早生贵子！',
    '祝福你们新婚大喜！愿你们恩爱一生，幸福永远！',
    '愿你们的爱情故事，如童话般美好，永远延续！',
    '新婚之喜！愿你们琴瑟和鸣，白首不离！',
    '恭喜你们找到彼此，愿你们珍惜这份缘分，相爱一生！'
  ],
  [CardType.CONGRATULATIONS]: [
    '恭喜你！愿这份成功是你美好未来的开始！',
    '祝贺你！你的努力终于得到了回报！',
    '恭喜！愿你的成就如星辰般闪耀，继续前行！',
    '太棒了！你的成功实至名归，继续加油！',
    '恭喜你取得如此优异的成绩！愿未来更加辉煌！',
    '为你感到骄傲！愿你的梦想一一实现！',
    '恭喜恭喜！愿你再创佳绩，更上一层楼！',
    '祝贺你！愿好运与成功永远伴随你！',
    '恭喜！愿这份喜悦给你带来无限的动力！',
    '太厉害了！你的成就值得所有的赞美！'
  ],
  [CardType.THANK_YOU]: [
    '衷心感谢你的帮助！你的善意温暖了我的心。',
    '谢谢！有你真好，愿善良的你被世界温柔以待。',
    '万分感谢！你的帮助如雪中送炭，铭记在心。',
    '谢谢你的无私帮助！愿好人一生平安！',
    '感激不尽！你的善意让世界变得更美好。',
    '谢谢！愿你的善良如春风，温暖更多的人。',
    '衷心感谢！你的帮助让我感受到人间的温暖。',
    '谢谢！愿你的每一份善意都化作幸福的回报。',
    '万分感谢！愿好人有好报，幸福永远伴随你。',
    '谢谢！你的帮助如明灯，照亮我前行的路。'
  ],
  [CardType.NEW_YEAR]: [
    '新年快乐！愿你新年新气象，万事如意！',
    '新春大吉！愿你阖家欢乐，幸福安康！',
    '新年快乐！愿你在新的一年里心想事成！',
    '恭喜发财！愿你财源广进，年年有余！',
    '新年快乐！愿你的生活如春花般绚烂！',
    '新春快乐！愿你步步高升，前程似锦！',
    '新年好！愿你平安喜乐，福气满满！',
    '恭喜新禧！愿你身体健康，万事顺遂！',
    '新年快乐！愿你的梦想在新的一年绽放！',
    '新春到来！愿你笑口常开，幸福永驻！'
  ],
  [CardType.VALENTINE]: [
    '情人节快乐！你是我心中最美的风景。',
    '我爱你，愿我们的爱情永恒不变！',
    '情人节快乐！愿我们的每一天都充满爱意。',
    '你是我今生最美的遇见，情人节快乐！',
    '爱你是我这辈子最幸福的事，情人节快乐！',
    '愿我们的爱情如巧克力般甜蜜，情人节快乐！',
    '你是我的唯一，我爱你，情人节快乐！',
    '愿我们的爱情故事永远延续，情人节快乐！',
    '谢谢你给我的爱，情人节快乐，我的挚爱！',
    '愿我们的爱情如玫瑰般绽放，情人节快乐！'
  ],
  [CardType.CHRISTMAS]: [
    '圣诞快乐！愿圣诞老人给你带来满满的礼物！',
    '圣诞快乐！愿你拥有一个温馨美好的圣诞节！',
    'Merry Christmas！愿圣诞的祝福温暖你的心！',
    '圣诞快乐！愿平安夜带给你无限的欢乐！',
    '祝你圣诞快乐！愿节日气氛充满你的家！',
    '圣诞快乐！愿雪花带给你纯洁的快乐！',
    'Merry Christmas！愿这个圣诞节成为你美好的回忆！',
    '圣诞快乐！愿圣诞的钟声带给你平安和喜悦！',
    '祝你圣诞快乐！愿你的心愿都能实现！',
    '圣诞快乐！愿节日的欢乐伴随你和你的家人！'
  ],
  [CardType.CUSTOM]: [
    '愿美好的祝福永远伴随你！',
    '祝你天天开心，事事顺心！',
    '愿所有美好的事物都来到你身边！',
    '祝你心想事成，万事如意！',
    '愿你被世界温柔以待！',
    '愿幸福和快乐永远陪伴你！',
    '祝你前程似锦，未来可期！',
    '愿你的每一天都充满阳光！'
  ]
};

// 颜色方案
export const COLOR_SCHEMES: Record<CardTheme, ColorScheme> = {
  [CardTheme.ELEGANT]: {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#e94560',
    text: '#1a1a2e',
    background: '#fafafa'
  },
  [CardTheme.CUTE]: {
    primary: '#ff6b9d',
    secondary: '#c44569',
    accent: '#ffd93d',
    text: '#2d3436',
    background: '#fff5f8'
  },
  [CardTheme.MODERN]: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    text: '#1a202c',
    background: '#f7fafc'
  },
  [CardTheme.VINTAGE]: {
    primary: '#8b7355',
    secondary: '#d4a574',
    accent: '#c9a86c',
    text: '#3d2914',
    background: '#faf8f5'
  },
  [CardTheme.NATURE]: {
    primary: '#134e5e',
    secondary: '#71b280',
    accent: '#a8e063',
    text: '#1a3a40',
    background: '#f0f9f4'
  }
};

// 音乐映射
export const MUSIC_MAP: Record<CardType, string[]> = {
  [CardType.BIRTHDAY]: [
    '/music/birthday-song.mp3',
    '/music/celebration.mp3',
    '/music/happy-moment.mp3'
  ],
  [CardType.WEDDING]: [
    '/music/wedding-march.mp3',
    '/music-beautiful-love.mp3',
    '/music/romantic-piano.mp3'
  ],
  [CardType.CONGRATULATIONS]: [
    '/music/victory-fanfare.mp3',
    '/music/celebration.mp3',
    '/music/achievement-unlocked.mp3'
  ],
  [CardType.THANK_YOU]: [
    '/music/grateful-heart.mp3',
    '/music/gentle-thanks.mp3',
    '/music/appreciation.mp3'
  ],
  [CardType.NEW_YEAR]: [
    '/music/new-year-celebration.mp3',
    '/music/festive-joy.mp3',
    '/music/spring-festival.mp3'
  ],
  [CardType.VALENTINE]: [
    '/music/love-story.mp3',
    '/music/romantic-evening.mp3',
    '/music/heart-melody.mp3'
  ],
  [CardType.CHRISTMAS]: [
    '/music/jingle-bells.mp3',
    '/music/silent-night.mp3',
    '/music/christmas-carol.mp3'
  ],
  [CardType.CUSTOM]: [
    '/music/gentle-moment.mp3',
    '/music/peaceful-day.mp3',
    '/music/serenity.mp3'
  ]
};

// 装饰图案配置
export const DECORATION_PATTERNS: Record<CardType, DecorationType[]> = {
  [CardType.BIRTHDAY]: [DecorationType.BALLOONS, DecorationType.CONFETTI, DecorationType.STARS],
  [CardType.WEDDING]: [DecorationType.HEARTS, DecorationType.FLOWERS, DecorationType.RIBBON],
  [CardType.CONGRATULATIONS]: [DecorationType.STARS, DecorationType.CONFETTI, DecorationType.RIBBON],
  [CardType.THANK_YOU]: [DecorationType.FLOWERS, DecorationType.LEAVES, DecorationType.HEARTS],
  [CardType.NEW_YEAR]: [DecorationType.CONFETTI, DecorationType.STARS, DecorationType.FLOWERS],
  [CardType.VALENTINE]: [DecorationType.HEARTS, DecorationType.FLOWERS, DecorationType.STARS],
  [CardType.CHRISTMAS]: [DecorationType.SNOWFLAKES, DecorationType.STARS, DecorationType.LEAVES],
  [CardType.CUSTOM]: [DecorationType.FLOWERS, DecorationType.STARS, DecorationType.LEAVES]
};
