"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Mic, RefreshCw, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ItineraryPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const timeline = [
        { time: '09:00 AM', title: 'Breakfast at The Palm', icon: Sun, type: 'food' },
        { time: '11:00 AM', title: 'Private Beach Cabana', icon: Sun, type: 'activity' },
        { time: '01:30 PM', title: 'Lunch: Sea Grill', icon: Sun, type: 'food' },
        { time: '04:00 PM', title: 'Spa Treatment', icon: Moon, type: 'relax' },
        { time: '08:00 PM', title: 'Dinner: Rooftop Lounge', icon: Moon, type: 'food' },
    ];

    const handleRegenerate = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
    };

    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-8 pb-32">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/guest" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold">Your Day</h1>
                </div>
                <button
                    onClick={handleRegenerate}
                    className="p-2 rounded-full glass hover:bg-white/10 text-primary transition-colors"
                    disabled={isRefreshing}
                >
                    <RefreshCw className={cn("w-5 h-5", isRefreshing && "animate-spin")} />
                </button>
            </header>

            <div className="relative border-l border-white/10 ml-4 space-y-8">
                {timeline.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-8"
                    >
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-4 border-slate-900" />
                        <div className="glass p-4 rounded-xl hover:bg-white/5 transition-colors">
                            <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">{item.time}</span>
                            <div className="flex items-center gap-3 mt-1">
                                <item.icon className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Voice Command Footer */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl border border-primary/20 bg-slate-900/80 backdrop-blur-xl">
                <div className="p-2 rounded-full bg-primary/20 text-primary animate-pulse">
                    <Mic className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">"Add a swimming session at 3 PM"</span>
            </div>
        </div>
    );
}
