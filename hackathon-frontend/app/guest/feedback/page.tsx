"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mic, TicketCheck } from "lucide-react";

export default function FeedbackPage() {
    const [status, setStatus] = useState<'idle' | 'recording' | 'submitted'>('idle');

    const handleRecord = () => {
        setStatus('recording');
        setTimeout(() => setStatus('submitted'), 2000);
    };

    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-8 flex flex-col">
            <header className="flex items-center gap-4">
                <Link href="/guest" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Share Feedback</h1>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center">
                {status === 'submitted' ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-4"
                    >
                        <div className="w-24 h-24 rounded-full bg-green-500/20 text-green-500 mx-auto flex items-center justify-center">
                            <TicketCheck className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold">Thank You</h2>
                        <p className="text-muted-foreground">Your feedback has been logged ticket #8921.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-8 text-primary hover:underline"
                        >
                            Submit another
                        </button>
                    </motion.div>
                ) : (
                    <>
                        <h2 className="text-3xl font-light">Tell us about your stay</h2>
                        <motion.button
                            onClick={handleRecord}
                            animate={status === 'recording' ? { scale: [1, 1.1, 1], boxShadow: "0 0 40px rgba(251,191,36,0.6)" } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl"
                        >
                            <Mic className="w-12 h-12" />
                        </motion.button>
                        <p className="text-muted-foreground">{status === 'recording' ? "Listening..." : "Tap to record"}</p>
                    </>
                )}
            </div>
        </div>
    );
}
