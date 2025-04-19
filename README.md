# 🪄 React Magical Typewriter

![npm version](https://img.shields.io/npm/v/react-magical-typewriter)
![license](https://img.shields.io/npm/l/react-magical-typewriter)
![downloads](https://img.shields.io/npm/dm/react-magical-typewriter)

A highly customizable typewriter effect component for React with beautiful GSAP-powered animations. Create engaging, eye-catching text animations with minimal effort!

<p align="center">
  <img src="/api/placeholder/640/320" alt="React Magical Typewriter Demo" />
</p>

## ✨ Features

- 🎭 **6 Pre-built animation styles** - Choose from elegant fades, playful movements, and more
- 🔧 **Fully customizable** - Create your own animations with complete GSAP flexibility
- ⚡ **Performance optimized** - Smooth animations even on large blocks of text
- 📱 **Responsive** - Works great on all devices and screen sizes
- 🎨 **Style flexibility** - Easy to integrate with any design system
- 🛠️ **TypeScript support** - Full type definitions included

## 📦 Installation

```bash
npm install react-magical-typewriter gsap
# or
yarn add react-magical-typewriter gsap
# or my favorite
pnpm add react-magical-typewriter gsap
```

> GSAP is required as a peer dependency

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

See it in action here: [React Magical Typewriter Demo]([https://example.com/demo](https://djoudimansouri.github.io/React-Magical-Typewriter/))

## 📚 Animation Styles

### Built-in Animation Styles:

#### Elegant
Clean, simple fade-in animation that looks professional.
```jsx
<ReactMagicalTypewriter 
  text="Professional and clean typography"
  animationStyle="Elegant"
/>
```

#### Whimsical
Playful, bouncy animations with randomized movements.
```jsx
<ReactMagicalTypewriter 
  text="Fun and playful text effects!"
  animationStyle="Whimsical"
/>
```

#### Landing
Characters drop in from above with a slight bounce.
```jsx
<ReactMagicalTypewriter 
  text="Dropping in from above"
  animationStyle="Landing"
/>
```

#### Arise
Characters rise from below with a smooth motion.
```jsx
<ReactMagicalTypewriter 
  text="Rising up from below"
  animationStyle="Arise"
/>
```

#### Rift
Characters appear with a spinning scale effect.
```jsx
<ReactMagicalTypewriter 
  text="Spinning into existence"
  animationStyle="Rift"
/>
```

#### Warp
Characters stretch in horizontally with an elastic effect.
```jsx
<ReactMagicalTypewriter 
  text="Warping into view"
  animationStyle="Warp"
/>
```

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

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)]([https://www.buymeacoffee.com/yourusername](https://buymeacoffee.com/djoudimansouri))

## 📄 License

MIT © [Your Name]
