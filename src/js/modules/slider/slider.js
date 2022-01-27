export default class Slider {
    constructor ({
        container = null,
        btns = null,
        btnsNext = null,
        btnsPrev = null,
        next = null,
        prev = null,
        activeClass,
        animate,
        autoplay} = {}) {
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.btnsNext = document.querySelectorAll(btnsNext);
        this.btnsPrev = document.querySelectorAll(btnsPrev);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.sliderIndex = 1;
    }
}
