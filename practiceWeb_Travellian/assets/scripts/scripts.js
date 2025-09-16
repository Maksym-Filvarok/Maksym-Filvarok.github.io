document.addEventListener('DOMContentLoaded', () => {

  /* BURGER */
  const burgerMenu = document.getElementById('burgerMenu');
  if (burgerMenu) {
    const openIcon = document.getElementById('openIcon');
    const closeIcon = document.getElementById('closeIcon');
    const headerNav = document.getElementById('headerNav');
    burgerMenu.addEventListener('click', () => {
      if (openIcon) openIcon.classList.toggle('d-none');
      if (closeIcon) closeIcon.classList.toggle('d-none');
      if (headerNav) headerNav.classList.toggle('header-nav__open');
    });
  }

/* слайдер */
function initGallery(sectionSelector, wrapperSelector, itemSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const gallery = section;
  const wrapper = section.querySelector(wrapperSelector);
  const items = section.querySelectorAll(itemSelector);
  const prevBtn = section.querySelector('.gallery-prev');
  const nextBtn = section.querySelector('.gallery-next');

  if (!gallery || !wrapper || items.length === 0) return;

  let current = 0;
  let slideW = gallery.clientWidth;

  function update() {
    slideW = gallery.clientWidth;
    wrapper.style.transition = 'transform 0.45s cubic-bezier(.22,.9,.33,1)';
    wrapper.style.transform = `translateX(-${current * slideW}px)`;
  }

  update();

  if (nextBtn) nextBtn.addEventListener('click', () => {
    current = (current + 1) % items.length;
    update();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    current = (current - 1 + items.length) % items.length;
    update();
  });

  window.addEventListener('resize', () => {
    wrapper.style.transition = 'none';
    requestAnimationFrame(update);
  });
}

document.querySelectorAll('.tp-section').forEach(section => {
  const wrapper = section.querySelector('.tp-wrapper');
  const items = section.querySelectorAll('.tp-card');
  const prevBtn = section.querySelector('.tp-gallery-prev');
  const nextBtn = section.querySelector('.tp-gallery-next');

  if (!wrapper || items.length === 0) return;

  const getGap = () => {
    const g = getComputedStyle(wrapper).gap;
    return g ? parseFloat(g) : 0;
  };

  const getStep = () => {
    const first = items[0];
    const rect = first.getBoundingClientRect();
    const w = rect.width || wrapper.clientWidth;
    return w + getGap();
  };

  const scrollByStep = (delta = 1) => {
    const step = getStep();
    wrapper.scrollBy({ left: delta * step, behavior: 'smooth' });
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollByStep(-1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollByStep(1);
    });
  }

});

/* Ініціалізація */
initGallery('.pd-gallery', '.pd-wrapper', '.pd-item');
initGallery('.so-gallery', '.cards-wrapper', '.card');
initGallery('.tp-gallery', '.tp-wrapper', '.tp-card');
initGallery('.user-gallery', '.user-cards-wrapper', '.card-user');

});