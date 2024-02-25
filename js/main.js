"use strict"
//------------------------------------------------------------------------Меню-Бургер

const burgerMenu = document.querySelector('.header__burger');
const menuBody= document.querySelector('.menu');
if(burgerMenu) {
    burgerMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      burgerMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    });
}
let buttons = document.querySelectorAll('.menu__link');
buttons.forEach((elem)=>{
  elem.addEventListener('click',()=>{
    menuBody.classList.remove('_active');
    burgerMenu.classList.remove('_active');
  })
})

//------------------------------------------------------------------------search

const clickSearch = document.querySelector(".popup__input");
const btnSearch = document.querySelector(".popup__button");
clickSearch.addEventListener("click", function(e) {
    btnSearch.classList.add('active');
});

//------------------------------------------------------------------------search


//------------------------------------------------------------------------ выпадающий список над товарами 
const titles = document.querySelectorAll('.accordion__title');
const contents = document.querySelectorAll('.accordion__content');

titles.forEach(item => item.addEventListener('click', () => {
    const activeContent = document.querySelector('#' + item.dataset.tab);

    if (activeContent.classList.contains('active-accordion')) {
        activeContent.classList.remove('active-accordion');
        item.classList.remove('active-accordion');
        activeContent.style.maxHeight = 0;
    } else {
      contents.forEach(element => {
        element.classList.remove('active-accordion');
        element.style.maxHeight = 0;
      });
      titles.forEach(element => element.classList.remove('active-accordion'));

      item.classList.add('active-accordion');
      activeContent.classList.add('active-accordion');
      activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
    }
}));

//----------------------------------------------------------------------- выпадающий список над товарами 


//------------------------------------------------------------------------Слайдеры
$('.brands__slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  autoplay:true,
  autoplaySpeed: 3000,
  speed: 2000,
});

$('.recommend__slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: false,
  arrows: true,
  speed: 2000,
  prevArrow:'<button class="recommend__arrow recommend__arrow-left" type="button"><img src="images/arrow-left.svg" alt="arrow"></button>',
  nextArrow:'<button class="recommend__arrow recommend__arrow-right" type="button"><img src="images/arrow-right.svg" alt="arrow"></button>',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerPadding: '40px',
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});

$('.bestsellers__slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  speed: 2000,
});
//------------------------------------------------------------------------Слайдеры


//------------------------------------------------------------------------popup
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");


let unlock = true;

const timeout = 800;
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    })
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock () {
  setTimeout(function () {
    if(lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
  }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

//------------------------------------------------------------------------popup


//------------------------------------------------------------------------dropdown который в футере
document.querySelectorAll('.dropdown').forEach(function(dropDownWrapper) {

  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
  const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
  
  //клик по кнопки. открыть/закрыть
  dropDownBtn.addEventListener('click', function () {
    dropDownList.classList.toggle('dropdown__list--active');
    this.classList.add('dropdown__button--active');
  });
  //выбор элемента списка, запомнить выбранное значение, закрыть дропдаун
  dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerText = this.innerText;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__list--active');
      })
  });
  //клик снаружи дропдауна, закрываем его
  document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
      dropDownList.classList.remove('dropdown__list--active');
      dropDownBtn.classList.remove('dropdown__button--active');
    }
  })
  
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownList.classList.remove('dropdown__list--active');
      dropDownBtn.classList.remove('dropdown__button--active');
    }
  })
});
//------------------------------------------------------------------------dropdown который в футере
//------------------------------------------------------------------------Tabs Учетная запись
const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
const tabsItem = document.querySelectorAll('.tabs__item');

tabsBtn.forEach((tabs, index) => {
  tabs.addEventListener('click', () => {
    tabsBtn.forEach(tabs => {tabs.classList.remove('active__tab')});
    tabs.classList.add('active__tab');
    
    tabsItem.forEach(content => {content.classList.remove('active__tab')})
    tabsItem[index].classList.add('active__tab');
  });
});
//------------------------------------------------------------------------Tabs Учетная запись


//------------------------------------------------------------------------Tabs Мои заказы
const tabsButton = document.querySelectorAll('.tabs-button');
const tabsContent = document.querySelectorAll('.tabs-content');

tabsButton.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabsButton.forEach(tab => {tab.classList.remove('active-tab')});
    tab.classList.add('active-tab');
    
    tabsContent.forEach(content => {content.classList.remove('active-tab')})
    tabsContent[index].classList.add('active-tab');
  });
});
//------------------------------------------------------------------------Tabs Мои заказы

//------------------------------------------------------------------------Счетчик количества товаров
const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

window.addEventListener('click', function (event) {
    //Объявляем переменную для счетчика
    let counter;
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        counter = counterWrapper.querySelector('[data-counter]');
    }

    //Проверяем является ли элемент кнопкой Плюс 
    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }
   //Проверяем является ли элемент кнопкой Минус
    if (event.target.dataset.action === 'minus') {
        //Проверяем чтобы счетчик был больше 1
        if (parseInt(counter.innerText) > 1) {
            //Изменяем текст в счетчике изменяя его на 1
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
            event.target.closest('.cart-item').remove();
        }
      }
});
//------------------------------------------------------------------------Счетчик количества товаров

//------------------------------------------------------------------------динамика на ползунок

const squareRange = document.querySelector('#square-range');
const squareInput = document.querySelector('#square-input');

squareRange.addEventListener('input', function () {
  squareInput.value = squareRange.value
  
});
squareInput.addEventListener('input', function () {
  squareRange.value = squareInput.value
});
//------------------------------------------------------------------------динамика на ползунок


