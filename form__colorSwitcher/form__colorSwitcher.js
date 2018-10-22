document.addEventListener('DOMContentLoaded', function() {

    const colorValue = document.querySelector(".form__colorSwitcher-input");

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
});