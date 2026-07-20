import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";

export default class Marquee {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      speed: 80,
      cloneCount: Number(this.$root.data("marquee-clone")) || 1,
      pauseOnHover: true,
      ...options
    };
    this.dom = {};
    this.state = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    this.cloneItems();
    this.createAnimation();
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.track = this.$root.find("[data-marquee-track]");
  }

  cloneItems() {
    const $original = this.dom.track.children().clone();
    for (let i = 0; i < this.options.cloneCount; i++) {
      $original.clone().appendTo(this.dom.track);
    }
  }

  createAnimation() {
    const distance = this.dom.track[0].scrollWidth / 2;
    const duration = distance / this.options.speed;

    this.tl = gsap.to(this.dom.track, { x: -distance, duration, ease: "none", repeat: -1 });
    // Jump back seamlessly every loop
    this.tl.eventCallback("onRepeat", () => {
      gsap.set(this.dom.track, { x: 0 });
    });
  }

  bindEvents() {
    if (!this.options.pauseOnHover) return;

    this.$root
    .on("mouseenter.marquee", () => {
      this.tl.pause();
    })

    .on("mouseleave.marquee", () => {
      this.tl.resume();
    });
  }

  destroy() {
    this.$root.off(".marquee");
    this.tl?.kill();
  }
}