import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface Video {
  id: number;
  src: string;
  title: string;
  description: string;
}

const videos: Video[] = [
  { id: 1, src: '/videos/1.mp4', title: 'Coffee Crafting', description: 'Watch our baristas create magic' },
  { id: 2, src: '/videos/2.mp4', title: 'Cozy Ambiance', description: 'The perfect place to unwind' },
  { id: 3, src: '/videos/3.mp4', title: 'Fresh Bakes', description: 'Daily baked goodness' },
  { id: 4, src: '/videos/4.mp4', title: 'Community Vibes', description: 'Where friends become family' },
  { id: 5, src: '/videos/5.mp4', title: 'Love Over Coffee', description: 'Our story in motion' },
];

export default function VideoSection() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const togglePlay = (videoId: number) => {
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    if (playingVideo === videoId) {
      video.pause();
      setPlayingVideo(null);
    } else {
      if (playingVideo !== null) {
        const prevVideo = videoRefs.current.get(playingVideo);
        prevVideo?.pause();
      }
      video.play();
      setPlayingVideo(videoId);
    }
  };

  const toggleMute = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current.get(videoId);
    if (!video) return;

    if (mutedVideos.has(videoId)) {
      video.muted = false;
      setMutedVideos(prev => {
        const next = new Set(Array.from(prev));
        next.delete(videoId);
        return next;
      });
    } else {
      video.muted = true;
      setMutedVideos(prev => new Set(Array.from(prev).concat(videoId)));
    }
  };

  const handleFullscreen = (videoId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current.get(videoId);
    if (!video) return;
    video.requestFullscreen?.();
  };

  return (
    <section id="videos" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-950/5 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-amber-500/30 text-amber-300">
            Videos
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
            Stories in Motion
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the Love Over Coffee journey through our visual stories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`relative aspect-video rounded-lg overflow-hidden group cursor-pointer ${
                index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full' : ''
              }`}
              onClick={() => togglePlay(video.id)}
              data-testid={`video-container-${video.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-amber-900/20" />
              
              <video
                ref={(el) => { if (el) videoRefs.current.set(video.id, el); }}
                src={video.src}
                loop
                muted={mutedVideos.has(video.id)}
                playsInline
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  playingVideo === video.id ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}>
                  {playingVideo === video.id ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white ml-1" />
                  )}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-white text-lg">{video.title}</h3>
                <p className="text-white/70 text-sm">{video.description}</p>
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => toggleMute(video.id, e)}
                  className="w-8 h-8 bg-black/40 hover:bg-black/60 text-white"
                  data-testid={`button-mute-video-${video.id}`}
                >
                  {mutedVideos.has(video.id) ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleFullscreen(video.id, e)}
                  className="w-8 h-8 bg-black/40 hover:bg-black/60 text-white"
                  data-testid={`button-fullscreen-video-${video.id}`}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-lg transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
