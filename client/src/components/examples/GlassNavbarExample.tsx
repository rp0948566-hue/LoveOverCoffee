import GlassNavbar from '../GlassNavbar';

export default function GlassNavbarExample() {
  return (
    <div className="relative w-full h-20 bg-background">
      <GlassNavbar onNavigate={(section) => console.log('Navigate to:', section)} />
    </div>
  );
}
