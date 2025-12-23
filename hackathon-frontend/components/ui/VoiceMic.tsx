"use client";

import { motion } from "framer-motion";
import { Mic, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceMicProps {
    status: "idle" | "listening" | "processing" | "speaking";
    onClick?: () => void;
    className?: string;
    confidence?: number;
}

export function VoiceMic({ status = "idle", onClick, className, confidence = 0 }: VoiceMicProps) {
    // Glow color based on status
    const glowVariants = {
        idle: "rgba(251, 191, 36, 0.2)",
        listening: "rgba(251, 191, 36, 0.6)",
        processing: "rgba(56, 189, 248, 0.6)", // Sky blue for processing
        speaking: "rgba(34, 197, 94, 0.6)", // Green for speaking
    };

    const ringColor = status === "processing"
        ? "border-sky-400"
        : status === "speaking"
            ? "border-green-400"
            : "border-primary";

    const iconColor = status === "processing"
        ? "text-sky-400"
        : status === "speaking"
            ? "text-green-400"
            : "text-primary";

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            {/* Outer Glow / Ripple Rings */}
            {status === "listening" && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            repeatDelay: 0.5,
                            ease: "easeOut",
                        }}
                        className={cn("absolute inset-0 rounded-full border opacity-0", ringColor)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.5 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: 0.5,
                            repeatDelay: 0.5,
                            ease: "easeOut",
                        }}
                        className={cn("absolute inset-0 rounded-full border opacity-0", ringColor)}
                    />
                </>
            )}

            {/* Main Mic Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={cn(
                    "relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-secondary shadow-xl transition-all duration-300 border-2",
                    status === "idle" ? "border-border" : ringColor
                )}
                style={{
                    boxShadow: `0 0 40px ${glowVariants[status]}`,
                }}
            >
                <div className="relative">
                    {status === "processing" ? (
                        <Loader2 className={cn("h-10 w-10 animate-spin transition-colors duration-300", iconColor)} />
                    ) : (
                        <Mic className={cn("h-10 w-10 transition-colors duration-300", iconColor)} />
                    )}

                    {/* Confidence Level fill effect (conceptual) */}
                    {status === "listening" && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-primary/20"
                            style={{ height: `${confidence * 100}%` }}
                        />
                    )}
                </div>
            </motion.button>

            {/* Status Text Label */}
            <div className="absolute -bottom-12 text-center w-40">
                <motion.span
                    key={status}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-medium tracking-widest uppercase text-muted-foreground"
                >
                    {status}
                </motion.span>
            </div>
        </div>
    );
}
