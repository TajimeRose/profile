"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  CredentialFaces,
  CredentialLanyard,
} from "@/components/credential/credential-shell";

type ResearchCredentialProps = {
  instagramQrSrc: string;
};

const tiltSpring = {
  stiffness: 190,
  damping: 24,
  mass: 0.7,
};

const objectResponseSpring = {
  type: "spring" as const,
  stiffness: 150,
  damping: 18,
  mass: 0.82,
};

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ResearchCredential({ instagramQrSrc }: ResearchCredentialProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [isEntranceReady, setIsEntranceReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const swingRef = useRef<HTMLDivElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, tiltSpring);
  const rotateY = useSpring(rawRotateY, tiltSpring);

  useEffect(() => {
    const element = swingRef.current;
    if (!element) return;

    if (reduceMotion) {
      const reducedFrame = window.requestAnimationFrame(() => {
        setIsEntranceReady(true);
        setHasEntered(true);
      });
      return () => window.cancelAnimationFrame(reducedFrame);
    }

    const readyFrame = window.requestAnimationFrame(() => {
      setIsEntranceReady(true);
    });
    let didEnter = false;

    const reveal = () => {
      if (didEnter) return;
      didEnter = true;
      setHasEntered(true);
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };

    const checkPosition = () => {
      const bounds = element.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.72;
      const hasReachedBuilderPass = window.scrollY > window.innerHeight * 0.35;
      if (
        hasReachedBuilderPass &&
        bounds.top <= triggerLine &&
        bounds.bottom >= window.innerHeight * 0.08
      ) {
        reveal();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) checkPosition();
      },
      { threshold: 0.2, rootMargin: "0px 0px -30% 0px" },
    );
    observer.observe(element);
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    const positionFrame = window.requestAnimationFrame(checkPosition);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.cancelAnimationFrame(positionFrame);
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [reduceMotion]);

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    rawRotateX.set(vertical * -7);
    rawRotateY.set(horizontal * 8);
  };

  const toggleFace = () => setIsBackVisible((visible) => !visible);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleFace();
  };

  return (
    <div className="credential-rig" aria-label="Interactive builder pass">
      <motion.div
        ref={swingRef}
        className="credential-swing"
        initial={false}
        animate={
          !isEntranceReady || reduceMotion || hasEntered
            ? { y: 0, rotateZ: 0, opacity: 1 }
            : { y: -112, rotateZ: -2.4, opacity: 0 }
        }
        transition={{
          y: {
            type: "spring",
            stiffness: 105,
            damping: 17,
            mass: 0.92,
          },
          rotateZ: {
            type: "spring",
            stiffness: 95,
            damping: 16,
            mass: 0.88,
          },
          opacity: { duration: 0.18, ease: "easeOut" },
        }}
      >
        <motion.div
          className="credential-reactive"
          whileHover={reduceMotion ? undefined : { y: -3, rotateZ: 1.4 }}
          whileTap={reduceMotion ? undefined : { y: 2, rotateZ: -1, scale: 0.995 }}
          transition={objectResponseSpring}
        >
          <CredentialLanyard />
          <motion.div
            className="credential-tilt"
            style={{ rotateX, rotateY }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
          >
            <motion.div
              role="button"
              tabIndex={0}
              aria-pressed={isBackVisible}
              aria-label={
                isBackVisible
                  ? "Show front of Wongsathon's builder pass"
                  : "Show back of Wongsathon's builder pass"
              }
              id="research-credential-card"
              data-testid="research-credential"
              data-face={isBackVisible ? "back" : "front"}
              className="credential-card"
              animate={{ rotateY: isBackVisible ? 180 : 0 }}
              transition={
                reduceMotion
                  ? { duration: 0.01 }
                  : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
              }
              onClick={toggleFace}
              onKeyDown={handleKeyDown}
            >
              <CredentialFaces
                instagramQrSrc={instagramQrSrc}
                isBackVisible={isBackVisible}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="credential-controls">
        <button
          type="button"
          onClick={toggleFace}
          aria-controls="research-credential-card"
          aria-pressed={isBackVisible}
        >
          {isBackVisible ? "Show front" : "Flip pass"}
        </button>
        <Link href="/about">Open full profile</Link>
      </div>
    </div>
  );
}
