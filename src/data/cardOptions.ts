import { LucideIcon, Heart, PartyPopper, Calendar, Briefcase, Mail, Star, Sparkles, Gift, Cake, Wine } from "lucide-react";

// 真实实体卡片尺寸（5英寸 x 7英寸，96 DPI）
export const REAL_CARD_SIZE = {
    width: 480,   // 5英寸 * 96 DPI
    height: 672,  // 7英寸 * 96 DPI
    ratio: 5 / 7
} as const;

// 3D效果类型
export type AnimationType = 'fold' | 'flip' | 'gatefold' | 'accordion' | 'reveal' | 'rotate' | 'zoom' | 'slide';

export interface AnimationMode {
    id: AnimationType;
    label: string;
    description: string;
    icon: string;
}

export const ANIMATION_MODES: AnimationMode[] = [
    { id: 'fold', label: '折叠打开', description: '像书本一样从左向右打开', icon: '📖' },
    { id: 'flip', label: '翻转效果', description: '水平翻转卡片', icon: '🔄' },
    { id: 'gatefold', label: '对折开门', description: '两侧向中间打开', icon: '🚪' },
    { id: 'accordion', label: '手风琴', description: '多层折叠展开', icon: '🪗' },
    { id: 'reveal', label: '同心结', description: '从中心向外展开', icon: '🎯' },
    { id: 'rotate', label: '旋转展开', description: '旋转打开效果', icon: '🌀' },
    { id: 'zoom', label: '缩放揭示', description: '缩放显示内容', icon: '🔍' },
    { id: 'slide', label: '滑动打开', description: '滑动揭开', icon: '↔️' },
];

export interface CardConfig {
    id: string;
    label: string;
    icon: any;
    theme: {
        gradient: string;
        textColor: string;
        primaryColor: string;
        fontFamily: string;
        accentColor?: string;
        pattern?: string;
    };
    cover: {
        title: string;
        subtitle: string;
        decorationTexture?: string;
        icon?: string;
    };
    inside: {
        title: string;
        message: string[];
        signature: string;
        mediaType: "video" | "image";
        mediaUrl: string;
    };
    musicUrl: string;
    particles?: string[];
}

export const CARD_TYPES: CardConfig[] = [
    {
        id: "greeting",
        label: "祝福贺卡",
        icon: Heart,
        theme: {
            gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
            textColor: "text-white",
            primaryColor: "text-rose-500",
            accentColor: "text-pink-300",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/cubes.png"
        },
        cover: {
            title: "最美好的祝愿",
            subtitle: "将爱与光明送给你",
            decorationTexture: "https://www.transparenttextures.com/patterns/cubes.png",
            icon: "💝"
        },
        inside: {
            title: "想念你",
            message: [
                "愿你的每一天都充满欢乐、笑声和美好时刻。",
                "祝你心中充满无尽的幸福。",
                "祝你度过美好的一天！"
            ],
            signature: "致以最诚挚的祝福",
            mediaType: "video",
            mediaUrl: "https://videos.pexels.com/video-files/5532766/5532766-hd_1920_1080_25fps.mp4"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_9467554971.mp3?filename=piano-moment-11634.mp3",
        particles: ["#FFD700", "#FFF", "#FF69B4"]
    },
    {
        id: "invitation",
        label: "邀请函",
        icon: Calendar,
        theme: {
            gradient: "from-slate-900 via-purple-900 to-slate-900",
            textColor: "text-amber-100",
            primaryColor: "text-amber-500",
            accentColor: "text-yellow-300",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/diamond-upholstery.png"
        },
        cover: {
            title: "诚挚邀请",
            subtitle: "难忘的一夜",
            decorationTexture: "https://www.transparenttextures.com/patterns/diamond-upholstery.png",
            icon: "🎉"
        },
        inside: {
            title: "特别活动",
            message: [
                "邀请您共度一个充满庆祝、音乐和优雅的夜晚。",
                "您的到来将是我们莫大的荣幸。",
                "请于周五前回复。"
            ],
            signature: "诚挚地",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1519671482502-9759101d4574?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=jazz-happy-110246.mp3",
        particles: ["#FFD700", "#FFA500"]
    },
    {
        id: "birthday",
        label: "生日贺卡",
        icon: Cake,
        theme: {
            gradient: "from-yellow-400 via-pink-500 to-purple-600",
            textColor: "text-white",
            primaryColor: "text-pink-500",
            accentColor: "text-yellow-300",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/confetti.png"
        },
        cover: {
            title: "生日快乐！",
            subtitle: "特别的一天给特别的你",
            decorationTexture: "https://www.transparenttextures.com/patterns/confetti.png",
            icon: "🎂"
        },
        inside: {
            title: "庆祝这一天",
            message: [
                "愿你生日充满无限的欢乐和笑声！",
                "愿所有美好的愿望都成真！",
                "享受你的特别日子！"
            ],
            signature: "最温暖的祝福",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2021/11/24/audio_5209705545.mp3?filename=happy-birthday-12345.mp3",
        particles: ["#FF69B4", "#FFD700", "#FFA500", "#FF1493"]
    },
    {
        id: "postcard",
        label: "明信片",
        icon: Mail,
        theme: {
            gradient: "from-blue-400 to-emerald-400",
            textColor: "text-white",
            primaryColor: "text-teal-600",
            accentColor: "text-cyan-300",
            fontFamily: "font-sans",
            pattern: "https://www.transparenttextures.com/patterns/diagmonds-light.png"
        },
        cover: {
            title: "来自...的问候",
            subtitle: "希望你在这里",
            decorationTexture: "https://www.transparenttextures.com/patterns/diagmonds-light.png",
            icon: "✈️"
        },
        inside: {
            title: "你好，朋友！",
            message: [
                "这里的风景 absolutely 令人惊叹！",
                "吃了太多美食，享受着阳光。",
                "迫不及待想告诉你这一切。"
            ],
            signature: "后会有期",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=summer-adventure-112345.mp3",
        particles: ["#00CED1", "#20B2AA"]
    },
    {
        id: "business",
        label: "商务名片",
        icon: Briefcase,
        theme: {
            gradient: "from-neutral-100 to-neutral-300",
            textColor: "text-neutral-800",
            primaryColor: "text-blue-600",
            accentColor: "text-slate-500",
            fontFamily: "font-sans",
            pattern: "https://www.transparenttextures.com/patterns/carbon-fibre.png"
        },
        cover: {
            title: "张三",
            subtitle: "创意总监",
            decorationTexture: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
            icon: "💼"
        },
        inside: {
            title: "让我们连接",
            message: [
                "专注于创新设计解决方案和品牌策略。",
                "访问我的作品集：www.example.com",
                "接受新项目。"
            ],
            signature: "致以最诚挚的问候",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "",
        particles: []
    },
    {
        id: "thankyou",
        label: "感谢卡",
        icon: Gift,
        theme: {
            gradient: "from-emerald-400 via-teal-500 to-cyan-600",
            textColor: "text-white",
            primaryColor: "text-emerald-500",
            accentColor: "text-teal-300",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/flower-trail.png"
        },
        cover: {
            title: "感谢有你",
            subtitle: "心怀感激",
            decorationTexture: "https://www.transparenttextures.com/patterns/flower-trail.png",
            icon: "🙏"
        },
        inside: {
            title: "衷心感谢",
            message: [
                "感谢你的支持和帮助。",
                "你的善意温暖了我们的心。",
                "愿美好的事物都降临在你身上。"
            ],
            signature: "满怀感激",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_dec0f0a6f2.mp3?filename=grateful-12196.mp3",
        particles: ["#98FB98", "#FFD700"]
    },
    {
        id: "celebration",
        label: "庆祝贺卡",
        icon: Sparkles,
        theme: {
            gradient: "from-orange-400 via-red-500 to-pink-600",
            textColor: "text-white",
            primaryColor: "text-orange-500",
            accentColor: "text-yellow-300",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/stardust.png"
        },
        cover: {
            title: "恭喜恭喜！",
            subtitle: "庆祝这一刻",
            decorationTexture: "https://www.transparenttextures.com/patterns/stardust.png",
            icon: "🎊"
        },
        inside: {
            title: "庆祝成功",
            message: [
                "为你的成功欢呼！",
                "你值得所有的赞美和祝贺。",
                "继续创造更多辉煌！"
            ],
            signature: "祝贺你",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_f851473886.mp3?filename=good-morning-16345.mp3",
        particles: ["#FFD700", "#FF6347", "#FFA500", "#FF69B4", "#FFD700"]
    },
    {
        id: "memorial",
        label: "纪念卡",
        icon: Star,
        theme: {
            gradient: "from-stone-500 to-stone-700",
            textColor: "text-stone-100",
            primaryColor: "text-stone-300",
            accentColor: "text-stone-400",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/flowers.png"
        },
        cover: {
            title: "永远怀念",
            subtitle: "永远在我们心中",
            decorationTexture: "https://www.transparenttextures.com/patterns/flowers.png",
            icon: "⭐"
        },
        inside: {
            title: "珍贵的回忆",
            message: [
                "缅怀一个精彩的人生，一个永不遗忘的精神。",
                "你的爱与 legacy 永存。",
                "安息吧。"
            ],
            signature: "最深切的哀悼",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_1997e59b92.mp3?filename=sad-soul-13536.mp3",
        particles: ["#FFF", "#D3D3D3"]
    },
    {
        id: "love",
        label: "情书",
        icon: Wine,
        theme: {
            gradient: "from-red-400 via-pink-500 to-rose-600",
            textColor: "text-white",
            primaryColor: "text-red-500",
            accentColor: "text-pink-300",
            fontFamily: "font-serif",
            pattern: "https://www.transparenttextures.com/patterns/hearts.png"
        },
        cover: {
            title: "致吾爱",
            subtitle: "情书一封",
            decorationTexture: "https://www.transparenttextures.com/patterns/hearts.png",
            icon: "💕"
        },
        inside: {
            title: "我爱你",
            message: [
                "你是我生命中最美丽的意外。",
                "每一次呼吸都为你而动。",
                "愿我们白头偕老，永不分离。"
            ],
            signature: "永远爱你",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_559409861b.mp3?filename=romantic-piano-11143.mp3",
        particles: ["#FF69B4", "#FF1493", "#FFD700"]
    }
];
