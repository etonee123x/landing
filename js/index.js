const init = () => {
  console.log('inited!');
  const menuDots = document.querySelectorAll('.dot-wrapper');
  const contentPages = document.querySelectorAll('.page__content');
  const pageNumber = document.getElementById('page-number');
  const iconNextPage = document.getElementById('icon-next-page');

  const page5Tabs = document.querySelectorAll('.page-5__tab');
  const page5LeftArrows = document.querySelectorAll('.page-5__arrow-left');
  const page5RightArrows = document.querySelectorAll('.page-5__arrow-right');

  const page2CardsContent = document.querySelector('.page-2__cards-content');

  let currentPage = 1;
  let page5ActiveTab = 1;

  const changePage = (number) => {
    menuDots.forEach((dot) => dot.classList.remove('dot-wrapper_active'));
    menuDots[number - 1].classList.add('dot-wrapper_active');
    pageNumber.innerText = `${number < 10 ? '0' : ''}${number}`;
    contentPages.forEach((page) => {
      page.style.display = 'none';
    });
    contentPages[number - 1].style.display = 'flex';
    currentPage = number;
    if (number === contentPages.length) {
      iconNextPage.style.display = 'none';
    } else {
      iconNextPage.style.display = 'block';
    }
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

  changePage(currentPage);
  iconNextPage.addEventListener('click', () => changePage(currentPage + 1));

  menuDots.forEach((dot, idx) => dot.addEventListener('click', () => changePage(idx + 1)));
  page5LeftArrows.forEach((arrow) => arrow.addEventListener('click', prevTab));
  page5RightArrows.forEach((arrow) => arrow.addEventListener('click', nextTab));

  page2CardsContent.addEventListener('mousewheel', onWheel);
};

window.onload = init;
