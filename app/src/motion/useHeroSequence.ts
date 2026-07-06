import { useEffect, type RefObject } from "react";

type HeroSequenceOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  frameCount: number;
  framePath: (index: number) => string;
};

const MAX_DEVICE_PIXEL_RATIO = 2;
const NEARBY_PRELOAD_RADIUS = 8;
const IDLE_PRELOAD_BATCH_SIZE = 6;
const IDLE_PRELOAD_TIMEOUT = 700;
const BACKGROUND_PRELOAD_START_DELAY = 1_200;
const BACKGROUND_PRELOAD_BATCH_DELAY = 260;

type HeroFrame = {
  bitmap?: ImageBitmap;
  height: number;
  image: HTMLImageElement;
  status: "failed" | "loading" | "ready";
  width: number;
};

type CanvasMetrics = {
  canvasRatio: number;
  devicePixelRatio: number;
  height: number;
  pixelHeight: number;
  pixelWidth: number;
  width: number;
};

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
    let lastDrawnFrame = -1;
    let canvasMetrics: CanvasMetrics | null = null;
    let gsapApi: typeof import("gsap").gsap | null = null;
    let lenisInstance: {
      destroy: () => void;
      raf: (time: number) => void;
      on: (event: "scroll", callback: () => void) => void;
      scrollTo: (target: number | HTMLElement, options?: { duration?: number }) => void;
    } | null = null;
    let anchorClickHandler: ((event: MouseEvent) => void) | null = null;
    let tickerCallback: ((time: number) => void) | null = null;
    let tweenInstance: { kill: () => void; scrollTrigger?: { kill: () => void } } | null = null;
    let isBackgroundPreloadScheduled = false;
    let hasStartedBackgroundPreload = false;
    let backgroundFrameCursor = 1;
    let idlePreloadId: number | null = null;
    let timeoutPreloadId: number | null = null;
    const frames: Array<HeroFrame | undefined> = [];
    const idleWindow = browserWindow as typeof browserWindow & {
      cancelIdleCallback?: (handle: number) => void;
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    };

    const updateCanvasMetrics = () => {
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

      canvasMetrics = {
        canvasRatio: width / height,
        devicePixelRatio,
        height,
        pixelHeight,
        pixelWidth,
        width,
      };
      lastDrawnFrame = -1;

      return canvasMetrics;
    };

    const getCanvasMetrics = () => canvasMetrics ?? updateCanvasMetrics();

    const drawCover = (frame: HeroFrame) => {
      const metrics = getCanvasMetrics();
      const { canvasRatio, devicePixelRatio, height, width } = metrics;
      const imageWidth = frame.width || frame.image.naturalWidth;
      const imageHeight = frame.height || frame.image.naturalHeight;

      if (imageWidth <= 0 || imageHeight <= 0) {
        return;
      }

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const imageRatio = imageWidth / imageHeight;
      let sourceWidth = imageWidth;
      let sourceHeight = imageHeight;
      let sourceX = 0;
      let sourceY = 0;

      if (imageRatio > canvasRatio) {
        sourceWidth = imageHeight * canvasRatio;
        sourceX = (imageWidth - sourceWidth) * 0.58;
      } else {
        sourceHeight = imageWidth / canvasRatio;
        sourceY = (imageHeight - sourceHeight) * 0.5;
      }

      context.drawImage(
        frame.bitmap ?? frame.image,
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

    const clampFrameIndex = (frame: number) =>
      Math.max(0, Math.min(frameCount - 1, Math.round(frame)));

    const isFrameRequested = (frameIndex: number) => frames[frameIndex] !== undefined;

    const allFramesRequested = () => frames.filter(Boolean).length >= frameCount;

    const renderFrame = (frame: number, options: { force?: boolean } = {}) => {
      const frameIndex = clampFrameIndex(frame);
      const image = frames[frameIndex];
      currentFrame = frameIndex;

      if (!image) {
        loadFrame(frameIndex);
        preloadAroundFrame(frameIndex);
        return;
      }

      if (image.status !== "ready") {
        preloadAroundFrame(frameIndex);
        return;
      }

      if (!options.force && frameIndex === lastDrawnFrame) {
        preloadAroundFrame(frameIndex);
        return;
      }

      if (image.width > 0 && image.height > 0) {
        drawCover(image);
        lastDrawnFrame = frameIndex;
      }

      preloadAroundFrame(frameIndex);
    };

    const loadFrame = (frameIndex: number) => {
      const existingFrame = frames[frameIndex];

      if (existingFrame) {
        return existingFrame;
      }

      const image = new browserWindow.Image();
      const frame: HeroFrame = {
        height: 0,
        image,
        status: "loading",
        width: 0,
      };
      let hasSettled = false;

      const settleFrame = async () => {
        if (hasSettled) {
          return;
        }

        hasSettled = true;

        if (image.decode) {
          await image.decode().catch(() => undefined);
        }

        let bitmap: ImageBitmap | undefined;

        if (typeof browserWindow.createImageBitmap === "function") {
          bitmap = await browserWindow.createImageBitmap(image).catch(() => undefined);
        }

        if (isDisposed) {
          bitmap?.close();
          return;
        }

        frame.bitmap = bitmap;
        frame.width = bitmap?.width ?? image.naturalWidth;
        frame.height = bitmap?.height ?? image.naturalHeight;
        frame.status = frame.width > 0 && frame.height > 0 ? "ready" : "failed";

        if (frameIndex === 0 && frame.status === "ready") {
          hero.dataset.sequenceReady = "true";
        }

        if (frame.status === "ready" && frameIndex === currentFrame) {
          renderFrame(currentFrame, { force: true });
        }
      };

      image.decoding = "async";
      image.onload = () => {
        void settleFrame();
      };
      image.onerror = () => {
        frame.status = "failed";

        if (frameIndex === 0) {
          hero.dataset.sequenceFallback = "true";
        }
      };
      frames[frameIndex] = frame;
      image.src = framePath(frameIndex);

      if (image.complete && image.naturalWidth > 0) {
        void settleFrame();
      }

      return frame;
    };

    function preloadAroundFrame(frameIndex: number) {
      for (let distance = 1; distance <= NEARBY_PRELOAD_RADIUS; distance += 1) {
        const nextFrame = frameIndex + distance;
        const previousFrame = frameIndex - distance;

        if (nextFrame < frameCount && !isFrameRequested(nextFrame)) {
          loadFrame(nextFrame);
        }

        if (previousFrame >= 0 && !isFrameRequested(previousFrame)) {
          loadFrame(previousFrame);
        }
      }

      scheduleBackgroundPreload();
    }

    function loadBackgroundChunk() {
      isBackgroundPreloadScheduled = false;
      idlePreloadId = null;
      timeoutPreloadId = null;

      if (isDisposed || allFramesRequested()) {
        return;
      }

      let loadedCount = 0;
      let scannedCount = 0;

      while (loadedCount < IDLE_PRELOAD_BATCH_SIZE && scannedCount < frameCount) {
        const frameIndex = backgroundFrameCursor;
        backgroundFrameCursor = backgroundFrameCursor + 1 >= frameCount
          ? 1
          : backgroundFrameCursor + 1;
        scannedCount += 1;

        if (!isFrameRequested(frameIndex)) {
          loadFrame(frameIndex);
          loadedCount += 1;
        }
      }

      if (!allFramesRequested()) {
        scheduleBackgroundPreload();
      }
    }

    function scheduleBackgroundPreload() {
      if (isDisposed || isBackgroundPreloadScheduled || allFramesRequested()) {
        return;
      }

      isBackgroundPreloadScheduled = true;
      const preloadDelay = hasStartedBackgroundPreload
        ? BACKGROUND_PRELOAD_BATCH_DELAY
        : BACKGROUND_PRELOAD_START_DELAY;
      hasStartedBackgroundPreload = true;

      timeoutPreloadId = browserWindow.setTimeout(() => {
        timeoutPreloadId = null;

        if (isDisposed) {
          isBackgroundPreloadScheduled = false;
          return;
        }

        if (idleWindow.requestIdleCallback) {
          idlePreloadId = idleWindow.requestIdleCallback(loadBackgroundChunk, {
            timeout: IDLE_PRELOAD_TIMEOUT,
          });
        } else {
          loadBackgroundChunk();
        }
      }, preloadDelay);
    }

    updateCanvasMetrics();
    loadFrame(0);
    preloadAroundFrame(0);

    const firstFrame = frames[0];

    if (firstFrame?.status === "ready") {
      hero.dataset.sequenceReady = "true";
      renderFrame(0);
    }

    const resizeObserver = new browserWindow.ResizeObserver(() => {
      updateCanvasMetrics();
      renderFrame(currentFrame, { force: true });
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

      // Route same-page anchor clicks through Lenis so they glide like wheel
      // scrolling instead of teleporting.
      anchorClickHandler = (event: MouseEvent) => {
        const origin = event.target as Element | null;
        const link = origin?.closest?.('a[href^="#"]');

        if (!link) {
          return;
        }

        const href = link.getAttribute("href");

        if (!href || href === "#") {
          return;
        }

        const destination = href === "#top" ? 0 : document.querySelector<HTMLElement>(href);

        if (destination === null) {
          return;
        }

        event.preventDefault();
        lenisInstance?.scrollTo(destination, { duration: 1.2 });
      };
      document.addEventListener("click", anchorClickHandler);
      tickerCallback = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      tweenInstance = gsap.to(playhead, {
        frame: frameCount - 1,
        ease: "none",
        onUpdate: () => renderFrame(playhead.frame),
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=150%",
          scrub: true,
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

      if (idlePreloadId !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idlePreloadId);
      }

      if (timeoutPreloadId !== null) {
        browserWindow.clearTimeout(timeoutPreloadId);
      }

      for (const frame of frames) {
        frame?.bitmap?.close();
      }

      if (anchorClickHandler) {
        document.removeEventListener("click", anchorClickHandler);
      }

      tweenInstance?.scrollTrigger?.kill();
      tweenInstance?.kill();

      if (tickerCallback && gsapApi) {
        gsapApi.ticker.remove(tickerCallback);
      }

      lenisInstance?.destroy();
    };
  }, [canvasRef, heroRef, frameCount, framePath]);
}
