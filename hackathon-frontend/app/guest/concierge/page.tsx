"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mic, CheckCircle2, ShoppingBag, Utensils, Bed, Sparkles, MessageSquare } from "lucide-react";
import { chatWithAI } from "@/lib/api";

const amenities = [
    { id: 'towels', name: 'Fresh Towels', icon: Bed, eta: '5 mins' },
    { id: 'dining', name: 'Room Service', icon: Utensils, eta: '20 mins' },
    { id: 'cleaning', name: 'Housekeeping', icon: Sparkles, eta: 'ASAP' },
    { id: 'toiletries', name: 'Toiletries Kit', icon: ShoppingBag, eta: '10 mins' },
];

export default function ConciergePage() {
    const [requesting, setRequesting] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));

    const handleRequest = async (id: string, message: string) => {
        setRequesting(id);
        setAiResponse(null);
        try {
            const reply = await chatWithAI(message, sessionId);
            setAiResponse(reply);
        } catch (error) {
            console.error(error);
            setAiResponse("Sorry, I couldn't process your request.");
        } finally {
            setRequesting(null);
        }
    };

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
            <header className="flex items-center gap-4">
                <Link href="/guest" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold">Voice Concierge</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 min-h-[300px]">
                        <div className="p-4 rounded-full bg-primary/20 text-primary">
                            {aiResponse ? <MessageSquare className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{aiResponse ? "Assistant says:" : "How can we help?"}</h2>
                            <p className="text-muted-foreground text-lg">
                                {aiResponse || '"I need fresh towels"'}
                            </p>
                            {!aiResponse && <p className="text-muted-foreground">"Order a club sandwich"</p>}
                        </div>
                        <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform">
                            Tap to Speak
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold px-2">Quick Requests</h3>
                    <div className="grid gap-3">
                        {amenities.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => handleRequest(item.id, `I would like ${item.name}`)}
                                disabled={!!requesting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass p-4 rounded-xl flex items-center justify-between group hover:bg-white/5 disabled:opacity-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-white/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Est. time: {item.eta}</p>
                                    </div>
                                </div>
                                {requesting === item.id ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-green-500"
                                    >
                                        <CheckCircle2 className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full border border-white/20" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
