const initRevealAnimations = () => {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.16 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
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

const initApp = () => {
    renderPage(window.SITE_DATA);
    initRevealAnimations();
    initActiveNav();
    initCarousels();
    initLightbox();
};

document.addEventListener("DOMContentLoaded", initApp);
