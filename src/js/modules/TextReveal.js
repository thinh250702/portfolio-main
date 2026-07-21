import $ from "../vendors/jquery.js";
import { gsap, ScrollTrigger, SplitText } from "../vendors/gsap.js";
import EventBus from "../utils/EventBus.js";

export default class TextReveal {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      trigger: this.$root.data("trigger") || "scroll",
      type: this.$root.data("split") || "words",
      duration: 0.8,
      delay: Number(this.$root.data("delay")) || 0,
      stagger: 0.08,
      yPercent: 100,
      ease: "power3.out",
      start: "top 75%",
      once: true,
      ...options
    };
    this.dom = {};
    this.state = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    this.createSplitText();
    this.createTimeline();

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

  cacheDOM() {
    this.dom.text = this.$root[0];
  }

  createSplitText() {
    this.state.split = SplitText.create(this.dom.text, {
      type: this.options.type,
      mask: this.options.type
    });
  }

  createTimeline() {
    this.tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.state.split.revert()
        if (this.$root.hasClass('display-lg')){
          gsap.to(this.$root, {skewX: -14, duration: 0.5, ease: "power2.out"})
        }
      }
    });
    this.tl.from(this.state.split[this.options.type], {
      yPercent: this.options.yPercent,
      duration: this.options.duration,
      delay: this.options.delay,
      stagger: this.options.stagger,
      ease: this.options.ease
    });
  }

  createScrollTrigger() {
    ScrollTrigger.create({
      trigger: this.dom.text,
      start: this.options.start,
      once: this.options.once,
      animation: this.tl
    });
  }

  destroy() {
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === this.$root[0]) {
        trigger.kill();
      }
    });
    this.state.split?.revert();
    this.tl?.kill();
  }
}