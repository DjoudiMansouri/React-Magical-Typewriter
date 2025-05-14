# 🪄 React Magical Typewriter

![npm version](https://img.shields.io/npm/v/react-magical-typewriter)
![license](https://img.shields.io/npm/l/react-magical-typewriter)
![downloads](https://img.shields.io/npm/dm/react-magical-typewriter)

A highly customizable typewriter effect component for React with beautiful GSAP-powered animations. Create engaging, eye-catching text animations with minimal effort!

<p align="center">
  <img src="https://github.com/DjoudiMansouri/React-Magical-Typewriter/blob/main/public/React-Magical-Typewriter-Demo.gif" alt="React Magical Typewriter Demo" />
</p>

## ✨ Features

- 🎭 **14 Pre-built animation styles** - Choose from elegant fades, playful movements, and more
- 🔧 **Fully customizable** - Create your own animations with complete GSAP flexibility
- ⚡ **Performance optimized** - Smooth animations even on large blocks of text
- 📱 **Responsive** - Works great on all devices and screen sizes
- 🎨 **Style flexibility** - Easy to integrate with any design system
- 🛠️ **TypeScript support** - Full type definitions included

## 📦 Installation

```bash
npm install react-magical-typewriter
# or
yarn add react-magical-typewriter
# or my favorite
pnpm add react-magical-typewriter
```

### Very important

Make sure to import the styles, if you want access to all the features

```jsx
import '/node_modules/react-magical-typewriter/dist/react-magical-typewriter.css';
```

## 🚀 Quick Start

```jsx
import { ReactMagicalTypewriter } from 'react-magical-typewriter';

function App() {
  return (
    <div className="app">
      <h1>
        <ReactMagicalTypewriter 
          text="Welcome to my website!"
          typingSpeed={100}
          animationStyle="Elegant"
        />
      </h1>
    </div>
  );
}
```

## 🎮 Live Demo

See it in action here: [React Magical Typewriter Demo](https://djoudimansouri.github.io/React-Magical-Typewriter/)

## 📚 Animation Styles


### Built-in Animation Styles:

#### Elegant

Clean, simple fade-in animation that looks professional.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="Elegant" />
```

#### Whimsical

Playful, bouncy animations with randomized movements and rotations.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="Whimsical" />
```

#### Landing

Characters drop in from above with a slight elastic bounce.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="Landing" />
```

#### Arise

Characters rise from below with a smooth, powerful motion.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="Arise" />
```

#### Rift

Characters appear with a dramatic spinning and scaling effect, as if from a dimensional rift.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="Rift" />
```

#### Warp

Characters stretch in horizontally with an elastic, warp-like effect.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="Warp" />
```

---
🆕 **New Animation Styles:**
---

#### RadialBurst

Each character explodes into view with radiating light rays before settling into place.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="RadialBurst" />
```

#### LiquidDrip

Characters "drip" into place from above, like fluid ink, with a slight stretch and settle.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="LiquidDrip" />
```

#### LaserSketch

Characters are "drawn" or "sketched" in diagonally by an imaginary laser, followed by a quick flash.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="LaserSketch" />
```

#### FlipReveal

Characters flip into view with a 3D rotation around the Y-axis, as if turning over a card.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="FlipReveal" />
```

#### PixelGlitch

Characters initially appear pixelated, blurry, and skewed, then quickly resolve into a clear state.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="PixelGlitch" />
```

#### GhostTrail

Each character appears quickly, leaving a faint, fading echo or "ghost" trailing behind it.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="GhostTrail" />
```

#### ShatterIn

Characters form as small, scattered fragments quickly converge and assemble into the final letter.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="ShatterIn" />
```

#### OrigamiReveal

Characters unfold into place as if made of paper, with skews and scaling that mimic an origami reveal.

```jsx
 <ReactMagicalTypewriter text="Hello World" animationStyle="OrigamiReveal" />
```


I've tried to make the descriptions concise and evocative, matching the style of your existing documentation. I've also added placeholder JSX examples, assuming they would be used similarly.

### Custom Animations

Create your own animations using GSAP properties:

```jsx
<ReactMagicalTypewriter 
  text="Completely custom animations!"
  animationStyle={{
    from: { 
      opacity: 0, 
      scale: 3, 
      rotation: 180, 
      y: -50,
      color: "#ff0000"
    },
    to: { 
      opacity: 1, 
      scale: 1, 
      rotation: 0, 
      y: 0,
      color: "#000000" 
    },
    duration: 0.8,
    ease: "elastic.out(1.2, 0.5)"
  }}
/>
```

## ⚙️ Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | (required) | The text to be typed |
| `typingSpeed` | number | 500 | Time in ms between typing each character |
| `delayAfterTyping` | number | 1500 | Delay in ms after typing completes before calling onComplete |
| `cursorCharacter` | string | '\|' | Character to use for the cursor |
| `cursorBlinkSpeed` | number | 500 | Blinking speed of cursor in ms |
| `charAnimationSpeed` | number | 0.5 | Duration of character animations in seconds |
| `animationStyle` | PredefinedAnimationStyle \| CustomAnimation | 'Elegant' | Animation style to use |
| `cursorInvert` | 'horizontal' \| 'vertical' \| 'both' \| 'none' \| string | 'none' | Inversion direction for cursor |
| `onComplete` | () => void | () => {} | Callback function called when typing is complete |
| `className` | string | '' | Additional CSS classes |

## 🎯 Advanced Examples

### Use it with different elements

```jsx
<div>
  <h1>
    <ReactMagicalTypewriter text="Large Heading" animationStyle="Landing" />
  </h1>
  
  <p>
    <ReactMagicalTypewriter 
      text="This is paragraph text that will be typed out character by character." 
      typingSpeed={50} 
      animationStyle="Elegant" 
    />
  </p>
  
  <button>
    <ReactMagicalTypewriter text="Click Me!" animationStyle="Rift" />
  </button>
</div>
```

### Sequence multiple typewriters with callbacks

```jsx
function SequencedTypewriters() {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  
  return (
    <div>
      <h2>
        <ReactMagicalTypewriter 
          text="First, this text appears..." 
          typingSpeed={80}
          onComplete={() => setShowSecond(true)}
        />
      </h2>
      
      {showSecond && (
        <h3>
          <ReactMagicalTypewriter 
            text="Then this second line starts typing..." 
            typingSpeed={80}
            animationStyle="Arise"
            onComplete={() => setShowThird(true)}
          />
        </h3>
      )}
      
      {showThird && (
        <p>
          <ReactMagicalTypewriter 
            text="And finally, we complete the sequence!" 
            typingSpeed={80}
            animationStyle="Whimsical"
          />
        </p>
      )}
    </div>
  );
}
```

### Custom cursor styling

```jsx
<ReactMagicalTypewriter 
  text="Look at this custom cursor"
  cursorCharacter="▌"
  cursorBlinkSpeed={300}
  cursorInvert="vertical"
/>
```

### Combined with other animations

```jsx
function FadeInTypewriter() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);
  
  return (
    <div ref={containerRef} className="container">
      <ReactMagicalTypewriter 
        text="This entire container fades in, then the text types out!"
        typingSpeed={100}
      />
    </div>
  );
}
```

## 🪄 CSS Styling

The component uses inline-block span elements, making it easy to style with CSS and TailwindCSS:

```jsx
<ReactMagicalTypewriter 
  text="Custom styled text" 
  className="my-custom-typewriter"
/>
```

```css
.my-custom-typewriter {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  color: #8a2be2;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
```

If you need to reproduce the clipping effects for Landing and Arise animations, i suggest you add these styles: 

On TailwindCSS : 

```jsx
"[clip-path:polygon(0_-5%,100%_-5%,100%_105%,0%_105%)]"
```

On pure CSS : 

```jsx
.clippedText {
  clip-path: polygon(0 -5%, 100% -5%, 100% 105%, 0% 105%);
}
```

## 🔄 TypeScript Type Definitions

```typescript
import { ReactMagicalTypewriter, PredefinedAnimationStyle, CustomAnimation } from 'react-magical-typewriter';

// Using with TypeScript
const MyComponent: React.FC = () => {
  // Type-safe animation style
  const animStyle: PredefinedAnimationStyle = "Whimsical";
  
  // Type-safe custom animation
  const customAnim: CustomAnimation = {
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    duration: 0.5,
    ease: "power2.out"
  };
  
  return (
    <div>
      <ReactMagicalTypewriter text="Type-safe typewriter!" animationStyle={animStyle} />
      <ReactMagicalTypewriter text="Custom animations too!" animationStyle={customAnim} />
    </div>
  );
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find this package useful, consider buying me a coffee! Your support helps maintain this project and fuels future development 😄

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/djoudimansouri)

## 📄 License

MIT © [Djoudi Mansouri]
