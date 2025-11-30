import MenuCarousel from '../MenuCarousel';

export default function MenuCarouselExample() {
  return (
    <MenuCarousel onItemClick={(item) => console.log('Menu item clicked:', item)} />
  );
}
