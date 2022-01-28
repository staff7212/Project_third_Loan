export default class Accordion {
    constructor(tridders) {
        this.tridders = document.querySelectorAll(tridders);
    }

    showContent() {
        this.tridders.forEach(tridder => {
            tridder.addEventListener('click', () => {
                const content = tridder.parentNode.nextElementSibling;

                if (!content.classList.contains('fadeInDown')) {
                    content.classList.add('animated', 'fadeInDown');
                    content.style.display = 'block';
                } else {
                    content.classList.remove('animated', 'fadeInDown');
                    content.style.display = 'none';
                }  
            });
        });
    }

    init() {
        this.showContent();
    }
}