document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Countdown Timer ---
    const initCountdown = () => {
        const timeBlocks = document.querySelectorAll('.time-block .number');
        if (timeBlocks.length < 4) return;

        const daysEl = timeBlocks[0];
        const hoursEl = timeBlocks[1];
        const minutesEl = timeBlocks[2];
        const secondsEl = timeBlocks[3];

        // Demo target date: 12 days, 5 hours, 30 minutes from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 12);
        targetDate.setHours(targetDate.getHours() + 5);
        targetDate.setMinutes(targetDate.getMinutes() + 30);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        };

        updateTimer();
        setInterval(updateTimer, 1000); // Update every second
    };

    // --- 2. Testimonials Slider ---
    const initSlider = () => {
        const slider = document.querySelector('.testimonials-slider');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (!slider || !prevBtn || !nextBtn) return;

        slider.style.overflowX = 'auto';
        slider.style.scrollBehavior = 'smooth';
        slider.style.scrollbarWidth = 'none';
        slider.style.msOverflowStyle = 'none';

        const style = document.createElement('style');
        style.textContent = `
            .testimonials-slider::-webkit-scrollbar { display: none; }
            .testimonials-slider { flex-wrap: nowrap !important; }
            .testimonial-card { flex: 0 0 350px !important; }
        `;
        document.head.appendChild(style);

        // Duplicate cards so there's enough content to actually scroll
        const cards = slider.querySelectorAll('.testimonial-card');
        if (cards.length <= 3) {
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                slider.appendChild(clone);
            });
        }

        // Calculate card width dynamically for accurate scrolling
        const getScrollAmount = () => {
            const card = slider.querySelector('.testimonial-card');
            return card ? card.offsetWidth + 24 : 400; // adding 24px gap approx
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    };

    // --- 3. Smooth Scroll Navigation ---
    const initSmoothScroll = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetText = e.target.textContent.toLowerCase().trim();
                let targetSelector = '';

                switch (targetText) {
                    case 'home': targetSelector = '.hero-section'; break;
                    case 'schedule': targetSelector = '.agenda-section'; break;
                    case 'speakers': targetSelector = '.speakers-section-large'; break;
                    case 'tickets': targetSelector = '.ticket-options-section'; break;
                    case 'venue': targetSelector = '.map-section'; break;
                    case 'sponsors': targetSelector = '.sponsors-section'; break;
                }

                if (targetSelector) {
                    const targetEl = document.querySelector(targetSelector);
                    if (targetEl) {
                        e.preventDefault();
                        
                        navLinks.forEach(el => el.classList.remove('active'));
                        e.target.classList.add('active');

                        const offset = 100; // Account for sticky navbar height
                        const bodyRect = document.body.getBoundingClientRect().top;
                        const elementRect = targetEl.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };

    // --- 4. Sticky Glassmorphism Navbar ---
    const initStickyNavbar = () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        navbar.style.position = 'sticky';
        navbar.style.top = '0';
        navbar.style.zIndex = '1000';
        navbar.style.transition = 'all 0.3s ease';
        navbar.style.padding = '1.5rem 2rem';
        navbar.style.margin = '0 -2rem 2rem -2rem';
        navbar.style.borderRadius = '0 0 1.5rem 1.5rem';

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
                navbar.style.backdropFilter = 'blur(16px)';
                navbar.style.webkitBackdropFilter = 'blur(16px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
                navbar.style.padding = '1rem 2rem';
            } else {
                navbar.style.backgroundColor = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.webkitBackdropFilter = 'none';
                navbar.style.borderBottom = 'none';
                navbar.style.padding = '1.5rem 2rem';
            }
        });
    };

    // --- 5. Scroll Reveal Animations ---
    const initScrollReveal = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elementsToReveal = [
            '.bento-card',
            '.agenda-row',
            '.speaker-card',
            '.why-card-top',
            '.testimonial-card',
            '.ticket-card',
            '.contact-content',
            '.contact-form-card',
            '.map-section'
        ];

        const style = document.createElement('style');
        style.textContent = `
            .reveal-item {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .reveal-visible {
                opacity: 1;
                transform: translateY(0);
            }
            .speakers-grid .speaker-card:nth-child(2) { transition-delay: 0.1s; }
            .speakers-grid .speaker-card:nth-child(3) { transition-delay: 0.2s; }
            .speakers-grid .speaker-card:nth-child(4) { transition-delay: 0.3s; }
            
            .why-grid .why-card-top:nth-child(2) { transition-delay: 0.1s; }
            .why-grid .why-card-top:nth-child(3) { transition-delay: 0.2s; }
            
            .tickets-grid .ticket-card:nth-child(2) { transition-delay: 0.1s; }
            .tickets-grid .ticket-card:nth-child(3) { transition-delay: 0.2s; }
        `;
        document.head.appendChild(style);

        elementsToReveal.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('reveal-item');
                observer.observe(el);
            });
        });
    };

    // --- 6. Form Submission Demo Prevention ---
    const initForms = () => {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                if (!btn) return;
                
                const originalText = btn.textContent;
                
                btn.textContent = 'Sent Successfully!';
                btn.style.backgroundColor = '#10b981'; // Success green
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    form.reset();
                }, 3000);
            });
        });
    };

    // Initialize all modules
    initCountdown();
    initSlider();
    initSmoothScroll();
    initStickyNavbar();
    initScrollReveal();
    initForms();
});
