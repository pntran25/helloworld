/* ==========================================================================
   MS-DOS PROMPT — the self-typing terminal in the About window.

   Commands type a character at a time; their output appears all at once, the
   way a real shell answers. At the end of the script it pauses, clears and
   starts over. The script itself is `terminal` in data/content.js.
   ========================================================================== */

function initTerminal() {
    const body = document.querySelector('.dos-body');
    if (!body) return;

    const config = (PORTFOLIO.windows.find(w => w.terminal) || {}).terminal;
    if (!config) return;

    const typeSpeed = config.typeSpeed || 55;

    /* --- Printing -------------------------------------------------------- */

    /** Add a line to the screen and keep the newest text in view. */
    function addLine(text, className) {
        const line = document.createElement('div');
        line.className = className;
        line.textContent = text;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
        return line;
    }

    /** Print the whole script at once, with no animation. */
    function renderAll() {
        body.textContent = '';
        config.lines.forEach(entry => {
            addLine(`${config.prompt} ${entry.command}`, 'dos-line dos-command');
            (entry.output || []).forEach(text => addLine(text, 'dos-line dos-output'));
        });
    }

    // Reduced motion: show the finished screen rather than type it out.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        renderAll();
        return;
    }

    /* --- The typing loop -------------------------------------------------
       `generation` cancels a run: stop() bumps it and the loop bails once it
       sees its own number is stale, so two loops never type at once.
       --------------------------------------------------------------------- */

    let generation = 0;
    let running = false;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    async function typeCommand(entry, mine) {
        const line = addLine(config.prompt + ' ', 'dos-line dos-command');

        for (const character of entry.command) {
            if (mine !== generation) return false;
            line.textContent += character;
            body.scrollTop = body.scrollHeight;
            // Jitter, so it reads as typing rather than a metronome.
            await sleep(typeSpeed + Math.random() * 45);
        }
        return mine === generation;
    }

    async function loop(mine) {
        while (mine === generation) {
            body.textContent = '';

            for (const entry of config.lines) {
                if (!await typeCommand(entry, mine)) return;

                await sleep(280);
                if (mine !== generation) return;

                (entry.output || []).forEach(text => addLine(text, 'dos-line dos-output'));

                await sleep(750);
                if (mine !== generation) return;
            }

            await sleep(2600);   // let the finished screen sit for a moment
        }
    }

    function start() {
        if (running) return;
        running = true;
        loop(++generation);
    }

    function stop() {
        running = false;
        generation++;   // invalidates the loop currently in flight
    }

    /* --- Only type while the window is open ------------------------------ */

    // A closed window is display:none, which counts as not intersecting, so
    // the script restarts from the top each time About is opened.
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            entries[0].isIntersecting ? start() : stop();
        }).observe(body);
    } else {
        start();
    }
}
