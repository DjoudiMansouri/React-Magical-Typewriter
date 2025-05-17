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
        return "Letters tear through space-time!";
      case 'Warp':
        return "Letters come out of a wormhole at the speed of light...";
      case 'RadialBurst':
        return "Letters appear with a bursting radial light effect, like tiny explosions.";
      case 'LiquidDrip':
        return "Letters flow in like liquid droplets from above, settling with a splashy effect.";
      case 'LaserSketch':
        return "Letters are drawn rapidly by an invisible laser, outline first then filled.";
      case 'FlipReveal':
        return "Letters flip in 3D space, rotating from behind to reveal themselves.";
      case 'PixelGlitch':
        return "Letters appear pixelated and glitchy before stabilizing into clarity.";
      case 'GhostTrail':
        return "Letters appear with ghostly blue echoes trailing behind them.";
      case 'ShatterIn':
        return "Letter fragments fly in from different directions to form the complete character.";
      case 'OrigamiReveal':
        return "Letters unfold like paper origami, unfolding from a flat state.";
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
      case 'RadialBurst':
      case 'ShatterIn':
        return 0.8;
      case 'LiquidDrip':
        return 0.7;
      case 'LaserSketch':
        return 0.9;
      case 'FlipReveal':
        return 0.6;
      case 'PixelGlitch':
        return 0.7;
      case 'GhostTrail':
        return 0.6;
      case 'OrigamiReveal':
        return 0.8;
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
      case 'RadialBurst':
        return "💥";
      case 'LiquidDrip':
        return "💧";
      case 'LaserSketch':
        return "✏️";
      case 'FlipReveal':
        return "🔄";
      case 'PixelGlitch':
        return "⚡";
      case 'GhostTrail':
        return "👻";
      case 'ShatterIn':
        return "🧩";
      case 'OrigamiReveal':
        return "📄";
      default:
        return "✨";
    }
  };

  const getCursorInvert = (): string => {
    switch (selectedStyle) {
      case 'Arise':
      case 'Landing':
      case 'Rift':
      case 'LaserSketch' :
        return "horizontal";
      case 'Warp':
        return "cursor-rotate-270"; 
      case 'FlipReveal':
        return "both";
      case 'OrigamiReveal':
        return "vertical";
      default:
        return "none";
    }
  };

  const getAllStyles = (): PredefinedAnimationStyle[] => {
    return [
      'Elegant', 
      'Whimsical', 
      'Landing', 
      'Arise', 
      'Rift', 
      'Warp',
      'RadialBurst',
      'LiquidDrip',
      'LaserSketch',
      'FlipReveal',
      'PixelGlitch',
      'GhostTrail',
      'ShatterIn',
      'OrigamiReveal'
    ] as PredefinedAnimationStyle[];
  };

  return (
    <div className="demo-container">
      <h2 className="demo-heading">React Magical Typewriter Demo</h2>
      
      <div className="demo-layout">
        {/* Left column for options */}
        <div className="demo-options">
          <h3 className="demo-options-heading">Animation Styles</h3>
          <div className="demo-button-column">
            {getAllStyles().map((style) => (
              <button 
                key={style}
                onClick={() => handleStyleChange(style)} 
                className={`demo-button ${selectedStyle === style ? 'demo-button-active' : 'demo-button-inactive'}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        
        {/* Right column for preview and details */}
        <div className="demo-content">
          {/* Top right preview */}
          <div className="demo-preview">
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
            
            <div className="demo-description">
              <p className="demo-style-description">{renderStyleDescription()}</p>
              <p className="demo-cursor-info">
                Cursor: {getCursorCharacter()} (Rotate/Invert: {getCursorInvert()})
              </p>
            </div>
          </div>
          
          {/* Bottom code section */}
          <div className="demo-code-section">
            <h3 className="demo-code-heading">Code Example</h3>
            <div className="demo-code-container">
              <div className="demo-code-line">
                <span className="code-tag">&lt;</span>
                <span className="code-component">ReactMagicalTypewriter</span>
              </div>
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">text</span>
                <span className="code-equals">=</span>
                <span className="code-brace">{'{'}</span>
                {!isRestarting && (
                <ReactMagicalTypewriter
                  text={selectedStyle}
                  typingSpeed={100}
                  animationStyle={selectedStyle}
                  cursorCharacter={""}
                  cursorInvert={getCursorInvert()}
                  charAnimationSpeed={getCharAnimationSpeed()}
                  className="code-value"
                />
                )}
                <span className="code-brace">{'}'}</span>
              </div>
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">typingSpeed</span>
                <span className="code-equals">=</span>
                <span className="code-brace">{'{'}</span>
                <span className="code-number">300</span>
                <span className="code-brace">{'}'}</span>
              </div>
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">animationStyle</span>
                <span className="code-equals">=</span>
                <span className="code-brace">{'{'}</span>
                {!isRestarting && (
                <ReactMagicalTypewriter
                  text={selectedStyle}
                  typingSpeed={100}
                  animationStyle={selectedStyle}
                  cursorCharacter={""}
                  cursorInvert={getCursorInvert()}
                  charAnimationSpeed={getCharAnimationSpeed()}
                  className="code-value"
                />
                )}
                <span className="code-brace">{'}'}</span>
              </div>
              {selectedStyle === "GhostTrail" ? 
                <div className="demo-code-line">
                  <span className="code-indent"></span>
                  <span className="code-prop">ghostTrailColor</span>
                  <span className="code-equals">=</span>
                  <span className="code-brace">{'{'}</span>
                  {!isRestarting && (
                  <span className="code-string">'🟦rgba(100, 149, 237, 0.7)'</span>
                  )}
                  <span className="code-brace">{'}'}</span>
                </div>
              : null}
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">cursorCharacter</span>
                <span className="code-equals">=</span>
                <span className="code-brace">{'{'}</span>
                <span className="code-func">{getCursorCharacter()}</span>
                <span className="code-brace">{'}'}</span>
              </div>
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">cursorInvert</span>
                <span className="code-equals">=</span>
                <span className="code-brace">{'{'}</span>
                <span className="code-func">{getCursorInvert()}</span>
                <span className="code-brace">{'}'}</span>
              </div>
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">charAnimationSpeed</span>
                <span className="code-equals">=</span>
                <span className="code-brace">{'{'}</span>
                <span className="code-func">{getCharAnimationSpeed()}</span>
                <span className="code-brace">{'}'}</span>
              </div>
              <div className="demo-code-line">
                <span className="code-indent"></span>
                <span className="code-prop">className</span>
                <span className="code-equals">=</span>
                <span className="code-string">"demo-typewriter-text"</span>
              </div>
              <div className="demo-code-line">
                <span className="code-tag">/&gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};