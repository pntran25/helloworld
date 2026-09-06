/* ==========================================================================
   RENDER — turns data/content.js into DOM.

   No content lives here. Each window `type` in content.js maps to one
   function in LAYOUTS, which returns the HTML for that window's body.
   ========================================================================== */

/* --- Helpers ------------------------------------------------------------- */

/** Escape text so an apostrophe or < in the content can't break the markup. */
function esc(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Join a list of items through a template, skipping empties. */
function each(items, template) {
    return (items || []).map(template).join('');
}

/** The "▼ Read more" button that pairs with a .collapsible-text element. */
const READ_MORE = '<button class="toggle-expand" type="button">▼ Read more</button>';

/**
 * Bars for the equaliser in the About window. The bounce is CSS (.np-eq in
 * css/sections.css); this only supplies the numbers. Each bar gets a negative
 * animation delay, which starts it partway through its cycle so the bars
 * never rise and fall in unison.
 */
function equaliserBars(count) {
    let bars = '';
    for (let i = 0; i < count; i++) {
        const duration = (0.45 + Math.random() * 0.85).toFixed(2);
        const offset = (Math.random() * 1.2).toFixed(2);
        const resting = (0.2 + Math.random() * 0.6).toFixed(2);
        bars += `<i style="--eq-duration:${duration}s;--eq-delay:-${offset}s;--eq-rest:${resting}"></i>`;
    }
    return bars;
}

/** Icon path for a tech name, or '' if it has none registered in TECH. */
function techIcon(name) {
    return PORTFOLIO.tech[name] || '';
}


/* --- Window layouts ------------------------------------------------------
   One function per `type`. Each takes a window object from content.js and
   returns the HTML that sits below the title bar.
   ------------------------------------------------------------------------ */

const LAYOUTS = {

    about(w) {
        const edu = w.education;

        // Win95 System Properties style: label, dotted leader, value.
        const facts = w.facts ? `
            <h3 class="about-title">${esc(w.facts.heading)}</h3>
            <dl class="about-facts">
                ${each(w.facts.rows, row => `
                    <div class="about-fact">
                        <dt>${esc(row.label)}</dt>
                        <span class="about-fact-leader"></span>
                        <dd>${esc(row.value)}</dd>
                    </div>`)}
            </dl>` : '';

        const player = w.nowPlaying ? `
            <div class="now-playing">
                <div class="np-badge">${esc(w.nowPlaying.label)}</div>
                <div class="np-screen">
                    <div class="np-marquee">
                        <span>${esc(w.nowPlaying.marquee)}</span>
                        <span aria-hidden="true">${esc(w.nowPlaying.marquee)}</span>
                    </div>
                    <div class="np-eq" aria-hidden="true">${equaliserBars(w.nowPlaying.bars)}</div>
                </div>
            </div>` : '';

        // The screen only; js/terminal.js does the typing.
        const terminal = w.terminal ? `
            <div class="dos-terminal">
                <div class="dos-badge">${esc(w.terminal.label)}</div>
                <div class="dos-screen">
                    <div class="dos-body" aria-hidden="true"></div>
                </div>
            </div>` : '';

        return `
            <img src="${esc(w.photo)}" alt="${esc(w.name)}" class="about-photo">
            <h1 class="about-name">${esc(w.name)}</h1>
            <h3 class="about-title">${esc(w.headline)}</h3>

            <div class="about-summary">
                <hr class="about-divider">
                <p class="about-description collapsible-text">${esc(w.intro)}</p>
                ${READ_MORE}
                <hr class="about-divider">
            </div>
            <br>

            <div class="about-education">
                <img src="${esc(edu.logo)}" alt="${esc(edu.school)}" class="about-uh">
                <div class="about-edu-details">
                    <h4>${esc(edu.school)}</h4>
                    <h5>${esc(edu.degree)}</h5>
                    <p>${esc(edu.note)}</p>
                    <ul>${each(edu.bullets, b => `<li>${esc(b)}</li>`)}</ul>
                </div>
            </div>

            ${facts}
            ${terminal}
            ${player}`;
    },

    skills(w) {
        // Skills with a registered icon show it; the rest become chips.
        const skill = name => {
            const icon = techIcon(name);
            return icon
                ? `<li>
                       <p>${esc(name)}</p>
                       <img src="${esc(icon)}" alt="${esc(name)}" class="skills-icon">
                   </li>`
                : `<li class="skill-chip"><p>${esc(name)}</p></li>`;
        };

        return `
            <div class="skills-section">
                ${each(w.groups, group => `
                    <h4 class="skills-category">${esc(group.name)}</h4>
                    <ul class="skills-list">${each(group.items, skill)}</ul>`)}
            </div>`;
    },

    experience(w) {
        return `
            <div class="experience-list">
                ${each(w.jobs, job => `
                    <div class="experience-item">
                        <div class="experience-header">
                            <h3 class="experience-role">${esc(job.role)}</h3>
                            <span class="experience-date">${esc(job.date)}</span>
                        </div>
                        <p class="experience-company">${esc(job.company)}</p>
                        <hr class="experience-divider">
                        <ul class="experience-desc collapsible-text">
                            ${each(job.bullets, b => `<li>${esc(b)}</li>`)}
                        </ul>
                        ${READ_MORE}
                    </div>`)}
            </div>`;
    },

    projects(w) {
        return each(w.projects, project => `
            <div class="projects-list">
                <div class="project-title-row">
                    <h3 class="project-title">${esc(project.title)}</h3>
                    <span class="project-icons">
                        ${each(project.tech.filter(techIcon), name =>
                            `<img src="${esc(techIcon(name))}" alt="${esc(name)}" class="project-tech-icon">`)}
                    </span>
                    ${project.date ? `<span class="project-date">${esc(project.date)}</span>` : ''}
                </div>
                <hr class="project-divider">
                <p class="project-description${project.collapse === false ? '' : ' collapsible-text'}">${esc(project.description)}</p>
                ${project.collapse === false ? '' : READ_MORE}
                ${project.image ? `
                    <a href="${esc(project.href)}" target="_blank" rel="noopener">
                        <img src="${esc(project.image)}" alt="${esc(project.title)}" class="project-image">
                    </a>` : ''}
                <a href="${esc(project.href)}" target="_blank" rel="noopener">
                    <button class="project-link" type="button">${esc(project.linkLabel || 'Open')}</button>
                </a>
            </div>`);
    },

    highlights(w) {
        return `
            <ul class="highlights-list">
                ${each(w.items, item => `
                    <li class="highlight-item">
                        ${item.links
                            ? each(item.links, link => `
                                <h3 class="highlight-title">${esc(link.title)}</h3>
                                <a href="${esc(link.href)}" target="_blank" rel="noopener">
                                    <img src="${esc(link.image)}" alt="${esc(link.title)}" class="highlight-image">
                                </a>`)
                            : `
                                <h3 class="highlight-title">${esc(item.title)}</h3>
                                ${item.subtitle ? `<h3 class="highlight-title">${esc(item.subtitle)}</h3>` : ''}
                                <hr class="highlight-divider">
                                <p class="highlight-description collapsible-text">${esc(item.description)}</p>
                                ${READ_MORE}
                                ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.title)}" class="highlight-image">` : ''}`}
                    </li>`)}
            </ul>`;
    },

    documents(w) {
        const resume = w.resume;
        const refs = w.references;

        return `
            <br>
            <h3 class="doc-heading">${esc(resume.heading)}</h3>
            <div class="doc-center">
                <a href="${esc(resume.file)}" target="_blank" rel="noopener" class="resume-preview-link">
                    <object data="${esc(resume.file)}#toolbar=0&amp;navpanes=0&amp;scrollbar=0"
                            type="application/pdf" class="resume-preview">
                        <p>PDF preview unavailable.</p>
                    </object>
                    <div class="resume-preview-overlay"></div>
                </a>
                <br>
                <a href="${esc(resume.file)}" target="_blank" rel="noopener">
                    <button class="project-link" type="button">Download</button>
                </a>
            </div>

            <h3 class="doc-heading">${esc(refs.heading)}</h3>
            ${each(refs.people, person => `
                <div class="doc-center">
                    <h3><u>${esc(person.name)}</u></h3>
                    <p>${esc(person.role)}<br>${esc(person.credentials)}</p>
                    <a href="${esc(person.file)}" target="_blank" rel="noopener">
                        <img src="${esc(person.image)}" alt="${esc(person.name)}" class="doc-thumbnail doc-ref">
                    </a>
                </div>`)}`;
    },

    contact(w) {
        const form = w.form;

        return `
            ${each(w.details, d => `<p>${esc(d.label)}: ${esc(d.value)}</p>`)}
            <h3 class="doc-heading">${esc(form.heading)}</h3>
            <form action="${esc(form.action)}" method="POST" class="contact-form">
                <input type="hidden" name="access_key" value="${esc(form.accessKey)}">
                <label for="contact-name">Name:</label>
                <input type="text" id="contact-name" name="name" class="contact-inputs" required>
                <label for="contact-email">Email:</label>
                <input type="email" id="contact-email" name="email" class="contact-inputs" required>
                <label for="contact-message">Message:</label>
                <textarea id="contact-message" name="message" rows="10" class="contact-inputs" required></textarea>
                <br>
                <input type="submit" value="Send">
            </form>`;
    }
};


/* --- Status bar text ----------------------------------------------------
   Fallbacks for windows that don't set their own `status`.
   ------------------------------------------------------------------------ */

const STATUS_DEFAULTS = {
    skills: w => {
        const total = w.groups.reduce((sum, g) => sum + g.items.length, 0);
        return `${total} skills • ${w.groups.length} categories`;
    },
    experience: w => `${w.jobs.length} positions • Currently active`,
    projects:   w => `${w.projects.length} projects • Scroll to explore`,
    highlights: w => `${w.items.length} highlights`,
    documents:  w => `${1 + w.references.people.length} documents available`
};

function statusFor(w) {
    if (w.status) return w.status;
    const fallback = STATUS_DEFAULTS[w.type];
    return fallback ? fallback(w) : 'Ready';
}


/* --- Builders ------------------------------------------------------------ */

/** The window id used in the DOM, e.g. 'about' -> 'aboutPopup'. */
function popupIdFor(id) {
    return id + 'Popup';
}

/** Build one .popup element (title bar + body + status bar). */
function buildWindow(w) {
    const layout = LAYOUTS[w.type];
    if (!layout) {
        console.warn(`No layout named "${w.type}" — check the type on window "${w.id}".`);
        return null;
    }

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = popupIdFor(w.id);
    popup.innerHTML = `
        <div class="popup-header">
            <span class="popup-title">${esc(w.title)}</span>
            <div class="win-buttons">
                <button class="win-btn win-minimize" type="button" data-action="minimize" aria-label="Minimize">_</button>
                <button class="win-btn win-maximize" type="button" data-action="maximize" aria-label="Maximize">□</button>
                <button class="win-btn win-close"    type="button" data-action="close"    aria-label="Close">×</button>
            </div>
        </div>
        ${layout(w)}
        <div class="popup-status-bar">
            <span class="status-icon"></span> ${esc(statusFor(w))}
        </div>`;
    return popup;
}

/** Build one desktop icon. */
function buildDesktopIcon(w) {
    const button = document.createElement('button');
    button.className = 'desktop-icon';
    button.type = 'button';
    button.dataset.window = w.id;
    button.innerHTML = `
        <img class="image-icons" src="${esc(w.icon)}" alt="">
        <span>${esc(w.label)}</span>`;
    return button;
}

/**
 * Fill a .glitch element with the three copies the effect needs: two
 * positioned ghosts over the real text.
 */
function renderGlitch(element, text) {
    element.innerHTML =
        `<span aria-hidden="true">${esc(text)}</span>` +
        esc(text) +
        `<span aria-hidden="true">${esc(text)}</span>`;
}

/** Fill in the boot screen, the Start button and the social links. */
function renderChrome() {
    document.querySelector('.image-button').style
        .setProperty('--prompt', `"${PROFILE.boot.prompt}"`);
    renderGlitch(document.querySelector('.loading-text'), PROFILE.boot.loading);
    renderGlitch(document.querySelector('.welcome-text'), PROFILE.boot.welcome);

    document.getElementById('mascotFace').src = MASCOT.idle;

    document.getElementById('taskbarStart').innerHTML = `
        <img class="image-phi" src="${esc(PROFILE.avatar)}" alt="${esc(PROFILE.name)}">
        <span class="taskbar-name">${esc(PROFILE.name)}</span>`;

    document.getElementById('taskbarLinks').innerHTML = each(PROFILE.socials, s => `
        <a href="${esc(s.href)}" target="_blank" rel="noopener" title="${esc(s.label)}">
            <img src="${esc(s.icon)}" alt="${esc(s.label)}">
        </a>`);
}

/** Render everything. Called once on DOMContentLoaded. */
function renderPortfolio() {
    renderChrome();

    const iconGrid = document.getElementById('desktopIcons');
    const windowLayer = document.getElementById('windowLayer');

    PORTFOLIO.windows.forEach(w => {
        const popup = buildWindow(w);
        if (!popup) return;
        windowLayer.appendChild(popup);
        iconGrid.appendChild(buildDesktopIcon(w));
    });
}
