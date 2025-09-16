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
        document.body.style.transition = "background-color 4s"; // Add transition for background color
        document.body.style.backgroundColor = "tan";

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
}

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    bringPopupToFront(popup);
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
    }, 0);
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.style.display = 'none';
    popup.style.zIndex = 10; // reset z-index when closed
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
    click.play();
    click.volume = 0.1;
}

document.addEventListener('click', playClickSound);

document.addEventListener('DOMContentLoaded', function() {
    makeDraggable('aboutPopup');
    makeDraggable('competenciesPopup');
    makeDraggable('projectsPopup');
    makeDraggable('highlightsPopup');
    makeDraggable('documentsPopup');
    makeDraggable('contactPopup');

    makeResizable('aboutPopup');
    makeResizable('competenciesPopup');
    makeResizable('projectsPopup');
    makeResizable('highlightsPopup');
    makeResizable('documentsPopup');
    makeResizable('contactPopup');


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
        }, 350); // shosow after 350ms hold
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
});

