
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        this.loadLanguagePreference();
        
        this.setupEventListeners();
        
        this.applyTranslations(this.currentLang);
    }

    loadLanguagePreference() {
        const savedLang = localStorage.getItem('travellian-language');
        if (savedLang && translations[savedLang]) {
            this.currentLang = savedLang;
        } else {
            const browserLang = navigator.language.split('-')[0];
            if (translations[browserLang]) {
                this.currentLang = browserLang;
            }
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        this.updateLanguageButtons();
    }

    switchLanguage(lang) {
        if (!translations[lang]) {
            console.warn(`Language ${lang} not found`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('travellian-language', lang);

        document.documentElement.lang = lang;

        this.applyTranslations(lang);

        this.updateLanguageButtons();

        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    applyTranslations(lang) {
        const translationSet = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translationSet[key]) {
                element.textContent = translationSet[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translationSet[key]) {
                element.setAttribute('placeholder', translationSet[key]);
            }
        });

        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (translationSet[key]) {
                element.setAttribute('title', translationSet[key]);
            }
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria-label');
            if (translationSet[key]) {
                element.setAttribute('aria-label', translationSet[key]);
            }
        });
    }

    updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    translate(key, fallback = '') {
        return translations[this.currentLang]?.[key] || fallback || key;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.languageSwitcher = new LanguageSwitcher();
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}