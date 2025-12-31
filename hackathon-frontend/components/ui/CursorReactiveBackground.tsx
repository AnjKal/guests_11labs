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
        const friction = 0.94; // Slightly less friction for continuous movement
        const mouseForce = 1.5;
        let time = 0;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;
            angle: number;
            speed: number;
            bounceForce: number;
            lastMouseDist: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.baseX = this.x;
                this.baseY = this.y;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 0.3 + 0.1; // Continuous movement speed
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2.5 + 1.5;
                this.bounceForce = 0; // Track bounce intensity
                this.lastMouseDist = Infinity;
                // Much brighter white particles
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.4})`;
            }

            update(w: number, h: number, mx: number, my: number, timeVal: number) {
                // Continuous natural movement
                this.vx = Math.cos(this.angle + timeVal * 0.01) * this.speed;
                this.vy = Math.sin(this.angle + timeVal * 0.01) * this.speed;

                // Apply Drag / Friction
                this.vx *= friction;
                this.vy *= friction;

                // Mouse Interaction - Bounce and Ripple effect
                const dx = mx - this.x;
                const dy = my - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseInfluenceRadius && distance > 0) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;

                    // Detect if mouse is moving towards particle (ripple trigger)
                    const isApproaching = distance < this.lastMouseDist;
                    
                    // Create bounce effect when cursor approaches
                    if (isApproaching) {
                        this.bounceForce = Math.min(this.bounceForce + 0.3, 2);
                    } else {
                        this.bounceForce *= 0.9; // Decay bounce
                    }

                    // Push direction away from cursor with bounce ripple
                    const rippleWave = Math.sin(distance * 0.08 - timeVal * 0.1) * 0.5 + 0.5;
                    const totalForce = force * mouseForce * (1 + this.bounceForce) * rippleWave;
                    
                    const pushX = Math.cos(angle) * totalForce;
                    const pushY = Math.sin(angle) * totalForce;

                    this.vx -= pushX;
                    this.vy -= pushY;

                    // Oscillate particle size on bounce
                    const sizeOscillation = Math.sin(this.bounceForce * 3 + timeVal * 0.05) * 0.5 + 1;
                } else {
                    this.bounceForce *= 0.95; // Decay when out of range
                }

                this.lastMouseDist = distance;

                // Position Update
                this.x += this.vx;
                this.y += this.vy;

                // Boundary Check with wrapping
                if (this.x < 0) { this.x = w; }
                if (this.x > w) { this.x = 0; }
                if (this.y < 0) { this.y = h; }
                if (this.y > h) { this.y = 0; }
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.fillStyle = this.color;
                // Size pulses with bounce
                const displaySize = this.size * (0.7 + Math.sin(this.bounceForce * 2) * 0.3 + 0.3);
                context.arc(this.x, this.y, displaySize, 0, Math.PI * 2);
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

            time++;

            particles.forEach((particle, i) => {
                particle.update(w, h, mx, my, time);
                particle.draw(ctx);

                // Draw connections with brighter appearance
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - distance / connectionDistance;
                        // Brighter connection lines
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.25})`;
                        ctx.lineWidth = 1.2;
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
