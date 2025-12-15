// Language Switcher
// This script handles the language switching functionality
// It sets the language based on user selection and stores it in localStorage

function setLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-en').forEach(el => el.style.display = (lang === 'en' ? '' : 'none'));
    document.querySelectorAll('.lang-fr').forEach(el => el.style.display = (lang === 'fr' ? '' : 'none'));
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}
document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
(function () {
    let lang = localStorage.getItem('lang') || 'en';
    setLang(lang);
})();


// Tabs System
// This script handles the tab switching functionality
// It adds event listeners to tab buttons and toggles active classes

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});