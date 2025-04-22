import { FC } from 'react';

declare module 'react-magical-typewriter' {
  export type PredefinedAnimationStyle = 'Elegant' | 'Whimsical' | 'Landing' | 'Arise' | 'Rift' | 'Warp';
  
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
    cursorInvert?: 'horizontal' | 'vertical' | 'both' | 'none' | string;
    onComplete?: () => void;
    className?: string;
  }

  const ReactMagicalTypewriter: FC<TypewriterProps>;
  export default ReactMagicalTypewriter;
}