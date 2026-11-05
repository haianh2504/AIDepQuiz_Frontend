"use client";

import {
  createElement,
  useEffect,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from "react";

type RevealTag = "article" | "aside" | "div" | "li" | "section";

type ScrollRevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  delay?: number;
  threshold?: number;
};

export function ScrollReveal({
  as = "div",
  children,
  className,
  delay = 0,
  style,
  threshold = 0.25,
  ...rest
}: ScrollRevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const safeThreshold = Math.min(1, Math.max(0, threshold));
    const tallElementThreshold = Math.min(
      safeThreshold,
      window.innerHeight / Math.max(bounds.height, 1),
    );
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsReady(true);
        setIsVisible(
          entry.isIntersecting && entry.intersectionRatio >= tallElementThreshold,
        );
      },
      { threshold: tallElementThreshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, threshold]);

  const revealStyle = {
    ...style,
    "--scroll-reveal-delay": `${Math.max(0, delay)}ms`,
  } as CSSProperties;

  return createElement(
    as,
    {
      ...rest,
      ref: setElement,
      className: ["scroll-reveal", className].filter(Boolean).join(" "),
      "data-reveal-ready": String(isReady),
      "data-reveal-visible": String(isVisible),
      style: revealStyle,
    } as never,
    children,
  );
}
