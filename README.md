# drawtheline

> ✏️ Sketch simple line drawings in SVG.

[![NPM Version](http://img.shields.io/npm/v/drawtheline.svg?style=flat)](https://www.npmjs.org/package/drawtheline)

## Install

```bash
$ npm install drawtheline
```

```html
<script
    type="module"
    src="https://unpkg.com/drawtheline@1.1.0/index.js"
></script>
<script type="module">
    import {
        inputDownEvent,
        inputUpEvent
    } from 'https://unpkg.com/drawtheline@1.1.0/index.js';
</script>
```

## Usage

```javascript
import { inputDownEvent, inputUpEvent } from 'drawtheline';

const svg = document.querySelector('svg');

svg.addEventListener('mousedown', inputDownEvent);
svg.addEventListener('touchstart', inputDownEvent);
```
