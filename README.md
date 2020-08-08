# drawtheline

> ✏️ Sketch simple line drawings in SVG.

[![NPM Version](http://img.shields.io/npm/v/drawtheline.svg?style=flat)](https://www.npmjs.org/package/drawtheline)

## Install

```bash
$ npm install drawtheline
```

```javascript
<script type="module" src="https://unpkg.com/drawtheline@1.0.0/index.js"></script>
<script>
import {
    inputDownEvent,
    inputUpEvent
} from 'https://unpkg.com/drawtheline@1.0.0/index.js';
</script>
```

## Usage

```javascript
import { inputDownEvent, inputUpEvent } from 'drawtheline';

const svg = document.querySelector('svg');

svg.addEventListener('mousedown', inputDownEvent);
svg.addEventListener('touchstart', inputDownEvent);
```
