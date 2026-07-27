import $ from "../vendors/jquery.js";
import { gsap, ScrollTrigger } from "../vendors/gsap.js";

export default class ZoomTransition {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      scale: 13,
      ease: "power2.out",
      scrub: 0.5,
      start: "top 50%",
      end: "bottom 50%",
      ...options
    };
    this.dom = {};
    this.tl = null;
    this.scrollTrigger = null;

    this.init();
  }

  init() {
    this.cacheDOM();
    this.createTimeline();
    this.createScrollTrigger();
  }

  cacheDOM() {
    this.dom.item = this.$root.find("[data-zoom-item]");
  }

  createTimeline() {
    this.tl = gsap.timeline({ paused: true });
    this.tl.fromTo(this.dom.item, { scale: 0 }, { scale: this.options.scale, ease: this.options.ease });
  }

  createScrollTrigger() {
    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.$root,
      start: this.options.start,
      end: this.options.end,
      scrub: this.options.scrub,
      invalidateOnRefresh: true,
      animation: this.tl,
    });
  }

  destroy() {
    this.scrollTrigger?.kill();
    this.tl?.kill();

    gsap.killTweensOf(this.dom.item);

    gsap.set(this.dom.item, {
      clearProps: "transform"
    });

    this.scrollTrigger = null;
    this.tl = null;
  }
}