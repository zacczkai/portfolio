"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button'], input, textarea",
      );

      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute("data-cursor");
        setCursorText(customText || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible, reducedMotion]);

  if (reducedMotion || !isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? (cursorText ? 2.3 : 1.4) : 1,
          backgroundColor: cursorText
            ? "rgba(226, 253, 82, 0.95)"
            : isHovered
              ? "rgba(255, 255, 255, 0.15)"
              : "transparent",
          borderColor: cursorText
            ? "rgb(226, 253, 82)"
            : isHovered
              ? "rgba(255, 255, 255, 0.6)"
              : "rgba(255, 255, 255, 0.35)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 backdrop-blur-[1px]"
      >
        {cursorText && (
          <span className="text-[7.5px] font-bold uppercase tracking-wider text-black">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
