

document.addEventListener('DOMContentLoaded', () => {


    const scrollProgressEl = document.getElementById('scroll-progress');

    function updateScrollProgress() {
        if (!scrollProgressEl) return;

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
            scrollProgressEl.style.width = '0%';
            return;
        }

        const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;

        scrollProgressEl.style.width = `${scrolledPercentage}%`;
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();



    const changingTextEl = document.getElementById('changing-text');
    const greetings = [
        "Esame di Maturità",
        "Esame di Stato"
    ];
    let currentIndex = 0;

    function cycleText() {
        if (!changingTextEl) return;

        changingTextEl.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % greetings.length;
            changingTextEl.textContent = greetings[currentIndex];

            changingTextEl.classList.remove('fade-out');
            changingTextEl.classList.add('fade-in');

            void changingTextEl.offsetWidth;

            changingTextEl.classList.remove('fade-in');
        }, 500);
    }
    setInterval(cycleText, 4000);

    const header = document.getElementById('main-header');

    function checkHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll();


    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');

            const icon = mobileToggle.querySelector('i');
            if (isActive) {
                icon.className = 'ri-close-line';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'ri-menu-line';
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'ri-menu-line';
                document.body.style.overflow = '';
            });
        });
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    const sections = document.querySelectorAll('section');

    function highlightActiveNavLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 220;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink();
});
