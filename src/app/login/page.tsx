'use client';

import { motion, Variants } from "framer-motion";
import { LoginFormComp } from "@/components/auth/LoginFormComp";
import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  trailLength: number;
  trailOpacity: number[];
  isShooting: boolean;
  angle: number;
  shootingSpeed: number;
  shootingLife: number;
  shootingMaxLife: number;
}

export default function LoginPage() {
  const [name, setName] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef<MousePosition>({ x: null, y: null });
  const animationIdRef = useRef<number | null>(null);
  
//   const textVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number = 0) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.15,
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     }),
//   };

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

  const createStar = (canvas: HTMLCanvasElement, isShooting: boolean = false): Star => {
    const maxTrailLength = 15;
    const trailOpacity = Array(maxTrailLength).fill(0).map(() => Math.random() * 0.3 + 0.1);
    
    if (isShooting) {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        trailLength: maxTrailLength,
        trailOpacity,
        isShooting: true,
        angle: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
        shootingSpeed: Math.random() * 3 + 2,
        shootingLife: 0,
        shootingMaxLife: Math.random() * 80 + 40
      };
    }
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      trailLength: 1,
      trailOpacity: [1],
      isShooting: false,
      angle: 0,
      shootingSpeed: 0,
      shootingLife: 0,
      shootingMaxLife: 0
    };
  };

  const initStars = () => {
    if (!canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    const starCount = Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 3000));
    starsRef.current = [];
    
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push(createStar(canvas));
    }
    
    const shootingStarCount = Math.floor(starCount * 0.1);
    for (let i = 0; i < shootingStarCount; i++) {
      starsRef.current.push(createStar(canvas, true));
    }
    
    return ctx;
  };

  const updateStar = (star: Star, canvas: HTMLCanvasElement) => {
    if (star.isShooting) {
      // Shooting star logic
      star.shootingLife++;
      
      if (star.shootingLife > star.shootingMaxLife) {
        // Reset shooting star
        Object.assign(star, createStar(canvas, true));
        return;
      }
      
      star.x += Math.cos(star.angle) * star.shootingSpeed;
      star.y += Math.sin(star.angle) * star.shootingSpeed;
      
      star.trailOpacity.unshift(star.opacity);
      if (star.trailOpacity.length > star.trailLength) {
        star.trailOpacity.pop();
      }
      
      star.opacity = 0.8 + Math.sin(star.shootingLife * 0.1) * 0.2;
    } else {
      star.twinklePhase += star.twinkleSpeed;
      star.opacity = 0.5 + Math.sin(star.twinklePhase) * 0.3;
      
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }
  };

  const drawStar = (star: Star, ctx: CanvasRenderingContext2D) => {
    if (star.isShooting) {
      for (let i = star.trailOpacity.length - 1; i >= 0; i--) {
        const opacity = star.trailOpacity[i] * (i / star.trailOpacity.length);
        const trailX = star.x - Math.cos(star.angle) * i * 2;
        const trailY = star.y - Math.sin(star.angle) * i * 2;
        const trailSize = star.size * (1 - i / star.trailOpacity.length);
        
        ctx.beginPath();
        ctx.arc(trailX, trailY, trailSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(trailX, trailY, trailSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173, 216, 230, ${opacity * 0.3})`;
        ctx.fill();
      }
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
      
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 4
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.2})`;
      ctx.fill();
    }
  };

  const animate = (ctx: CanvasRenderingContext2D) => {
    if (!ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    ctx.fillStyle = 'rgba(10, 15, 40, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(5, 10, 30, 0.3)');
    gradient.addColorStop(1, 'rgba(20, 25, 60, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % canvas.width;
      const y = (i * 23) % canvas.height;
      const size = 0.3;
      const opacity = 0.1 + Math.random() * 0.1;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
    
    starsRef.current.forEach(star => {
      updateStar(star, canvas);
      drawStar(star, ctx);
    });
    
    animationIdRef.current = requestAnimationFrame(() => animate(ctx));
  };

  const handleResize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initStars();
  };

  useEffect(() => {
    const userName = localStorage.getItem('user_firstName');
    setName(userName);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = initStars();
    
    if (ctx) {
      animate(ctx);
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative bg-linear-to-b from-gray-900 via-purple-900 to-violet-900">
      
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      
      <div className="min-h-screen flex flex-col justify-center items-center p-4 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.3
          }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >

          <div className="bg-linear-to-r from-purple-900/80 to-blue-900/80 p-6 text-center border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Starlight Login</h2>
            <p className="text-blue-100 mt-1">Enter your cosmic credentials</p>
          </div>
          
          <div className="p-6">
            <LoginFormComp />
          </div>
          
          <div className="px-6 py-4 bg-black/20 border-t border-white/10 text-center">
            <p className="text-sm text-gray-300">
              Shooting stars dance across the night sky 🌠
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-white/70 text-sm max-w-md"
        >
          <p>Watch shooting stars streak across the night sky as you log in</p>
          <p className="text-xs mt-2 text-cyan-200">Each star has its own unique twinkle and trail</p>
        </motion.div>
      </div>
    </div>
  );
}