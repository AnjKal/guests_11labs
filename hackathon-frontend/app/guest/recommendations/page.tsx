"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Sparkles, Send, MessageSquare } from "lucide-react";
import { useState } from "react";
import { chatWithAI } from "@/lib/api";

const places = [
    { title: 'The Old Lighthouse', type: 'Sightseeing', rating: 4.8, dist: '0.5 mi', reason: 'Best sunset view in the city.' },
    { title: 'Azure Costal Walk', type: 'Activity', rating: 4.9, dist: '1.2 mi', reason: 'Matches your interest in "Nature".' },
    { title: 'Spice Market', type: 'Shopping', rating: 4.5, dist: '2.0 mi', reason: 'Popular with guests from your region.' },
];

export default function RecommendationsPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
        { role: 'assistant', content: 'Hi! Ask me anything about these local gems or need more recommendations?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));

    const handleSendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const reply = await chatWithAI(userMessage, sessionId, { context: 'Local gems recommendations' });
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
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

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
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

                <div className="flex flex-col">
                    <div className="glass rounded-2xl p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                            <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold">Ask the AI Agent</h3>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto mb-4 max-h-[400px]">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-lg p-3 ${
                                        msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-white/10 text-foreground'
                                    }`}>
                                        <p className="text-sm">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                                            <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ask about gems..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={loading}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm placeholder-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={loading || !input.trim()}
                                className="p-2 rounded-lg bg-primary text-primary-foreground hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
