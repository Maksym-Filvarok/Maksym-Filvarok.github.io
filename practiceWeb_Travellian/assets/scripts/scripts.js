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

  wrapper.style.touchAction = 'pan-y';

  let isDown = false;
  let startX = 0;
  let startTranslate = 0;
  let pointerId = null;
  let startTime = 0;

  const getCurrentTranslate = () => -current * slideW;

  function onStart(clientX, id) {
    isDown = true;
    pointerId = id ?? null;
    startX = clientX;
    startTranslate = getCurrentTranslate();
    startTime = Date.now();
    wrapper.style.transition = 'none';
  }

  function onMove(clientX) {
    if (!isDown) return;
    const dx = clientX - startX;
    wrapper.style.transform = `translateX(${startTranslate + dx}px)`;
  }

  function onEnd(clientX) {
    if (!isDown) return;
    isDown = false;
    const dx = clientX - startX;
    const dt = Date.now() - startTime;
    const threshold = Math.min(slideW * 0.2, 80);

    if (Math.abs(dx) > threshold || (Math.abs(dx) > 20 && dt < 250)) {
      if (dx < 0) {
        current = Math.min(current + 1, items.length - 1);
      } else {
        current = Math.max(current - 1, 0);
      }
    }
    wrapper.style.transition = 'transform 0.45s cubic-bezier(.22,.9,.33,1)';
    update();
  }

  // Touch events
  wrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    onStart(e.touches[0].clientX);
  }, {passive: true});

  wrapper.addEventListener('touchmove', (e) => {
    if (!isDown || e.touches.length > 1) return;

    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startX);
  
    if (dx > 8) e.preventDefault();
    onMove(touch.clientX);
  }, {passive: false});

  wrapper.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    onEnd(touch.clientX);
  });

  wrapper.addEventListener('pointerdown', (e) => {

    if (e.pointerType === 'mouse' && e.button !== 0) return;
    wrapper.setPointerCapture(e.pointerId);
    onStart(e.clientX, e.pointerId);
  });

  wrapper.addEventListener('pointermove', (e) => {
    if (!isDown || (pointerId !== null && e.pointerId !== pointerId)) return;
    onMove(e.clientX);
  });

  function pointerUpHandler(e) {
    if (pointerId !== null && e.pointerId !== pointerId) return;
    try { wrapper.releasePointerCapture(e.pointerId); } catch (err) {}
    onEnd(e.clientX);
    pointerId = null;
  }
  wrapper.addEventListener('pointerup', pointerUpHandler);
  wrapper.addEventListener('pointercancel', pointerUpHandler);

}

function enableDragToScroll(wrapper) {
  if (!wrapper) return;
  wrapper.style.touchAction = 'pan-y'; 
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let pointerId = null;

  wrapper.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDown = true;
    pointerId = e.pointerId;
    wrapper.setPointerCapture(pointerId);
    startX = e.clientX;
    scrollLeft = wrapper.scrollLeft;
    wrapper.classList.add('is-dragging'); 
  });

  wrapper.addEventListener('pointermove', (e) => {
    if (!isDown || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    wrapper.scrollLeft = scrollLeft - dx;
  });

  function up(e) {
    if (!isDown || e.pointerId !== pointerId) return;
    isDown = false;
    try { wrapper.releasePointerCapture(e.pointerId); } catch (err) {}
    pointerId = null;
    wrapper.classList.remove('is-dragging');
  }
  wrapper.addEventListener('pointerup', up);
  wrapper.addEventListener('pointercancel', up);
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

  enableDragToScroll(wrapper);
});

/* Ініціалізація */
initGallery('.pd-gallery', '.pd-wrapper', '.pd-item');
initGallery('.so-gallery', '.cards-wrapper', '.card');
initGallery('.tp-gallery', '.tp-wrapper', '.tp-card');
initGallery('.user-gallery', '.user-cards-wrapper', '.card-user');

});
