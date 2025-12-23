"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceMic } from "@/components/ui/VoiceMic";
import { Waveform } from "@/components/ui/Waveform";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import Link from "next/link";
import { ArrowLeft, Sparkles, Map, ConciergeBell, Info, MessageSquareWarning } from "lucide-react";

export default function GuestHub() {
    const [micStatus, setMicStatus] = useState<"idle" | "listening" | "processing" | "speaking">("idle");
    const [transcript, setTranscript] = useState("Tap the mic to start speaking...");
    const [confidence, setConfidence] = useState(0);

    const handleMicClick = () => {
        if (micStatus === "idle") {
            setMicStatus("listening");
            setTranscript("Listening...");
            // Simulation
            let conf = 0;
            const interval = setInterval(() => {
                conf += 0.1;
                setConfidence(Math.min(conf, 1));
                if (conf > 2) { // Stop after 2s
                    clearInterval(interval);
                    setMicStatus("processing");
                    setTranscript("Processing request...");
                    setTimeout(() => {
                        setMicStatus("speaking");
                        setTranscript("I can help you with that. Navigating to Concierge...");
                        setTimeout(() => setMicStatus("idle"), 3000);
                    }, 1500);
                }
            }, 100);
        } else {
            setMicStatus("idle");
            setTranscript("Tap the mic to start speaking...");
            setConfidence(0);
        }
    };

    const navItems = [
        { id: 'concierge', label: 'Concierge', icon: ConciergeBell, href: '/guest/concierge' },
        { id: 'itinerary', label: 'Itinerary Planner', icon: Map, href: '/guest/itinerary' },
        { id: 'recommendations', label: 'Local Gems', icon: Sparkles, href: '/guest/recommendations' },
        { id: 'faq', label: 'Hotel FAQ', icon: Info, href: '/guest/faq' },
        { id: 'feedback', label: 'Feedback', icon: MessageSquareWarning, href: '/guest/feedback' },
    ];

    return (
        <div className="flex flex-col min-h-screen p-4 sm:p-8 max-w-5xl mx-auto w-full">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </Link>
                <LanguageSelector />
            </header>

            {/* Main Voice Interface */}
            <main className="flex-1 flex flex-col items-center justify-center space-y-12">

                {/* Dynamic Transcript Area */}
                <div className="text-center space-y-4 max-w-2xl min-h-[120px]">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={transcript}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-2xl sm:text-4xl font-light leading-snug"
                        >
                            "{transcript}"
                        </motion.p>
                    </AnimatePresence>

                    {/* Visual Confidence/Waveform Indicator */}
                    <div className="h-8 flex justify-center items-center">
                        {micStatus !== 'idle' && (
                            <Waveform isListening={micStatus === 'listening' || micStatus === 'speaking'} />
                        )}
                    </div>
                </div>

                {/* Central Mic */}
                <div className="relative">
                    <VoiceMic
                        status={micStatus}
                        onClick={handleMicClick}
                        confidence={confidence}
                        className="scale-125 sm:scale-150"
                    />
                </div>

                {/* Quick Actions / Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-12">
                    {navItems.map((item) => (
                        <Link key={item.id} href={item.href}>
                            <motion.div
                                whileHover={{ y: -5, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                                whileTap={{ scale: 0.95 }}
                                className="glass p-4 rounded-xl flex flex-col items-center justify-center gap-3 text-center h-full min-h-[120px] hover:border-primary/50 transition-colors cursor-pointer"
                            >
                                <div className="p-3 rounded-full bg-white/5 text-primary">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium">{item.label}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </main>
        </div>
    );
}
