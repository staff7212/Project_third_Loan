export default class Slider {
    constructor (page, btns) {
        this.page = document.querySelector(page);
        this.slides = [...this.page.children];
        this.btns = document.querySelectorAll(btns);
        this.sliderIndex = 1;
    }

    showSlide (n) {
        if (n > this.slides.length) {
            this.sliderIndex = 1;
        }
        
        if (n < 1) {
            this.sliderIndex = this.slides.length;
        }

        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.sliderIndex - 1].style.display = 'block';
    }

    plusSlide (n) {
        this.showSlide(this.sliderIndex += n);
    }

    render() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlide(1);
            });

            btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{
                e.preventDefault();
                this.sliderIndex = 1;
                this.showSlide(this.sliderIndex);
            });
        });

        this.showSlide(this.sliderIndex);
    }
}
