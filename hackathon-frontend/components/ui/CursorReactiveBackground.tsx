"use client";

import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

export function CursorReactiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseX = useMotionValue(-1000); // Start off-screen
    const mouseY = useMotionValue(-1000);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Configuration
        const particleCount = 80;
        const connectionDistance = 150;
        const mouseInfluenceRadius = 250;
        const friction = 0.92; // Friction to stop movement
        const mouseForce = 1.2;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.baseX = this.x;
                this.baseY = this.y;
                this.vx = 0; // No initial movement
                this.vy = 0;
                this.size = Math.random() * 2 + 1;
                // Brighter White colors as requested
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
            }

            update(w: number, h: number, mx: number, my: number) {
                // Apply Drag / Friction
                this.vx *= friction;
                this.vy *= friction;

                // Position Update
                this.x += this.vx;
                this.y += this.vy;

                // Mouse Interaction
                const dx = mx - this.x;
                const dy = my - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseInfluenceRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;

                    // Push direction away from cursor
                    const pushX = Math.cos(angle) * force * mouseForce;
                    const pushY = Math.sin(angle) * force * mouseForce;

                    this.vx -= pushX;
                    this.vy -= pushY;
                }

                // Boundary Check
                if (this.x < 0) { this.x = 0; this.vx *= -1; }
                if (this.x > w) { this.x = w; this.vx *= -1; }
                if (this.y < 0) { this.y = 0; this.vy *= -1; }
                if (this.y > h) { this.y = h; this.vy *= -1; }
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.fillStyle = this.color;
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fill();
            }
        }

        const init = () => {
            particles = [];
            const w = canvas.width;
            const h = canvas.height;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(w, h));
            }
        };

        const animate = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const mx = mouseX.get();
            const my = mouseY.get();

            particles.forEach((particle, i) => {
                particle.update(w, h, mx, my);
                particle.draw(ctx);

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - distance / connectionDistance;
                        // Brighter connection lines
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseLeave = () => {
            mouseX.set(-1000);
            mouseY.set(-1000);
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);

        handleResize();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mouseX, mouseY]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}
