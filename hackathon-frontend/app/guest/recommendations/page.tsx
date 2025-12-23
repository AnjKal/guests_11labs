"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Sparkles } from "lucide-react";

const places = [
    { title: 'The Old Lighthouse', type: 'Sightseeing', rating: 4.8, dist: '0.5 mi', reason: 'Best sunset view in the city.' },
    { title: 'Azure Costal Walk', type: 'Activity', rating: 4.9, dist: '1.2 mi', reason: 'Matches your interest in "Nature".' },
    { title: 'Spice Market', type: 'Shopping', rating: 4.5, dist: '2.0 mi', reason: 'Popular with guests from your region.' },
];

export default function RecommendationsPage() {
    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-8">
            <header className="flex items-center gap-4">
                <Link href="/guest" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">Local Gems</h1>
                    <span className="text-xs text-primary flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Curated by AI
                    </span>
                </div>
            </header>

            <div className="grid gap-4">
                {places.map((place, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-0 rounded-2xl overflow-hidden group cursor-pointer"
                    >
                        <div className="h-32 bg-gradient-to-r from-slate-700 to-slate-800 relative">
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-yellow-400">
                                <Star className="w-3 h-3 fill-yellow-400" /> {place.rating}
                            </div>
                        </div>
                        <div className="p-5 space-y-2">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">{place.title}</h3>
                                <span className="text-xs text-muted-foreground">{place.dist}</span>
                            </div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <MapPin className="w-3 h-3" /> {place.type}
                            </p>
                            <div className="mt-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-xs text-primary font-medium">
                                    Why: {place.reason}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
