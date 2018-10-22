let valueOfWeight = [
    {
        name:'form__tracker-item form__tracker-item_first'
    },
    {
        name:'form__tracker-item form__tracker-item_second'
    },
    {
        name:'form__tracker-item form__tracker-item_third'
    },
    {
        name:'form__tracker-item form__tracker-item_fourth'
    },
    {
        name:'form__tracker-item form__tracker-item_fifth'
    }
];

document.addEventListener('DOMContentLoaded', function() {

    const horizon = document.querySelector('.form__tracker-horizon');
    const dot = document.querySelector('.form__tracker-dot');
    const textOfWeight = document.querySelector('.form__tracker-span_header');
    const inputWeight = document.querySelector('.form__tracker-slider input');
    const goal = document.querySelector('.form__tracker');
    const slider = document.querySelector('.form__tracker-slider');
    const label = document.querySelector('.form__tracker-footer');

    dot.addEventListener('mousedown', clickMouse);

    function clickMouse (event) {

        let dotMove = getCoords(dot); // расстояние "прямоугольника"
        let shiftX = event.pageX - dotMove.left; // разница между Х относительно документа и прямоугольника элемента
        let sliderMove = getCoords(slider);
        dot.classList.remove('animation');

        goal.addEventListener('mousemove', mouseMove);

        function mouseMove(event) {
            let newLeft = event.pageX - shiftX - sliderMove.left; // левая часть

            if (newLeft < 0) { // дальше 0 не пойдет
                newLeft = 0;
            }

            let rightEdge = slider.offsetWidth - dot.offsetWidth;

            if (newLeft > (rightEdge)) { // дальше max не пойдет
                newLeft = rightEdge;
            }

            dot.style.left = newLeft + 'px';
            let coord = Math.round(newLeft + 10);
            textOfWeight.innerHTML = coord;

            dot.addEventListener('mouseleave', function(event){

                if(event) {
                    inputWeight.value = coord;
                    goal.removeEventListener('mousemove', mouseMove);
                }
            });
        }

        dot.addEventListener('mouseup', function (event) {
            goal.removeEventListener('mousemove', mouseMove);
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

    label.addEventListener('click', function(event) {

        let value = event.target.className;

        let labelIsCorrect = valueOfWeight.some((item) => {

            if (value.match(item.name)) {
                let num = parseInt(event.target.innerHTML);
                dot.classList.add('animation');
                let newNum = num - 10 + 'px';
                dot.style.left = newNum;
                textOfWeight.innerHTML = num;
                inputWeight.value = num;
            }
        });
    });

});
