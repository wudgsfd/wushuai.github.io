/* 吴帅 · 个人主页 / 博客 —— 交互脚本（原生 JS，无依赖） */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 主题 ---------- */
  var themeBtn = document.getElementById('themeBtn');
  var themeIcon = document.getElementById('themeIcon');
  var ICON_SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var ICON_MOON = '<path d="M20 13.5A8.5 8.5 0 0 1 10.5 4a8.5 8.5 0 1 0 9.5 9.5z"/>';

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeIcon) { themeIcon.innerHTML = t === 'dark' ? ICON_MOON : ICON_SUN; }
    if (themeBtn) { themeBtn.setAttribute('aria-label', t === 'dark' ? '切换浅色模式' : '切换深色模式'); }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { meta.setAttribute('content', t === 'dark' ? '#0e1420' : '#fbf8f3'); }
  }

  if (themeBtn) {
    applyTheme(root.getAttribute('data-theme') || 'light');
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('wu-theme', next); } catch (e) {}
    });
  }

  /* ---------- 滚动：顶栏阴影 / 进度 / 回到顶部 ---------- */
  var topbar = document.getElementById('topbar');
  var progress = document.getElementById('progress');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (topbar) { topbar.classList.toggle('scrolled', y > 8); }
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(y / h, 1) * 100 : 0) + '%';
    }
    if (toTop) { toTop.classList.toggle('show', y > 600); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 移动端抽屉 ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var drawer = document.getElementById('drawer');
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* ---------- 滚动入场 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
    /* 兜底：若观察器未生效，2.6s 后全部显示 */
    setTimeout(function () {
      if (!document.querySelector('.reveal.in')) {
        revealEls.forEach(function (el) { el.classList.add('in'); });
      }
    }, 2600);
  }

  /* ---------- 导航高亮（仅首页有对应区块时生效） ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[data-section]'));
  var allNavLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var sections = navLinks.map(function (a) {
      return document.getElementById(a.getAttribute('data-section'));
    }).filter(Boolean);
    if (sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) { return; }
          allNavLinks.forEach(function (l) { l.classList.remove('active'); });
          var idx = sections.indexOf(en.target);
          if (idx > -1 && navLinks[idx]) { navLinks[idx].classList.add('active'); }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- 复制邮箱 ---------- */
  var copyBtn = document.getElementById('copyBtn');
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) { return; }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var el = document.getElementById('emailText');
      if (!el) { return; }
      var text = el.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          showToast('邮箱已复制');
        }, function () {
          showToast(text);
        });
      } else {
        showToast(text);
      }
    });
  }

  /* ---------- 年份 ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
