'use client';

import { SignupFormComps } from "@/components/auth/SignupFormComps";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

class Snowflake {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  size: number;
  speed: number;
  wind: number;
  opacity: number;
  wobble: number;
  wobbleX: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.speed = 0;
    this.wind = 0;
    this.opacity = 0;
    this.wobble = 0;
    this.wobbleX = 0;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * -this.canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.wind = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.wobble = Math.random() * 0.05;
    this.wobbleX = 0;
  }
  
  update(mouse: MousePosition, wind: number, gravity: boolean) {
    if (gravity) {
      this.y += this.speed;
      this.x += this.wind + wind;
      this.wobbleX += this.wobble;
      this.x += Math.sin(this.wobbleX) * 0.5;
    }
    
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        this.x += (dx / distance) * force * 5;
        this.y += (dy / distance) * force * 5;
      }
    }
    
    if (this.y > this.canvas.height + 10 || 
        this.x < -10 || 
        this.x > this.canvas.width + 10) {
      this.reset();
      this.y = Math.random() * -100;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(this.x - this.size/3, this.y - this.size/3, this.size/3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snowflakesRef = useRef<Snowflake[]>([]); 
  const mouseRef = useRef<MousePosition>({ x: null, y: null });
  const windRef = useRef(0);
  const gravityRef = useRef(true);
  const animationIdRef = useRef<number | null>(null);
  const [gravityState, setGravityState] = useState(true);

  const initSnowflakes = () => {
    if (!canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    const count = Math.min(150, Math.floor((window.innerWidth * window.innerHeight) / 5000));
    snowflakesRef.current = [];
    
    for (let i = 0; i < count; i++) {
      snowflakesRef.current.push(new Snowflake(canvas));
    }
    
    return ctx;
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    if (!ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    ctx.fillStyle = 'rgba(26, 41, 128, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    snowflakesRef.current.forEach(snowflake => {
      snowflake.update(mouseRef.current, windRef.current, gravityRef.current);
      snowflake.draw(ctx);
    });
    
    animationIdRef.current = requestAnimationFrame(() => animate(ctx));
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = { 
      x: e.clientX, 
      y: e.clientY 
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  const handleWheel = (e: WheelEvent) => {
    windRef.current += e.deltaY * 0.0005;
    windRef.current = Math.max(-2, Math.min(2, windRef.current));
  };

  const toggleGravity = () => {
    gravityRef.current = !gravityRef.current;
    setGravityState(gravityRef.current);
  };

  const handleResize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    snowflakesRef.current.forEach(snowflake => {
      snowflake.canvas = canvas;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = initSnowflakes();
    
    if (ctx) {
      animate(ctx);
    }
    
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
    const handleWheelWrapper = (e: WheelEvent) => handleWheel(e);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMoveWrapper);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('wheel', handleWheelWrapper);
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveWrapper);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheelWrapper);
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      
      <div className="fixed top-4 left-4 z-10 text-white text-sm bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
        <div>Wind: {windRef.current.toFixed(2)}</div>
        <div>Gravity: {gravityState ? "ON" : "OFF"}</div>
        <div className="text-xs opacity-75 mt-1">Scroll: Wind | Click: Toggle Gravity</div>
      </div>
      
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative z-10"
        onClick={toggleGravity}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Create Account</h1>
              <p className="text-blue-100 mt-1">Start your journey with us</p>
            </div>
            
            <div className="p-6">
              <SignupFormComps />
            </div>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
}