import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onAskMaggie={() => console.log('Ask Maggie clicked')}
      onViewMenu={() => console.log('View Menu clicked')}
    />
  );
}
