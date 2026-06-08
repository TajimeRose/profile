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

const initApp = () => {
    renderPage(window.SITE_DATA);
    initRevealAnimations();
    initActiveNav();
};

document.addEventListener("DOMContentLoaded", initApp);
