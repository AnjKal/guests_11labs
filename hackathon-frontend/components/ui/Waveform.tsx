"use client";

import { motion } from "framer-motion";

interface WaveformProps {
    isListening: boolean;
    bars?: number;
}

export function Waveform({ isListening, bars = 5 }: WaveformProps) {
    return (
        <div className="flex items-center gap-1 h-8">
            {Array.from({ length: bars }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 rounded-full bg-primary"
                    animate={
                        isListening
                            ? {
                                height: [
                                    "20%",
                                    `${Math.max(40, Math.random() * 100)}%`,
                                    "20%",
                                ],
                            }
                            : { height: "10%" }
                    }
                    transition={
                        isListening
                            ? {
                                repeat: Infinity,
                                duration: 0.5 + Math.random() * 0.5,
                                ease: "easeInOut",
                                delay: i * 0.1,
                            }
                            : { duration: 0.3 }
                    }
                    style={{ height: '10%' }}
                />
            ))}
        </div>
    );
}
