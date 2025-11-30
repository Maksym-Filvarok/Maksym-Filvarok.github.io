document.addEventListener('DOMContentLoaded', () => {
    // Елементи
    const elements = {
        header: document.getElementById('header'),
        target: document.getElementById('target'),
        scrollTopBtn: document.getElementById('scrollTopBtn'),
        splashVideo: document.getElementById('splash-video'),
        skipSplash: document.getElementById('skip-splash'),
        burgerMenu: document.getElementById('burgerMenu'),
        openIcon: document.getElementById('openIcon'),
        closeIcon: document.getElementById('closeIcon'),
        headerNav: document.getElementById('headerNav')
    };

    // Утиліти
    const utils = {
        escapeHtml: (str = '') => String(str).replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m])),
        
        renderStars: (rating) => {
            const full = Math.max(0, Math.min(5, Math.floor(Number(rating) || 0)));
            return '<svg class="star" viewBox="0 0 24 24" fill="#FFC107" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.56 1.344 7.86L12 18.896l-7.044 4.274L6.3 15.31 0.6 9.75l7.732-1.732z"/></svg>'.repeat(full);
        }
    };

    // Scroll handler
    let scrollTicking = false;
    const handleScroll = () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                
                // Header color change
                if (elements.header && elements.target) {
                    const shouldChange = scrollTop >= (elements.target.offsetTop - elements.header.offsetHeight);
                    elements.header.style.backgroundColor = shouldChange ? '#2b414f' : 'transparent';
                }
                
                // Scroll button visibility
                if (elements.scrollTopBtn) {
                    const isVisible = scrollTop > 300;
                    elements.scrollTopBtn.classList.toggle('visible', isVisible);
                    elements.scrollTopBtn.classList.toggle('pulse', isVisible);
                }
                
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    };

    // Splash screen
    const hideSplash = () => {
        document.body.classList.add('splash-hidden');
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            splash?.remove();
        }, 500);
    };

    // Burger menu
    const toggleBurgerMenu = () => {
        elements.openIcon?.classList.toggle('d-none');
        elements.closeIcon?.classList.toggle('d-none');
        elements.headerNav?.classList.toggle('header-nav__open');
    };

    // Data loading
    const loadData = async (url, renderFn, containerSelector) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            renderFn(data, containerSelector);
        } catch (error) {
            console.error(`Помилка завантаження ${url}:`, error);
            const container = document.querySelector(containerSelector);
            if (container) container.innerHTML = '<div class="error-message">Помилка завантаження даних</div>';
        }
    };

    // Render functions
    const renderDestinations = (destinations, selector) => {
        const container = document.querySelector(selector);
        if (!container) return;

        container.innerHTML = destinations.map(dest => `
            <article class="pd-item swiper-slide">
                <img class="pd-img" src="${dest.image}" alt="${utils.escapeHtml(dest.alt)}">
                <div class="pd-info">
                    <h3 class="pd-item-title">${utils.escapeHtml(dest.title)}</h3>
                    <p class="pd-item-location">📍 ${utils.escapeHtml(dest.location)}</p>
                </div>
            </article>
        `).join('');

        initializeSwiper();
    };

    const renderOffers = (offers, selector) => {
        const container = document.querySelector(selector);
        if (!container) return;

        container.innerHTML = offers.map(offer => `
            <article class="card" aria-roledescription="slide" aria-label="${utils.escapeHtml(offer.ariaLabel || offer.title)}">
                <img class="card__image" src="${offer.image}" alt="${utils.escapeHtml(offer.alt || '')}">
                <div class="card__body">
                    <h3 class="card__title">${utils.escapeHtml(offer.title)}</h3>
                    <div class="stars" aria-hidden="true">${utils.renderStars(offer.rating)}</div>
                    <p class="card__desc">${utils.escapeHtml(offer.description)}</p>
                    <div class="card__footer">
                        <div class="card__price">From <strong>€${utils.escapeHtml(String(offer.price))}</strong></div>
                    </div>
                    <div>
                        <a href="book.html" class="btn-details" aria-label="Details for ${utils.escapeHtml(offer.title)}">Details</a>
                    </div>
                </div>
            </article>
        `).join('');

        initializeOffersGallery();
    };

    // Initializers
    const initializeSwiper = () => {
        const swiper = document.querySelector('.pd-wrapper.swiper');
        if (!swiper) return;

        const gallery = swiper.closest('.pd-gallery');
        new Swiper(swiper, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            loop: false,
            grabCursor: true,
            watchOverflow: true,
            navigation: {
                prevEl: gallery?.querySelector('.gallery-prev'),
                nextEl: gallery?.querySelector('.gallery-next')
            }
        });
    };

      const initializeOffersGallery = () => {
          const wrapper = document.querySelector('.so-gallery .cards-wrapper') || document.getElementById('cardsWrapper');
          const prev = document.querySelector('.so-gallery .gallery-prev');
          const next = document.querySelector('.so-gallery .gallery-next');

          if (!wrapper) return;

          const scrollAmount = () => {
              const card = wrapper.querySelector('.card');
              return card ? card.offsetWidth + parseFloat(getComputedStyle(card).marginRight || 0) : wrapper.clientWidth * 0.8;
          };

          prev?.addEventListener('click', () => wrapper.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
          next?.addEventListener('click', () => wrapper.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
      };

      // Event listeners
      window.addEventListener('scroll', handleScroll);
      
      elements.scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      elements.splashVideo?.addEventListener('ended', hideSplash);
      elements.skipSplash?.addEventListener('click', hideSplash);
      elements.burgerMenu?.addEventListener('click', toggleBurgerMenu);

      // Auto-hide splash
      setTimeout(hideSplash, 15000);

      // Load data
      loadData('assets/data/destinations.json', renderDestinations, '#popularDestinationsSwiper .swiper-wrapper');
      loadData('assets/data/offers.json', renderOffers, '#cardsWrapper');

            // modal-single.js — мінімальний менеджер модалок: тільки 1 відкрито одночасно
      (function(){
        let current = null;
        let lastFocused = null;
        const focusSel = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

        const qs = (s, ctx=document) => ctx.querySelector(s);
        const qsa = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

        function openModal(idOrEl){
          const modal = typeof idOrEl === 'string' ? document.querySelector(`[data-modal="${idOrEl}"]`) : idOrEl;
          if(!modal) return;
          if(current === modal) return;
          if(current) closeModal(current);

          lastFocused = document.activeElement;
          modal.setAttribute('aria-hidden','false');
          modal.classList.add('is-open');
          document.body.style.overflow = 'hidden'; 
          current = modal;

          const dialog = qs('.modal__dialog', modal) || modal;
          dialog.setAttribute('tabindex','-1');
          dialog.focus({preventScroll:true});
        }

        function closeModal(idOrEl){
          const modal = typeof idOrEl === 'string' ? document.querySelector(`[data-modal="${idOrEl}"]`) : idOrEl;
          if(!modal) return;
          modal.classList.remove('is-open');
          modal.setAttribute('aria-hidden','true');
          if(current === modal) current = null;
          document.body.style.overflow = '';
          if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        }

        function handleDocClick(e){
          const opener = e.target.closest('[data-open-modal]');
          if(opener){
            e.preventDefault();
            openModal(opener.dataset.openModal);
            return;
          }

          if(e.target.closest('[data-modal-close]') || e.target.classList.contains('modal__overlay')){
            const m = e.target.closest('.modal');
            if(m) closeModal(m);
          }
        }

        function trapTab(e){
          if(!current || e.key !== 'Tab') return;
          const nodes = qsa(focusSel, current).filter(n => n.offsetParent !== null);
          if(!nodes.length) { e.preventDefault(); return; }
          const first = nodes[0], last = nodes[nodes.length -1];
          if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
          else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
        }

        function handleKey(e){
          if(!current) return;
          if(e.key === 'Escape') { closeModal(current); }
          else if(e.key === 'Tab'){ trapTab(e); }
        }

        document.addEventListener('click', handleDocClick);
        document.addEventListener('keydown', handleKey);

        window.openModal = openModal;
        window.closeModal = closeModal;
      })();

});