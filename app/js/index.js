//// ================================ Imports ======================================
//scss
// import 'bootstrap/dist/css/bootstrap-grid.css';
// import 'nouislider/dist/nouislider.css';
import '../scss/index.scss';

//js
// import $ from 'jquery';
import Swiper, { Autoplay, EffectCoverflow, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Fancybox, Carousel, Panzoom } from '@fancyapps/ui';
// import IMask from 'imask';
// import Choices from 'choices.js';
// import autoComplete from '@tarekraafat/autocomplete.js';
// import validate from 'validate.js';
// import ApexCharts from 'apexcharts';
// import { rippleEffect, Ripple } from 'data-ripple';
// import noUiSlider from 'nouislider';
// import Scrollbar from 'smooth-scrollbar';

//// ================================ Code ======================================

const principlesSwiper = document.querySelector('.principles__swiper').querySelector('.swiper');

new Swiper(principlesSwiper, {
  effect: 'coverflow',
  modules: [EffectCoverflow, Pagination, Autoplay],
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1.8,
  autoplay: {
    delay: 2000,
  },
  coverflowEffect: {
    rotate: 30,
    stretch: 20,
    scale: 0.5,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
});

const img = document.getElementById('img');

const maskWidth = 346;
const maskHeight = 346;

document.addEventListener('mousemove', (e) => {
  const x = e.pageX - maskWidth / 2;
  const y = e.pageY - maskHeight / 2;
  img.style.maskPosition = `${x}px ${y}px`;
});

const sentences = ['Строим бизнес-процессы', 'Автоматизируем каждый шаг', 'Не бросаем после внедрения'];

const typingElement = document.getElementById('typing');
let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentSentence = sentences[sentenceIndex];

  if (!isDeleting) {
    typingElement.textContent = currentSentence.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentSentence.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentSentence.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
    }
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

const nav = document.querySelector('.header__nav');
const progressBar = nav.querySelector('.header__progress-bar');
const navItems = nav.querySelectorAll('.header__nav-item');

const sections = Array.from(navItems).map((item) => {
  const selector = item.getAttribute('data-section');
  return document.querySelector(selector);
});

let lastScrollY = window.pageYOffset;

function checkVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY - 180 < window.scrollY;
  // return rect.top < window.innerHeight;
}

let active = 0;

function handleScroll() {
  const currentScrollY = window.pageYOffset;
  const scrollingDown = currentScrollY >= lastScrollY;

  sections.forEach((section, index) => {
    const isVisible = checkVisible(section);
    const navItem = navItems[index];
    if (scrollingDown && isVisible) {
      if (!section.classList.contains('element-show')) {
        active += (navItem.offsetWidth / nav.offsetWidth) * 100;
      }
      section.classList.add('element-show');
      navItem.classList.add('header__nav-item--active');
    } else if (!scrollingDown && !isVisible) {
      if (section.classList.contains('element-show')) {
        active -= (navItem.offsetWidth / nav.offsetWidth) * 100;
      }
      section.classList.remove('element-show');
      navItem.classList.remove('header__nav-item--active');
    }
  });


  if(active <= 10) {
    progressBar.style.width = 0 + '%';
  } else if (active > 94){
    progressBar.style.width = '100%';
  } else {
    progressBar.style.width = active + 2 + '%';
  }


  lastScrollY = currentScrollY;
}

window.onload = function () {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
};

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selector = item.getAttribute('data-section');
    const offsetTop = document.querySelector(selector).offsetTop;
    window.scrollTo({
      top: offsetTop - 150,
      behavior: 'smooth',
    });
  });
});
