"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
    id: string;
    title: string;
    room: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "in-progress" | "completed";
    time: string;
    description?: string;
}

export function TaskCard({ title, room, priority, status, time, description }: TaskCardProps) {
    const priorityColor = {
        high: "bg-red-500/10 text-red-500 border-red-500/20",
        medium: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    }[priority];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-4 rounded-xl space-y-3 cursor-pointer group hover:bg-white/5 transition-colors"
        >
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider", priorityColor)}>
                            {priority}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {time}
                        </span>
                    </div>
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <div className="bg-white/5 px-2 py-1 rounded text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                    RM {room}
                </div>
            </div>

            {description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className={cn("w-2 h-2 rounded-full",
                        status === 'pending' ? 'bg-yellow-500' :
                            status === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
                    )} />
                    {status.replace("-", " ")}
                </div>
                <button className="p-1.5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
}
