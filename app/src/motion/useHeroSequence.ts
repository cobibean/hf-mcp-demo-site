import { useEffect, type RefObject } from "react";

type HeroSequenceOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  frameCount: number;
  framePath: (index: number) => string;
};

const MAX_DEVICE_PIXEL_RATIO = 2;

export default function useHeroSequence({
  canvasRef,
  heroRef,
  frameCount,
  framePath,
}: HeroSequenceOptions) {
  useEffect(() => {
    const browserWindow = globalThis.window;

    if (!browserWindow) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const hero = heroRef.current;

    if (!canvas || !hero) {
      return undefined;
    }

    const motionQuery = browserWindow.matchMedia("(prefers-reduced-motion: reduce)");
    const context = canvas.getContext("2d");

    if (!context) {
      hero.dataset.sequenceFallback = "true";
      return undefined;
    }

    let isDisposed = false;
    let currentFrame = 0;
    let gsapApi: typeof import("gsap").gsap | null = null;
    let lenisInstance: { destroy: () => void; raf: (time: number) => void; on: (event: "scroll", callback: () => void) => void } | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let tweenInstance: { kill: () => void; scrollTrigger?: { kill: () => void } } | null = null;
    const frames: Array<HTMLImageElement | undefined> = [];

    const drawCover = (image: HTMLImageElement) => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      const devicePixelRatio = Math.min(
        browserWindow.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO,
      );
      const pixelWidth = Math.round(width * devicePixelRatio);
      const pixelHeight = Math.round(height * devicePixelRatio);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;
      let sourceX = 0;
      let sourceY = 0;

      if (imageRatio > canvasRatio) {
        sourceWidth = image.naturalHeight * canvasRatio;
        sourceX = (image.naturalWidth - sourceWidth) * 0.58;
      } else {
        sourceHeight = image.naturalWidth / canvasRatio;
        sourceY = (image.naturalHeight - sourceHeight) * 0.5;
      }

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        width,
        height,
      );
    };

    const renderFrame = (frame: number) => {
      const frameIndex = Math.max(0, Math.min(frameCount - 1, Math.round(frame)));
      const image = frames[frameIndex];
      currentFrame = frameIndex;

      if (image?.complete && image.naturalWidth > 0) {
        drawCover(image);
      }
    };

    const loadFrame = (frameIndex: number) => {
      const existingFrame = frames[frameIndex];

      if (existingFrame) {
        return existingFrame;
      }

      const image = new browserWindow.Image();
      image.decoding = "async";
      image.src = framePath(frameIndex);
      image.onload = () => {
        if (isDisposed) {
          return;
        }

        if (frameIndex === 0) {
          hero.dataset.sequenceReady = "true";
        }

        if (frameIndex === 0 || frameIndex === currentFrame) {
          renderFrame(currentFrame);
        }
      };
      image.onerror = () => {
        if (frameIndex === 0) {
          hero.dataset.sequenceFallback = "true";
        }
      };
      frames[frameIndex] = image;

      return image;
    };

    loadFrame(0);

    const firstFrame = frames[0];

    if (firstFrame?.complete && firstFrame.naturalWidth > 0) {
      hero.dataset.sequenceReady = "true";
      renderFrame(0);
    }

    const resizeObserver = new browserWindow.ResizeObserver(() => {
      renderFrame(currentFrame);
    });

    resizeObserver.observe(canvas);

    if (motionQuery.matches) {
      hero.dataset.reducedMotion = "true";
      renderFrame(0);

      return () => {
        isDisposed = true;
        resizeObserver.disconnect();
      };
    }

    for (let frameIndex = 1; frameIndex < frameCount; frameIndex += 1) {
      loadFrame(frameIndex);
    }

    const setupMotion = async () => {
      const [{ default: Lenis }, gsapModule, scrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isDisposed) {
        return;
      }

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const playhead = { frame: 0 };

      gsapApi = gsap;
      gsap.registerPlugin(ScrollTrigger);

      lenisInstance = new Lenis({
        autoRaf: false,
        duration: 1.05,
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      });

      lenisInstance.on("scroll", ScrollTrigger.update);
      tickerCallback = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      tweenInstance = gsap.to(playhead, {
        frame: frameCount - 1,
        ease: "none",
        snap: "frame",
        onUpdate: () => renderFrame(playhead.frame),
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=150%",
          scrub: 0.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      renderFrame(0);
      ScrollTrigger.refresh();
    };

    void setupMotion();

    return () => {
      isDisposed = true;
      resizeObserver.disconnect();
      tweenInstance?.scrollTrigger?.kill();
      tweenInstance?.kill();

      if (tickerCallback && gsapApi) {
        gsapApi.ticker.remove(tickerCallback);
      }

      lenisInstance?.destroy();
    };
  }, [canvasRef, heroRef, frameCount, framePath]);
}
