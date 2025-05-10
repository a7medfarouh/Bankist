'use strict';

// DOM Elements
const DOM = {
  modal: document.querySelector('.modal'),
  overlay: document.querySelector('.overlay'),
  btnCloseModal: document.querySelector('.btn--close-modal'),
  btnsOpenModal: document.querySelectorAll('.btn--show-modal'),
  nav: document.querySelector('.nav'),
  section1: document.querySelector('#section--1'),
  header: document.querySelector('.header'),
  allSections: document.querySelectorAll('.section'),
  imgTargets: document.querySelectorAll('img[data-src]')
};

// Modal Window
const Modal = {
  open(e) {
    e.preventDefault();
    DOM.modal.classList.remove('hidden');
    DOM.overlay.classList.remove('hidden');
  },

  close() {
    DOM.modal.classList.add('hidden');
    DOM.overlay.classList.add('hidden');
  },

  init() {
    DOM.btnsOpenModal.forEach(btn => btn.addEventListener('click', this.open));
    DOM.btnCloseModal.addEventListener('click', this.close);
    DOM.overlay.addEventListener('click', this.close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !DOM.modal.classList.contains('hidden')) {
        this.close();
      }
    });
  }
};

// Smooth Scrolling
const SmoothScroll = {
  init() {
    // Button scrolling
    document.querySelector('.btn--scroll-to').addEventListener('click', 
      () => DOM.section1.scrollIntoView({ behavior: 'smooth' })
    );

    // Navigation scrolling
    document.querySelector('.nav__links').addEventListener('click', e => {
      if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
};

// Tabbed Component
const Tabs = {
  tabs: document.querySelectorAll('.operations__tab'),
  tabsContainer: document.querySelector('.operations__tab-container'),
  tabsContent: document.querySelectorAll('.operations__content'),

  init() {
    this.tabsContainer.addEventListener('click', e => {
      const clicked = e.target.closest('.operations__tab');
      if (!clicked) return;

      // Remove active classes
      this.tabs.forEach(t => t.classList.remove('operations__tab--active'));
      this.tabsContent.forEach(c => c.classList.remove('operations__content--active'));

      // Activate tab and content
      clicked.classList.add('operations__tab--active');
      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
    });
  }
};

// Navigation Animation
const NavAnimation = {
  handleHover(e, opacity) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  },

  init() {
    DOM.nav.addEventListener('mouseover', e => this.handleHover(e, 0.5));
    DOM.nav.addEventListener('mouseout', e => this.handleHover(e, 1));
  }
};

// Sticky Navigation
const StickyNav = {
  init() {
    const navHeight = DOM.nav.getBoundingClientRect().height;
    
    const stickyNav = entries => {
      const [entry] = entries;
      DOM.nav.classList.toggle('sticky', !entry.isIntersecting);
    };

    new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`
    }).observe(DOM.header);
  }
};

// Reveal Sections
const RevealSections = {
  init() {
    const revealSection = (entries, observer) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15
    });

    DOM.allSections.forEach(section => {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });
  }
};

// Lazy Loading Images
const LazyImages = {
  init() {
    const loadImg = (entries, observer) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img');
      });
      
      observer.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: '200px'
    });

    DOM.imgTargets.forEach(img => imgObserver.observe(img));
  }
};

// Slider
class Slider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.btnLeft = document.querySelector('.slider__btn--left');
    this.btnRight = document.querySelector('.slider__btn--right');
    this.dotContainer = document.querySelector('.dots');
    this.curSlide = 0;
    this.maxSlide = this.slides.length;

    this.init();
  }

  createDots() {
    this.slides.forEach((_, i) => {
      this.dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  activateDot(slide) {
    document.querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  goToSlide(slide) {
    this.slides.forEach((s, i) => 
      s.style.transform = `translateX(${100 * (i - slide)}%)`
    );
    this.activateDot(slide);
  }

  nextSlide() {
    this.curSlide = this.curSlide === this.maxSlide - 1 ? 0 : this.curSlide + 1;
    this.goToSlide(this.curSlide);
  }

  prevSlide() {
    this.curSlide = this.curSlide === 0 ? this.maxSlide - 1 : this.curSlide - 1;
    this.goToSlide(this.curSlide);
  }

  init() {
    this.createDots();
    this.goToSlide(0);
    
    // Event handlers
    this.btnRight.addEventListener('click', () => this.nextSlide());
    this.btnLeft.addEventListener('click', () => this.prevSlide());
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    this.dotContainer.addEventListener('click', e => {
      if (e.target.classList.contains('dots__dot')) {
        this.curSlide = Number(e.target.dataset.slide);
        this.goToSlide(this.curSlide);
      }
    });
  }
}

// Initialize all components
const init = () => {
  Modal.init();
  SmoothScroll.init();
  Tabs.init();
  NavAnimation.init();
  StickyNav.init();
  RevealSections.init();
  LazyImages.init();
  new Slider();
};

init();
