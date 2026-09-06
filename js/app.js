/* ==========================================================================
   APP — boot sequence, desktop mascot, taskbar clock, and start-up wiring.
   ========================================================================== */

/* --- Boot sequence -------------------------------------------------------
   Milliseconds from the moment the computer is clicked.
   ------------------------------------------------------------------------ */

const BOOT_TIMELINE = {
    welcomeText: 2500,   // "Loading..." swaps to "Welcome!"
    chime: 5000,         // the Windows 95 start-up sound
    desktop: 5000        // the desktop fades in
};

const SOUNDS = {
    vhs: 'sound/vhs.mp3',
    startup: 'sound/win95.mp3',
    click: 'sound/mouse.mp3'
};

function play(src, volume = 1) {
    const audio = new Audio(src);
    audio.volume = volume;
    // Browsers block audio until the user has interacted with the page.
    audio.play().catch(() => {});
}

function startBootSequence() {
    const loading = document.querySelector('.loading-text');
    const welcome = document.querySelector('.welcome-text');

    document.body.classList.add('booting');
    document.querySelector('.image-button').classList.add('is-hidden');
    loading.classList.add('is-visible');
    play(SOUNDS.vhs);

    setTimeout(() => {
        loading.classList.remove('is-visible');
        welcome.classList.add('is-visible');
    }, BOOT_TIMELINE.welcomeText);

    setTimeout(() => play(SOUNDS.startup), BOOT_TIMELINE.chime);

    setTimeout(() => {
        welcome.classList.remove('is-visible');
        document.body.classList.remove('booting');
        document.body.classList.add('booted');
    }, BOOT_TIMELINE.desktop);
}


/* --- Desktop mascot ------------------------------------------------------ */

function randomMessage() {
    const messages = MASCOT.messages;
    return messages[Math.floor(Math.random() * messages.length)];
}

/** A small random offset, so the bubble doesn't land in the same spot twice. */
function randomNudge() {
    const range = 30;
    const offset = () => Math.floor(Math.random() * (range * 2 + 1)) - range;
    return `translate(${offset()}px, ${offset()}px)`;
}

function initMascot() {
    const mascot = document.querySelector('.eyes-deco');
    const bubble = mascot.querySelector('.chat-bubble');

    function show() {
        bubble.textContent = randomMessage();
        bubble.style.transform = randomNudge();
        bubble.classList.add('is-visible');
    }

    function hide() {
        bubble.classList.remove('is-visible');
    }

    mascot.addEventListener('mouseover', show);
    mascot.addEventListener('mouseout', hide);

    // Touch devices have no hover: press and hold instead.
    let holdTimer;
    mascot.addEventListener('touchstart', () => {
        holdTimer = setTimeout(show, 350);
    }, { passive: true });
    mascot.addEventListener('touchend', () => {
        clearTimeout(holdTimer);
        hide();
    });
}


/* --- Taskbar clock ------------------------------------------------------- */

function initClock() {
    const clock = document.getElementById('taskbarClock');

    function tick() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const suffix = now.getHours() >= 12 ? 'PM' : 'AM';
        clock.textContent = `${hours}:${minutes} ${suffix}`;
    }

    tick();
    setInterval(tick, 30000);
}


/* --- Start-up ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    initWindowManager();
    initTerminal();
    initLightbox();
    initMascot();
    initClock();

    document.querySelector('.image-button')
        .addEventListener('click', startBootSequence, { once: true });

    // Retro mouse click on any interaction.
    document.addEventListener('click', () => play(SOUNDS.click, 0.1));
});
