import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlide (n) {
        if (n > this.slides.length) {
            this.sliderIndex = 1;
        }
        
        if (n < 1) {
            this.sliderIndex = this.slides.length;
        }

        //вместо forEach
        // for (let i = 0; i < this.slides.length; i++) {
        //     this.slides[i].style.display = 'none';
        // }
        [...this.slides].forEach(slide => {
            
            slide.style.display = 'none';
        });

        this.slides[this.sliderIndex - 1].style.display = 'block';
        
        //всплывающий блок на слайде №3
        try {
            const hanson = document.querySelector('.hanson');
            let timerId;
            if (n == 3) {
            hanson.style.opacity = 0;
            timerId = setTimeout(() => {
                hanson.style.opacity = 1;
                hanson.classList.add('animated', 'slideInUp');
                }, 3000);
            } else {
                clearTimeout(timerId);
                hanson.classList.remove('slideInUp');

            }
        } catch(e) {}
        
    }

    plusSlide (n) {
        this.showSlide(this.sliderIndex += n);
    }

    switchingModules(directionBtn, n) {
        directionBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlide(n);
            });
        });
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlide(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{
                // e.preventDefault();
                this.sliderIndex = 1;
                this.showSlide(this.sliderIndex);
            });
        });
    }

    render() {
        if (this.container) {
            this.bindTriggers();
            this.switchingModules(this.btnsNext, 1);
            this.switchingModules(this.btnsPrev, -1);
            this.showSlide(this.sliderIndex);
        }
    }
}