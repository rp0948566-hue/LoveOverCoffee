import { useEffect, useRef } from 'react';

interface LiquidBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function LiquidBackground({ className = '', intensity = 'medium' }: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const speedMultiplier = intensity === 'low' ? 0.3 : intensity === 'high' ? 1.2 : 0.7;

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const gradient1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time * 0.5) * 100,
        height * 0.4 + Math.cos(time * 0.3) * 80,
        0,
        width * 0.3,
        height * 0.4,
        width * 0.6
      );
      gradient1.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      gradient1.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');
      gradient1.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.7 + Math.cos(time * 0.4) * 120,
        height * 0.6 + Math.sin(time * 0.6) * 100,
        0,
        width * 0.7,
        height * 0.6,
        width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.25)');
      gradient2.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
      gradient2.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      const gradient3 = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.7) * 80,
        height * 0.3 + Math.cos(time * 0.5) * 60,
        0,
        width * 0.5,
        height * 0.3,
        width * 0.4
      );
      gradient3.addColorStop(0, 'rgba(217, 170, 94, 0.2)');
      gradient3.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
      gradient3.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height * (0.3 + i * 0.2) + Math.sin(time + i) * 30);
        
        for (let x = 0; x <= width; x += 20) {
          const y = height * (0.3 + i * 0.2) + 
                    Math.sin(x * 0.01 + time + i * 0.5) * 40 +
                    Math.cos(x * 0.02 + time * 0.5) * 20;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, 0, 0, height);
        waveGradient.addColorStop(0, `rgba(139, 92, 246, ${0.05 - i * 0.01})`);
        waveGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      time += 0.01 * speedMultiplier;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
