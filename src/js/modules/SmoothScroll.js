import $ from "../vendors/jquery.js";
import { gsap, ScrollTrigger, ScrollSmoother } from "../vendors/gsap.js";

export default class SmoothScroll {
  constructor(options = {}) {
    this.options = {
      smooth: 1.2,
      effects: true,
      normalizeScroll: true,
      ...options
    };

    this.smoother = null;

    this.init();
  }

  init() {
    if (ScrollSmoother.get()) {
      ScrollSmoother.get().kill();
    }

    this.smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: this.options.smooth,
      effects: this.options.effects,
      normalizeScroll: this.options.normalizeScroll
    });
  }

  destroy() {
    this.smoother?.kill();
    this.smoother = null;
  }
}