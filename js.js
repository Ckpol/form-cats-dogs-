document.addEventListener('DOMContentLoaded', function() {
    const inputName = document.querySelector('.name');
    let isNameCorrect = false;
    let inputNameError = document.querySelector('.errorMessage');


    inputName.addEventListener('input', function(event) {
        const value = event.target.value;
        let str = value[0];

        if(!value || value.match(/[А-Яа-яёЁ]{2,}/)) {
            inputName.classList.remove('error');
            isNameCorrect = true;
        } else {
            inputName.classList.add('error');
            isNameCorrect = false;
        }

        if (value.match(/[0-9]/)) {
            inputNameError.classList.add('.errorM');
            inputNameError.innerHTML = 'Имя не должно содержать цифры';
            inputName.classList.add('error');
            isNameCorrect = false;

        } else if (value.match(/[a-zA-Z]/)) {
            inputNameError.classList.add('.errorM');
            inputNameError.innerHTML = 'Имя должно содержать только кириллицу';
            inputName.classList.add('error');
            isNameCorrect = false;

        } else if (str.match(/[а-яё]/)) {
            inputNameError.classList.add('.errorM');
            inputNameError.innerHTML = ' Имя должно начинаться с большой буквы';
            inputName.classList.add('error');
            isNameCorrect = false;
        } else {
            inputNameError.classList.remove('.errorM');
            inputNameError.innerHTML ='';
            isNameCorrect = true;
        }

    });

    let form = document.querySelector('.form');
        form.addEventListener('submit', function(event) {
            if(!isNameCorrect) {
            event.preventDefault();
        }
    });

    const sexType = document.querySelector('.sex');
    const cats = document.querySelector('.cats');
    const dogs = document.querySelector('.dogs');
    const petsColor = document.querySelector('.petsColor');
    const greenButton = document.querySelector('.greenButton');
    const redButton = document.querySelector('.redButton');
    const blueButton = document.querySelector('.blueButton');



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

    petsColor.addEventListener('click', function(event) {
        let colorType = event.target.value;
        let colorValue = document.getElementById('color');

        if (colorType === 'red') {
            redButton.classList.add('shadow');
            greenButton.classList.remove('shadow');
            blueButton.classList.remove('shadow');
            colorValue.setAttribute('value',colorType);
        }

        if (colorType === 'green') {
            redButton.classList.remove('shadow');
            greenButton.classList.add('shadow');
            blueButton.classList.remove('shadow');
            colorValue.setAttribute('value',colorType);
        }

        if (colorType === 'blue') {
            redButton.classList.remove('shadow');
            greenButton.classList.remove('shadow');
            blueButton.classList.add('shadow');
            colorValue.setAttribute('value',colorType);
        }
    });
});

