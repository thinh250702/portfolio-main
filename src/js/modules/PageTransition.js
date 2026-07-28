import $ from "../vendors/jquery.js";
import { gsap, ScrollSmoother } from "../vendors/gsap.js";
import EventBus from "../utils/EventBus.js";

export default class PageTransition {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      duration: 0.5,
      ease: "power3.inOut",
      stagger: { each: .03, from: 'random' },
      ...options
    };
    this.isNavigating = false;

    this.dom = {};
    this.nextUrl = null;
    this.smoother = ScrollSmoother.get();
    this.init();
  }

  init() {
    this.cacheDOM();
    this.createRevealTimeline();
    this.revealTl.restart();
    this.createStartTimeline();
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.body = $("body");
    this.dom.wrapper = this.$root.find(".pt-wrapper");
    this.dom.columns = this.$root.find(".pt-column");
    this.dom.logo = this.$root.find(".pt-logo");
  }
  
  createStartTimeline() {
    this.startTl = gsap.timeline({
      paused: true,
      onStart: () => this.lockScroll(),
      onComplete: () => {
        if (this.nextUrl) window.location.href = this.nextUrl;
      }
    });
    this.startTl.to(this.dom.columns, { 
      scaleX: 1.05, 
      duration: this.options.duration, 
      ease: this.options.ease, 
      stagger: this.options.stagger
    });
    this.startTl.fromTo(this.dom.logo, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=50%");
  }

  createRevealTimeline() {
    this.revealTl = gsap.timeline({
      paused: true,
      onStart: () => {
        this.lockScroll();
        EventBus.trigger("transition:revealStart");
      },
      onComplete: () => {
        this.unlockScroll();
        EventBus.trigger("transition:revealComplete");
      },
    });
    this.revealTl.fromTo(this.dom.logo, { opacity: 1, y: 0 }, { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
    this.revealTl.to(this.dom.columns, { 
      scaleX: 0, 
      duration: this.options.duration, 
      ease: this.options.ease, 
      stagger: this.options.stagger
    }, "-=50%");
  }

  bindEvents() {
    $(document).on("click.pageTransition", "a", (e) => {
      const link = e.currentTarget;
      const href = link.href;

      // Ignore links
      if (link.hasAttribute("data-no-transition")) {
        return;
      }

      const current = new URL(window.location.href);
      const target = new URL(href);

      if (!href) return;
      if (link.target === "_blank") return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (link.hostname !== window.location.hostname) return;
      if (link.hasAttribute("download")) return;
      if (current.pathname === target.pathname && current.search === target.search && current.hash === target.hash) {
        e.preventDefault();
        return
      };

      e.preventDefault();

      this.navigate(href);
    });
  }

  navigate(url) {
    if (this.isNavigating) return;
    this.isNavigating = true;
    this.nextUrl = url;
    this.startTl.restart();
  }

  lockScroll() {
    this.smoother.paused(true);
  }

  unlockScroll() {
    this.smoother.paused(false);
  }

  destroy() {
    this.startTl?.kill();
    this.revealTl?.kill();

    $(document).off(".pageTransition");

    this.nextUrl = null;
    this.isNavigating = false;
  }
}