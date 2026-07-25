import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";
import EventBus from "../utils/EventBus.js";

export default class PolaroidHero {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      breakpoint: "(min-width: 40rem)",
      duration: 1,
      ease: "power2.out",
      ...options
    };

    this.dom = {};
    this.state = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    this.createState();
    this.createMatchMedia();
  }

  cacheDOM() {
    this.dom.body = $("body");
    this.dom.wrapper = this.$root;
    this.dom.items = this.$root.find(".polaroid-item");
  }

  createState() {
    this.state.isPlayed = false;
  }

  createMatchMedia() {
    this.mm = gsap.matchMedia();
    this.mm.add(this.options.breakpoint, () => {
      this.createTimeline();
      EventBus.on("transition:revealComplete.polaroid", () => this.play());
    });
  }

  createTimeline() {
    this.tl = gsap.timeline({ paused: true });
    this.tl.fromTo(this.dom.wrapper, { yPercent: 140 }, { yPercent: 0, duration: 1, ease: "back.out" } );
    this.tl.from(this.dom.items, { xPercent: 50, rotation: 0, y: 0, marginLeft: (_, target) => {return -$(target).outerWidth();}, duration: .8, ease: "power2.out" }, ">");
    this.tl.eventCallback("onStart", () => {
      gsap.set(this.dom.body, { overflow: "hidden" });
    });
    this.tl.eventCallback("onComplete", () => {
      gsap.set(this.dom.body, { overflow: "" });
      this.state.isPlayed = true;
      this.createHoverAnimation();
    });
  }

  createHoverAnimation() {
    this.dom.items.each((index, item) => {
      $(item).on("mouseenter.polaroid", () => {
        gsap.set(item, { zIndex: this.dom.items.length + 1 });
        gsap.to(item, { scale: 1.08, duration: .35, ease: "power2.out" });
      });
      $(item).on("mouseleave.polaroid", () => {
        gsap.to(item, { scale: 1, duration: .35, ease: "power2.out" });
        gsap.set(item, { zIndex: index });
      });
    })
  }

  play() {
    if (this.state.isPlayed) return;
    this.tl.play();
  }

  destroy() {
    EventBus.off(".polaroid");
    this.mm?.revert();
    this.tl?.kill();
    this.dom.items.off(".polaroid");
  }
}