"use client";

import { TaskCard } from "@/components/ui/TaskCard";
import { motion } from "framer-motion";
import { Activity, Bell, CheckCircle2, LayoutDashboard, Search } from "lucide-react";

const tasks = [
    { id: '1', title: 'Fresh Towels', room: '304', priority: 'medium' as const, status: 'pending' as const, time: '2m ago' },
    { id: '2', title: 'Medical Emergency', room: 'Lobby', priority: 'high' as const, status: 'in-progress' as const, time: '1m ago', description: 'Guest fell near elevator' },
    { id: '3', title: 'Late Checkout', room: '512', priority: 'low' as const, status: 'completed' as const, time: '15m ago' },
    { id: '4', title: 'Room Service', room: '201', priority: 'medium' as const, status: 'pending' as const, time: '5m ago', description: '2x Club Sandwich, 1x Coke' },
];

export default function StaffDashboard() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-white/10 hidden md:flex flex-col p-6 space-y-8 sticky top-0 h-screen">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-primary-foreground">
                        H
                    </div>
                    <span className="font-bold text-xl tracking-tight">HotelOS</span>
                </div>

                <nav className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors cursor-pointer">
                        <Activity className="w-5 h-5" />
                        Observability
                    </div>
                </nav>

                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-white/5">
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-1">System Status</p>
                    <div className="flex items-center gap-2 text-green-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-bold">Operational</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Task Board</h1>
                        <p className="text-muted-foreground">Real-time guest requests & dispatch</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900" />
                        </button>
                    </div>
                </header>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Pending Tasks', value: '12', color: 'text-yellow-500' },
                        { label: 'Active Staff', value: '8', color: 'text-blue-500' },
                        { label: 'Avg. Response', value: '3m', color: 'text-green-500' },
                        { label: 'Satisfaction', value: '4.9', color: 'text-primary' },
                    ].map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass p-4 rounded-xl space-y-1"
                        >
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                            <p className={cn("text-2xl font-bold", metric.color)}>{metric.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Task Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {['Pending', 'In Progress', 'Completed'].map((column) => (
                        <div key={column} className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{column}</h3>
                                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{tasks.filter(t => t.status.replace('-', ' ') === column.toLowerCase()).length}</span>
                            </div>
                            <div className="space-y-3">
                                {tasks
                                    .filter(t => t.status.replace('-', ' ') === column.toLowerCase())
                                    .map(task => (
                                        <TaskCard key={task.id} {...task} />
                                    ))
                                }
                                {tasks.filter(t => t.status.replace('-', ' ') === column.toLowerCase()).length === 0 && (
                                    <div className="h-32 rounded-xl border-2 border-dashed border-white/5 flex items-center justify-center text-muted-foreground text-sm">
                                        No tasks
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

// Helper strict type imports (not available), so using cn directly
import { cn } from "@/lib/utils";
