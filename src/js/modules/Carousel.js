import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";

export default class Carousel {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      autoplay: true,
      autoplayDelay: 3000,
      duration: .5,
      cloneCount: 3,
      ease: "power2.out",
      ...options
    };
    this.dom = {};
    this.state = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    if (!this.dom.track.length) return;
    this.cloneSlides();
    this.measure();
    this.createState();
    this.bindEvents();
    this.updatePosition();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  cacheDOM() {
    this.dom.track = this.$root.find(".carousel-track");
    this.dom.prev = this.$root.find(".carousel-btn-prev");
    this.dom.next = this.$root.find(".carousel-btn-next");
  }

  cloneSlides() {
    this.slideCount = this.dom.track.children().length;
    const $originalSlides = this.dom.track.children();

    this.dom.track.prepend(
      $originalSlides.slice(-this.options.cloneCount).clone()
    );
    this.dom.track.append(
      $originalSlides.slice(0, this.options.cloneCount).clone()
    );

    this.dom.slides = this.dom.track.children();
  }

  measure() {
    this.state.wrapperWidth = this.$root.width();
    this.state.slideWidth = this.dom.slides.eq(1).outerWidth();
    this.state.step = this.dom.slides.eq(1).outerWidth(true);
  }

  createState() {
    this.state.current = this.options.cloneCount;
    this.state.timer = null;
    this.state.isAnimating = false;
  }

  getX(index) {
    return (
        this.state.wrapperWidth / 2
        - this.state.slideWidth / 2
        - index * this.state.step
    );
  }

  updatePosition() {
    gsap.set(this.dom.track, { x: this.getX(this.state.current) });
  }

  moveTo(index) {
    if (this.state.isAnimating) return;
    this.state.isAnimating = true;
    this.state.current = index;

    gsap.to(this.dom.track, {
      x: this.getX(index),
      duration: this.options.duration,
      ease: this.options.ease,
      onComplete: () => {
        this.checkLoop();
        this.state.isAnimating = false;
      }
    });
  }

  next() {
    this.moveTo(this.state.current + 1);
  }

  prev() {
    this.moveTo(this.state.current - 1);
  }

  checkLoop() {
    if (this.state.current < this.options.cloneCount) {
      this.state.current += this.slideCount;
      gsap.set(this.dom.track, {
          x: this.getX(this.state.current)
      });
    }

    if (this.state.current >= this.slideCount + this.options.cloneCount) {
      this.state.current -= this.slideCount;
      gsap.set(this.dom.track, {
          x: this.getX(this.state.current)
      });
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.state.timer = setInterval(() => {
      this.next();
    }, this.options.autoplayDelay);
  }

  stopAutoplay() {
    clearInterval(this.state.timer);
  }

  bindEvents() {
    this.dom.next.on("click.carousel", () => this.next());
    this.dom.prev.on("click.carousel", () => this.prev());

    // this.$root
    // .on("mouseenter.carousel", () => {
    //   this.stopAutoplay();
    // })
    // .on("mouseleave.carousel", () => {
    //   if (this.options.autoplay) {
    //     this.startAutoplay();
    //   }
    // });

    $(window).on("resize.carousel", () => {
      this.measure();
      this.updatePosition();
    });
  }

  destroy() {
    this.stopAutoplay();
    this.dom.prev.off(".carousel");
    this.dom.next.off(".carousel");
    this.$root.off(".carousel");
    $(window).off(".carousel");
  }
}