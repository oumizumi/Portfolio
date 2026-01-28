'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [exit, setExit] = useState(false);

    useEffect(() => {
        // Start exit sequence after delay
        const timer = setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 600); // Faster completion after exit animation
        }, 1800); // Shorter initial display
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Top Shutter */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1/2 bg-[var(--bg-base)]"
                initial={{ y: 0 }}
                animate={exit ? { y: "-100%" } : { y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} // Faster shutter
            />

            {/* Bottom Shutter */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-1/2 bg-[var(--bg-base)]"
                initial={{ y: 0 }}
                animate={exit ? { y: "100%" } : { y: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} // Faster shutter
            />

            {/* Logo Container */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center"
                animate={exit ? { opacity: 0, scale: 0.8, y: -30 } : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeIn" }} // Logo exits faster
            >
                <div className="relative flex flex-col items-center justify-center">
                    {/* 'CFC' Inspired 'O' Logo */}
                    <motion.svg
                        width="140"
                        height="140"
                        viewBox="0 0 100 100"
                        className="stroke-[6] fill-transparent relative z-10"
                    >
                        {/* Left Arch (Blue 'C') */}
                        <motion.path
                            d="M 50, 10 A 40,40 0 0,0 50, 90"
                            className="stroke-[#034694]" // Chelsea Blue - Good contrast on both
                            initial={{ pathLength: 0, opacity: 0, x: -20 }}
                            animate={{ pathLength: 1, opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                        />

                        {/* Right Arch (Inverted 'C' completing the 'O') */}
                        <motion.path
                            d="M 50, 90 A 40,40 0 0,0 50, 10"
                            className="stroke-zinc-900 dark:stroke-zinc-100" // Adaptive color
                            initial={{ pathLength: 0, opacity: 0, x: 20 }}
                            animate={{ pathLength: 1, opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                        />

                        {/* Central 'Flash' or connection line removed */}
                    </motion.svg>

                    {/* Centered Chelsea Logo */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center p-6"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
                    >
                        {/* Using simple img tag since we are in a raw motion component context, or could use Next Image if configured */}
                        <img
                            src="/chelsea_logo-removebg-preview.png"
                            alt="Chelsea Logo"
                            className="w-20 h-20 object-contain opacity-100" // Increased size and opacity
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
