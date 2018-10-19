
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


document.addEventListener('DOMContentLoaded', function() {
    let isFormCorrect = false;
    const form = document.querySelector('.form');
    const inputName = document.querySelector('.form__name-input');
    const inputNameError = document.querySelector('.form__name-error');
    const sexType = document.querySelector('.form__sexType');
    const cats = document.querySelector('.form__select_cats');
    const dogs = document.querySelector('.form__select_dogs');
    const petsColor = document.querySelector('.form__colorSwitcher');
    const colorValue = document.querySelector(".form__colorSwitcher-input");
    const loadFile = document.querySelector('.form__photo-input');
    const spanPhoto = document.querySelector('.form__photo-span');
    const photoBorder = document.querySelector('.form__photo');
    ////
    const horizon = document.querySelector('.form__tracker-horizon');
    const dot = document.querySelector('.form__tracker-dot');
    const textOfWeight = document.querySelector('.form__tracker-span_header');
    const inputWeight = document.querySelector('.form__tracker-slider input');
    const yourPhoto = document.querySelector('.form__photo-label'); /// label in avatar div

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

    let currentColor = null;

    petsColor.addEventListener('click', function(event) {

        if(currentColor) {
            currentColor.classList.remove('shadow');
        }

        let colorType = event.target.value; // red green blue
        colorValue.value = colorType;
        event.target.classList.add('shadow');
        currentColor = event.target;

    });

//////// test

    let reader = new FileReader();

    reader.onload = function (event) {
        let url = event.target.result;
        yourPhoto.style.backgroundImage = 'url(' + url + ')';
    };

    loadFile.addEventListener('change', function(event) {
        let file = event.target.files; // список файлов
        let f = file[0]; // первый файл

        if (!f.type.match('image.*')) { // смотрим на формат. ! но если отмена - скрипт падает
            alert('Только изображения');
            return;
        }

        photoBorder.classList.add('photo');
        spanPhoto.classList.add('photo');

        reader.readAsDataURL(f);
    });

    dot.addEventListener('mousedown', clickMouse);

    function clickMouse (event) {

       let dotMove = getCoords(dot); // расстояние "прямоугольника"
       let shiftX = event.pageX - dotMove.left; // разница между Х относительно документа и прямоугольника элемента
       let horizonMove = getCoords(horizon);

       dot.addEventListener('mousemove', mouseMove);

       function mouseMove(event) {
           let newLeft = event.pageX - shiftX - horizonMove.left; // левая часть horizon

           if (newLeft < 0) {
               newLeft = 0;
           }

           let rightEdge = horizon.offsetWidth - dot.offsetWidth;

           if (newLeft > rightEdge) {
               newLeft = rightEdge;
           }


           dot.style.left = newLeft + 'px';
           let coord = newLeft;
           textOfWeight.innerHTML = Math.round(newLeft);

           dot.addEventListener('mouseleave', function(event){

               if(event) {
                   inputWeight.value = parseInt(dot.style.left);
                   dot.removeEventListener('mousemove', mouseMove);
               }
           });
       }

        dot.addEventListener('mouseup', function (event) {
            inputWeight.value = parseInt(dot.style.left);
            dot.removeEventListener('mousemove', mouseMove);
            event.preventDefault();
        });

        return false;

    }

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    dot.ondragstart = function() {
        return false;
    };


 });

