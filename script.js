/* ==================================================
   TABLE OF CONTENTS
   01. Mobile navigation
   02. Gallery slider
   03. Accordion icons
   04. Footer year
================================================== */

(function () {
    'use strict';

    /* ==================================================
       01. MOBILE NAVIGATION
    ================================================== */

    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    function closeMenu() {
        if (!menuToggle || !mainNav) return;

        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.setAttribute(
            'aria-label',
            'Open navigation menu'
        );

        mainNav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen =
                menuToggle.getAttribute('aria-expanded') === 'true';

            menuToggle.setAttribute(
                'aria-expanded',
                String(!isOpen)
            );

            menuToggle.setAttribute(
                'aria-label',
                isOpen
                    ? 'Open navigation menu'
                    : 'Close navigation menu'
            );

            mainNav.classList.toggle(
                'is-open',
                !isOpen
            );

            document.body.classList.toggle(
                'menu-open',
                !isOpen
            );
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 860) {
                closeMenu();
            }
        });
    }

    /* ==================================================
       02. GALLERY SLIDER
    ================================================== */

    const slides = Array.from(
        document.querySelectorAll('.gallery-slide')
    );

    const dotsContainer =
        document.querySelector('.gallery-dots');

    const caption =
        document.querySelector('.gallery-caption');

    const slider =
        document.querySelector('.gallery-slider');

    const prevBtn =
        document.querySelector('.gallery-prev');

    const nextBtn =
        document.querySelector('.gallery-next');

    if (slides.length) {
        let current = 0;
        let timer = null;
        let touchStartX = 0;

        const dots = [];

        const reduceMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches;

        function showSlide(index) {
            current =
                (index + slides.length) %
                slides.length;

            slides.forEach((slide, slideIndex) => {
                const active =
                    slideIndex === current;

                slide.classList.toggle(
                    'active',
                    active
                );

                slide.setAttribute(
                    'aria-hidden',
                    String(!active)
                );
            });

            dots.forEach((dot, dotIndex) => {
                const active =
                    dotIndex === current;

                dot.classList.toggle(
                    'active',
                    active
                );

                dot.setAttribute(
                    'aria-current',
                    active ? 'true' : 'false'
                );
            });

            if (caption) {
                caption.textContent =
                    `${slides[current].alt} · ` +
                    `${current + 1} of ${slides.length}`;
            }
        }

        function createDots() {
            if (!dotsContainer) return;

            dotsContainer.innerHTML = '';

            slides.forEach((_, index) => {
                const dot =
                    document.createElement('button');

                dot.type = 'button';
                dot.className = 'gallery-dot';

                dot.setAttribute(
                    'aria-label',
                    `Show gallery photo ${index + 1}`
                );

                dot.addEventListener('click', () => {
                    showSlide(index);
                    restartTimer();
                });

                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        function stopTimer() {
            window.clearInterval(timer);
            timer = null;
        }

        function restartTimer() {
            stopTimer();

            if (!reduceMotion && !document.hidden) {
                timer = window.setInterval(() => {
                    showSlide(current + 1);
                }, 5500);
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(current - 1);
                restartTimer();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(current + 1);
                restartTimer();
            });
        }

        if (slider) {
            slider.addEventListener(
                'mouseenter',
                stopTimer
            );

            slider.addEventListener(
                'mouseleave',
                restartTimer
            );

            slider.addEventListener(
                'focusin',
                stopTimer
            );

            slider.addEventListener(
                'focusout',
                restartTimer
            );

            slider.addEventListener(
                'touchstart',
                event => {
                    touchStartX =
                        event.changedTouches[0].clientX;
                },
                { passive: true }
            );

            slider.addEventListener(
                'touchend',
                event => {
                    const distance =
                        event.changedTouches[0].clientX -
                        touchStartX;

                    if (Math.abs(distance) < 45) {
                        return;
                    }

                    showSlide(
                        distance > 0
                            ? current - 1
                            : current + 1
                    );

                    restartTimer();
                },
                { passive: true }
            );
        }

        document.addEventListener(
            'visibilitychange',
            () => {
                if (document.hidden) {
                    stopTimer();
                } else {
                    restartTimer();
                }
            }
        );

        createDots();
        showSlide(0);
        restartTimer();
    }

    /* ==================================================
       03. ACCORDION ICONS
    ================================================== */

    document
        .querySelectorAll('.service-item')
        .forEach(item => {
            item.addEventListener('toggle', () => {
                const icon =
                    item.querySelector('.summary-icon');

                if (icon) {
                    icon.textContent =
                        item.open ? '−' : '+';
                }
            });
        });

    /* ==================================================
       04. FOOTER YEAR
    ================================================== */

    const year =
        document.getElementById('year');

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }
})();