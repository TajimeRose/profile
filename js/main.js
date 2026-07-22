const initRevealAnimations = () => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate").forEach((element) => revealObserver.observe(element));
};

const initActiveNav = () => {
    const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 140;
        let current = sections[0]?.id;

        sections.forEach((section) => {
            if (section.offsetTop <= scrollPosition) current = section.id;
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();
};

const initParallax = () => {
    const mountainFar = document.querySelector(".ink-mountain-far");
    const mountainMid = document.querySelector(".ink-mountain-mid");
    const mountainNear = document.querySelector(".ink-mountain-near");
    const clouds = document.querySelectorAll(".ink-cloud");

    if (!mountainFar) return;

    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);

        mountainFar.style.transform = `translateY(${progress * -20}px)`;
        mountainMid.style.transform = `translateY(${progress * -45}px)`;
        mountainNear.style.transform = `translateY(${progress * -70}px)`;

        clouds.forEach((cloud, i) => {
            const speed = (i + 1) * 25;
            cloud.style.transform = `translateY(${progress * -speed}px)`;
            cloud.style.opacity = Math.max(0.2, 1 - progress * 1.2);
        });

        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
};

const initCarousels = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const track = carousel.querySelector("[data-carousel-track]");
        const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
        const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
        const currentLabel = carousel.querySelector("[data-carousel-current]");
        const interval = Number(carousel.dataset.interval) || 4000;
        let currentIndex = 0;
        let autoplayId;

        const showSlide = (nextIndex) => {
            currentIndex = (nextIndex + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            slides.forEach((slide, index) => {
                const active = index === currentIndex;
                slide.classList.toggle("is-active", active);
                slide.setAttribute("aria-hidden", String(!active));
                slide.querySelector("[data-lightbox-trigger]").tabIndex = active ? 0 : -1;
            });

            dots.forEach((dot, index) => {
                const active = index === currentIndex;
                dot.classList.toggle("is-active", active);
                dot.setAttribute("aria-current", String(active));
            });

            currentLabel.textContent = currentIndex + 1;
        };

        const stopAutoplay = () => window.clearInterval(autoplayId);
        const startAutoplay = () => {
            if (reduceMotion || slides.length < 2) return;
            stopAutoplay();
            autoplayId = window.setInterval(() => showSlide(currentIndex + 1), interval);
        };

        carousel.querySelector("[data-carousel-previous]").addEventListener("click", () => {
            showSlide(currentIndex - 1);
            startAutoplay();
        });
        carousel.querySelector("[data-carousel-next]").addEventListener("click", () => {
            showSlide(currentIndex + 1);
            startAutoplay();
        });
        dots.forEach((dot) => dot.addEventListener("click", () => {
            showSlide(Number(dot.dataset.carouselDot));
            startAutoplay();
        }));

        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);
        carousel.addEventListener("focusin", stopAutoplay);
        carousel.addEventListener("focusout", startAutoplay);
        startAutoplay();
    });
};

const initLightbox = () => {
    const lightbox = document.querySelector("[data-lightbox]");
    const image = lightbox.querySelector("[data-lightbox-image]");
    const imageWrap = lightbox.querySelector(".lightbox-image-wrap");
    const caption = lightbox.querySelector("[data-lightbox-caption]");
    const currentLabel = lightbox.querySelector("[data-lightbox-current]");
    const totalLabel = lightbox.querySelector("[data-lightbox-total]");
    const previousButton = lightbox.querySelector("[data-lightbox-previous]");
    const nextButton = lightbox.querySelector("[data-lightbox-next]");
    const closeButton = lightbox.querySelector(".lightbox-toolbar [data-lightbox-close]");
    let galleryImages = [];
    let currentIndex = 0;
    let lastFocusedElement;

    const showImage = (nextIndex) => {
        currentIndex = (nextIndex + galleryImages.length) % galleryImages.length;
        const selectedImage = galleryImages[currentIndex];

        imageWrap.classList.remove("is-zoomed");
        image.src = selectedImage.src;
        image.alt = selectedImage.alt;
        caption.textContent = selectedImage.alt;
        currentLabel.textContent = currentIndex + 1;
        totalLabel.textContent = galleryImages.length;

        const hasMultipleImages = galleryImages.length > 1;
        previousButton.hidden = !hasMultipleImages;
        nextButton.hidden = !hasMultipleImages;
    };

    const openLightbox = (trigger) => {
        const carousel = trigger.closest("[data-carousel]");
        galleryImages = Array.from(carousel.querySelectorAll(".lightbox-trigger img")).map((galleryImage) => ({
            src: galleryImage.currentSrc || galleryImage.src,
            alt: galleryImage.alt
        }));
        currentIndex = Number(trigger.dataset.imageIndex);
        lastFocusedElement = trigger;
        showImage(currentIndex);

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
        closeButton.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        imageWrap.classList.remove("is-zoomed");
        document.body.classList.remove("lightbox-open");
        lastFocusedElement?.focus();
    };

    document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
        trigger.addEventListener("click", () => openLightbox(trigger));
    });
    lightbox.querySelectorAll("[data-lightbox-close]").forEach((button) => {
        button.addEventListener("click", closeLightbox);
    });
    previousButton.addEventListener("click", () => showImage(currentIndex - 1));
    nextButton.addEventListener("click", () => showImage(currentIndex + 1));
    image.addEventListener("click", () => imageWrap.classList.toggle("is-zoomed"));

    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("is-open")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
};

const initFloatingParticles = () => {
    const bg = document.querySelector(".ink-bg");
    if (!bg) return;

    const particleTypes = ["ink-particle--dot", "ink-particle--glow", "ink-particle--plum"];

    const createParticle = () => {
        const el = document.createElement("div");
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const size = 4 + Math.random() * 12;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dx = (Math.random() - 0.5) * 120;
        const dy = -30 - Math.random() * 80;
        const duration = 6 + Math.random() * 10;

        el.className = `ink-particle ${type}`;
        el.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            --dx: ${dx}px;
            --dy: ${dy}px;
            --scale-end: ${0.3 + Math.random() * 0.5};
            animation: particle-float ${duration}s ease-in-out forwards;
        `;

        bg.appendChild(el);

        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, duration * 1000);
    };

    // Create initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 300);
    }

    // Continuously spawn particles
    setInterval(createParticle, 1800);
};

const initScrollProgress = () => {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    let ticking = false;
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
};

const initSectionDividers = () => {
    const sections = document.querySelectorAll("main > section");
    sections.forEach((section, index) => {
        if (index < sections.length - 1) {
            const divider = document.createElement("div");
            divider.className = "section-divider";
            divider.setAttribute("aria-hidden", "true");
            section.after(divider);
        }
    });
};

const initKineticCards = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    document.querySelectorAll(".info-card, .featured-project, .contact-card, .image-card").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
            card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
            card.style.setProperty("--rotate-x", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -4}deg`);
            card.style.setProperty("--rotate-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 4}deg`);
        });
        card.addEventListener("pointerleave", () => {
            card.style.setProperty("--rotate-x", "0deg");
            card.style.setProperty("--rotate-y", "0deg");
        });
    });
};

const initEntryGate = () => {
    const gate = document.querySelector("[data-entry-gate]");
    if (!gate) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let entrySeen = false;
    try {
        entrySeen = sessionStorage.getItem("tajime-entry-seen") === "1";
    } catch (error) {
        entrySeen = true;
    }

    if (reduceMotion || entrySeen) {
        gate.remove();
        return;
    }

    document.body.classList.add("entry-open");
    window.setTimeout(() => gate.classList.add("is-leaving"), 1050);
    window.setTimeout(() => {
        try {
            sessionStorage.setItem("tajime-entry-seen", "1");
        } catch (error) {
            // The animation can complete normally when storage is unavailable.
        }
        document.body.classList.remove("entry-open");
        gate.remove();
    }, 1650);
};

const initCredential = () => {
    const credential = document.querySelector("[data-credential]");
    if (!credential) return;

    const flip = () => {
        const flipped = credential.classList.toggle("is-flipped");
        credential.setAttribute("aria-pressed", String(flipped));
    };
    credential.addEventListener("click", flip);
    credential.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            flip();
        }
    });
};

const initHeaderState = () => {
    const header = document.getElementById("site-header");
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", update, { passive: true });
    update();
};

const initApp = () => {
    initEntryGate();
    renderPage(window.SITE_DATA);
    window.initInkScene?.();
    initRevealAnimations();
    initActiveNav();
    initParallax();
    initCarousels();
    initLightbox();
    initScrollProgress();
    initSectionDividers();
    initKineticCards();
    initCredential();
    initHeaderState();
};

document.addEventListener("DOMContentLoaded", initApp);
