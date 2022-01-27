export default class Difference {
    constructor(officer, items) {
        this.officer = document.querySelector(officer);
        this.items = this.officer.querySelectorAll(items);
        this.count = 0;
    }

    bindTriggers(items, count) {
        items[items.length - 1].addEventListener('click', () => {
            items[count].style.display = 'flex';
            items[count].classList.add('fadeIn');
            if (count != items.length - 2) {
                count++;
            } else {
            items[items.length - 1].remove();
            }
        });
    }

    hide() {
        this.items.forEach((item, index, arr) => {
            if (index != arr.length - 1) {
                item.classList.add('animated');
                item.style.display = 'none';
            }
        });
    }

    init() {
       this.hide();
       this.bindTriggers(this.items, this.count);
    }
}