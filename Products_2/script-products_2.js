const thumbs = document.querySelectorAll('.thumb');
    const bigImages = document.querySelectorAll('.gallery-container img');

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            document.querySelector('.thumb.active').classList.remove('active');
            document.querySelector('.gallery-container img.active').classList.remove('active');

            thumb.classList.add('active');
            bigImages[index].classList.add('active');
        });
    });