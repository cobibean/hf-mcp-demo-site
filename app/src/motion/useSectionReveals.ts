import { useEffect } from "react";

type RevealGroup = {
  selector: string;
  y: number;
  stagger: number;
};

// Each group reveals once as it enters the viewport. Elements stay fully
// visible by default; motion only runs after JS loads and only outside
// prefers-reduced-motion, so the page never ships hidden content.
const revealGroups: RevealGroup[] = [
  { selector: ".meal-card", y: 44, stagger: 0.12 },
  { selector: ".favorites-list li", y: 26, stagger: 0.1 },
  { selector: ".favorite-frame", y: 46, stagger: 0.14 },
  { selector: ".path-panel", y: 52, stagger: 0.16 },
  { selector: ".chalkboard-frame, .handbill-cluster", y: 38, stagger: 0.15 },
  { selector: ".visit-card", y: 22, stagger: 0.08 },
  { selector: ".save-seat h2, .save-seat div", y: 26, stagger: 0.12 },
];

export default function useSectionReveals() {
  useEffect(() => {
    const browserWindow = globalThis.window;

    if (!browserWindow) {
      return undefined;
    }

    if (browserWindow.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let isDisposed = false;
    let createdTriggers: Array<{ kill: () => void }> = [];

    const setupReveals = async () => {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (isDisposed) {
        return;
      }

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      revealGroups.forEach(({ selector, y, stagger }) => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

        if (elements.length === 0) {
          return;
        }

        const triggers = ScrollTrigger.batch(elements, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.from(batch, {
              y,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger,
              clearProps: "transform,opacity,visibility",
            });
          },
        });

        createdTriggers = createdTriggers.concat(triggers);
      });
    };

    void setupReveals();

    return () => {
      isDisposed = true;
      createdTriggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}
