"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Mic } from "lucide-react";

export default function FAQPage() {
    return (
        <div className="min-h-screen p-6 max-w-2xl mx-auto space-y-8">
            <header className="flex items-center gap-4">
                <Link href="/guest" className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold">Frequently Asked</h1>
            </header>

            <div className="glass p-8 rounded-3xl text-center space-y-4 mb-8">
                <div className="p-4 rounded-full bg-primary/20 text-primary w-16 h-16 mx-auto flex items-center justify-center">
                    <Mic className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">Just ask!</h3>
                <p className="text-muted-foreground">"When is breakfast served?"</p>
                <p className="text-muted-foreground">"What is the wifi password?"</p>
            </div>

            <div className="space-y-3">
                {[
                    { q: "What time is checkout?", a: "Checkout is at 11:00 AM." },
                    { q: "Is the pool heated?", a: "Yes, the pool is heated to 28°C year-round." },
                    { q: "Do you offer airport transfer?", a: "Yes, we can arrange a private car." },
                ].map((item, i) => (
                    <div key={i} className="glass p-4 rounded-xl">
                        <h4 className="font-semibold mb-2">{item.q}</h4>
                        <p className="text-sm text-muted-foreground">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
