/* ==========================================================================
   WINDOW MANAGER — open / close / minimize / maximize / focus / drag /
   resize, plus the taskbar tabs that mirror them.

   This file knows nothing about the portfolio's content. It works on any
   element with class .popup that has a .popup-header and an id.
   ========================================================================== */

const TASKBAR_HEIGHT = 36;   // keep in sync with .taskbar height in css/taskbar.css
const MIN_WINDOW_SIZE = 240; // smallest a window can be dragged down to (px)

/** id of the window currently on top, or null when nothing is focused. */
let activeWindowId = null;

/** Ever-increasing stacking order, so the newest focus wins. */
let topZIndex = 100;


/* --- Focus & stacking ---------------------------------------------------- */

function focusWindow(popup) {
    popup.style.zIndex = ++topZIndex;
    activeWindowId = popup.id;
    syncTaskbarTabs();
}


/* --- Open / close / minimize / maximize ---------------------------------- */

/** Open a window by its content id ('about'), or focus it if already open. */
function openWindow(windowId) {
    const popup = document.getElementById(popupIdFor(windowId));
    if (!popup) return;

    if (isOpen(popup)) {
        restoreWindow(popup);
        return;
    }

    replayOpenAnimation(popup);
    popup.style.display = 'block';
    focusWindow(popup);
    centerWindow(popup);
    addTaskbarTab(windowId);
}

function closeWindow(popup) {
    popup.style.display = 'none';
    popup.classList.remove('maximized');
    popup.removeAttribute('data-restore');
    if (activeWindowId === popup.id) activeWindowId = null;
    removeTaskbarTab(popup);
}

function minimizeWindow(popup) {
    popup.style.display = 'none';
    if (activeWindowId === popup.id) activeWindowId = null;
    syncTaskbarTabs();
}

function restoreWindow(popup) {
    replayOpenAnimation(popup);
    popup.style.display = 'block';
    popup.classList.add('placed');
    focusWindow(popup);
}

function toggleMaximize(popup) {
    if (popup.classList.contains('maximized')) {
        Object.assign(popup.style, JSON.parse(popup.dataset.restore));
        popup.classList.remove('maximized');
        return;
    }

    popup.dataset.restore = JSON.stringify({
        width: popup.style.width,
        height: popup.style.height,
        top: popup.style.top,
        left: popup.style.left,
        maxWidth: popup.style.maxWidth,
        maxHeight: popup.style.maxHeight,
        transform: popup.style.transform
    });

    Object.assign(popup.style, {
        top: '0px',
        left: '0px',
        width: '100vw',
        height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
        maxWidth: '100vw',
        maxHeight: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
        transform: 'none'
    });
    popup.classList.add('maximized');
}


/* --- Placement ----------------------------------------------------------- */

function isOpen(popup) {
    return popup.style.display === 'block';
}

/** Restart the open animation even if the element never left the DOM. */
function replayOpenAnimation(popup) {
    popup.classList.remove('placed');
    popup.style.animation = 'none';
    void popup.offsetHeight;   // force reflow so the animation restarts
    popup.style.animation = '';
}

/** Centre a freshly-opened window, clamped inside the viewport. */
function centerWindow(popup) {
    // Wait a frame so the browser has measured the window's real size.
    requestAnimationFrame(() => {
        popup.style.top = Math.max(0, (window.innerHeight - popup.offsetHeight) / 2) + 'px';
        popup.style.left = Math.max(0, (window.innerWidth - popup.offsetWidth) / 2) + 'px';
        popup.style.transform = 'none';
        popup.classList.add('placed');
    });
}

/** Keep a window's top-left corner inside the viewport. */
function clampToViewport(popup, top, left) {
    return {
        top: Math.max(0, Math.min(top, window.innerHeight - popup.offsetHeight)),
        left: Math.max(0, Math.min(left, window.innerWidth - popup.offsetWidth))
    };
}


/* --- Taskbar tabs -------------------------------------------------------- */

function addTaskbarTab(windowId) {
    if (document.getElementById('tab-' + windowId)) return;

    const config = PORTFOLIO.windows.find(w => w.id === windowId);
    const tab = document.createElement('button');
    tab.className = 'taskbar-tab';
    tab.id = 'tab-' + windowId;
    tab.type = 'button';
    tab.dataset.window = windowId;
    tab.innerHTML = `
        <img class="taskbar-tab-icon" src="${esc(config.icon)}" alt="">
        <span>${esc(config.title)}</span>`;

    document.getElementById('taskbarTabs').appendChild(tab);
    syncTaskbarTabs();
}

function removeTaskbarTab(popup) {
    const tab = document.getElementById('tab-' + windowIdFor(popup));
    if (tab) tab.remove();
}

/** Repaint every tab's pressed / minimized look from the actual window state. */
function syncTaskbarTabs() {
    document.querySelectorAll('.taskbar-tab').forEach(tab => {
        const popup = document.getElementById(popupIdFor(tab.dataset.window));
        const focused = popup.id === activeWindowId && isOpen(popup);
        tab.classList.toggle('active', focused);
        tab.classList.toggle('minimized', !isOpen(popup));
    });
}

/** Clicking a tab: focus it, or minimize it if it's already on top. */
function onTaskbarTabClick(windowId) {
    const popup = document.getElementById(popupIdFor(windowId));
    if (!isOpen(popup)) {
        restoreWindow(popup);
    } else if (popup.id === activeWindowId) {
        minimizeWindow(popup);
    } else {
        focusWindow(popup);
    }
}

/** '...Popup' element -> the short content id. */
function windowIdFor(popup) {
    return popup.id.replace(/Popup$/, '');
}


/* --- Dragging ------------------------------------------------------------ */

function makeDraggable(popup) {
    const header = popup.querySelector('.popup-header');
    let lastX = 0;
    let lastY = 0;

    header.addEventListener('mousedown', event => {
        event.preventDefault();
        start(event.clientX, event.clientY);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    header.addEventListener('touchstart', event => {
        if (event.touches.length !== 1) return;
        start(event.touches[0].clientX, event.touches[0].clientY);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    }, { passive: true });

    function start(x, y) {
        lastX = x;
        lastY = y;
    }

    function moveTo(x, y) {
        const position = clampToViewport(
            popup,
            popup.offsetTop + (y - lastY),
            popup.offsetLeft + (x - lastX)
        );
        lastX = x;
        lastY = y;
        popup.style.top = position.top + 'px';
        popup.style.left = position.left + 'px';
        popup.style.transform = 'none';
    }

    function onMouseMove(event) {
        event.preventDefault();
        moveTo(event.clientX, event.clientY);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onTouchMove(event) {
        if (event.touches.length !== 1) return;
        event.preventDefault();
        moveTo(event.touches[0].clientX, event.touches[0].clientY);
    }

    function onTouchEnd() {
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }
}


/* --- Resizing ------------------------------------------------------------ */

function makeResizable(popup) {
    const handle = document.createElement('div');
    handle.className = 'popup-resize-handle';
    popup.appendChild(handle);

    handle.addEventListener('mousedown', event => {
        event.preventDefault();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(event) {
        popup.style.width = Math.max(MIN_WINDOW_SIZE, event.clientX - popup.offsetLeft) + 'px';
        popup.style.height = Math.max(MIN_WINDOW_SIZE, event.clientY - popup.offsetTop) + 'px';
    }

    function onMouseUp() {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    }
}


/* --- Wiring -------------------------------------------------------------- */

/** Attach every window behaviour. Icon and tab clicks are delegated. */
function initWindowManager() {
    document.querySelectorAll('.popup').forEach(popup => {
        makeDraggable(popup);
        makeResizable(popup);

        // Clicking anywhere in a window raises it.
        popup.addEventListener('mousedown', () => focusWindow(popup));

        // Title-bar buttons, identified by their data-action.
        popup.querySelector('.win-buttons').addEventListener('click', event => {
            const action = event.target.dataset.action;
            if (action === 'close') closeWindow(popup);
            else if (action === 'minimize') minimizeWindow(popup);
            else if (action === 'maximize') toggleMaximize(popup);
        });
    });

    // Desktop icons open windows.
    document.getElementById('desktopIcons').addEventListener('click', event => {
        const icon = event.target.closest('.desktop-icon');
        if (icon) openWindow(icon.dataset.window);
    });

    // Taskbar tabs focus / minimize windows.
    document.getElementById('taskbarTabs').addEventListener('click', event => {
        const tab = event.target.closest('.taskbar-tab');
        if (tab) onTaskbarTabClick(tab.dataset.window);
    });

    // "Read more" toggles, anywhere in any window.
    document.addEventListener('click', event => {
        const button = event.target.closest('.toggle-expand');
        if (!button) return;
        const text = button.previousElementSibling;
        if (!text || !text.classList.contains('collapsible-text')) return;
        const expanded = text.classList.toggle('expanded');
        button.textContent = expanded ? '▲ Less' : '▼ Read more';
    });
}
