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
            <div class="skill-icon ${escapeHtml(skill.key)}" style="--delay: ${escapeHtml(skill.delay)};" aria-label="${escapeHtml(skill.label)}">
                ${iconHtml(skill.icon)}
            </div>
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

const renderProjectCard = (project) => `
    <article class="card reveal">
        <div class="thumb">${iconHtml(project.icon)}</div>
        <div class="card-body">
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.description)}</p>
            <div class="tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
            <div class="card-actions">${project.actions.map(renderButton).join("")}</div>
        </div>
    </article>
`;

const renderProjects = ({ projects }) => `
    <section id="projects">
        <div class="section-inner">
            ${renderSectionHeading(projects.title)}
            <div class="projects-grid">
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
        renderContact(data)
    ].join("");
    document.getElementById("site-footer").innerHTML = renderFooter(data);
};
