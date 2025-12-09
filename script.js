(function () {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    if (!slides.length) return;

    let current = 0;
    let timer;

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

    function nextSlide() {
        showSlide(current + 1);
    }

    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 4000); // 4  seconds per image
    }

    // Button + dot events
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

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showSlide(index);
            resetTimer();
        });
    });

    // Start on first slide and begin auto-play
    showSlide(0);
    resetTimer();
})();
