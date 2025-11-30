import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface MaggieButtonProps {
  onClick: () => void;
}

export default function MaggieButton({ onClick }: MaggieButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 h-auto py-3 px-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white rounded-full shadow-lg animate-breathing-glow transition-all duration-300 hover:scale-105 group"
      data-testid="button-ask-maggie"
    >
      <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
      <span className="font-medium">Ask Maggie</span>
      <span className="ml-1 text-amber-300">✨</span>
    </Button>
  );
}
