const _lineColor = Symbol('_lineColor');
const _lineWidth = Symbol('_lineWidth');

export const config = {
    defaultLineColor: '#0064FF',
    minLineWidth: 2,
    maxLineWidth: 20,
    [_lineColor]: localStorage.getItem('lineColor'),
    get lineColor() {
        return this[_lineColor];
    },
    set lineColor(value) {
        this[_lineColor] = value;

        localStorage.setItem('lineColor', this[_lineColor]);

        return this[_lineColor];
    },
    [_lineWidth]: parseInt(localStorage.getItem('lineWidth'), 10),
    get lineWidth() {
        return this[_lineWidth];
    },
    set lineWidth(value) {
        this[_lineWidth] = Math.min(
            Math.max(value, this.minLineWidth),
            this.maxLineWidth
        );

        localStorage.setItem('lineWidth', this[_lineWidth]);

        return this[_lineWidth];
    }
};

if (!config[_lineColor]) {
    config[_lineColor] = config.defaultLineColor;
}

if (!config[_lineWidth]) {
    config[_lineWidth] = config.minLineWidth;
}

const _items = Symbol('_items');

export const history = {
    [_items]: [],
    maxHistoryCount: 100,
    clear() {
        this[_items].splice(0, this[_items].length);

        localStorage.removeItem('history');
    },
    last() {
        return this[_items][this[_items].length - 1];
    },
    pop() {
        const item = this[_items].pop();

        this.store();

        return item;
    },
    push(item) {
        this[_items].push(item);

        this[_items].splice(
            0,
            Math.max(this[_items].length - this.maxHistoryCount, 0)
        );

        this.store();
    },
    restore() {
        var storedHistory = localStorage.getItem('history');

        if (storedHistory) {
            try {
                this[_items] = JSON.parse(storedHistory);
            } catch (err) {
                this.clear();
            }
        }
    },
    store() {
        localStorage.setItem('history', JSON.stringify(this[_items]));
    }
};

history.restore();

const createPath = (coords, lineColor, lineWidth) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    path.setAttribute('d', coords);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', lineColor);
    path.setAttribute('stroke-width', lineWidth);

    return path;
};

export const inputMoveEvent = e => {
    if (e.touches && e.touches.length > 1) {
        return;
    }

    e.preventDefault();

    const { target, pageX, pageY } = e.touches ? e.touches[0] : e;

    const svg = target.closest('svg');

    const { top, left } = svg.getBoundingClientRect();

    const path = svg.querySelector('path:last-of-type');

    const coords = path.getAttribute('d');

    path.setAttribute(
        'd',
        `${coords} L${pageX - (left + window.pageXOffset)} ${
            pageY - (top + window.pageYOffset)
        }`
    );
};

export const inputDownEvent = e => {
    if (e.touches && e.touches.length > 1) {
        return;
    }

    e.preventDefault();

    const { target, pageX, pageY } = e.touches ? e.touches[0] : e;

    const svg = target.closest('svg');

    const { top, left } = svg.getBoundingClientRect();

    const coords = `M${pageX - (left + window.pageXOffset)} ${
        pageY - (top + window.pageYOffset)
    }`;

    const path = createPath(coords, config.lineColor, config.lineWidth);

    svg.appendChild(path);

    if (e.touches) {
        svg.addEventListener('touchmove', inputMoveEvent);
        svg.addEventListener('touchend', inputUpEvent);
    } else {
        svg.addEventListener('mousemove', inputMoveEvent);
        svg.addEventListener('mouseup', inputUpEvent);
        svg.addEventListener('mouseleave', inputUpEvent);
    }
};

export const inputUpEvent = e => {
    e.preventDefault();

    const svg = e.target.closest('svg');

    history.push(
        [].slice
            .call(svg.querySelectorAll('path'))
            .map(path => path.outerHTML)
            .join('')
    );

    if (e.touches) {
        svg.removeEventListener('touchmove', inputMoveEvent);
        svg.removeEventListener('touchend', inputUpEvent);
    } else {
        svg.removeEventListener('mousemove', inputMoveEvent);
        svg.removeEventListener('mouseup', inputUpEvent);
        svg.removeEventListener('mouseleave', inputUpEvent);
    }
};

export const clear = svg => {
    history.clear();

    svg.querySelectorAll('path').forEach(path => svg.removeChild(path));
};
