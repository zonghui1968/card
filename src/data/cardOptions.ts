import { LucideIcon, Heart, PartyPopper, Calendar, Briefcase, Mail, Star } from "lucide-react";

export interface CardConfig {
    id: string;
    label: string;
    icon: any; // LucideIcon type is tricky to export directly sometimes without prop drilling issues, 'any' is safe for data config
    theme: {
        gradient: string;
        textColor: string;
        primaryColor: string; // For accents
        fontFamily: string; // 'serif' | 'sans' | 'mono'
    };
    cover: {
        title: string;
        subtitle: string;
        decorationTexture?: string;
    };
    inside: {
        title: string;
        message: string[];
        signature: string;
        mediaType: "video" | "image";
        mediaUrl: string;
    };
    musicUrl: string;
}

export const CARD_TYPES: CardConfig[] = [
    {
        id: "greeting",
        label: "Greeting Card",
        icon: Heart,
        theme: {
            gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
            textColor: "text-white",
            primaryColor: "text-rose-500",
            fontFamily: "font-serif",
        },
        cover: {
            title: "Best Wishes",
            subtitle: "Sending you love & light",
            decorationTexture: "https://www.transparenttextures.com/patterns/cubes.png",
        },
        inside: {
            title: "Thinking of You",
            message: [
                "May your day be filled with joy, laughter, and beautiful moments.",
                "Wishing you all the happiness your heart can hold.",
                "Have a wonderful day!"
            ],
            signature: "With Love",
            mediaType: "video",
            mediaUrl: "https://videos.pexels.com/video-files/5532766/5532766-hd_1920_1080_25fps.mp4"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_9467554971.mp3?filename=piano-moment-11634.mp3"
    },
    {
        id: "invitation",
        label: "Invitation",
        icon: Calendar,
        theme: {
            gradient: "from-slate-900 via-purple-900 to-slate-900",
            textColor: "text-amber-100",
            primaryColor: "text-amber-500",
            fontFamily: "font-serif",
        },
        cover: {
            title: "You're Invited",
            subtitle: "A Night to Remember",
            decorationTexture: "https://www.transparenttextures.com/patterns/diamond-upholstery.png",
        },
        inside: {
            title: "Exclusive Event",
            message: [
                "Join us for an evening of celebration, music, and elegance.",
                "We would be honored by your presence.",
                "RSVP by Friday."
            ],
            signature: "Sincerely",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1519671482502-9759101d4574?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=jazz-happy-110246.mp3"
    },
    {
        id: "postcard",
        label: "Postcard",
        icon: Mail,
        theme: {
            gradient: "from-blue-400 to-emerald-400",
            textColor: "text-white",
            primaryColor: "text-teal-600",
            fontFamily: "font-sans",
        },
        cover: {
            title: "Greetings from...",
            subtitle: "Wish you were here",
            decorationTexture: "https://www.transparenttextures.com/patterns/diagmonds-light.png",
        },
        inside: {
            title: "Hello Friend!",
            message: [
                "The views here are absolutely breathtaking!",
                "Eating too much good food and soaking up the sun.",
                "Can't wait to tell you all about it."
            ],
            signature: "See ya soon",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=summer-adventure-112345.mp3" // Placeholder
    },
    {
        id: "business",
        label: "Business Name Card",
        icon: Briefcase,
        theme: {
            gradient: "from-neutral-100 to-neutral-300",
            textColor: "text-neutral-800",
            primaryColor: "text-blue-600",
            fontFamily: "font-sans",
        },
        cover: {
            title: "John Doe",
            subtitle: "Creative Director",
            decorationTexture: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
        },
        inside: {
            title: "Let's Connect",
            message: [
                "Specializing in innovative design solutions and brand strategy.",
                "Visit my portfolio at: www.example.com",
                "Available for new projects."
            ],
            signature: "Best Regards",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "" // No music for business card maybe? Or subtle ambient.
    },
    {
        id: "memorial",
        label: "Memorial Card",
        icon: Star,
        theme: {
            gradient: "from-stone-500 to-stone-700",
            textColor: "text-stone-100",
            primaryColor: "text-stone-300",
            fontFamily: "font-serif",
        },
        cover: {
            title: "In Loving Memory",
            subtitle: "Forever in our hearts",
            decorationTexture: "https://www.transparenttextures.com/patterns/flowers.png",
        },
        inside: {
            title: "Cherished Memories",
            message: [
                "Celebrating a life well lived and a spirit that will never be forgotten.",
                "Your legacy of love lives on.",
                "Rest in Peace."
            ],
            signature: "With Deepest Sympathy",
            mediaType: "image",
            mediaUrl: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=800&h=450"
        },
        musicUrl: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_1997e59b92.mp3?filename=sad-soul-13536.mp3"
    }
];
