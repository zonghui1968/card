"use client";

import React, { useEffect, useRef } from "react";

interface BackgroundMusicProps {
    isPlaying: boolean;
    src?: string;
}

export default function BackgroundMusic({ isPlaying, src }: BackgroundMusicProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.volume = 0.5;
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Auto-play prevented:", error);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    if (!src) return null;

    return (
        <audio
            ref={audioRef}
            loop
            src={src}
        />
    );
}
