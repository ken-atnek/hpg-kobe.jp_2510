import { useEffect, useRef, useState } from 'react';

export type ScrollTriggerOptions = {
  /** e.g. '0px 0px -100px 0px' */
  rootMargin?: string;
  /** single number or an array for fine-grained control */
  threshold?: number | number[];
  /** stop observing after it becomes visible once */
  once?: boolean;
};

export const useScrollTrigger = <T extends HTMLElement = HTMLElement>(
  options?: ScrollTriggerOptions
) => {
  const {
    rootMargin = '0px 0px -100px 0px',
    threshold = 0,
    once = true,
  } = options ?? {};

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          // when once=false, toggle off when it leaves the viewport
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [rootMargin, threshold, once]);

  return { ref, isVisible };
};
