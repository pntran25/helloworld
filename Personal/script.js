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

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function makeDraggable(popupId) {
    const popup = document.getElementById(popupId);
    const header = popup.querySelector('.popup-header');
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        mouseX = e.clientX;
        mouseY = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        offsetX = mouseX - e.clientX;
        offsetY = mouseY - e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        popup.style.top = (popup.offsetTop - offsetY) + "px";
        popup.style.left = (popup.offsetLeft - offsetX) + "px";
    } 

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
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
        "Hope you having a great time!",
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

    document.querySelector('.eyes-deco').addEventListener('mouseover', function() {
        chatBubble.textContent = getRandomMessage();
        const position = getRandomPosition();
        chatBubble.style.transform = `translate(${position.x}px, ${position.y}px)`;
    });
});