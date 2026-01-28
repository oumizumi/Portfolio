'use client';

import { useState, useEffect, useRef } from "react";
import { MapPin, Send, Search, X } from "lucide-react";

// --- CONSTANTS ---

const SAMPLE_QUERIES = [
    "Find me 1-bedroom apartments under $2100 near downtown",
    "Pet-friendly 2BR with parking near uOttawa under $1800",
    "Studio apartments in Centretown with gym, max $1500",
    "Family-friendly 3BR near good schools, budget $2500",
    "Apartments with in-unit laundry near Shopify office",
];

const THINKING_MESSAGES = [
    "Reading your message",
    "Thinking",
    "Understanding your needs",
    "Searching Ottawa listings",
    "Finding matches",
];

const AI_RESPONSES = [
    // Response for 1BR downtown query
    `Found 14 apartments matching your criteria! Here are my top 3 picks:

**1. The Laurier** - $1,695/mo
Sandy Hill • 1 bed • 12 min transit
Score: 92/100 - Best Overall Match
Pet-friendly • In-unit laundry

**2. Holbrook** - $1,349/mo
Centretown • Studio • 8 min transit
Score: 89/100 - Best Value
Gym • Rooftop terrace

**3. 321 Waverley** - $1,450/mo
The Glebe • 1 bed • 15 min transit
Score: 87/100 - Safest Area
Parking included • Near parks

View all 14 results →`,

    // Response for pet-friendly 2BR near uOttawa
    `Found 8 pet-friendly apartments near uOttawa! Top matches:

**1. Somerset Square** - $1,750/mo
Sandy Hill • 2 bed • 5 min walk to campus
Score: 95/100 - Perfect Match
Pet-friendly • Underground parking • Balcony

**2. Campus Towers** - $1,695/mo
Lowertown • 2 bed • 10 min transit
Score: 91/100 - Great Value
Allows large dogs • Storage locker

**3. King Edward Apartments** - $1,799/mo
Sandy Hill • 2 bed • 8 min walk
Score: 88/100 - Best Amenities
Pet wash station • Gym • Study rooms

View all 8 results →`,

    // Response for studio with gym
    `Found 11 studios in Centretown with gym access:

**1. Metcalfe Towers** - $1,425/mo
Centretown • Studio • 6 min to downtown
Score: 93/100 - Best Overall
24/7 gym • Yoga studio • Concierge

**2. Bank Street Lofts** - $1,299/mo
Centretown • Studio • 4 min walk to shops
Score: 90/100 - Best Price
Modern gym • Bike storage • Rooftop

**3. Elgin Residences** - $1,495/mo
Centretown • Studio • 3 min to transit
Score: 87/100 - Newest Building
Fitness center • Pool • Sauna

View all 11 results →`,

    // Response for family 3BR near schools
    `Found 6 family-friendly 3BR apartments near top schools:

**1. Riverside Gardens** - $2,350/mo
Alta Vista • 3 bed • A+ school district
Score: 94/100 - Best for Families
Playground • Near parks • Quiet street

**2. Elmvale Estates** - $2,450/mo
Elmvale Acres • 3 bed • Top-rated schools
Score: 91/100 - Safest Area
In-unit laundry • 2 parking spots • Yard

**3. Beacon Hill Place** - $2,299/mo
Beacon Hill • 3 bed • Elementary nearby
Score: 89/100 - Best Value
Community center • Green space • Storage

View all 6 results →`,

    // Response for in-unit laundry near Shopify
    `Found 12 apartments with in-unit laundry near Shopify:

**1. Byward Blue** - $1,850/mo
Byward Market • 1 bed • 8 min walk to Shopify
Score: 96/100 - Perfect Commute
In-unit W/D • Dishwasher • Balcony

**2. Dalhousie Lofts** - $1,725/mo
Lowertown • 1 bed • 12 min walk
Score: 92/100 - Modern & Stylish
W/D in unit • Exposed brick • High ceilings

**3. Clarence Condos** - $1,950/mo
Byward • 2 bed • 6 min walk to office
Score: 90/100 - Most Space
Full laundry • Parking • Gym access

View all 12 results →`,
];

const DEMO_APARTMENTS_BY_QUERY = [
    // 1BR downtown
    [
        { id: 1, top: '42%', left: '48%', price: '$1,695' },
        { id: 2, top: '45%', left: '52%', price: '$1,349' },
        { id: 3, top: '55%', left: '58%', price: '$1,450' },
        { id: 4, top: '38%', left: '50%', price: '$1,575' },
        { id: 5, top: '48%', left: '55%', price: '$1,825' },
        { id: 6, top: '52%', left: '46%', price: '$1,299' },
        { id: 7, top: '40%', left: '54%', price: '$1,650' },
        { id: 8, top: '46%', left: '49%', price: '$1,425' },
    ],
    // Pet-friendly 2BR near uOttawa
    [
        { id: 1, top: '42%', left: '52%', price: '$1,750' },
        { id: 2, top: '40%', left: '50%', price: '$1,695' },
        { id: 3, top: '44%', left: '54%', price: '$1,799' },
        { id: 4, top: '41%', left: '48%', price: '$1,725' },
        { id: 5, top: '43%', left: '56%', price: '$1,650' },
        { id: 6, top: '39%', left: '52%', price: '$1,775' },
        { id: 7, top: '45%', left: '51%', price: '$1,699' },
        { id: 8, top: '42%', left: '49%', price: '$1,795' },
    ],
    // Studio in Centretown
    [
        { id: 1, top: '45%', left: '50%', price: '$1,425' },
        { id: 2, top: '46%', left: '48%', price: '$1,299' },
        { id: 3, top: '44%', left: '52%', price: '$1,495' },
        { id: 4, top: '47%', left: '49%', price: '$1,350' },
        { id: 5, top: '43%', left: '51%', price: '$1,399' },
        { id: 6, top: '46%', left: '52%', price: '$1,450' },
        { id: 7, top: '45%', left: '47%', price: '$1,375' },
        { id: 8, top: '44%', left: '49%', price: '$1,475' },
    ],
    // Family 3BR
    [
        { id: 1, top: '58%', left: '62%', price: '$2,350' },
        { id: 2, top: '62%', left: '58%', price: '$2,450' },
        { id: 3, top: '35%', left: '55%', price: '$2,299' },
        { id: 4, top: '60%', left: '65%', price: '$2,395' },
        { id: 5, top: '32%', left: '52%', price: '$2,275' },
        { id: 6, top: '56%', left: '60%', price: '$2,425' },
        { id: 7, top: '38%', left: '58%', price: '$2,325' },
        { id: 8, top: '64%', left: '56%', price: '$2,499' },
    ],
    // Near Shopify
    [
        { id: 1, top: '40%', left: '52%', price: '$1,850' },
        { id: 2, top: '38%', left: '54%', price: '$1,725' },
        { id: 3, top: '41%', left: '50%', price: '$1,950' },
        { id: 4, top: '39%', left: '53%', price: '$1,795' },
        { id: 5, top: '42%', left: '51%', price: '$1,825' },
        { id: 6, top: '37%', left: '52%', price: '$1,775' },
        { id: 7, top: '40%', left: '55%', price: '$1,899' },
        { id: 8, top: '41%', left: '53%', price: '$1,750' },
    ],
];

// --- HELPER COMPONENTS ---

function DemoStreamingText({ text, isActive }: { text: string; isActive: boolean }) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setDisplayedText("");
            setIsComplete(false);
            return;
        }

        let index = 0;
        const speed = 12; // ms per character

        const timer = setInterval(() => {
            if (index < text.length) {
                const chunkSize = Math.random() > 0.7 ? 3 : 1;
                const nextIndex = Math.min(index + chunkSize, text.length);
                setDisplayedText(text.slice(0, nextIndex));
                index = nextIndex;
            } else {
                clearInterval(timer);
                setIsComplete(true);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, isActive]);

    // Parse markdown-like formatting
    const formatText = (content: string) => {
        return content.split('\n').map((line, i) => {
            // Bold **text**
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = line.split(boldRegex);

            return (
                <span key={i}>
                    {parts.map((part, j) => {
                        if (j % 2 === 1) {
                            return <span key={j} className="font-semibold">{part}</span>;
                        }
                        // Check for link text
                        if (part.includes("View all")) {
                            return <span key={j} className="text-blue-600 dark:text-blue-400 underline cursor-pointer">{part}</span>;
                        }
                        return <span key={j}>{part}</span>;
                    })}
                    {i < content.split('\n').length - 1 && '\n'}
                </span>
            );
        });
    };

    return (
        <>
            {formatText(displayedText)}
            {!isComplete && isActive && <span className="inline-block w-1.5 h-4 bg-gray-400 ml-0.5 animate-pulse" />}
        </>
    );
}

// --- MAIN COMPONENT ---

export default function NestfinderDemo() {
    const [phase, setPhase] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [isAutoTyping, setIsAutoTyping] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [locationSearch, setLocationSearch] = useState("");
    const [pinPosition, setPinPosition] = useState({ top: '35%', left: '45%' });
    const [showPin, setShowPin] = useState(true);
    const currentQueryIndexRef = useRef(0);
    const [isVisible, setIsVisible] = useState(false);
    const demoRef = useRef<HTMLDivElement>(null);
    const isRunningRef = useRef(false);
    const shouldStopRef = useRef(false);

    // Intersection Observer to detect if demo is in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                // If scrolling away while running, mark to stop after current cycle
                if (!entry.isIntersecting && isRunningRef.current) {
                    shouldStopRef.current = true;
                }
            },
            { threshold: 0.3 } // Demo needs to be at least 30% visible
        );

        if (demoRef.current) {
            observer.observe(demoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Cycle through thinking messages
    useEffect(() => {
        if (phase !== 1) return;

        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setThinkingIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
                setIsFading(false);
            }, 200);
        }, 1200);

        return () => clearInterval(interval);
    }, [phase]);

    useEffect(() => {
        // Don't auto-run if user is interacting
        if (isUserInteracting) return;

        const runDemo = async () => {
            // Don't start new cycle if we should stop
            if (shouldStopRef.current) {
                shouldStopRef.current = false;
                isRunningRef.current = false;
                return;
            }

            // Only start if visible
            if (!isVisible && !isUserInteracting) return;

            isRunningRef.current = true;
            const currentQuery = SAMPLE_QUERIES[currentQueryIndexRef.current];

            // Reset
            setPhase(0);
            setTypedText("");
            setThinkingIndex(0);
            await new Promise(r => setTimeout(r, 1000));

            // Phase 0: Start typing
            setIsAutoTyping(true);
            for (let i = 0; i <= currentQuery.length; i++) {
                setTypedText(currentQuery.slice(0, i));
                await new Promise(r => setTimeout(r, 40));
            }
            setIsAutoTyping(false);
            await new Promise(r => setTimeout(r, 500));

            // Phase 1: Processing
            setPhase(1);
            await new Promise(r => setTimeout(r, 3000));

            // Phase 2: Show results (streaming animation takes ~4s, then pause to read)
            setPhase(2);
            await new Promise(r => setTimeout(r, 8000));

            // Cycle completed
            isRunningRef.current = false;

            // Cycle to next query
            currentQueryIndexRef.current = (currentQueryIndexRef.current + 1) % SAMPLE_QUERIES.length;
        };

        runDemo();
        const interval = setInterval(runDemo, 16000); // Wait for cycle + pause
        return () => {
            clearInterval(interval);
            isRunningRef.current = false;
            shouldStopRef.current = false;
        };
    }, [isUserInteracting, isVisible]);

    // Handle user sending a message
    const handleSend = () => {
        if (!userInput.trim()) return;
        setIsUserInteracting(true);
        setTypedText(userInput);
        setUserInput("");
        setPhase(1);
        setThinkingIndex(0);

        // Show mocked response after delay
        setTimeout(() => {
            setPhase(2);
        }, 2500);
    };

    return (
        <div id="nestfinder-demo" ref={demoRef} className="relative font-mono text-slate-900 dark:text-slate-100 h-full w-full">
            {/* Browser Chrome - simplified for integration */}
            <div className="bg-white dark:bg-slate-900 h-full flex flex-col">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex-shrink-0">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="max-w-md mx-auto px-4 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center shadow-sm truncate">
                            nestfinder.app/chat
                        </div>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="flex flex-col md:flex-row flex-1 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    {/* Left: Chat */}
                    <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-[300px] md:h-auto">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            <div className="flex flex-col gap-4 max-w-sm mx-auto">
                                {/* Empty state header (when no messages) */}
                                {phase === 0 && !typedText && (
                                    <div className="text-center py-8 animate-fade-in">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                            Chat with Nestfinder
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            Ask me anything about Ottawa apartments
                                        </p>
                                    </div>
                                )}

                                {/* User message */}
                                {typedText && (
                                    <div className="ml-auto max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-emerald-600 text-white shadow-sm">
                                        {typedText}
                                        {isAutoTyping && <span className="inline-block w-0.5 h-4 bg-white ml-0.5 animate-pulse" />}
                                    </div>
                                )}

                                {/* Thinking state */}
                                {phase === 1 && (
                                    <div className="mr-auto bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-sm text-slate-500 dark:text-slate-400 transition-all duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                                            >
                                                {THINKING_MESSAGES[thinkingIndex]}
                                            </span>
                                            <span className="flex gap-0.5">
                                                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* AI Response - Streaming */}
                                {phase === 2 && (
                                    <div className="mr-auto max-w-[90%] rounded-2xl px-4 py-3 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                                        <DemoStreamingText text={AI_RESPONSES[currentQueryIndexRef.current]} isActive={phase === 2} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Input bar - INTERACTIVE */}
                        <div className="flex-shrink-0 p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 shadow-sm focus-within:border-emerald-500 transition-all">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => {
                                        setUserInput(e.target.value);
                                        if (!isUserInteracting && e.target.value) {
                                            setIsUserInteracting(true);
                                            setTypedText("");
                                            setPhase(0);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Say hi..."
                                    className="flex-1 text-sm bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!userInput.trim()}
                                    className="p-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 disabled:opacity-30 hover:opacity-80 transition-opacity"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Map - Interactive */}
                    <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-900/50 p-4 flex flex-col h-[300px] md:h-auto">
                        {/* Search bar - Interactive */}
                        <div className="mb-3">
                            <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 focus-within:border-emerald-500 transition-colors shadow-sm">
                                <Search className="text-slate-400 mr-2" size={16} />
                                <input
                                    type="text"
                                    value={locationSearch}
                                    onChange={(e) => setLocationSearch(e.target.value)}
                                    placeholder="Seach location..."
                                    className="flex-1 text-sm bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                                />
                                {locationSearch && (
                                    <button
                                        onClick={() => setLocationSearch("")}
                                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-2"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Real Map - OpenStreetMap - Clickable */}
                        <div
                            className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden cursor-crosshair bg-slate-200 dark:bg-slate-800"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                setPinPosition({ top: `${y}%`, left: `${x}%` });
                                setShowPin(true);
                            }}
                        >
                            {/* Wide Area Map (Ontario/Quebec) - Zoom Entrance */}
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-82.00%2C42.00%2C-74.00%2C48.00&layer=mapnik"
                                className="absolute inset-0 w-full h-full border-0 pointer-events-none z-10 origin-center"
                                style={{
                                    animation: 'mapIntroZoom 3s cubic-bezier(0.7, 0, 0.2, 1) forwards',
                                    filter: 'blur(2px) brightness(0.9) contrast(1.2)'
                                }}
                                loading="lazy"
                                title="Ontario Map"
                            />

                            {/* Detailed Ottawa Map */}
                            <iframe
                                src="https://www.openstreetmap.org/export/embed.html?bbox=-75.7871%2C45.3503%2C-75.6171%2C45.4503&layer=mapnik"
                                className="w-full h-full border-0 pointer-events-none opacity-80 dark:opacity-70 dark:invert-[.1] transition-opacity hover:opacity-100"
                                loading="lazy"
                                title="Ottawa Map"
                            />

                            {/* Overlay - 📍 emoji pin - Repositionable */}
                            {showPin && (
                                <div className="absolute inset-0 pointer-events-none">
                                    <div
                                        className="absolute -translate-x-1/2 -translate-y-full transition-all duration-200"
                                        style={{ top: pinPosition.top, left: pinPosition.left }}
                                    >
                                        <span className="text-4xl drop-shadow-lg filter drop-shadow-md">📍</span>
                                    </div>
                                </div>
                            )}

                            {/* Apartment markers - show when results are displayed */}
                            {phase === 2 && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {DEMO_APARTMENTS_BY_QUERY[currentQueryIndexRef.current].map((apt, i) => (
                                        <div
                                            key={apt.id}
                                            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out"
                                            style={{
                                                top: apt.top,
                                                left: apt.left,
                                                transform: 'scale(0)',
                                                animation: `popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
                                                animationDelay: `${i * 100}ms`
                                            }}
                                        >
                                            {/* Marker circle */}
                                            <div className="relative group cursor-pointer pointer-events-auto">
                                                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform">
                                                    {apt.id}
                                                </div>
                                                {/* Price tooltip */}
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-900/90 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    {apt.price}/mo
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Legend & Clear button */}
                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                                <div className="px-3 py-2 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur shadow-lg border border-slate-200/60 dark:border-slate-700/60 text-xs pointer-events-auto">
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                                        {phase === 2 ? "8 matches shown" : showPin ? "Location set" : "Click to drop a pin"}
                                    </p>
                                </div>
                                {showPin && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowPin(false);
                                        }}
                                        className="px-3 py-2 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur shadow-lg border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors pointer-events-auto"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
