import { useState } from 'react';
import MaggieChat from '../MaggieChat';
import MaggieButton from '../MaggieButton';

export default function MaggieChatExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full h-96 bg-background">
      <MaggieButton onClick={() => setIsOpen(true)} />
      <MaggieChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
