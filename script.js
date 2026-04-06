function afterbutton() {
    document.body.style.backgroundColor = "black";

    // play sound effect
    setTimeout(function() {
        var vhs = new Audio('sound/vhs.mp3');
        vhs.play();
    }, 0); 
    setTimeout(function() {
        var windows = new Audio('sound/win95.mp3');
        windows.play();
    }, 5000); 

    document.querySelector('.image-button').style.display = 'none';

    document.querySelector('.loading-text').style.display = 'block';

    
    setTimeout(function() {
        document.querySelector('.loading-text').style.display = 'none';
        document.querySelector('.welcome-text').style.display = 'block';
    }, 2500);

    setTimeout(function() {
        document.querySelector('.welcome-text').style.display = 'none';
        document.body.style.transition = "background-color 4s";
        document.body.style.backgroundColor = "#d2b48c";

        // Show the portfolio content
        document.querySelector('main').style.display = 'block';
        document.querySelector('.portfolio-content').style.display = 'block';
        document.querySelector('.portfolio-content').classList.add('portfolio');
    }, 5000);
}

function bringPopupToFront(popup) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(p => {
        p.style.zIndex = 10;
    });
    popup.style.zIndex = 1001;
    // Update taskbar tab active states
    updateTaskbarActiveTab(popup.id);
}

// Popup-to-icon mapping for taskbar tabs
const popupIcons = {
    aboutPopup: 'images/aboutme.png',
    competenciesPopup: 'images/competencies.png',
    experiencePopup: 'images/experience.svg',
    projectsPopup: 'images/projects.png',
    highlightsPopup: 'images/highlights.png',
    documentsPopup: 'images/documents.png',
    contactPopup: 'images/contactme.png'
};

function getPopupTitle(popupId) {
    const popup = document.getElementById(popupId);
    const titleEl = popup.querySelector('.popup-title');
    return titleEl ? titleEl.textContent : popupId;
}

function createTaskbarTab(popupId) {
    const tabsContainer = document.getElementById('taskbarTabs');
    // Don't create if already exists
    if (document.getElementById('tab-' + popupId)) return;

    const tab = document.createElement('button');
    tab.className = 'taskbar-tab active';
    tab.id = 'tab-' + popupId;
    tab.setAttribute('data-popup', popupId);

    const icon = document.createElement('img');
    icon.className = 'taskbar-tab-icon';
    icon.src = popupIcons[popupId] || '';
    icon.alt = '';
    tab.appendChild(icon);

    const label = document.createElement('span');
    label.textContent = getPopupTitle(popupId);
    tab.appendChild(label);

    tab.addEventListener('click', function() {
        onTaskbarTabClick(popupId);
    });

    tabsContainer.appendChild(tab);
}

function removeTaskbarTab(popupId) {
    const tab = document.getElementById('tab-' + popupId);
    if (tab) tab.remove();
}

function updateTaskbarActiveTab(activePopupId) {
    const tabs = document.querySelectorAll('.taskbar-tab');
    tabs.forEach(tab => {
        const pid = tab.getAttribute('data-popup');
        const popup = document.getElementById(pid);
        if (pid === activePopupId && popup && popup.style.display !== 'none') {
            tab.classList.add('active');
            tab.classList.remove('minimized');
        } else if (popup && popup.style.display === 'none' && tab.classList.contains('minimized')) {
            // keep minimized state
        } else {
            tab.classList.remove('active');
            tab.classList.remove('minimized');
        }
    });
}

function onTaskbarTabClick(popupId) {
    const popup = document.getElementById(popupId);
    const tab = document.getElementById('tab-' + popupId);
    if (!popup || !tab) return;

    if (tab.classList.contains('minimized')) {
        // Restore from minimized
        popup.classList.remove('placed');
        popup.style.animation = 'none';
        popup.offsetHeight;
        popup.style.animation = '';
        popup.style.display = 'block';
        popup.classList.add('placed');
        bringPopupToFront(popup);
        tab.classList.remove('minimized');
        tab.classList.add('active');
    } else if (popup.style.zIndex === '1001') {
        // Already the top window — minimize it
        minimizePopup(popupId);
    } else {
        // It's open but not on top — bring to front
        bringPopupToFront(popup);
    }
}

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const tab = document.getElementById('tab-' + popupId);

    // If already open and minimized, restore via tab click
    if (tab && tab.classList.contains('minimized')) {
        onTaskbarTabClick(popupId);
        return;
    }

    // If already open and visible, just bring to front
    if (popup.style.display === 'block') {
        bringPopupToFront(popup);
        return;
    }

    bringPopupToFront(popup);
    // Re-trigger animation
    popup.classList.remove('placed');
    popup.style.animation = 'none';
    popup.offsetHeight; // force reflow
    popup.style.animation = '';
    popup.style.display = 'block';
    // Center the popup, clamp to viewport
    setTimeout(function() {
        const popupWidth = popup.offsetWidth;
        const popupHeight = popup.offsetHeight;
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        let top = Math.max(0, (winHeight - popupHeight) / 2);
        let left = Math.max(0, (winWidth - popupWidth) / 2);
        popup.style.top = top + 'px';
        popup.style.left = left + 'px';
        popup.style.transform = 'none';
        popup.classList.add('placed');
    }, 0);

    // Create taskbar tab
    createTaskbarTab(popupId);
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
    popup.style.zIndex = 10;
    // Reset maximize state when closing
    popup.classList.remove('maximized');
    popup.removeAttribute('data-prev-style');
    // Remove taskbar tab
    removeTaskbarTab(popupId);
}

function minimizePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
    popup.style.zIndex = 10;
    // Keep the tab but mark it minimized
    const tab = document.getElementById('tab-' + popupId);
    if (tab) {
        tab.classList.remove('active');
        tab.classList.add('minimized');
    }
}

function toggleCollapsible(btn) {
    const textEl = btn.previousElementSibling;
    if (textEl && textEl.classList.contains('collapsible-text')) {
        textEl.classList.toggle('expanded');
        btn.textContent = textEl.classList.contains('expanded') ? '▲ Less' : '▼ Read more';
    }
}

function toggleMaximize(popupId) {
    const popup = document.getElementById(popupId);
    if (popup.classList.contains('maximized')) {
        // Restore previous size/position
        const prev = JSON.parse(popup.getAttribute('data-prev-style'));
        popup.style.width = prev.width;
        popup.style.height = prev.height;
        popup.style.top = prev.top;
        popup.style.left = prev.left;
        popup.style.maxWidth = prev.maxWidth;
        popup.style.maxHeight = prev.maxHeight;
        popup.style.transform = prev.transform;
        popup.classList.remove('maximized');
    } else {
        // Save current size/position
        popup.setAttribute('data-prev-style', JSON.stringify({
            width: popup.style.width,
            height: popup.style.height,
            top: popup.style.top,
            left: popup.style.left,
            maxWidth: popup.style.maxWidth,
            maxHeight: popup.style.maxHeight,
            transform: popup.style.transform
        }));
        // Maximize to fill screen (above taskbar)
        popup.style.top = '0px';
        popup.style.left = '0px';
        popup.style.width = '100vw';
        popup.style.height = 'calc(100vh - 36px)';
        popup.style.maxWidth = '100vw';
        popup.style.maxHeight = 'calc(100vh - 36px)';
        popup.style.transform = 'none';
        popup.classList.add('maximized');
    }
}

function makeDraggable(popupId) {
    const popup = document.getElementById(popupId);
    const header = popup.querySelector('.popup-header');
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;
    let dragging = false;
    let touchStartX = 0, touchStartY = 0;

    // Mouse events
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        dragging = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        if (!dragging) return;
        e = e || window.event;
        e.preventDefault();
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
    let newTop = popup.offsetTop - offsetY;
    let newLeft = popup.offsetLeft - offsetX;
    // Clamp boundaries
    const minTop = 0;
    const minLeft = 0;
    const maxTop = window.innerHeight - popup.offsetHeight;
    const maxLeft = window.innerWidth - popup.offsetWidth;
    newTop = Math.max(minTop, Math.min(newTop, maxTop));
    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    popup.style.top = newTop + "px";
    popup.style.left = newLeft + "px";
    popup.style.transform = "none";
    }

    function closeDragElement() {
        dragging = false;
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Touch events
    header.addEventListener('touchstart', dragTouchStart, {passive: false});
    function dragTouchStart(e) {
        if (e.touches.length !== 1) return;
        dragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        mouseX = touchStartX;
        mouseY = touchStartY;
        document.addEventListener('touchmove', elementTouchDrag, {passive: false});
        document.addEventListener('touchend', closeTouchDrag, {passive: false});
    }
    function elementTouchDrag(e) {
        if (!dragging || e.touches.length !== 1) return;
        e.preventDefault();
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        offsetX = mouseX - clientX;
        offsetY = mouseY - clientY;
        mouseX = clientX;
        mouseY = clientY;
        let newTop = popup.offsetTop - offsetY;
        let newLeft = popup.offsetLeft - offsetX;
        // Clamp boundaries
        const minTop = 0;
        const minLeft = 0;
        const maxTop = window.innerHeight - popup.offsetHeight;
        const maxLeft = window.innerWidth - popup.offsetWidth;
        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
        popup.style.top = newTop + "px";
        popup.style.left = newLeft + "px";
        popup.style.transform = "none";
    }
    function closeTouchDrag(e) {
        dragging = false;
        document.removeEventListener('touchmove', elementTouchDrag, {passive: false});
        document.removeEventListener('touchend', closeTouchDrag, {passive: false});
    }
}

function makeResizable(popupId) {
    const popup = document.getElementById(popupId);
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'popup-resize-handle';
    popup.appendChild(resizeHandle);

    resizeHandle.addEventListener('mousedown', initResize, false);

    function initResize(e) {
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }

    function resize(e) {
        popup.style.width = (e.clientX - popup.offsetLeft) + 'px';
        popup.style.height = (e.clientY - popup.offsetTop) + 'px';
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
}

function getRandomMessage() {
    const messages = [
        "Welcome to Phi's portfolio!",
        "Check out my projects!",
        "Feel free to contact me!",
        "Hope you're having a great time!",
        "At the bottom right of the windows, you can resize them!",
        "I looove basketball!",
        "I'm a big fan of R&B, Indie, and Rap music!",
        "I can't wait to learn more in my Computer Science journey!",
        "Phi is a cool guy!",
        "Currently coding...",
        "Make sure to click the icons to see what's up!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomPosition() {
    const minX = -30, maxX = 30;
    const minY = -30, maxY = 30;
    const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    return { x: randomX, y: randomY };
}

function playClickSound() {
    var click = new Audio('sound/mouse.mp3');
    click.volume = 0.1;
    click.play();
}

document.addEventListener('click', playClickSound);

document.addEventListener('DOMContentLoaded', function() {
    makeDraggable('aboutPopup');
    makeDraggable('competenciesPopup');
    makeDraggable('projectsPopup');
    makeDraggable('highlightsPopup');
    makeDraggable('documentsPopup');
    makeDraggable('contactPopup');
    makeDraggable('experiencePopup');

    makeResizable('aboutPopup');
    makeResizable('competenciesPopup');
    makeResizable('projectsPopup');
    makeResizable('highlightsPopup');
    makeResizable('documentsPopup');
    makeResizable('contactPopup');
    makeResizable('experiencePopup');


    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.textContent = getRandomMessage();
    document.querySelector('.eyes-deco').appendChild(chatBubble);

    // Mouse hover
    document.querySelector('.eyes-deco').addEventListener('mouseover', function() {
        chatBubble.textContent = getRandomMessage();
        const position = getRandomPosition();
        chatBubble.style.transform = `translate(${position.x}px, ${position.y}px)`;
        chatBubble.style.display = 'flex';
    });
    document.querySelector('.eyes-deco').addEventListener('mouseout', function() {
        chatBubble.style.display = 'none';
    });

    // Touch tap and hold
    let chatBubbleTimeout;
    document.querySelector('.eyes-deco').addEventListener('touchstart', function(e) {
        chatBubbleTimeout = setTimeout(function() {
            chatBubble.textContent = getRandomMessage();
            const position = getRandomPosition();
            chatBubble.style.transform = `translate(${position.x}px, ${position.y}px)`;
            chatBubble.style.display = 'flex';
        }, 350); // show after 350ms hold
    });
    document.querySelector('.eyes-deco').addEventListener('touchend', function(e) {
        clearTimeout(chatBubbleTimeout);
        chatBubble.style.display = 'none';
    });

    //pop up thingy
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.addEventListener('mousedown', function() {
            bringPopupToFront(popup);
        });
    });

    // Win95 taskbar clock
    function updateClock() {
        const clock = document.getElementById('taskbarClock');
        if (clock) {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            clock.textContent = hours + ':' + minutes + ' ' + ampm;
        }
    }
    updateClock();
    setInterval(updateClock, 30000);
});

