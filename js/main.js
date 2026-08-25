const trialContent = document.querySelector('.trial-content');
const quickWrap = document.querySelector('.quick-wrap');

const sections = document.querySelectorAll(
  '.trial-content > .experience'
);

const quickItems = document.querySelectorAll(
  '.quick-menu__item'
);

const topButton = document.querySelector('.quick-top');

const firstExperience = sections[0];


// ------------------------------
// Active Menu
// ------------------------------

const setActiveMenu = (id) => {
  quickItems.forEach((item) => {
    item.classList.toggle(
      'is-active',
      item.dataset.target === id
    );
  });
};


// ------------------------------
// Quick Menu Show / Hide
// ------------------------------

const updateQuickMenu = () => {
  if (!firstExperience || !quickWrap) return;

  const rect =
    firstExperience.getBoundingClientRect();

  const showPoint =
    window.innerHeight * 0.7;

  quickWrap.classList.toggle(
    'is-visible',
    rect.top <= showPoint
  );
};


if (trialContent && quickWrap) {

  window.addEventListener(
    'scroll',
    updateQuickMenu,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateQuickMenu
  );

  updateQuickMenu();


  // ------------------------------
  // Scroll Active
  // ------------------------------

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        setActiveMenu(entry.target.id);
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  // ------------------------------
  // Quick Menu Click
  // ------------------------------

  quickItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const targetId = item.dataset.target;
      const target =
        document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      setActiveMenu(targetId);

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });


  // ------------------------------
  // Top Button
  // ------------------------------

  topButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}