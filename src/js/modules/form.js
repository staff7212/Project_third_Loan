export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input')
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...',
        };
        this.path = 'assets/question.php';
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
        document.querySelector('select').selectedIndex = 0;

    }

    blockBtn(boolean) {
        this.forms.forEach((form) => {
            let btn = form.querySelector('.btn');
            btn.disabled = boolean;
        });
    }

    checkInputsText(){
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    input.style.border = '1px solid red';
                    this.blockBtn(true);
                } else {
                    input.style.border = '';
                    this.blockBtn(false);
                }
            });
        });
    }

    checkMailInputs(){
        const textInput = document.querySelectorAll('[type="email"]');
    
        textInput.forEach(input => {
            input.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^a-z 0-9 \. @ \-]/ig, '');
            });
    
        });
    }

    initMask(){

        let setCursorPosirion = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+ 1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length || (this.selectionStart < 4 && this.selectionEnd < 4)) {
                val = def;
            }
        
            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length < 6) {
                    this.value = '';
                }
            } else {
                setCursorPosirion(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
            input.addEventListener('click', createMask);
        });
    
    }

    init() {
        this.blockBtn(true);
        this.checkMailInputs();
        this.checkInputsText();
        this.initMask();
        this.forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                
                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: green;
                `;
                form.parentNode.append(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(data => {
                        console.log(data);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                        this.blockBtn(true);
                    });
            });
        });
    }
}