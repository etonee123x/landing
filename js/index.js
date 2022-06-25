const init = () => {
  console.log('inited!');
  const FOOTER_DESCRIPTIONS = [
    'Как это работает?',
    'Архитектура',
    'ИЖС Стандарт',
    'Удобство',
    'Программа лояльности',
    'Детали',
    'Скачать приложение',
  ];

  const menuDots = document.querySelectorAll('.dots-navigation__dot-wrapper');
  const contentPages = document.querySelectorAll('.page__content');
  const pageNumber = document.getElementById('page-number');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const footerDescription = document.getElementById('footer-description');

  const page5Tabs = document.querySelectorAll('.page-5__tab');
  const page5LeftArrows = document.querySelectorAll('.page-5__arrow-left');
  const page5RightArrows = document.querySelectorAll('.page-5__arrow-right');

  const page2CardsContent = document.querySelector('.page-2__cards-content');

  let currentPage = 1;
  let page5ActiveTab = 1;

  const changePage = (number) => {
    if (number === currentPage) return;

    const isFirstPage = number === 1;
    const isLastPage = number === contentPages.length;

    footer.style.display = 'flex';
    if (isFirstPage || isLastPage) {
      header.classList.add('header_logo-only');
      if (isLastPage) {
        footer.style.display = 'none';
      }
    } else {
      header.classList.remove('header_logo-only');
    }
    if (!isLastPage) {
      footerDescription.innerText = FOOTER_DESCRIPTIONS[number - 1];
    }
    menuDots.forEach((dot) => dot.classList.remove('dots-navigation__dot-wrapper_active'));
    menuDots[number - 1].classList.add('dots-navigation__dot-wrapper_active');
    pageNumber.innerText = `${number < 10 ? '0' : ''}${number}`;
    contentPages.forEach((page) => {
      page.style.display = 'none';
    });
    contentPages[number - 1].style.display = 'flex';
    currentPage = number;
  };

  const prevTab = () => {
    page5Tabs.forEach((tab) => {
      tab.style.display = 'none';
    });
    page5ActiveTab = ((page5ActiveTab + 1) % 3) + 1;
    page5Tabs[page5ActiveTab - 1].style.display = 'block';
  };

  const nextTab = () => {
    page5Tabs.forEach((tab) => {
      tab.style.display = 'none';
    });
    page5ActiveTab = (page5ActiveTab % 3) + 1;
    page5Tabs[page5ActiveTab - 1].style.display = 'block';
  };

  const onWheel = (e) => {
    const path = e.path ?? e.composedPath;
    if (!path) return;
    path.find((el) => el.classList.contains('page-2__cards-content')).scrollLeft += e.deltaY;
  };

  let touchStartY;
  let deltaMouseScroll = 0;

  const onTouchStart = (event) => {
    touchStartY = event.touches[0].screenY;
  };

  const onGlobalTouchMove = (event) => {
    const SCROLL_THRESHOLD = window.innerHeight / contentPages.length;

    const currentY = event.touches[0].screenY;
    const delta = currentY - touchStartY;
    const absDelta = Math.abs(delta);

    if (absDelta > SCROLL_THRESHOLD) {
      touchStartY = currentY;
      if (delta > 0) {
        if (currentPage > 1) changePage(currentPage - 1);
      } else {
        if (currentPage < contentPages.length) changePage(currentPage + 1);
      }
    }
  };

  const onGlobalWheel = (event) => {
    const THRESHOLD = 1;
    let delta = event.deltaY;
    if (delta > 100) delta = 100;
    if (delta < -100) delta = -100;
    deltaMouseScroll += delta / 100;
    if (deltaMouseScroll > THRESHOLD) {
      deltaMouseScroll = 0;
      if (currentPage < contentPages.length) changePage(currentPage + 1);
    } else if (deltaMouseScroll < -THRESHOLD) {
      deltaMouseScroll = 0;
      if (currentPage > 1) changePage(currentPage - 1);
    }
  };

  changePage(currentPage);
  footer.addEventListener('click', () => changePage(currentPage + 1));

  menuDots.forEach((dot, idx) => dot.addEventListener('click', () => changePage(idx + 1)));
  page5LeftArrows.forEach((arrow) => arrow.addEventListener('click', prevTab));
  page5RightArrows.forEach((arrow) => arrow.addEventListener('click', nextTab));

  page2CardsContent.addEventListener('mousewheel', onWheel);
  window.addEventListener('wheel', onGlobalWheel);
  window.addEventListener('touchmove', onGlobalTouchMove);
  window.addEventListener('touchstart', onTouchStart);
};

window.onload = init;
