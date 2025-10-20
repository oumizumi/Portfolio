"use client";
import { useState, useEffect } from 'react';

export default function Typingname() {
    const fullText = "hey there";
    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setText(fullText.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, fullText]);

    return (
        <span className="inline-block">
            <span className="relative bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 dark:from-white via-blue-400 dark:to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                {text}
            </span>
        </span>
    );
}
