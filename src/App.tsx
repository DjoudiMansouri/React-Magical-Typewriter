import React, { useState } from 'react';
import ReactMagicalTypewriter from './ReactMagicalTypewriter';
import { PredefinedAnimationStyle } from './ReactMagicalTypewriter';

export const App: React.FC = () => {
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
        return 3;
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
        return "rotate-270"; 
      default:
        return "none";
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-8 min-h-64 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">React Magical Typewriter Demo</h2>
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(['Elegant', 'Whimsical', 'Landing', 'Arise', 'Rift', 'Warp'] as PredefinedAnimationStyle[]).map((style) => (
          <button 
            key={style}
            onClick={() => handleStyleChange(style)} 
            className={`px-4 py-2 rounded ${selectedStyle === style ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="h-48 flex items-center justify-center bg-white p-6 w-full rounded shadow">
        {!isRestarting && (
          <ReactMagicalTypewriter
            text={selectedStyle}
            typingSpeed={200}
            animationStyle={selectedStyle}
            cursorCharacter={getCursorCharacter()}
            cursorInvert={getCursorInvert()}
            charAnimationSpeed={getCharAnimationSpeed()}
            className="text-3xl font-bold"
          />
        )}
      </div>
      
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-medium mb-2">Current Style: <span className="text-blue-600">{selectedStyle}</span></h3>
        <p className="italic">{renderStyleDescription()}</p>
        <p className="mt-1">Cursor: {getCursorCharacter()} (Rotate/Invert: {getCursorInvert()})</p>
      </div>
    </div>
  );
};