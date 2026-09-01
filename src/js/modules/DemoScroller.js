import $ from "../vendors/jquery.js";
import { gsap, ScrollSmoother } from "../vendors/gsap.js";

export default class DemoScroller {
  constructor(options = {}) {
    this.options = {
      ...options,
    };

    this.dom = {};
    this.state = {
      currentIndex: 0,
      isScrolling: false,
    };
    this.smoother = ScrollSmoother.get();

    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.sections = $("[data-demo]")
    console.log(this.dom.sections)
  }

  bindEvents() {
    $(window).on(
      "keydown.demo",
      (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.onNextClick();
        }
      }
    );
  }

  onNextClick() {
    if (this.state.isScrolling) return;

    this.scrollToNext();
  }

  scrollToNext() {
    const nextIndex = this.state.currentIndex + 1;

    if (nextIndex >= this.dom.sections.length) return;

    const section = this.dom.sections[nextIndex];

    if (!section) return;

    this.state.isScrolling = true;
    this.state.currentIndex = nextIndex;

    gsap.to(this.smoother, {
      scrollTop: this.smoother.offset(section, $(section).data("position") || ""), 
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        this.state.isScrolling = false;
      },
    });
  }

  destroy() {

  }
}