"use client";
import { useState, useEffect } from 'react';

export default function TypingDescription() {
    const fullText = "hey, i'm a second-year computer science student working on designing clean interfaces and building reliable systems.";
    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(false);
    
    useEffect(() => {
        // Delay start for the first typing animation to complete
        const startDelay = setTimeout(() => {
            setStarted(true);
        }, 1000);
        return () => clearTimeout(startDelay);
    }, []);

    useEffect(() => {
        if (started && currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setText(fullText.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 30);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, started, fullText]);

    return (
        <span className="inline-block">
            <span className="relative bg-gradient-to-r from-gray-700 via-blue-600/80 to-gray-700 dark:from-white/60 dark:via-blue-400 dark:to-white/60 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                {text}
            </span>
        </span>
    );
}

