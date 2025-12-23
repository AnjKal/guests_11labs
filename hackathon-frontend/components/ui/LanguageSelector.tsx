"use client";

import { motion } from "framer-motion";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
];

export function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(languages[0]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/5 transition-colors"
                aria-label="Select Language"
            >
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{selectedLang.code.toUpperCase()}</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute right-0 top-full mt-2 w-48 rounded-xl glass shadow-xl overflow-hidden z-50 flex flex-col p-1"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setSelectedLang(lang);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left",
                                    selectedLang.code === lang.code ? "bg-primary/20 text-primary" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">{lang.flag}</span>
                                    {lang.name}
                                </span>
                                {selectedLang.code === lang.code && <Check className="w-3 h-3" />}
                            </button>
                        ))}
                    </motion.div>
                </>
            )}
        </div>
    )
}
