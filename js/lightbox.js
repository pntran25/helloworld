/* ==========================================================================
   IMAGE VIEWER — the full-size view behind every project screenshot.

   Screenshots are shown small in the projects window; clicking one opens it
   here, in a Win95 image-viewer window. The shots inside a single
   .project-media form a group, so the arrows step through that project's
   images and stop at its ends.

   Two zoom levels: scaled to fit, and actual pixels. Anything wider than the
   viewer (the ER diagram especially) is unreadable when it is scaled down,
   so at actual size the image overflows and is dragged to pan.
   ========================================================================== */

function initLightbox() {
    const shots = [...document.querySelectorAll('.project-shot')];
    if (!shots.length) return;

    const viewer = buildViewer();
    document.body.appendChild(viewer.root);

    let group = [];       // the .project-shot buttons of the open project
    let index = 0;
    let zoomed = false;
    let opener = null;    // element focus returns to on close

    /* --- Opening and closing --------------------------------------------- */

    function show(i) {
        index = (i + group.length) % group.length;

        const shot = group[index];
        const image = shot.querySelector('img');
        viewer.image.src = image.currentSrc || image.src;
        viewer.image.alt = image.alt;
        viewer.title.textContent = shot.dataset.caption || image.alt;
        viewer.count.textContent = `${index + 1} of ${group.length}`;

        // Every image opens fit-to-window, however the last one was left.
        setZoom(false);

        const many = group.length > 1;
        viewer.prev.hidden = !many;
        viewer.next.hidden = !many;
        viewer.count.hidden = !many;
    }

    function open(shot) {
        const media = shot.closest('.project-media');
        group = media ? [...media.querySelectorAll('.project-shot')] : [shot];
        opener = shot;

        show(group.indexOf(shot));
        viewer.root.hidden = false;
        document.body.classList.add('viewer-open');
        viewer.close.focus();
    }

    function close() {
        viewer.root.hidden = true;
        document.body.classList.remove('viewer-open');
        viewer.image.removeAttribute('src');
        if (opener) opener.focus();
        opener = null;
    }

    const isOpen = () => !viewer.root.hidden;

    /* --- Zoom ------------------------------------------------------------- */

    function setZoom(on) {
        zoomed = on;
        viewer.stage.classList.toggle('is-zoomed', on);
        viewer.hint.textContent = on ? 'Click to fit' : 'Click to zoom';
        if (!on) {
            viewer.stage.scrollTop = 0;
            viewer.stage.scrollLeft = 0;
        }
    }

    /** Zoom toward the point that was clicked, rather than the top-left. */
    function toggleZoom(event) {
        if (zoomed) {
            setZoom(false);
            return;
        }

        const box = viewer.image.getBoundingClientRect();
        const relX = (event.clientX - box.left) / box.width;
        const relY = (event.clientY - box.top) / box.height;

        setZoom(true);
        viewer.stage.scrollLeft =
            relX * viewer.stage.scrollWidth - viewer.stage.clientWidth / 2;
        viewer.stage.scrollTop =
            relY * viewer.stage.scrollHeight - viewer.stage.clientHeight / 2;
    }

    /* --- Panning ----------------------------------------------------------
       Drag to scroll while zoomed. `moved` tells a drag apart from a click,
       so releasing after a pan doesn't also toggle the zoom back off.
       ---------------------------------------------------------------------- */

    let panning = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    function startPan(event) {
        if (!zoomed) return;
        panning = true;
        moved = false;
        startX = event.clientX;
        startY = event.clientY;
        startLeft = viewer.stage.scrollLeft;
        startTop = viewer.stage.scrollTop;
    }

    viewer.stage.addEventListener('mousedown', startPan);

    document.addEventListener('mousemove', event => {
        if (!panning) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;
        viewer.stage.scrollLeft = startLeft - dx;
        viewer.stage.scrollTop = startTop - dy;
    });

    document.addEventListener('mouseup', () => {
        panning = false;
    });

    /* --- Wiring ------------------------------------------------------------ */

    shots.forEach(shot => shot.addEventListener('click', () => open(shot)));

    viewer.close.addEventListener('click', close);
    viewer.prev.addEventListener('click', () => show(index - 1));
    viewer.next.addEventListener('click', () => show(index + 1));

    // Clicking the mat around the image closes; clicking the image zooms.
    viewer.stage.addEventListener('click', event => {
        if (event.target === viewer.image) {
            if (!moved) toggleZoom(event);
        } else {
            close();
        }
    });

    viewer.root.addEventListener('click', event => {
        if (event.target === viewer.root) close();
    });

    document.addEventListener('keydown', event => {
        if (!isOpen()) return;
        if (event.key === 'Escape') close();
        else if (event.key === 'ArrowLeft') show(index - 1);
        else if (event.key === 'ArrowRight') show(index + 1);
    });
}

/** The viewer's markup, built once and reused for every image. */
function buildViewer() {
    const root = document.createElement('div');
    root.className = 'viewer';
    root.hidden = true;
    root.innerHTML = `
        <div class="viewer-window" role="dialog" aria-modal="true" aria-label="Image viewer">
            <div class="popup-header">
                <span class="popup-title viewer-title"></span>
                <div class="win-buttons">
                    <button class="win-btn win-close viewer-close" type="button" aria-label="Close">×</button>
                </div>
            </div>
            <div class="viewer-stage">
                <img class="viewer-image" src="" alt="">
            </div>
            <div class="viewer-bar">
                <button class="viewer-nav viewer-prev" type="button" aria-label="Previous image">◀</button>
                <span class="viewer-count"></span>
                <button class="viewer-nav viewer-next" type="button" aria-label="Next image">▶</button>
                <span class="viewer-hint"></span>
            </div>
        </div>`;

    return {
        root,
        title: root.querySelector('.viewer-title'),
        stage: root.querySelector('.viewer-stage'),
        image: root.querySelector('.viewer-image'),
        close: root.querySelector('.viewer-close'),
        prev:  root.querySelector('.viewer-prev'),
        next:  root.querySelector('.viewer-next'),
        count: root.querySelector('.viewer-count'),
        hint:  root.querySelector('.viewer-hint')
    };
}
