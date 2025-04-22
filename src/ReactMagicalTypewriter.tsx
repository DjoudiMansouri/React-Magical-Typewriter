// ReactMagicalTypewriter.tsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './index.css'


// Types
export type PredefinedAnimationStyle = 'Elegant' | 'Whimsical' | 'Landing' | 'Arise' | 'Rift' | 'Warp';

export interface CustomAnimation {
  from?: Record<string, any>;
  to?: Record<string, any>;
  duration?: number;
  ease?: string;
}

export type AnimationStyle = PredefinedAnimationStyle | CustomAnimation;

interface TypewriterProps {
  text: string;
  typingSpeed?: number;
  delayAfterTyping?: number;
  cursorCharacter?: string;
  cursorBlinkSpeed?: number;
  charAnimationSpeed?: number;
  animationStyle?: AnimationStyle;
  cursorInvert?: 'horizontal' | 'vertical' | 'both' | 'none' | string;
  onComplete?: () => void;
  className?: string;
}

interface CharacterItem {
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
  charAnimationSpeed = 0.5,
  animationStyle = 'Elegant',
  cursorInvert = 'none',
  onComplete = () => {},
  className = '',
}) => {
  const [displayedChars, setDisplayedChars] = useState<CharacterItem[]>([]);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  
  // Handle the typing effect
  useEffect(() => {
    let timeoutRef: ReturnType<typeof setTimeout>;
    
    if (displayedChars.length < text.length) {
      timeoutRef = setTimeout(() => {
        setDisplayedChars(prevChars => [
          ...prevChars,
          {
            char: text[prevChars.length],
            id: `${prevChars.length}-${Date.now()}`
          }
        ]);
      }, typingSpeed);
    }

    return () => clearTimeout(timeoutRef);
  }, [displayedChars, text, typingSpeed]);

    // Handle completion after typing
    useEffect(() => {
      if (displayedChars.length === text.length && !isComplete) {
        setIsComplete(true);
        const timeout = setTimeout(() => {
          onComplete();
        }, delayAfterTyping);
        return () => clearTimeout(timeout);
      }
    }, [displayedChars, text, isComplete, delayAfterTyping, onComplete]);  

  // Setup cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, [cursorBlinkSpeed]);

  // Register character refs
  const registerCharRef = (el: HTMLSpanElement | null, index: number) => {
    if (el) {
      charsRef.current[index] = el;
    }
  };

  useEffect(() => {
    const lastIndex = displayedChars.length - 1;
    
    if (lastIndex >= 0 && charsRef.current[lastIndex]) {
      const element = charsRef.current[lastIndex];
      
      // Reset any existing animations
      gsap.killTweensOf(element);
      
      // Check if animationStyle is a custom animation object
      const isCustomAnimation = animationStyle && 
        typeof animationStyle === 'object' &&
        !Array.isArray(animationStyle);
      
      // Set initial state based on animation type
      if (!isCustomAnimation) {
        const predefinedStyle = animationStyle as PredefinedAnimationStyle;
        gsap.set(element, { 
          opacity: (predefinedStyle === 'Arise' || predefinedStyle === 'Landing' || predefinedStyle === 'Rift' || predefinedStyle === 'Warp') ? 1 : 0,
          display: 'inline-block'
        });
      } else {
        // For custom animations, always set display to inline-block
        gsap.set(element, { display: 'inline-block' });
        
        // If the custom animation has 'from', opacity will be set there
        if (!(animationStyle as CustomAnimation).from) {
          gsap.set(element, { opacity: 0 });
        }
      }
      
      // Apply custom animation if provided
      if (isCustomAnimation) {
        const customAnim = animationStyle as CustomAnimation;
        
        // Use custom from and to values if provided
        if (customAnim.from && customAnim.to) {
          gsap.fromTo(element, 
            { ...customAnim.from },
            { 
              ...customAnim.to,
              duration: customAnim.duration || 0.5,
              ease: customAnim.ease || 'power2.out'
            }
          );
        } 
        // Use custom to values only
        else if (customAnim.to) {
          gsap.to(element, {
            ...customAnim.to,
            duration: customAnim.duration || 0.5,
            ease: customAnim.ease || 'power2.out'
          });
        }
      }
      // Apply predefined animations
      else {
        const predefinedStyle = animationStyle as PredefinedAnimationStyle;
        
        if (predefinedStyle === 'Elegant') {
          gsap.to(element, {
            opacity: 1,
            duration: charAnimationSpeed,
            ease: 'power2.out'
          });
        } 
        if (predefinedStyle === 'Whimsical') {
          const positions = [
            { x: -10, y: -10 }, // top-left
            { x: 10, y: -10 },  // top-right
            { x: 10, y: 10 },   // bottom-right
            { x: -10, y: 10 }   // bottom-left
          ];
          const position = positions[lastIndex % 4];
          const rotation = (lastIndex % 20) - 10;
          
          gsap.fromTo(element, 
            { 
              opacity: 0, 
              x: position.x, 
              y: position.y, 
              rotation: rotation 
            },
            { 
              opacity: 1, 
              x: 0, 
              y: 0, 
              rotation: 0, 
              duration: charAnimationSpeed, 
              ease: "back.out(1.7)" 
            }
          );
        }
        if (predefinedStyle === 'Landing' && element) {
          gsap.killTweensOf(element);
          
          gsap.fromTo(element, 
            {
              y: '-200%',
              rotation: -2
            },
            {
              y: '0',
              rotation: 0,
              duration: charAnimationSpeed,
              stagger: 0.05,
              ease: "elastic.out(1, 0.75)",
            }
          );
        }
        if (predefinedStyle === 'Arise' && element) {
          gsap.killTweensOf(element);
          
          gsap.fromTo(element, 
            {
              y: '200%',
              rotation: -2
            },
            {
              y: '0',
              rotation: 0,
              duration: charAnimationSpeed,
              ease: "power4.out",
            }
          );
        }
        if (predefinedStyle === 'Rift' && element) {
          gsap.killTweensOf(element);
          
          gsap.fromTo(element, 
            {
              scale: 0,
              rotation: 2880
            },
            {
              scale: 1,
              rotation: 0,
              duration: charAnimationSpeed,
              stagger: 0.05,
              ease: "elastic.out(1, 0.75)",
            }
          );
        }
        if (predefinedStyle === 'Warp' && element) {
          gsap.killTweensOf(element);
          
          gsap.fromTo(element, 
            {
              scaleX: 5,
              scaleY: 0.01,
              x: '100%'
            },
            {
              scale: 1,
              x: 0,
              duration: charAnimationSpeed,
              stagger: 0.05,
              ease: "elastic.out(1.25, 1)",
            }
          );
        }
      }
    }
  }, [displayedChars.length, animationStyle, text]);

  return (
    <span 
      ref={containerRef}
      className={`react-magical-typewriter-container ${
        (animationStyle === "Arise" || animationStyle === "Landing") ? "clip-path-overflow" : ""
      } ${className}`}
    >
      {displayedChars.map((item, index) => (
        <span
          key={item.id}
          ref={(el) => registerCharRef(el, index)}
          className="react-magical-typewriter-char"
        >
            {item.char === ' ' ? '\u00A0' : item.char}
        </span>
      ))}
      
      {/* Cursor */}
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