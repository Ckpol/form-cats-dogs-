
const nameErrors = [
    {
        text: 'Имя не должно содержать цифры',
        regExp: /[0-9]/
    },
    {
        text: 'Имя должно содержать только кириллицу',
        regExp: /[a-zA-Z]/
    },
    {
        text: 'Имя должно начинаться с большой буквы',
        regExp: /^[а-яё]/
    }
];

const petsColor = document.querySelector('.form__colorSwitcher');

document.addEventListener('DOMContentLoaded', function() {
    let isFormCorrect = false;
    const form = document.querySelector('.form');
    const inputName = document.querySelector('.form__name-input');
    const inputNameError = document.querySelector('.form__name-error');
    const sexType = document.querySelector('.form__sexType');
    const cats = document.querySelector('.form__select_cats');
    const dogs = document.querySelector('.form__select_dogs');

    inputName.addEventListener('input', function(event) {
        const value = event.target.value;

        let isNameWrong = nameErrors.some((item) => {
            if (value.match(item.regExp)) {
                inputNameError.classList.add('textErrorMessage');
                inputName.classList.add('error');
                inputNameError.innerHTML = item.text;
                return true;
            }
            return false;
        });

        if(!value || value.match(/[А-Яа-яёЁ]{2,}/) && !isNameWrong) {
            inputName.classList.remove('error');
            isFormCorrect = true;
        } else {
            inputName.classList.add('error');
            isFormCorrect = false;
        }

       if (!isNameWrong) {
            inputNameError.classList.remove('.textErrorMessage');
            inputNameError.innerHTML ='';
            isFormCorrect = true;
        }

    });

    form.addEventListener('submit', function(event) {
        if(!isFormCorrect) {
            event.preventDefault();
        }
    });

    sexType.addEventListener('change', function(event) {
        const valueSex = event.target.value;
        if(valueSex === 'male') {
            dogs.classList.add('visible');
            cats.classList.remove('visible');
            petsColor.classList.add('visibleColor');
        } else {
            cats.classList.add('visible');
            dogs.classList.remove('visible');
            petsColor.classList.add('visibleColor');
        }
    });
 });

