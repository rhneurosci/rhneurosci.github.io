/**
 * RH Brain Lab - Core Logic
 * Language switching + Active nav + Back-to-top
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'zh-CN';
  var LANG_KEY = 'preferred-lang';

  function setLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(LANG_KEY, lang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function initLang() {
    var saved = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    setLang(saved);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });
  }

  function initActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '<polyline points="6 14 12 8 18 14"></polyline>' +
      '</svg>' +
      '<span class="back-to-top-label">' +
        '<span class="lang zh-cn">返回顶部</span>' +
        '<span class="lang zh-tw">返回頂部</span>' +
        '<span class="lang en">Top</span>' +
      '</span>';
    document.body.appendChild(btn);

    function toggleVisibility() {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLang();
    initActiveNav();
    initBackToTop();
  });
})();
