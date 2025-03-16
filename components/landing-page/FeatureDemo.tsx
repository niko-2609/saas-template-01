'use client';

import { useEffect, useRef } from 'react';

export default function FeatureDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">See Our Main Feature in Action</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Watch how our platform simplifies your workflow and boosts productivity.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto mt-8 overflow-hidden rounded-lg shadow-xl">
            <div className="relative aspect-video">
              {/* <Image
                src="/demo-feature.gif"
                alt="Main feature demonstration"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                quality={90}
              /> */}
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
                controls={false}
              >
                <source src="/assets/tripsy-demo-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 