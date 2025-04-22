import React, { useState } from 'react';
import ReactMagicalTypewriter from './ReactMagicalTypewriter';
import { PredefinedAnimationStyle } from './ReactMagicalTypewriter';
import './index.css'

export const Demo: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<PredefinedAnimationStyle>('Elegant');
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  
  const handleStyleChange = (style: PredefinedAnimationStyle): void => {
    setIsRestarting(true);
    setSelectedStyle(style);
    setTimeout(() => setIsRestarting(false), 100);
  };

  const renderStyleDescription = (): string => {
    switch (selectedStyle) {
      case 'Elegant':
        return "Letters appear with a smooth fade-in transition.";
      case 'Whimsical':
        return "Letters appear from different corners with a subtle swing and wobble.";
      case 'Landing':
        return "Letters land from the top in a staggered pattern.";
      case 'Arise':
        return "Letters rise from bottom in a staggered pattern.";
      case 'Rift':
        return "Letters tear through space-time !";
      case 'Warp':
        return "Letters come out of a wormhole at the speed of light...";
      default:
        return "";
    }
  };

  const getCharAnimationSpeed = (): number => {
    switch (selectedStyle) {
      case 'Elegant':
      case 'Whimsical':
      case 'Landing':
      case 'Rift':
      case 'Warp':
        return 0.5;
      case 'Arise':
        return 1;
      default:
        return 0.5;
    }
  };

  const getCursorCharacter = (): string => {
    switch (selectedStyle) {
      case 'Elegant':
        return "✨";
      case 'Whimsical':
        return "🦄";
      case 'Arise':
        return "🫴";
      case 'Landing':
        return "🫳";
      case 'Rift':
        return "🌀";
      case 'Warp':
        return "🕳️";
      default:
        return "✨";
    }
  };

  const getCursorInvert = (): string => {
    switch (selectedStyle) {
      case 'Arise':
      case 'Landing':
      case 'Rift':
        return "horizontal";
      case 'Warp':
        return "cursor-rotate-270"; 
      default:
        return "none";
    }
  };

  return (
    <div className="demo-container">
      <h2 className="demo-heading">React Magical Typewriter Demo</h2>
      
      <div className="demo-button-group">
        {(['Elegant', 'Whimsical', 'Landing', 'Arise', 'Rift', 'Warp'] as PredefinedAnimationStyle[]).map((style) => (
          <button 
            key={style}
            onClick={() => handleStyleChange(style)} 
            className={`demo-button ${selectedStyle === style ? 'demo-button-active' : 'demo-button-inactive'}`}
          >
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="demo-typewriter-container">
        {!isRestarting && (
          <ReactMagicalTypewriter
            text={selectedStyle}
            typingSpeed={300}
            animationStyle={selectedStyle}
            cursorCharacter={getCursorCharacter()}
            cursorInvert={getCursorInvert()}
            charAnimationSpeed={getCharAnimationSpeed()}
            className="demo-typewriter-text"
          />
        )}
      </div>
      
      <div className="demo-footer">
        <h3 className="demo-footer-heading">
          Current Style: <span className="demo-footer-highlight">{selectedStyle}</span>
        </h3>
        <p className="demo-footer-italic">{renderStyleDescription()}</p>
        <p className="demo-footer-info">
          Cursor: {getCursorCharacter()} (Rotate/Invert: {getCursorInvert()})
        </p>
      </div>
    </div>
  );
};