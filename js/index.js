document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Countdown Timer ---
  const initCountdown = () => {
    const timeBlocks = document.querySelectorAll(".time-block .number");
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
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    };

    updateTimer();
    setInterval(updateTimer, 1000); // Update every second
  };

  // --- 2. Testimonials Slider ---
  const initSlider = () => {
    const slider = document.querySelector(".testimonials-slider");
    const prevBtn = document.querySelector(".prev-btn");

    const applyNavbarBase = () => {
      navbar.style.position = 'sticky';
      navbar.style.top = '0';
      navbar.style.zIndex = '1000';
      navbar.style.transition = 'all 0.3s ease';
      if (window.innerWidth > 900) {
        navbar.style.padding = '1.5rem 2rem';
        navbar.style.margin = '0 -2rem 2rem -2rem';
        navbar.style.borderRadius = '0 0 1.5rem 1.5rem';
      } else {
        navbar.style.padding = '0.75rem 1rem';
        navbar.style.margin = '0';
        navbar.style.borderRadius = '0';
      }
    };

    applyNavbarBase();
    window.addEventListener('resize', applyNavbarBase);

    window.addEventListener('scroll', () => {
      const compactPadding = window.innerWidth > 900 ? '1rem 2rem' : '0.5rem 1rem';
      const regularPadding = window.innerWidth > 900 ? '1.5rem 2rem' : '0.75rem 1rem';

      if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        navbar.style.backdropFilter = 'blur(16px)';
        navbar.style.webkitBackdropFilter = 'blur(16px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        navbar.style.padding = compactPadding;
      } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.webkitBackdropFilter = 'none';
        navbar.style.borderBottom = 'none';
        navbar.style.padding = regularPadding;
      }
    });
    }

    // Calculate card width dynamically for accurate scrolling
    const getScrollAmount = () => {
      const card = slider.querySelector(".testimonial-card");
      return card ? card.offsetWidth + 24 : 400; // adding 24px gap approx
    };

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
    });
  };

  // --- 3. Smooth Scroll Navigation ---
  const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetText = e.target.textContent.toLowerCase().trim();
        let targetSelector = "";

        switch (targetText) {
          case "home":
            targetSelector = ".hero-section";
            break;
          case "schedule":
            targetSelector = ".agenda-section";
            break;
          case "speakers":
            targetSelector = ".speakers-section-large";
            break;
          case "tickets":
            targetSelector = ".ticket-options-section";
            break;
          case "venue":
            targetSelector = ".map-section";
            break;
          case "sponsors":
            targetSelector = ".sponsors-section";
            break;
        }

        if (targetSelector) {
          const targetEl = document.querySelector(targetSelector);
          if (targetEl) {
            e.preventDefault();

            navLinks.forEach((el) => el.classList.remove("active"));
            e.target.classList.add("active");

            const offset = 100; // Account for sticky navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetEl.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  };

  // --- 4. Sticky Glassmorphism Navbar ---
  const initStickyNavbar = () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    navbar.style.position = "sticky";
    navbar.style.top = "0";
    navbar.style.zIndex = "1000";
    navbar.style.transition = "all 0.3s ease";
    navbar.style.padding = "1.5rem 2rem";
    navbar.style.margin = "0 -2rem 2rem -2rem";
    navbar.style.borderRadius = "0 0 1.5rem 1.5rem";

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.backgroundColor = "rgba(10, 10, 10, 0.8)";
        navbar.style.backdropFilter = "blur(16px)";
        navbar.style.webkitBackdropFilter = "blur(16px)";
        navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.05)";
        navbar.style.padding = "1rem 2rem";
      } else {
        navbar.style.backgroundColor = "transparent";
        navbar.style.backdropFilter = "none";
        navbar.style.webkitBackdropFilter = "none";
        navbar.style.borderBottom = "none";
        navbar.style.padding = "1.5rem 2rem";
      }
    });
  };

  // --- 5. Scroll Reveal Animations ---
  const initScrollReveal = () => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToReveal = [
      ".bento-card",
      ".agenda-row",
      ".speaker-card",
      ".why-card-top",
      ".testimonial-card",
      ".ticket-card",
      ".contact-content",
      ".contact-form-card",
      ".map-section",
    ];

    const style = document.createElement("style");
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

    elementsToReveal.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        el.classList.add("reveal-item");
        observer.observe(el);
      });
    });
  };

  // --- 6. Form Submission Demo Prevention ---
  const initForms = () => {
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalText = btn.textContent;

        btn.textContent = "Sent Successfully!";
        btn.style.backgroundColor = "#10b981"; // Success green
        btn.style.color = "#fff";

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = "";
          btn.style.color = "";
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
  // --- 7. Custom Cursor ---
  const initCustomCursor = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".cursor-follower");

    if (!cursor || !follower) return;

    let mouseX = 0,
      mouseY = 0;
    let followerX = 0,
      followerY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const interactives = document.querySelectorAll(
      "a, button, input, .ticket-card, .speaker-card",
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cursor-hover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cursor-hover"),
      );
    });
  };

  

  // --- 8. 3D Tilt Effect ---
  const initTiltEffect = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = document.querySelectorAll(
      ".bento-card, .speaker-card, .ticket-card, .why-card",
    );

    cards.forEach((card) => {
      card.classList.add("tilt-card");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = "transform 0.5s ease-out";
      });

      card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.1s ease-out";
      });
    });
  };

  // --- 9. Magnetic Buttons ---
  const initMagneticButtons = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const magnetics = document.querySelectorAll(
      ".btn-primary, .social-icon-img, .nav-btn",
    );

    magnetics.forEach((btn) => {
      btn.classList.add("magnetic");

      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = `translate(0px, 0px)`;
      });
    });
  };

  // --- 10. Parallax Scrolling ---
  const initParallax = () => {
    const heroGraphic = document.querySelector(".hero-graphic");
    const mapGraphic = document.querySelector(".map-img");

    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;

      if (heroGraphic) {
        heroGraphic.style.transform = `translateY(${scrolled * 0.15}px)`;
      }

      if (mapGraphic) {
        const mapRect = document
          .querySelector(".map-section")
          .getBoundingClientRect();
        if (mapRect.top < window.innerHeight && mapRect.bottom > 0) {
          mapGraphic.style.transform = `translateY(${(window.innerHeight - mapRect.top) * 0.1}px) scale(1.1)`;
        }
      }
    });
  };

  // --- 11. Text Scramble Effect ---
  const initTextScramble = () => {
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span style="color: var(--primary-blue); opacity: 0.7;">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    const el = document.querySelector(".hero-title");
    if (el) {
      const fx = new TextScramble(el);
      setTimeout(() => {
        fx.setText("Nexus Next-Gen AI Summit").then(() => {
          setTimeout(() => {
            el.innerHTML = "NEXT-GEN AI<br>SUMMIT";
          }, 100);
        });
      }, 300);
    }
  };

  // --- 12. Particle Background ---
  const initParticles = () => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const section = document.querySelector(".hero-card");
      if (!section) return;
      width = canvas.width = section.offsetWidth;
      height = canvas.height = section.offsetHeight;
      init();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 1.5;
        this.color = "rgba(20, 81, 245, 0.4)";
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = 150;

        if (distance < minDist) {
          const angle = Math.atan2(dy, dx);
          const force = (minDist - distance) / minDist;
          this.x -= Math.cos(angle) * force * 5;
          this.y -= Math.sin(angle) * force * 5;
        }

        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const numParticles = Math.min((width * height) / 10000, 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(20, 81, 245, ${0.15 - (distance / 120) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => p.update());
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);

    const heroSection = document.querySelector(".hero-card");
    if (heroSection) {
      heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      heroSection.addEventListener("mouseleave", () => {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }

    resize();
    animate();
  };

  // Initialize all modules
  initCountdown();
  initSlider();
  initSmoothScroll();
  initStickyNavbar();
  initScrollReveal();
  initForms();

  // Advanced Animations
  initCustomCursor();
  initTiltEffect();
  initMagneticButtons();
  initParallax();
  initTextScramble();
  initParticles();
});
