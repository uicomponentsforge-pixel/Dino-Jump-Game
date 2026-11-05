# Dino Jump

A lightweight, browser-based endless runner game built with vanilla HTML5 Canvas, CSS, and JavaScript, inspired by the classic offline Chrome dinosaur game.

## Overview

In **Dino Jump**, you control a running dinosaur traversing a desert landscape. Jump over or duck under randomly generated cacti obstacles to survive as long as possible. The game speed steadily increases over time as your score mounts.

## Features

- **Pure Vanilla Web Stack**: No external dependencies or libraries required.
- **HTML5 Canvas Animation**: Smooth 60 FPS rendering of characters, animated legs, moving clouds, ground texture, and procedural obstacles.
- **Progressive Difficulty**: Speed dynamically ramps up as your score increases.
- **High Score Tracking**: Automatically persists the highest score in the browser's `localStorage`.
- **Keyboard & Touch Controls**: Play using keyboard arrows, Space, or touchscreen / mouse tap.
- **Pause & Resume**: Easily pause and restart gameplay at any time with dedicated buttons.
- **Responsive Layout**: Adapts cleanly across mobile and desktop viewport sizes.

## How to Play

### Controls

| Action | Keyboard | Mouse / Touch |
| --- | --- | --- |
| **Jump / Start / Restart** | `Space` or `ArrowUp` (`↑`) | Tap / Click canvas or click **Start / Restart** |
| **Duck** | `ArrowDown` (`↓`) (Hold) | — |
| **Pause / Resume** | — | Click **Pause** button |

### Gameplay Rules

- Jump to clear approaching cacti obstacles.
- Ducking lowers the dinosaur's height to navigate obstacles with a smaller profile.
- Colliding with any cactus triggers a **Game Over**.
- Your score increases the longer you survive. If you beat your previous personal best, the high score (`HI`) updates automatically.

## Getting Started

No build process or installation is required.

### Option 1: Direct File Open
Open `index.html` directly in any modern web browser (Google Chrome, Firefox, Safari, Edge):
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Local HTTP Server (Optional)
You can also run a lightweight local server:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node (npx)
npx serve .
```
Then navigate to `http://localhost:8000` in your web browser.

## File Structure

```text
├── index.html   # Main HTML page structure and UI elements
├── style.css    # Layout styling, typography, and responsive rules
├── script.js   # Game loop, canvas rendering, physics, and input handling
└── README.md    # Project documentation and guide
```

## License

Open source and free to use for educational or personal projects.
