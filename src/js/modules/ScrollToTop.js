import $ from "../vendors/jquery.js";
import { gsap, ScrollSmoother } from "../vendors/gsap.js";

export default class ScrollToTop {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      ...options
    };

    this.smoother = ScrollSmoother.get();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.$root.on("click.scrollTop", this.onClick.bind(this));
  }

  onClick(e) {
    e.preventDefault();

    this.smoother.scrollTo(0, true);
  }

  destroy() {
    this.$root.off(".scrollTop");
    gsap.killTweensOf(this.$root);
  }
}