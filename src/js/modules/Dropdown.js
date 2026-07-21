import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";

export default class Dropdown {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
        duration: 0.25,
        ease: "power2.out",
        closeDelay: 80,
        y: -12,
        ...options
    };
    this.dom = {};
    this.state = {};
    this.init();
  }

  init() {
    this.cacheDOM();
    this.createState();
    this.createTimeline();
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.menu = this.$root.find("[data-dropdown-menu]");
  }

  createState() {
    this.state.closeTimer = null;
  }

  createTimeline() {
    this.tl = gsap.timeline({ paused: true });
    this.tl.set(this.dom.menu, { visibility: "visible", pointerEvents: "auto" });
    this.tl.fromTo(this.dom.menu, { opacity: 0, y: this.options.y }, { opacity: 1, y: 0, duration: this.options.duration, ease: this.options.ease } );
    this.tl.eventCallback("onReverseComplete", () => {
      gsap.set(this.dom.menu, { visibility: "hidden", pointerEvents: "none" });
    });
  }

  bindEvents() {
    this.$root.on("mouseenter.dropdown", this.onMouseEnter.bind(this));
    this.$root.on("mouseleave.dropdown", this.onMouseLeave.bind(this));
  }

  onMouseEnter() {
    clearTimeout(this.state.closeTimer);
    this.open();
  }

  onMouseLeave() {
    this.state.closeTimer = setTimeout(() => { this.close(); }, this.options.closeDelay);
  }

  open() {
    this.tl.play();
  }

  close() {
    this.tl.reverse();
  }

  destroy() {
    clearTimeout(this.state.closeTimer);
    this.$root.off(".dropdown");
    this.tl?.kill();
  }
}