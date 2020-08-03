# drawtheline

> ✏️ Sketch simple line drawings in SVG.

## Install

```bash
$ npm install drawtheline
```

## Usage

```javascript
import { inputDownEvent, inputUpEvent } from 'drawtheline';

const svg = document.querySelector('svg');

svg.addEventListener('mousedown', inputDownEvent);
svg.addEventListener('touchstart', inputDownEvent);
svg.removeEventListener('mouseup', inputUpEvent);
svg.removeEventListener('touchend', inputUpEvent);
```
