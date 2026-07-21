import $ from "../vendors/jquery.js";
import { gsap, ScrollTrigger } from "../vendors/gsap.js";
import EventBus from "../utils/EventBus.js";

export default class Reveal {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.targets = this.$root.data("reveal") === "group" ? this.$root.children() : this.$root;
    this.options = {
      trigger: this.$root.data("trigger") || "scroll",
      y: 40,
      duration: 0.8,
      delay: Number(this.$root.data("delay")) || 0,
      ease: "power2.out",
      start: "top 75%",
      once: true,
      ...options
    };
    
    this.init();
  }

  init() {
    this.createAnimation();

    switch (this.options.trigger) {
      case "scroll":
        this.createScrollTrigger();
        break;

      case "load":
        EventBus.on(
          "transition:revealComplete.reveal",
          () => this.tl.play()
        );
        break;

      case "manual":
        break;
    }
  }

  createAnimation() {
    this.tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        EventBus.trigger("animation:revealComplete", [this.$root]);
      }
    });
    this.tl.from(this.targets, {
      y: this.options.y,
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.15,
      delay: this.options.delay,
      duration: this.options.duration,
      ease: this.options.ease,
    });
  }

  createScrollTrigger() {
    ScrollTrigger.create({
      trigger: this.$root,
      start: this.options.start,
      once: this.options.once,
      animation: this.tl
    });
  }

  destroy() {
    EventBus.off(".reveal");
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === this.$root[0]) {
        trigger.kill();
      }
    });
    this.tl?.kill();
  }
}