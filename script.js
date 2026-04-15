(function () {
    // Grab all slider pieces once
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    // Stop early if the gallery is missing
    if (!slides.length) return;

    let current = 0;
    let timer;

    // Show one slide at a time and sync the dots
    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === current);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });
    }

    // Advance to the next image
    function nextSlide() {
        showSlide(current + 1);
    }

    // Restart autoplay after manual interaction
    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 4000);
    }

    // Previous / next controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(current - 1);
            resetTimer();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(current + 1);
            resetTimer();
        });
    }

    // Jump directly to a chosen slide
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showSlide(index);
            resetTimer();
        });
    });

    // Start the gallery
    showSlide(0);
    resetTimer();
})();