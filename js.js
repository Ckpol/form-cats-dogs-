
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
    let form = document.querySelector('.form');
    const inputName = document.querySelector('.avatar__name_input');
    let inputNameError = document.querySelector('.avatar__name_span');
    const sexType = document.querySelector('.sex');
    const cats = document.querySelector('.cats');
    const dogs = document.querySelector('.dogs');
    const petsColor = document.querySelector('.colorSwitcher');
    // const greenButton = document.querySelector('.colorSwitcher__mainButton :nth-child(2)');
    // const redButton = document.querySelector('.colorSwitcher__mainButton :first-child');
    // const blueButton = document.querySelector('.colorSwitcher__mainButton :nth-child(3)');
    const colorValue = document.querySelector(".colorSwitcher__input");
    const loadFile = document.querySelector('.avatar__photo_input');
    let spanPhoto = document.querySelector('.avatar__photo_span');
    let photoBorder = document.querySelector('.avatar__photo');
    ////
    let horizon = document.querySelector('.mainTracker_weight__tracker_horizon');
    let dot = document.querySelector('.mainTracker_weight__tracker_horizon_dot');
    let textOfWeight = document.querySelector('.mainTracker_weight__total_span');
    const inputWeight = document.querySelector('.mainTracker_weight__tracker input');
    let yourPhoto = document.querySelector('.avatar__photo_label'); /// label in avatar div

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

    loadFile.addEventListener('change', function(event) {
        let file = event.target.files; // список файлов
        let f = file[0]; // первый файл

        if (!f.type.match('image.*')) { // смотрим на формат. ! но если отмена - скрипт падает
            alert('Только изображения');
            return;
        }

        photoBorder.classList.add('photo');

        reader.onload = function (event) {
            let url = event.target.result;

            yourPhoto.style.background = '100% 100% no-repeat';
            yourPhoto.style.backgroundImage = 'url(' + url + ')';
            yourPhoto.style.backgroundSize = 'contain';
            spanPhoto.style.display = "none";

        };
        reader.readAsDataURL(f);
    });

                                                                    //// test
///////

        dot.onmousedown = function(e) {

            let dotMove = getCoords(dot);
            let shiftX = e.pageX - dotMove.left; // только по горизонтали

            let horizonMove = getCoords(horizon);

            document.onmousemove = function(e) {

                let newLeft = e.pageX - shiftX - horizonMove.left;

                if (newLeft < 0) {
                    newLeft = 0;
                }
                let rightEdge = horizon.offsetWidth - dot.offsetWidth;

                if(newLeft > rightEdge) {
                    newLeft = rightEdge;
                }
                dot.style.left = newLeft + 'px';
                // let coord = newLeft;
                textOfWeight.innerHTML = newLeft;
            };
         document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null;
             inputWeight.value = parseInt(dot.style.left);

         };
         return false; // disable selection start (cusros change)
        };

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        }
        ///
 });

