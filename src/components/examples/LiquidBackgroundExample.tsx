import LiquidBackground from '../LiquidBackground';

export default function LiquidBackgroundExample() {
  return (
    <div className="relative w-full h-64 bg-background rounded-lg overflow-hidden">
      <LiquidBackground intensity="high" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-foreground/80 text-sm">Liquid Animation Background</p>
      </div>
    </div>
  );
}
