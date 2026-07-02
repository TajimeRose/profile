const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const externalAttrs = (item) => item.external ? ' target="_blank" rel="noreferrer"' : "";

const iconHtml = (icon) => `<i class="${escapeHtml(icon)}"></i>`;

const renderBrand = (brand) => `
    <a class="brand" href="#home" aria-label="${escapeHtml(brand.homeLabel)}">
        <span class="brand-mark">${iconHtml(brand.icon)}</span>
        <span>${escapeHtml(brand.name)}</span>
    </a>
`;

const renderHeader = ({ brand, nav, socials }) => `
    <div class="nav-shell">
        ${renderBrand(brand)}
        <nav class="main-nav" aria-label="Main navigation">
            ${nav.map((item, index) => `
                <a href="${escapeHtml(item.href)}" class="${index === 0 ? "active" : ""}">${escapeHtml(item.label)}</a>
            `).join("")}
        </nav>
        <div class="socials" aria-label="Social links">
            ${socials.map((item) => `
                <a href="${escapeHtml(item.href)}" aria-label="${escapeHtml(item.label)}"${externalAttrs(item)}>${iconHtml(item.icon)}</a>
            `).join("")}
        </div>
    </div>
`;

const renderButton = (action) => `
    <a class="btn${action.primary ? " primary" : ""}" href="${escapeHtml(action.href)}"${externalAttrs(action)}>
        ${action.icon ? iconHtml(action.icon) : ""} ${escapeHtml(action.label)}
    </a>
`;

const renderProfileCircle = (profile) => `
    <div class="profile-circle">
        <img src="${escapeHtml(profile.image)}" alt="${escapeHtml(profile.alt)}">
    </div>
`;

const renderSkillOrbit = (skills) => `
    <div class="skill-orbit" aria-hidden="true">
        ${skills.map((skill) => `
            <a href="${escapeHtml(skill.url)}" target="_blank" rel="noopener noreferrer" class="skill-icon ${escapeHtml(skill.key)}" style="--delay: ${escapeHtml(skill.delay)};" aria-label="${escapeHtml(skill.label)}" title="${escapeHtml(skill.label)}">
                ${iconHtml(skill.icon)}
            </a>
        `).join("")}
    </div>
`;

const renderHero = ({ hero, profile, skills }) => `
    <section class="hero" id="home">
        <div class="section-inner hero-grid">
            <div>
                <div class="eyebrow reveal">${iconHtml(hero.eyebrowIcon)} ${escapeHtml(hero.eyebrow)}</div>
                <h1 class="reveal">${escapeHtml(hero.titlePrefix)} <span class="accent">${escapeHtml(hero.titleName)}</span></h1>
                <div class="role reveal">${escapeHtml(hero.role)}</div>
                <p class="lead reveal">${escapeHtml(hero.lead)}</p>
                <div class="hero-actions reveal">
                    ${hero.actions.map(renderButton).join("")}
                </div>
            </div>
            <div class="profile-stage reveal" aria-label="Profile artwork">
                <div class="orbit-container">
                    ${renderProfileCircle(profile)}
                    ${renderSkillOrbit(skills)}
                </div>
            </div>
        </div>
    </section>
`;

const renderSectionHeading = (title) => `
    <div class="section-heading reveal">
        <h2>${escapeHtml(title)}</h2>
        <div class="underline"></div>
    </div>
`;

const renderAbout = ({ about, profile }) => `
    <section id="about">
        <div class="section-inner">
            ${renderSectionHeading(about.title)}
            <div class="about-grid">
                <div class="image-card reveal">
                    ${renderProfileCircle(profile)}
                </div>
                <div class="reveal">
                    <p class="section-copy">${escapeHtml(about.copy)}</p>
                    <div class="info-grid">
                        ${about.cards.map((card) => `
                            <article class="info-card">
                                ${iconHtml(card.icon)}
                                <h3>${escapeHtml(card.title)}</h3>
                                <p>${escapeHtml(card.text)}</p>
                            </article>
                        `).join("")}
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const renderGallery = (gallery) => `
    <section
        ${gallery.id ? `id="${escapeHtml(gallery.id)}"` : ""}
        class="project-gallery"
        data-carousel
        data-interval="${escapeHtml(gallery.interval)}"
        aria-roledescription="carousel"
        aria-label="${escapeHtml(gallery.title)}"
    >
        <div class="gallery-heading">
            <span>${iconHtml(gallery.icon)}</span>
            <h4>${escapeHtml(gallery.title)}</h4>
            <p><strong data-carousel-current>1</strong> / ${gallery.images.length}</p>
        </div>
        <div class="carousel-viewport">
            <div class="carousel-track" data-carousel-track>
                ${gallery.images.map((image, imageIndex) => `
                    <figure
                        class="carousel-slide${imageIndex === 0 ? " is-active" : ""}"
                        aria-hidden="${imageIndex === 0 ? "false" : "true"}"
                    >
                        <button
                            class="lightbox-trigger"
                            type="button"
                            data-lightbox-trigger
                            data-image-index="${imageIndex}"
                            tabindex="${imageIndex === 0 ? "0" : "-1"}"
                            aria-label="เปิดภาพเต็ม: ${escapeHtml(image.alt)}"
                        >
                            <img
                                src="${escapeHtml(image.src)}"
                                alt="${escapeHtml(image.alt)}"
                                loading="${imageIndex === 0 ? "eager" : "lazy"}"
                                class="fit-${escapeHtml(gallery.fit)}"
                            >
                            <span class="expand-hint" aria-hidden="true">
                                ${iconHtml("fa-solid fa-expand")}
                            </span>
                        </button>
                    </figure>
                `).join("")}
            </div>
            <button class="carousel-arrow previous" type="button" data-carousel-previous aria-label="ดูรูปก่อนหน้า">
                ${iconHtml("fa-solid fa-chevron-left")}
            </button>
            <button class="carousel-arrow next" type="button" data-carousel-next aria-label="ดูรูปถัดไป">
                ${iconHtml("fa-solid fa-chevron-right")}
            </button>
        </div>
        <div class="carousel-dots" role="group" aria-label="เลือกรูปภาพ">
            ${gallery.images.map((image, imageIndex) => `
                <button
                    type="button"
                    class="${imageIndex === 0 ? "is-active" : ""}"
                    data-carousel-dot="${imageIndex}"
                    aria-label="ดูรูปที่ ${imageIndex + 1}"
                    aria-current="${imageIndex === 0 ? "true" : "false"}"
                ></button>
            `).join("")}
        </div>
    </section>
`;

const renderProjectCard = (project) => `
    <article class="featured-project reveal">
        <div class="project-summary">
            <div class="project-icon">${iconHtml(project.icon)}</div>
            <div>
                <p class="project-eyebrow">${escapeHtml(project.eyebrow)}</p>
                <h3>${escapeHtml(project.title)}</h3>
            </div>
        </div>
        <p class="project-description">${escapeHtml(project.description)}</p>
        <div class="tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="project-actions">
            ${project.actions.map(renderButton).join("")}
        </div>
        <div class="gallery-grid">
            ${project.galleries.map(renderGallery).join("")}
        </div>
    </article>
`;

const renderProjects = ({ projects }) => `
    <section id="projects">
        <div class="section-inner">
            ${renderSectionHeading(projects.title)}
            <div class="project-category reveal">
                <span></span>
                <h3>${escapeHtml(projects.category)}</h3>
                <span></span>
            </div>
            <div class="projects-list">
                ${projects.items.map(renderProjectCard).join("")}
            </div>
        </div>
    </section>
`;

const renderContactCard = (item) => `
    <a class="contact-card" href="${escapeHtml(item.href)}"${externalAttrs(item)}>
        ${iconHtml(item.icon)}
        <span><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></span>
    </a>
`;

const renderContact = ({ contact }) => `
    <section id="contact">
        <div class="section-inner">
            ${renderSectionHeading(contact.title)}
            <div class="contact-grid">
                <div class="contact-list reveal">
                    ${contact.links.map(renderContactCard).join("")}
                </div>
            </div>
        </div>
    </section>
`;

const renderLightbox = () => `
    <div class="lightbox" data-lightbox role="dialog" aria-modal="true" aria-label="ดูภาพเต็ม" aria-hidden="true">
        <button class="lightbox-backdrop" type="button" data-lightbox-close tabindex="-1" aria-label="ปิดภาพเต็ม"></button>
        <div class="lightbox-panel">
            <div class="lightbox-toolbar">
                <p><strong data-lightbox-current>1</strong> / <span data-lightbox-total>1</span></p>
                <button type="button" data-lightbox-close aria-label="ปิดภาพเต็ม">
                    ${iconHtml("fa-solid fa-xmark")}
                </button>
            </div>
            <div class="lightbox-stage" data-lightbox-stage>
                <button class="lightbox-arrow previous" type="button" data-lightbox-previous aria-label="ดูรูปก่อนหน้า">
                    ${iconHtml("fa-solid fa-chevron-left")}
                </button>
                <div class="lightbox-image-wrap">
                    <img data-lightbox-image src="" alt="">
                </div>
                <button class="lightbox-arrow next" type="button" data-lightbox-next aria-label="ดูรูปถัดไป">
                    ${iconHtml("fa-solid fa-chevron-right")}
                </button>
            </div>
            <div class="lightbox-footer">
                <p data-lightbox-caption></p>
                <span>${iconHtml("fa-solid fa-magnifying-glass-plus")} คลิกภาพเพื่อซูม</span>
            </div>
        </div>
    </div>
`;

const renderFooter = ({ brand, footer }) => `
    <div class="footer-inner">
        ${renderBrand(brand)}
        <p>${escapeHtml(footer.copyright)}</p>
    </div>
`;

const renderPage = (data) => {
    document.getElementById("site-header").innerHTML = renderHeader(data);
    document.getElementById("page-content").innerHTML = [
        renderHero(data),
        renderAbout(data),
        renderProjects(data),
        renderContact(data),
        renderLightbox()
    ].join("");
    document.getElementById("site-footer").innerHTML = renderFooter(data);
};
