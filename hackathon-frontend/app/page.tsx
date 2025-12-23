"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mic, Sparkles, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 sm:p-20 font-[family-name:var(--font-sans)]">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-4xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/30 text-primary mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide uppercase">Next-Gen Hospitality AI</span>
        </motion.div>

        <h1 className="text-6xl sm:text-8xl font-black tracking-tight leading-[1.1]">
          Talk to Your <br />
          <span className="text-gradient">Hotel Experience</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          A voice-first concierge that understands your needs in any language.
          Instant service, personalized itineraries, and 24/7 support.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <Link href="/guest">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_-10px_rgba(251,191,36,0.8)] transition-all duration-300"
            >
              <Mic className="w-6 h-6" />
              <span>Start Guest Mode</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>

          <Link href="/staff/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 glass rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
            >
              <UserCheck className="w-5 h-5" />
              <span>Staff Portal</span>
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Feature grid / decorative elements */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
        {[
          { title: "Voice First", desc: "No more typing. Just speak naturally in any language.", icon: Mic },
          { title: "Smart Concierge", desc: "AI that books amenities and plans your day instantly.", icon: Sparkles },
          { title: "Real-time Sync", desc: "Requests are dispatched to staff immediately.", icon: UserCheck }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
            className="glass p-6 rounded-2xl text-center space-y-3 hover:bg-white/5 transition-colors"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
