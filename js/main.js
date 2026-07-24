// === Language Switcher ===
function setLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = (lang === 'en' ? '' : 'none');
    });
    document.querySelectorAll('.lang-fr').forEach(el => {
        el.style.display = (lang === 'fr' ? '' : 'none');
    });
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// Initialize language switcher
document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Set initial language
(function initLang() {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);
})();


// === Theme Switcher ===
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update active state on buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

// Initialize theme switcher
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

// Set initial theme
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'cafe';
    setTheme(savedTheme);
})();


// === Section Navigation ===
function showSection(sectionId) {
    // Update nav tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.section === sectionId);
    });

    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        const isActive = section.id === sectionId;
        section.classList.toggle('active', isActive);

        // Re-trigger animation on activation
        if (isActive) {
            section.style.animation = 'none';
            section.offsetHeight; // Trigger reflow
            section.style.animation = '';
        }
    });

    // Save to localStorage
    localStorage.setItem('activeSection', sectionId);

    // Scroll to top of content area
    document.querySelector('.content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize section navigation
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        showSection(tab.dataset.section);
    });
});

// Restore last active section or default to 'about'
(function initSection() {
    const savedSection = localStorage.getItem('activeSection') || 'about';
    showSection(savedSection);
})();


// === Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    // Only handle if not in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const sections = ['about', 'projects', 'certifications', 'career'];
    const currentIndex = sections.findIndex(s =>
        document.getElementById(s)?.classList.contains('active')
    );

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        showSection(sections[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        showSection(sections[prevIndex]);
    }

    // Number keys 1-4 for quick section access
    const numKey = parseInt(e.key);
    if (numKey >= 1 && numKey <= sections.length) {
        showSection(sections[numKey - 1]);
    }
});


// === Prefers reduced motion ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-normal', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    } else {
        document.documentElement.style.removeProperty('--transition-fast');
        document.documentElement.style.removeProperty('--transition-normal');
        document.documentElement.style.removeProperty('--transition-slow');
    }
});
