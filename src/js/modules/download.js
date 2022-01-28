export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        const elem = document.createElement('a');

        elem.setAttribute('href', path);
        elem.setAttribute('download', 'nice_picture');

        elem.style.display = 'none';
        document.body.append(elem);
        elem.click();

        elem.remove();
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}