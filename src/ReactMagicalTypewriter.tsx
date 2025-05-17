import React, { useState, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import './index.css';

// Types
export type PredefinedAnimationStyle =
  | 'Elegant' | 'Whimsical' | 'Landing' | 'Arise' | 'Rift' | 'Warp'
  | 'RadialBurst' | 'LiquidDrip' | 'LaserSketch' | 'FlipReveal'
  | 'PixelGlitch' | 'GhostTrail' | 'ShatterIn' | 'OrigamiReveal';

export interface CustomAnimation {
  from?: Record<string, any>;
  to?: Record<string, any>;
  duration?: number;
  ease?: string;
}

export type AnimationStyle = PredefinedAnimationStyle | CustomAnimation;

export interface TypewriterProps {
  text: string;
  typingSpeed?: number;
  delayAfterTyping?: number;
  cursorCharacter?: string;
  cursorBlinkSpeed?: number;
  charAnimationSpeed?: number;
  animationStyle?: AnimationStyle;
  ghostTrailColor?: string;
  cursorInvert?: 'horizontal' | 'vertical' | 'both' | 'none' | string;
  onComplete?: () => void;
  className?: string;
}

export interface CharacterItem {
  char: string;
  id: string;
}

// Main component
const ReactMagicalTypewriter: React.FC<TypewriterProps> = ({
  text,
  typingSpeed = 500,
  delayAfterTyping = 1500,
  cursorCharacter = '|',
  cursorBlinkSpeed = 500,
  charAnimationSpeed = 0.7,
  animationStyle = 'Elegant',
  ghostTrailColor = 'rgba(100, 149, 237, 0.7)',
  cursorInvert = 'none',
  onComplete = () => {},
  className = '',
}) => {
  const [displayedChars, setDisplayedChars] = useState<CharacterItem[]>([]);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);


  const wordSegments = useMemo(() => {
    // This regex splits the text by sequences of one or more whitespace characters (\s+)
    // and keeps the delimiters (whitespace sequences) as separate segments in the array.
    // .filter(Boolean) removes any empty strings that might result from the split.
    return text.split(/(\s+)/).filter(Boolean);
  }, [text]);

  let charIdxInDisplayedChars = 0;

  // --- Helper Functions for Dynamic Elements ---

  const createRays = (element: HTMLElement): HTMLDivElement[] => {
    const existingRays = element.querySelectorAll<HTMLDivElement>('.ray');
    existingRays.forEach(ray => ray.remove());
    const rays: HTMLDivElement[] = [];
    const rayCount = 16;
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement('div');
      ray.className = 'ray';
      element.appendChild(ray);
      rays.push(ray);
    }
    return rays;
  };

  const createGhosts = (element: HTMLElement, char: string, charIndex: number): HTMLSpanElement[] => {
    const existingGhosts = document.querySelectorAll<HTMLSpanElement>(`.ghost-char-${charIndex}`);
    existingGhosts.forEach(ghost => ghost.remove());

    const ghosts: HTMLSpanElement[] = [];
    if (!containerRef.current) {
        return ghosts;
    }

    const ghostCount = 5;
    const charRect = element.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    for (let i = 0; i < ghostCount; i++) {
      const ghost = document.createElement('span');
      ghost.textContent = char === ' ' ? '\u00A0' : char;
      ghost.className = `react-magical-typewriter-ghost ghost-char-${charIndex}`;
      containerRef.current.appendChild(ghost);

      gsap.set(ghost, {
        position: 'absolute',
        top: `${charRect.top - containerRect.top}px`,
        left: `${charRect.left - containerRect.left}px`,
        width: `${charRect.width}px`,
        height: `${charRect.height}px`,
        fontSize: window.getComputedStyle(element).fontSize,
        fontFamily: window.getComputedStyle(element).fontFamily,
        fontWeight: window.getComputedStyle(element).fontWeight,
        lineHeight: window.getComputedStyle(element).lineHeight,
        color: ghostTrailColor, 
        opacity: 0.7 - (i * 0.15), 
        zIndex: 1, // Should be behind characters in the same container
        pointerEvents: 'none',
      });
      ghosts.push(ghost);
    }
    return ghosts;
  };

  const createShatterFragments = (element: HTMLElement, char: string, charIndex: number): HTMLSpanElement[] => {
    const existingFrags = document.querySelectorAll<HTMLSpanElement>(`.fragment-char-${charIndex}`);
    existingFrags.forEach(frag => frag.remove());

    const fragments: HTMLSpanElement[] = [];
    if (!containerRef.current) return fragments;

    const fragCount = 6 + Math.floor(Math.random() * 3);
    const charRect = element.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const generateRandomClipPath = () => {
      const points = 3 + Math.floor(Math.random() * 3);
      let path = 'polygon(';
      for (let i = 0; i < points; i++) {
        path += `${Math.random() * 100}% ${Math.random() * 100}%`;
        if (i < points - 1) path += ', ';
      }
      path += ')';
      return path;
    };

    for (let i = 0; i < fragCount; i++) {
      const fragment = document.createElement('span');
      fragment.textContent = char === ' ' ? '\u00A0' : char;
      fragment.className = `react-magical-typewriter-fragment fragment-char-${charIndex}`;
      containerRef.current.appendChild(fragment);

      const randX = (Math.random() - 0.5) * (charRect.width * 2);
      const randY = (Math.random() - 0.5) * (charRect.height * 2);
      const randRot = (Math.random() - 0.5) * 360;

      gsap.set(fragment, {
        position: 'absolute',
        top: `${charRect.top - containerRect.top + randY}px`,
        left: `${charRect.left - containerRect.left + randX}px`,
        width: `${charRect.width * (0.4 + Math.random() * 0.4)}px`,
        height: `${charRect.height * (0.4 + Math.random() * 0.4)}px`,
        fontSize: window.getComputedStyle(element).fontSize,
        fontFamily: window.getComputedStyle(element).fontFamily,
        fontWeight: window.getComputedStyle(element).fontWeight,
        lineHeight: window.getComputedStyle(element).lineHeight,
        color: window.getComputedStyle(element).color,
        opacity: 0,
        rotation: randRot,
        scale: 0.3 + Math.random() * 0.4,
        clipPath: generateRandomClipPath(),
        overflow: 'hidden',
        pointerEvents: 'none',
      });
      fragments.push(fragment);
    }
    return fragments;
  };


  // --- Effects ---
  useEffect(() => {
    let timeoutRef: ReturnType<typeof setTimeout>;
    if (displayedChars.length < text.length) {
      timeoutRef = setTimeout(() => {
        setDisplayedChars(prevChars => [
          ...prevChars,
          { char: text[prevChars.length], id: `${prevChars.length}-${Date.now()}` }
        ]);
      }, typingSpeed);
    }
    return () => clearTimeout(timeoutRef);
  }, [displayedChars, text, typingSpeed]);

  useEffect(() => {
    if (displayedChars.length === text.length && !isComplete) {
      setIsComplete(true);
      const timeout = setTimeout(() => onComplete(), delayAfterTyping);
      return () => clearTimeout(timeout);
    }
  }, [displayedChars, text, isComplete, delayAfterTyping, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), cursorBlinkSpeed);
    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  const registerCharRef = (el: HTMLSpanElement | null, index: number) => {
    if (el) charsRef.current[index] = el;
  };

  // Main animation useEffect
  useEffect(() => {
    const lastIndex = displayedChars.length - 1;
    if (lastIndex < 0 || !charsRef.current[lastIndex]) return;

    const element = charsRef.current[lastIndex];
    const charItem = displayedChars[lastIndex];
    gsap.killTweensOf(element);

    const isCustom = typeof animationStyle === 'object' && !Array.isArray(animationStyle);

    if (!isCustom) {
      const predefined = animationStyle as PredefinedAnimationStyle;
      const initialOpacity = (
        predefined === 'Elegant' ||
        predefined === 'LiquidDrip'
      ) ? 0 : 1;

      gsap.set(element, {
        display: 'inline-block',
        opacity: initialOpacity,
        x: 0, y: 0, scale: 1, rotation: 0, skewX: 0, skewY: 0,
        clipPath: 'none', filter: 'none',
        transformOrigin: 'center center'
      });
    } else {
      gsap.set(element, { display: 'inline-block' });
      if (!(animationStyle as CustomAnimation).from) {
        gsap.set(element, { opacity: 0 });
      }
    }

    if (isCustom) {
      const anim = animationStyle as CustomAnimation;
      if (anim.from && anim.to) {
        gsap.fromTo(element, { ...anim.from }, { ...anim.to, duration: anim.duration || charAnimationSpeed, ease: anim.ease || 'power2.out' });
      } else if (anim.to) {
        gsap.to(element, { ...anim.to, duration: anim.duration || charAnimationSpeed, ease: anim.ease || 'power2.out' });
      }
    } else {
      const style = animationStyle as PredefinedAnimationStyle;
      if (style === 'Elegant') {
        gsap.to(element, { opacity: 1, duration: charAnimationSpeed, ease: 'power2.out' });
      }
      else if (style === 'Whimsical') {
        const positions = [{ x: -10, y: -10 }, { x: 10, y: -10 }, { x: 10, y: 10 }, { x: -10, y: 10 }];
        const pos = positions[lastIndex % 4];
        gsap.fromTo(element,
          { opacity: 0, x: pos.x, y: pos.y, rotation: (lastIndex % 20) - 10 },
          { opacity: 1, x: 0, y: 0, rotation: 0, duration: charAnimationSpeed, ease: "back.out(1.7)" }
        );
      }
      else if (style === 'Landing') {
        gsap.fromTo(element, { y: '-200%', rotation: -3 }, { y: '0%', rotation: 0, duration: charAnimationSpeed, ease: "elastic.out(1, 0.7)" });
      }
      else if (style === 'Arise') {
        gsap.fromTo(element, { y: '200%', rotation: 3 }, { y: '0%', rotation: 0, duration: charAnimationSpeed, ease: "power4.out" });
      }
      else if (style === 'Rift') {
        gsap.fromTo(element, { scale: 0, rotation: 720 }, { scale: 1, rotation: 0, duration: charAnimationSpeed, ease: "elastic.out(1, 0.6)" });
      }
      else if (style === 'Warp') {
        gsap.fromTo(element, { scaleX: 3, scaleY: 0.1, x: '50%', opacity: 0 }, { scale: 1, x: '0%', opacity: 1, duration: charAnimationSpeed, ease: "elastic.out(1.1, 0.7)" });
      }
      else if (style === 'RadialBurst') {
        const rays = createRays(element);
        gsap.set(element, { scale: 0.5, opacity: 0, transformOrigin: 'center center' });
        gsap.set(rays, {
          position: 'absolute',
          width: '3px', 
          height: `1px`, 
          backgroundColor: 'rgba(255, 223, 0, 0.9)', 
          top: '50%', left: '50%',
          yPercent: -100,
          transformOrigin: 'bottom center', scale: 0, opacity: 0,
          zIndex: -1 
        });

        const tl = gsap.timeline();
        rays.forEach((ray, i) => {
          const angle = (i / rays.length) * 360;
          const length = 20 + Math.random() * 15; 
          tl.to(ray, {
            rotation: angle, height: `${length}px`, scale: 1, opacity: 0.4,
            duration: charAnimationSpeed * 0.5, 
            ease: "power3.out"
          }, 0);
        });
        tl.to(element, { scale: 1, opacity: 1, duration: charAnimationSpeed * 0.7, ease: "elastic.out(1.2, 0.5)" }, charAnimationSpeed * 0.1);
        tl.to(rays, {
          opacity: 0, scale: 0, duration: charAnimationSpeed * 0.6, ease: "power2.in", // Rays fade a bit longer
          onComplete: () => rays.forEach(r => r.remove())
        }, `-=${charAnimationSpeed * 0.2}`);
      }
      else if (style === 'LiquidDrip') {
        gsap.set(element, { opacity: 0, scaleY: 0.2, y: '-100%', transformOrigin: 'center bottom' });
        const tl = gsap.timeline();
        tl.to(element, { y: '-15%', opacity: 1, scaleY: 1.3, duration: charAnimationSpeed * 0.4, ease: "power2.in" })
          .to(element, { y: '5%', scaleY: 0.85, scaleX: 1.15, duration: charAnimationSpeed * 0.25, ease: "power1.out" })
          .to(element, { y: '0%', scaleY: 1, scaleX: 1, duration: charAnimationSpeed * 0.35, ease: "elastic.out(1, 0.5)" });
      }
      else if (style === 'LaserSketch') {
        gsap.set(element, { 
          opacity: 1, 
          display: 'inline-block',  
          verticalAlign: 'middle',  
        });
        const tl = gsap.timeline();
        tl.to(element, {
          clipPath: 'polygon(0% 0%, 100% 0%, 0% 0%, 0% 100%)',
          duration: charAnimationSpeed * 0.1,
          ease: "power1.inOut"
        });
        tl.to(element, {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: charAnimationSpeed * 0.7,
          ease: "power1.inOut"
        });
        tl.to(element, {
          opacity: 0.5,
          duration: charAnimationSpeed * 0.9,
          ease: "power2.in"
        });
        tl.to(element, {
          opacity: 1, 
          duration: charAnimationSpeed * 0.9,
          ease: "power2.out"
        });
      }
      else if (style === 'FlipReveal') {
        if (element.parentElement) gsap.set(element.parentElement, { perspective: 800 });
        gsap.set(element, { opacity: 0, rotationY: -90, transformOrigin: 'center center' });
        const tl = gsap.timeline();
        tl.to(element, { rotationY: 0, opacity: 1, duration: charAnimationSpeed * 0.8, ease: "back.out(1.5)" })
          .to(element, { rotationY: 15, duration: charAnimationSpeed * 0.2, ease: "power1.inOut" })
          .to(element, { rotationY: 0, duration: charAnimationSpeed * 0.3, ease: "elastic.out(1, 0.7)" });
      }
      else if (style === 'PixelGlitch') {
        gsap.set(element, { opacity: 1, filter: 'blur(6px) contrast(0.1) brightness(3)', skewX: '8deg', scale: 1.1 });
        const tl = gsap.timeline();
        tl.to(element, { filter: 'blur(3px) contrast(2) brightness(0.8)', skewX: '-6deg', x: 5, duration: charAnimationSpeed * 0.25, ease: "steps(4)" })
          .to(element, { filter: 'blur(1px) contrast(0.5) brightness(1.5)', skewX: '4deg', x: -3, duration: charAnimationSpeed * 0.2, ease: "steps(3)" })
          .to(element, { filter: 'blur(0px) contrast(1) brightness(1)', skewX: '0deg', x: 0, scale: 1, duration: charAnimationSpeed * 0.3, ease: "power2.out" });
      }
      else if (style === 'GhostTrail') {
        // Main character animation
        gsap.fromTo(element, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: charAnimationSpeed * 0.4, ease: "power2.out" });

        // Create and animate ghosts
        const ghosts = createGhosts(element, charItem.char, lastIndex);
        if (ghosts.length > 0) {
            gsap.to(ghosts, {
            x: (idx) => `-=${10 + idx * 4}`, 
            y: (idx) => `+=${4 + idx * 2}`,
            opacity: 0,
            duration: charAnimationSpeed * 1.8, 
            stagger: 0.08, 
            ease: "power1.out",
            onComplete: () => {
                ghosts.forEach(g => g.remove());
            }
            });
        } else {
        }
      }
      else if (style === 'ShatterIn') {
        const fragments = createShatterFragments(element, charItem.char, lastIndex);
        // Hide the original element initially
        gsap.set(element, { opacity: 0 });

        if (fragments.length > 0) {
          const charRect = element.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect() || { top: 0, left: 0 };

          gsap.to(fragments, {
            top: charRect.top - containerRect.top,
            left: charRect.left - containerRect.left,
            width: charRect.width,
            height: charRect.height,
            rotation: 0,
            scale: 1,
            opacity: 0.7, // You might want fragments to be fully opaque if they represent the final letter
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: charAnimationSpeed,
            stagger: { amount: charAnimationSpeed * 0.3, from: "random" },
            ease: "quad.out",
            onComplete: () => {
              // Make the original element visible instantly
              gsap.set(element, { opacity: 1 });
              fragments.forEach(f => f.remove());
            }
          });
        } else {
          // If no fragments, make the original element visible instantly
          gsap.set(element, { opacity: 1 });
        }
      }
      else if (style === 'OrigamiReveal') {
        // Define a more specific type for fold directions
        interface FoldDirectionConfig {
          origin: string;
          scaleProp: 'scaleX' | 'scaleY'; // Explicitly 'scaleX' or 'scaleY'
          skewSign: 1 | -1;
        }

        const foldDirections: FoldDirectionConfig[] = [
          { origin: 'bottom center', scaleProp: 'scaleY', skewSign: 1 },
          { origin: 'top center', scaleProp: 'scaleY', skewSign: -1 },
          { origin: 'center left', scaleProp: 'scaleX', skewSign: 1 },
          { origin: 'center right', scaleProp: 'scaleX', skewSign: -1 },
          { origin: 'top left', scaleProp: 'scaleY', skewSign: -1 },
          { origin: 'top left', scaleProp: 'scaleX', skewSign: 1 },
          { origin: 'top right', scaleProp: 'scaleY', skewSign: -1 },
          { origin: 'top right', scaleProp: 'scaleX', skewSign: -1 },
          { origin: 'bottom left', scaleProp: 'scaleY', skewSign: 1 },
          { origin: 'bottom left', scaleProp: 'scaleX', skewSign: 1 },
          { origin: 'bottom right', scaleProp: 'scaleY', skewSign: 1 },
          { origin: 'bottom right', scaleProp: 'scaleX', skewSign: -1 },
        ];

        const chosenDirection = foldDirections[Math.floor(Math.random() * foldDirections.length)];

        const initialSkewValue = chosenDirection.skewSign * 35;
        const intermediateSkewValue = chosenDirection.skewSign * -15;
        const finalOvershootSkewValue = chosenDirection.skewSign * 5;

        // Set initial state using computed property name for the scale property
        const initialState = {
          opacity: 1,
          transformOrigin: chosenDirection.origin,
          skewX: `${initialSkewValue}deg`,
          [chosenDirection.scaleProp]: 0, // Dynamically sets scaleX: 0 or scaleY: 0
        };
        gsap.set(element, initialState);

        const tl = gsap.timeline();

        // Define animation properties using computed property name for the scale property
        const firstTweenProps = {
          skewX: `${intermediateSkewValue}deg`,
          duration: charAnimationSpeed * 0.5,
          ease: "power3.out",
          [chosenDirection.scaleProp]: 1, // Dynamically sets scaleX: 1 or scaleY: 1
        };

        tl.to(element, firstTweenProps)
          .to(element, {
            skewX: `${finalOvershootSkewValue}deg`,
            duration: charAnimationSpeed * 0.25,
            ease: "power1.inOut"
          })
          .to(element, {
            skewX: '0deg',
            duration: charAnimationSpeed * 0.25,
            ease: "elastic.out(1, 0.6)"
          });
      }
    }
  }, [displayedChars, animationStyle, charAnimationSpeed, text.length]);

  return (
    <span
      ref={containerRef}
      className={`react-magical-typewriter-container ${
        (animationStyle === "Arise" || animationStyle === "Landing" || animationStyle === "PixelGlitch" ||
         animationStyle === "LiquidDrip"
        ) ? "clip-path-overflow" : ""
      } ${className}`}
    >
      {wordSegments.map((segment, segmentIndex) => {
        const segmentCharsToRenderThisIteration: CharacterItem[] = [];
        // Store the starting charIdxInDisplayedChars for this segment to correctly index refs
        const refStartIndexForSegment = charIdxInDisplayedChars;
  
        for (let i = 0; i < segment.length; i++) {
          if (charIdxInDisplayedChars < displayedChars.length) {
            // This character of the segment is part of the currently "typed" characters
            segmentCharsToRenderThisIteration.push(displayedChars[charIdxInDisplayedChars]);
            charIdxInDisplayedChars++; // Advance for the next character from displayedChars
          } else {
            // We've processed all characters available in displayedChars
            break;
          }
        }
  
        if (segmentCharsToRenderThisIteration.length === 0) {
          // No characters from this segment are currently "typed" enough to be rendered.
          // We still need to advance charIdxInDisplayedChars past the untyped part of this segment
          // IF `displayedChars` was shorter than `text` but we were iterating `text`.
          // But since we iterate based on `displayedChars.length`, if this is empty, subsequent
          // segments also won't have characters. So, just return null.
          // charIdxInDisplayedChars correctly reflects the number of characters processed from displayedChars.
          return null;
        }
  
        return (
          <span
            key={`segment-${segmentIndex}`}
            className="typewriter-word-or-space-segment"
          >
            {segmentCharsToRenderThisIteration.map((charItem, indexWithinSegmentOutput) => {
              // The index for the ref must be the character's original global position
              const globalCharIndexForRef = refStartIndexForSegment + indexWithinSegmentOutput;
              return (
                <span
                  key={charItem.id}
                  ref={(el) => registerCharRef(el, globalCharIndexForRef)}
                  className={`react-magical-typewriter-char ${
                    (typeof animationStyle === 'string' &&
                     ['RadialBurst', 'LaserSketch', 'ShatterIn'].includes(animationStyle)) ?
                     `char-${animationStyle.toLowerCase()}` : ''
                  } ${
                    animationStyle === 'GhostTrail' ? 'char-ghosttrail-active' : ''
                  }`}
                >
                  {charItem.char === ' ' ? '\u00A0' : charItem.char}
                </span>
              );
            })}
          </span>
        );
      })}

      <span
        className={`react-magical-typewriter-cursor ${
          cursorInvert === 'horizontal' ? 'cursor-invert-horizontal' :
          cursorInvert === 'vertical' ? 'cursor-invert-vertical' :
          cursorInvert === 'both' ? 'cursor-invert-both' :
          cursorInvert === 'none' ? '' : cursorInvert
        }`}
        style={{ opacity: showCursor ? 1 : 0 }}
      >
        {cursorCharacter}
      </span>
    </span>
  );
};

export { ReactMagicalTypewriter };
export default ReactMagicalTypewriter;