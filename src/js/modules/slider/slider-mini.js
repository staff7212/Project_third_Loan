import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super (container, next, prev, activeClass, animate, autoplay);
    }

    decoraizeSlide() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.remove(this.activeClass);
            if(this.animate) {
                this.slides[i].querySelector('.card__title').style.opacity = '.4';
                this.slides[i].querySelector('.card__controls-arrow').style.opacity = '0';
            }
        }
        //вместо перебора for
        // [...this.slides].forEach(slide => {
        //     slide.classList.remove(this.activeClass);
        // });
        if (!this.slides[0].closest('button')) {
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        for (let i = 1; i < this.slides.length - 1; i++) {
            if (this.slides[i].tagName !== 'BUTTON') {
                this.container.appendChild(this.slides[0]);
                this.decoraizeSlide();
                break;
            } else {
                this.container.appendChild(this.slides[i]);
                this.decoraizeSlide();
                i--;
            }
        }
        //двойной щелчок для переключения
        // this.container.appendChild(this.slides[0]);
        // this.decoraizeSlide();

        // if (this.slides[0].tagName === 'BUTTON') {
        //    for (let i = 0; i < 2; i++) {
        //       this.next.click();
        //    }
        // }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== 'BUTTON') {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decoraizeSlide();
                    break;
                }   
            }
            
            //двойной щелчок для переключения
            // let active = this.slides[this.slides.length - 1];
            // this.container.insertBefore(active, this.slides[0]);
            // this.decoraizeSlides();
 
            // if (this.slides[0].tagName === 'BUTTON') {
            //     for (let i = 0; i < 2; i++) {
            //         this.prev.click();
            //     }
            // }
        });
    }

    autoplayGo() {
        let autoplay = setInterval(() => this.nextSlide(), 5000);

        this.next.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        this.prev.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
        this.container.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decoraizeSlide();

        if (this.autoplay) {
            this.autoplayGo();

            this.next.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });
            this.prev.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });
            this.container.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });
        }
    }
}