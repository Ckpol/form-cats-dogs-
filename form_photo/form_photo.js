document.addEventListener('DOMContentLoaded', function() {
    const yourPhoto = document.querySelector('.form__photo-label'); /// label in avatar div
    const loadFile = document.querySelector('.form__photo-input');
    const photoBorder = document.querySelector('.form__photo');
    const spanPhoto = document.querySelector('.form__photo-span');

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

});