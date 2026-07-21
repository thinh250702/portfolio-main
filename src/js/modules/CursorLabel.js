import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";
import EventBus from "../utils/EventBus.js";

export default class CursorLabel {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
        target: "[data-card-item]",
        cursor: ".cursor-label",
        offset: 8,
        duration: 0.3,
        ease: "power3.out",
        ...options
    };
    this.dom = {};

    EventBus.on("animation:revealComplete.cursor", (_, sender) => {
      if (sender.data('card-grid') !== undefined){
        this.init();
      }
    });
  }

  init() {
    this.cacheDOM();
    if (!this.dom.cursor.length) return;
    this.createQuickTo();
    this.createTimeline();
    this.bindEvents();
    
  }

  cacheDOM() {
    this.dom.cursor = $(this.options.cursor);
  }

  createQuickTo() {
    this.xTo = gsap.quickTo(this.dom.cursor, "x", { duration: this.options.duration, ease: this.options.ease });
    this.yTo = gsap.quickTo(this.dom.cursor, "y", { duration: this.options.duration, ease: this.options.ease });
  }

  createTimeline() {
    this.tl = gsap.timeline({ paused: true });
    this.tl.set(this.dom.cursor, { visibility: "visible" });
    this.tl.fromTo(this.dom.cursor,
      { opacity: 0, scale: .7 },
      { opacity: 1, scale: 1, duration: .25, ease: "back.out(2)"}
    );
    this.tl.eventCallback("onReverseComplete", () => {
      gsap.set(this.dom.cursor, { visibility: "hidden" });
    });
  }

  bindEvents() {
    this.$root
    .on("pointerover.cursor", this.options.target, () => {
      this.tl.play()
    })
    .on("pointermove.cursor", this.options.target, (e) => {
      this.xTo(e.clientX + this.options.offset);
      this.yTo(e.clientY + this.options.offset);
    })
    .on("pointerout.cursor", this.options.target, (e) => {
      if ($(e.currentTarget).has(e.relatedTarget).length) return;
      this.tl.reverse();
    })
  }

  destroy() {
    EventBus.off(".cursor");
    this.$root.off(".cursor");
    this.tl?.kill();
  }
}