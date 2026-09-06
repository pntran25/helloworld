# Phi Tran — Portfolio

A personal portfolio built as a Windows 95 desktop: draggable, resizable
windows, a working taskbar, a boot sequence, and a self-typing MS-DOS prompt.

Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies.

**Live:** <https://pntran25.github.io/helloworld/>

## Running it locally

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly works too,
except for the embedded résumé preview, which most browsers block on `file://`.

## Structure

```
index.html      Page shell — no content
data/
  content.js    All portfolio content, as plain data
js/
  render.js     Builds the DOM from content.js; one layout per window type
  windows.js    Window manager: open, close, minimize, maximize, drag, resize
  terminal.js   The self-typing MS-DOS prompt
  app.js        Boot sequence, mascot, taskbar clock, start-up wiring
css/
  base.css        Design tokens, fonts, reset, page states
  boot.css        Intro screen and glitch effect
  desktop.css     Icon grid and mascot
  taskbar.css     Taskbar, window tabs, clock
  window.css      The frame shared by every window
  sections.css    The inside of each window type
  responsive.css  Phone layout (≤600px), loaded last
```

Content and presentation are kept apart: `data/content.js` holds the words,
links and images; `js/render.js` maps each window's `type` to a layout
function and generates its markup, desktop icon and taskbar tab. Adding a
project or a job is one object in a list, and the status-bar counts follow
automatically.

## Notes

- Every colour is a custom property in `css/base.css`. The Win95 3D look is
  asymmetric borders — light on top/left and dark on bottom/right for a raised
  edge, reversed for a pressed one — defined once in `css/sections.css`.
- Stylesheets are linked in cascade order in `index.html`: foundations first,
  overrides last.
- The equaliser, marquee and boot glitch are pure CSS animation, and all of
  them stop under `prefers-reduced-motion`.
- Image filenames are case-sensitive on GitHub Pages even though they aren't
  on Windows.

## Contact

[LinkedIn](https://www.linkedin.com/in/pntran25/) ·
[GitHub](https://github.com/pntran25) · phitrann0810@gmail.com
