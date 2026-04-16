"use client";
import { useState, useEffect } from 'react';

export default function TypingDescription() {
    const fullText = "Welcome to my personal website. History, space, and football, in no particular order; people are my favorite stories.";
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

  const splitAt = "Welcome to my personal website. History, space, and football, in no particular order; ".length;
  const mainText = text.slice(0, Math.min(text.length, splitAt));
  const accentText = text.length > splitAt ? text.slice(splitAt) : '';

  return (
    <span className="inline-block">
      <span className="text-warm-white">{mainText}</span>
      {accentText && <span className="text-accent">{accentText}</span>}
    </span>
  );
}

