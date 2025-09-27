'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/anim';
import { useState, useEffect } from 'react';

interface CommitData {
    date: string;
    commits: number;
    level: 0 | 1 | 2 | 3 | 4; // GitHub-like activity levels
}

interface GitHubEvent {
    type: string;
    created_at: string;
    repo: {
        name: string;
    };
    payload?: {
        commits?: Array<{ message: string }>;
    };
}

interface LanguageData {
    name: string;
    percentage: number;
    color: string;
}

export default function GitTimeline() {
    const generateFallbackData = (): CommitData[] => {
        const data: CommitData[] = [];
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

        for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
            data.push({
                date: d.toISOString().split('T')[0],
                commits: 0,
                level: 0
            });
        }

        return data;
    };

    const [commitData, setCommitData] = useState<CommitData[]>(() => generateFallbackData());
    const [languages, setLanguages] = useState<LanguageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
        fetchGitHubData();
        fetchLanguageData();
    }, []);



    const fetchGitHubData = async () => {
        try {
            setLoading(true);

            // Try to fetch from GitHub contributions API (unofficial but works)
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/oumizumi?y=last`);

            if (!response.ok) {
                throw new Error('Failed to fetch GitHub contributions');
            }

            const contributionData = await response.json();

            // Process the contribution data
            const data: CommitData[] = [];
            const contributions = contributionData.contributions;

            contributions.forEach((contribution: any) => {
                const commits = contribution.count;
                let level: 0 | 1 | 2 | 3 | 4 = 0;

                // Adjust levels based on your actual activity patterns
                if (commits >= 10) level = 4;
                else if (commits >= 7) level = 3;
                else if (commits >= 4) level = 2;
                else if (commits >= 1) level = 1;

                data.push({
                    date: contribution.date,
                    commits,
                    level
                });
            });

            setCommitData(data);
        } catch (err) {
            console.log('GitHub contributions API failed, trying fallback...');

            // Fallback to GitHub events API
            try {
                const response = await fetch('https://api.github.com/users/oumizumi/events?per_page=300');

                if (!response.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }

                const events: GitHubEvent[] = await response.json();

                // Process events into daily commit counts
                const commitCounts: { [date: string]: number } = {};

                events.forEach(event => {
                    if (event.type === 'PushEvent') {
                        const date = event.created_at.split('T')[0];
                        const numCommits = event.payload?.commits?.length || 1;
                        commitCounts[date] = (commitCounts[date] || 0) + numCommits;
                    }
                });

                // Generate data for the past year
                const data: CommitData[] = [];
                const today = new Date();
                const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

                for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
                    const dateStr = d.toISOString().split('T')[0];
                    const commits = commitCounts[dateStr] || 0;

                    let level: 0 | 1 | 2 | 3 | 4 = 0;
                    if (commits >= 4) level = 4;
                    else if (commits >= 3) level = 3;
                    else if (commits >= 2) level = 2;
                    else if (commits >= 1) level = 1;

                    data.push({
                        date: dateStr,
                        commits,
                        level
                    });
                }

                setCommitData(data);
            } catch (fallbackErr) {
                setError('Failed to load GitHub data');
                setCommitData(generateFallbackData());
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchLanguageData = async () => {
        try {
            // Fetch user's repositories
            const reposResponse = await fetch('https://api.github.com/users/oumizumi/repos?per_page=100&sort=updated');

            if (!reposResponse.ok) {
                throw new Error('Failed to fetch repositories');
            }

            const repos = await reposResponse.json();

            // Aggregate language data from all repos
            const languageStats: { [key: string]: number } = {};

            // Fetch languages for each repo (limited to avoid rate limits)
            const languagePromises = repos.slice(0, 20).map(async (repo: any) => {
                try {
                    const langResponse = await fetch(`https://api.github.com/repos/oumizumi/${repo.name}/languages`);
                    if (langResponse.ok) {
                        const languages = await langResponse.json();
                        Object.entries(languages).forEach(([lang, bytes]) => {
                            languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
                        });
                    }
                } catch (err) {
                    // Skip failed requests
                }
            });

            await Promise.all(languagePromises);

            // Calculate percentages and prepare data
            const totalBytes = Object.values(languageStats).reduce((sum, bytes) => sum + bytes, 0);

            const languageColors: { [key: string]: string } = {
                'TypeScript': '#3178c6',
                'JavaScript': '#f1e05a',
                'Python': '#3572A5',
                'Java': '#b07219',
                'C++': '#f34b7d',
                'C': '#555555',
                'HTML': '#e34c26',
                'CSS': '#1572B6',
                'Go': '#00ADD8',
                'Rust': '#dea584',
                'Swift': '#fa7343',
                'Kotlin': '#A97BFF',
                'PHP': '#4F5D95',
                'Ruby': '#701516',
                'C#': '#239120',
                'Shell': '#89e051',
                'Dockerfile': '#384d54',
                'Vue': '#41b883',
                'React': '#61dafb',
                'Svelte': '#ff3e00'
            };

            const processedLanguages = Object.entries(languageStats)
                .map(([name, bytes]) => ({
                    name,
                    percentage: (bytes / totalBytes) * 100,
                    color: languageColors[name] || '#8b5cf6'
                }))
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 8); // Top 8 languages

            setLanguages(processedLanguages);
        } catch (err) {
            console.log('Failed to fetch language data:', err);
            // Set fallback languages based on your profile
            setLanguages([
                { name: 'TypeScript', percentage: 35, color: '#3178c6' },
                { name: 'JavaScript', percentage: 25, color: '#f1e05a' },
                { name: 'Python', percentage: 15, color: '#3572A5' },
                { name: 'Java', percentage: 10, color: '#b07219' },
                { name: 'HTML', percentage: 8, color: '#e34c26' },
                { name: 'CSS', percentage: 7, color: '#1572B6' }
            ]);
        }
    };

    const totalCommits = commitData.reduce((sum, day) => sum + day.commits, 0);

    // Group data by weeks
    const weeks: CommitData[][] = [];
    let currentWeek: CommitData[] = [];

    commitData.forEach((day, index) => {
        const dayOfWeek = new Date(day.date).getDay();

        if (dayOfWeek === 0 && currentWeek.length > 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }

        currentWeek.push(day);

        if (index === commitData.length - 1) {
            weeks.push(currentWeek);
        }
    });

    const getLevelColor = (level: number) => {
        switch (level) {
            case 0: return 'bg-gray-100 dark:bg-gray-800';
            case 1: return 'bg-green-200 dark:bg-green-900';
            case 2: return 'bg-green-300 dark:bg-green-700';
            case 3: return 'bg-green-400 dark:bg-green-600';
            case 4: return 'bg-green-500 dark:bg-green-500';
            default: return 'bg-gray-100 dark:bg-gray-800';
        }
    };

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



    // Prevent hydration mismatch by not rendering dynamic content until mounted
    if (!mounted) {
        return (
            <section className="py-20 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-8"></div>
                        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 border-b border-gray-200 dark:border-gray-800">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-6xl mx-auto px-4"
            >
                <motion.div variants={fadeUp} className="text-center mb-12">
                    <h3 className="text-3xl font-light tracking-tight mb-4">
                        GitHub Activity
                    </h3>
                    <p className="text-gray-700 dark:text-white/70">
                        {loading ? 'Loading GitHub data...' : error ? 'Unable to load GitHub data' : `${totalCommits} contributions in the last year`}
                    </p>
                    {error && (
                        <button
                            onClick={fetchGitHubData}
                            className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Try again
                        </button>
                    )}
                </motion.div>

                <motion.div variants={fadeUp} className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                    {/* Month labels */}
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 ml-8">
                        {months.map((month, index) => (
                            <span key={month} className={index % 2 === 0 ? '' : 'opacity-0'}>
                                {month}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-1">
                        {/* Day labels */}
                        <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400 mr-2">
                            {days.map((day, index) => (
                                <div key={day} className="h-3 flex items-center">
                                    {index % 2 === 1 && <span>{day}</span>}
                                </div>
                            ))}
                        </div>

                        {/* Commit grid */}
                        <div className="flex gap-1 overflow-x-auto relative">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1 relative">
                                    {Array.from({ length: 7 }, (_, dayIndex) => {
                                        const dayData = week.find((_, i) => {
                                            const date = new Date(week[0].date);
                                            date.setDate(date.getDate() + i);
                                            return date.getDay() === dayIndex;
                                        });

                                        return (
                                            <motion.div
                                                key={`${weekIndex}-${dayIndex}`}
                                                className={`w-3 h-3 rounded-sm ${getLevelColor(dayData?.level || 0)} cursor-pointer transition-all hover:scale-110`}
                                                title={dayData ? `${dayData.commits} commits on ${dayData.date}` : 'No commits'}
                                                whileHover={{ scale: 1.2 }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: weekIndex * 0.01 + dayIndex * 0.005 }}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Less</span>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                                />
                            ))}
                        </div>
                        <span>More</span>
                    </div>
                </motion.div>



                {/* Most Used Languages */}
                {languages.length > 0 && (
                    <motion.div variants={fadeUp} className="mt-8">
                        <h4 className="text-xl font-light tracking-tight mb-6 text-center">
                            Most Used Languages
                        </h4>

                        <div className="bg-white dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
                            {/* Language bars */}
                            <div className="space-y-4">
                                {languages.map((lang, index) => (
                                    <motion.div
                                        key={lang.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-20 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                            {lang.name}
                                        </div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: lang.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${lang.percentage}%` }}
                                                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                                            />
                                        </div>
                                        <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                            {lang.percentage.toFixed(1)}%
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Language dots overview */}
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {languages.map((lang) => (
                                        <div
                                            key={lang.name}
                                            className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                                        >
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: lang.color }}
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {lang.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}