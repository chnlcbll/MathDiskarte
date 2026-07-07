import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const AnimatedBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const symbols = ['₱', '$', '₱', '$', '₱', '$'];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gray-50 dark:bg-[#050508] transition-colors duration-500">
      
      {/* 1. Deep Space / Dynamic Gradient Mesh */}
      <div className="absolute inset-0 opacity-50 dark:opacity-40 mix-blend-normal dark:mix-blend-screen">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, -20, 0],
            y: [0, -50, 30, 0],
            rotate: [0, 90, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-teal-400/20 dark:bg-teal-600/20 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
            rotate: [360, 180, 90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-400/20 dark:bg-blue-600/20 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.3, 1.2],
            x: [40, 0, -60, 40],
            y: [-40, 80, 0, -40],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-purple-400/15 dark:bg-purple-600/15 blur-[90px] rounded-full"
        />
      </div>

      {/* 2. Cyberpunk / Synthwave Floor Grid */}
      <div className="absolute inset-0 [perspective:1000px] flex items-end justify-center opacity-30 dark:opacity-40 overflow-hidden">
        <motion.div 
          animate={{
            y: [0, 80],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200vw] h-[100vh] origin-top"
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(20, 184, 166, 0.15) 1px, transparent 1px), 
              linear-gradient(to bottom, rgba(20, 184, 166, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(75deg) translateY(-50%) translateZ(-200px)',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          }}
        />
      </div>

      {/* 3. Floating Math Particles & 3D Shapes */}
      {mounted && [...Array(15)].map((_, i) => (
        <motion.div
          key={`math-${i}`}
          initial={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: [0, Math.random() * -400 - 100],
            x: [0, (Math.random() - 0.5) * 300],
            opacity: [0, 0.6, 0],
            scale: [0, Math.random() * 1.5 + 1, 0],
            rotate: [0, Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)]
          }}
          transition={{ 
            duration: Math.random() * 10 + 15, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 15
          }}
          className="absolute text-2xl md:text-5xl font-serif text-teal-600/40 dark:text-teal-400/50 select-none pointer-events-none drop-shadow-2xl font-bold"
        >
          {symbols[Math.floor(Math.random() * symbols.length)]}
        </motion.div>
      ))}

      {/* 3.5 Massive Floating 3D Geometric Shapes */}
      {mounted && (
        <>
          <motion.div
            animate={{
              y: [0, -60, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 90, 180],
              rotateZ: [0, 45, 90],
            }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -left-[10%] md:-left-12 w-48 h-48 border-[2px] border-teal-500/20 dark:border-teal-400/50"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 border-[2px] border-teal-500/20 dark:border-teal-400/50 [transform:rotateX(90deg)_translateZ(96px)]" />
            <div className="absolute inset-0 border-[2px] border-teal-500/20 dark:border-teal-400/50 [transform:rotateY(90deg)_translateZ(96px)]" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 80, 0],
              rotate: [0, -180, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[5%] -right-[10%] md:-right-12 w-64 h-64 border-[4px] border-blue-500/10 dark:border-blue-400/40 rounded-full flex items-center justify-center"
          >
            <div className="w-48 h-48 border-[2px] border-blue-500/20 dark:border-blue-400/50 rounded-full" />
            <div className="absolute w-64 h-64 border-[2px] border-blue-500/20 dark:border-blue-400/50 rounded-full rotate-45 scale-y-50" />
            <div className="absolute w-64 h-64 border-[2px] border-blue-500/20 dark:border-blue-400/50 rounded-full -rotate-45 scale-y-50" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -50, 0],
              x: [0, 40, 0],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[2%] md:right-[5%] w-32 h-32 border-[3px] border-purple-500/10 dark:border-purple-400/50 rotate-45 backdrop-blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
              rotateX: [0, 360],
              rotateZ: [0, 360],
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-[20%] left-[2%] md:left-[5%] w-40 h-40 border-[2px] border-pink-500/10 dark:border-pink-400/50 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute w-full h-full border-[2px] border-pink-500/10 dark:border-pink-400/50 [transform:rotateX(60deg)]" />
            <div className="absolute w-full h-full border-[2px] border-pink-500/10 dark:border-pink-400/50 [transform:rotateY(60deg)]" />
          </motion.div>
        </>
      )}

      {/* 4. Abstract Sacred Geometry Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] dark:opacity-[0.05] mix-blend-overlay pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border-[1px] border-black dark:border-white rounded-full flex items-center justify-center relative"
        >
          <div className="w-[86%] h-[86%] border-[1px] border-black dark:border-white rounded-full flex items-center justify-center rotate-45 absolute" />
          <div className="w-[70%] h-[70%] border-[1px] border-black dark:border-white rounded-full absolute" />
          <div className="w-[100%] h-[100%] border-[1px] border-black dark:border-white absolute rotate-[30deg]" />
          <div className="w-[100%] h-[100%] border-[1px] border-black dark:border-white absolute rotate-[60deg]" />
          <div className="w-[100%] h-[100%] border-[1px] border-black dark:border-white absolute rotate-[120deg]" />
        </motion.div>
      </div>

    </div>
  );
};
