// Renders Sheet 01 (home) and Sheet 02 (project detail) from data.js,
// routes via the URL hash, and drives the theme chooser.
(function () {
  'use strict';

  var THEME_KEY = 'blueprint-theme';
  var DETAIL_PREFIX = '#/dwg/';

  var view = document.getElementById('view');
  var sheetNo = document.getElementById('sheet-no');
  var themeName = document.getElementById('theme-name');
  var themeCount = document.getElementById('theme-count');
  var themeList = document.getElementById('theme-list');
  var themeColor = document.querySelector('meta[name="theme-color"]');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function map(list, fn) { return list.map(fn).join(''); }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function dim(label) {
    return '<div class="dim"><span></span><b>' + esc(label) + '</b><span></span></div>';
  }

  // ---------- Sheet 01 ----------

  function homeHtml() {
    return (
      '<section id="hero" class="hero rule-bottom">' +
        '<div class="fig">Fig. 01 — General arrangement</div>' +
        '<h1>Software, drawn to specification.</h1>' +
        '<p>I\'m Christoph, a software engineer who builds backend systems and developer tooling. I care about clear interfaces, measured tradeoffs, and code you can hand to someone else.</p>' +
        '<div class="btns">' +
          '<a class="btn btn-solid" href="#projects">View drawings</a>' +
          '<a class="btn" href="#contact">Get in touch</a>' +
        '</div>' +
        dim('8 yrs · production systems') +
      '</section>' +

      '<section id="about" class="split">' +
        '<div class="about">' +
          '<div class="label">Section A — About</div>' +
          '<p>Eight years across fintech and infrastructure teams. I\'ve led migrations from monoliths to services, designed event pipelines that move billions of records a day, and mentored engineers into leads.</p>' +
          '<p>Based in Berlin. Working remotely with teams in Europe and the US.</p>' +
        '</div>' +
        '<div id="skills" class="skills">' +
          '<div class="label">Section B — Bill of materials</div>' +
          '<div class="bom">' +
            map(SKILLS, function (s) { return '<div>' + esc(s.k) + '</div><div>' + esc(s.v) + '</div>'; }) +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section id="projects" class="projects rule-bottom">' +
        '<div class="section-head">' +
          '<h2>Drawings</h2>' +
          '<span class="label">Section C — Selected projects · click to open detail sheet</span>' +
        '</div>' +
        '<div class="cards">' +
          map(PROJECTS, function (p) {
            return (
              '<a class="card" href="' + DETAIL_PREFIX + esc(p.id) + '">' +
                '<div class="card-meta"><span>Dwg ' + esc(p.no) + '</span><span>' + esc(p.year) + '</span></div>' +
                '<div class="hatch" aria-hidden="true">' + esc(p.diagram) + '</div>' +
                '<div class="card-name">' + esc(p.name) + '</div>' +
                '<div class="card-summary">' + esc(p.summary) + '</div>' +
                '<div class="card-stack">' + esc(p.stack) + '</div>' +
              '</a>'
            );
          }) +
        '</div>' +
      '</section>' +

      '<section id="experience" class="experience rule-bottom">' +
        '<div class="label">Section D — Revision history</div>' +
        '<div>' +
          map(EXPERIENCE, function (e) {
            return (
              '<div class="rev">' +
                '<div class="rev-years">' + esc(e.years) + '</div>' +
                '<div>' +
                  '<div class="rev-role">' + esc(e.role) + ' <span>— ' + esc(e.company) + '</span></div>' +
                  '<div class="rev-note">' + esc(e.note) + '</div>' +
                '</div>' +
              '</div>'
            );
          }) +
        '</div>' +
      '</section>' +

      '<section class="split">' +
        '<div id="writing" class="listing">' +
          '<div class="label">Section E — Notes &amp; writing</div>' +
          '<div>' +
            map(POSTS, function (w) {
              return '<a class="row" href="' + esc(w.href) + '"><span>' + esc(w.title) + '</span><small>' + esc(w.date) + '</small></a>';
            }) +
          '</div>' +
        '</div>' +
        '<div id="oss" class="listing">' +
          '<div class="label">Section F — Open source</div>' +
          '<div>' +
            map(OSS, function (o) {
              return (
                '<a class="row" href="' + esc(o.href) + '">' +
                  '<span><strong>' + esc(o.name) + '</strong> <span class="muted">— ' + esc(o.desc) + '</span></span>' +
                  '<small>★ ' + esc(o.stars) + '</small>' +
                '</a>'
              );
            }) +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section id="contact" class="split contact-grid">' +
        '<div class="contact">' +
          '<div class="label">Section G — Contact</div>' +
          '<h2>Open to interesting problems.</h2>' +
          '<p>Consulting, advisory, or a good conversation about systems design.</p>' +
          '<div class="contact-links">' +
            '<a href="mailto:hello@christoph.dev">hello@christoph.dev</a>' +
            '<a href="https://github.com/christoph">github.com/christoph</a>' +
            '<a href="https://www.linkedin.com/in/christoph">linkedin.com/in/christoph</a>' +
          '</div>' +
        '</div>' +
        '<dl class="title-block">' +
          '<div><dt>Project</dt><dd class="tb-project">Christoph — Portfolio</dd></div>' +
          '<div><dt>Drawn by</dt><dd>Christoph</dd></div>' +
          '<div><dt>Checked</dt><dd>CI · Passing</dd></div>' +
          '<div><dt>Scale</dt><dd>1 : 1</dd></div>' +
          '<div><dt>Date</dt><dd>Sep 2026</dd></div>' +
          '<div><dt>Rev</dt><dd>04</dd></div>' +
          '<div><dt>Sheet</dt><dd>01 / 02</dd></div>' +
        '</dl>' +
      '</section>'
    );
  }

  // ---------- Sheet 02 ----------

  function detailHtml(p) {
    var next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];
    return (
      '<section class="detail">' +
        '<a class="back" href="#projects">← Back to sheet 01</a>' +
        '<div class="fig">Dwg ' + esc(p.no) + ' — Detail · ' + esc(p.year) + '</div>' +
        '<h1>' + esc(p.name) + '</h1>' +
        '<p>' + esc(p.summary) + '</p>' +
        '<div class="hatch" aria-hidden="true">' + esc(p.diagram) + ' — architecture diagram / screenshot</div>' +
        dim(p.metric) +
        '<div class="spec">' +
          '<div><div class="label">Problem</div><p>' + esc(p.problem) + '</p></div>' +
          '<div><div class="label">Approach</div><p>' + esc(p.approach) + '</p></div>' +
          '<div><div class="label">Specification</div><div class="spec-list">' +
            'Role — ' + esc(p.role) + '<br>Stack — ' + esc(p.stack) + '<br>Duration — ' + esc(p.duration) +
          '</div></div>' +
        '</div>' +
        '<div class="btns">' +
          '<a class="btn" href="' + esc(p.source) + '">Source</a>' +
          '<a class="btn" href="' + DETAIL_PREFIX + esc(next.id) + '">Next drawing →</a>' +
        '</div>' +
      '</section>'
    );
  }

  // ---------- routing ----------

  var current = null; // 'home' or a project id

  function route() {
    var hash = location.hash;
    var project = null;
    if (hash.indexOf(DETAIL_PREFIX) === 0) {
      var id = decodeURIComponent(hash.slice(DETAIL_PREFIX.length));
      project = PROJECTS.find(function (p) { return p.id === id; }) || null;
    }
    var key = project ? project.id : 'home';

    if (key !== current) {
      current = key;
      view.innerHTML = project ? detailHtml(project) : homeHtml();
      sheetNo.textContent = project ? '02' : '01';
      document.title = project ? project.name + ' — Christoph' : 'Christoph — Software Engineer';
    }

    if (project) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Section anchors (#about, #projects…) — scroll after the home sheet exists.
    var target = hash.length > 1 && hash.charAt(1) !== '/' ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else if (hash === '#/' || hash === '') window.scrollTo(0, 0);
  }

  // ---------- themes ----------

  function applyTheme(t) {
    var root = document.documentElement;
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--ink', t.ink);
    if (t.bar) {
      root.style.setProperty('--bar', t.bar);
      root.dataset.bar = '';
    } else {
      root.style.removeProperty('--bar');
      delete root.dataset.bar;
    }
    if (themeColor) themeColor.setAttribute('content', t.bg);
    themeName.textContent = t.name;
    themeCount.textContent = pad2(THEMES.indexOf(t) + 1) + ' / ' + pad2(THEMES.length);
    var buttons = themeList.children;
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].dataset.id === t.id;
      buttons[i].setAttribute('aria-checked', on ? 'true' : 'false');
      buttons[i].tabIndex = on ? 0 : -1;
    }
  }

  function pickTheme(id, focus) {
    var t = THEMES.find(function (x) { return x.id === id; });
    if (!t) return;
    applyTheme(t);
    try { localStorage.setItem(THEME_KEY, t.id); } catch (e) {}
    if (focus) themeList.querySelector('[data-id="' + t.id + '"]').focus();
  }

  themeList.innerHTML = map(THEMES, function (t) {
    var vars = '--sw-bg:' + t.bg + ';--sw-ink:' + t.ink + (t.bar ? ';--sw-bar:' + t.bar : '');
    return (
      '<button type="button" class="swatch" role="radio" aria-checked="false" tabindex="-1"' +
      ' title="' + esc(t.name) + '" aria-label="' + esc(t.name) + '" data-id="' + esc(t.id) + '"' +
      ' style="' + esc(vars) + '"></button>'
    );
  });

  themeList.addEventListener('click', function (e) {
    var b = e.target.closest('.swatch');
    if (b) pickTheme(b.dataset.id);
  });

  // Arrow keys move through the swatches, as in any radio group.
  themeList.addEventListener('keydown', function (e) {
    var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    var i = Array.prototype.indexOf.call(themeList.children, document.activeElement);
    var n = (i + step + THEMES.length) % THEMES.length;
    pickTheme(THEMES[n].id, true);
  });

  // Collapsible panel; the page keeps enough bottom padding to scroll clear of it.
  var panel = themeList.parentNode;
  var toggle = document.getElementById('theme-toggle');
  var PANEL_KEY = 'blueprint-theme-panel';

  function setCollapsed(collapsed) {
    panel.classList.toggle('collapsed', collapsed);
    toggle.textContent = collapsed ? 'Show' : 'Hide';
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  }

  toggle.addEventListener('click', function () {
    var collapsed = !panel.classList.contains('collapsed');
    setCollapsed(collapsed);
    try { localStorage.setItem(PANEL_KEY, collapsed ? 'collapsed' : 'open'); } catch (e) {}
  });

  var panelState = null;
  try { panelState = localStorage.getItem(PANEL_KEY); } catch (e) {}
  setCollapsed(panelState === 'collapsed');

  function reservePanelSpace() {
    document.body.style.paddingBottom = Math.max(24, panel.offsetHeight + 32) + 'px';
  }
  if (window.ResizeObserver) new ResizeObserver(reservePanelSpace).observe(panel);
  reservePanelSpace();

  var saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(THEMES.find(function (x) { return x.id === saved; }) || THEMES[0]);

  window.addEventListener('hashchange', route);
  route();
})();
