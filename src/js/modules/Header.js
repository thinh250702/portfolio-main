import $ from "../vendors/jquery.js";
import { gsap, ScrollTrigger, ScrollSmoother, Observer } from "../vendors/gsap.js";
import EventBus from "../utils/EventBus.js";

export default class Header {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      duration: 0.5,
      ease: "power2.inOut",
      event: this.$root.data("event") || "transition:revealComplete",
      ...options
    };
    this.dom = {};
    this.state = {
      height: 0,
      isHomepage: false,
      isMenuOpen: false,
      tween: null,
      smoother: null
    };
    this.init();
  }

  init() {
    this.cacheDOM();
    this.createState();
    this.createScrollTrigger();
    
    this.createMenuTimeline();
    this.bindEvents();
    this.setup();
  }

  setup() {
    gsap.set(this.$root, { yPercent: -100 });
  }

  cacheDOM() {
    this.dom.body = $("body");
    this.dom.header = this.$root;
    this.dom.menu = this.dom.header.next("[data-header-menu]");
    this.dom.menuItems = this.dom.menu.find("[data-menu-item]");
    this.dom.menuToggle = $("[data-menu-toggle]");
  }

  createState() {
    this.state.height = this.dom.header.outerHeight();
    this.state.isHomepage = this.dom.header.hasClass("is-light");
    this.state.smoother = ScrollSmoother.get();
  }

  createObserver() {
    this.observer = Observer.create({
      type: "wheel,touch",
      onDown: () => {
        if (this.state.isMenuOpen) return;
        this.hide();
      },

      onUp: () => {
        if (this.state.isMenuOpen) return;
        this.show();
      }
    });
  }

  createScrollTrigger() {
    this.trigger = ScrollTrigger.create({
      trigger: this.dom.body,
      start: () => `top+=${this.state.height} top`,
      end: "max",
      invalidateOnRefresh: true,
      toggleClass: { 
        targets: this.dom.header, 
        className: "is-scrolled" 
      },
      onEnter: () => this.onEnter(),
      onLeaveBack: () => this.onLeaveBack(),
    })
  }

  createMenuTimeline() {
    this.menuTl = gsap.timeline({ paused: true });
    this.menuTl.fromTo(this.dom.menu, { yPercent: -100 }, { yPercent: 0, duration: .5, ease: "power2.out" } );
    this.menuTl.fromTo(this.dom.menuItems, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: .3, ease: "power2.out", stagger: 0.06, }, ">" );
    this.menuTl.eventCallback("onStart", () => {
      gsap.set(this.dom.menu, { visibility: "visible", pointerEvents: "auto" });
      this.lockScroll(); 
    });
    this.menuTl.eventCallback("onReverseComplete", () => {
      gsap.set(this.dom.menu, { visibility: "hidden", pointerEvents: "none" });
      this.unlockScroll();
    });
  }

  bindEvents() {
    this.dom.menuToggle.on(
      "click.header",
      this.onToggleMenu.bind(this)
    );
    EventBus.on(
      `${this.options.event}.header`,
      () => {
        this.createObserver();
        this.show(true);
      }
    );
  }

  onEnter() {
    if (this.state.isHomepage){
      this.dom.header.removeClass("is-light");
    }
  }

  onLeaveBack() {
    if (this.state.isHomepage) {
      this.dom.header.addClass("is-light");
    }
    this.show();
  }

  onToggleMenu() {
    if (this.menuTl.isActive()) return;

    this.state.isMenuOpen =
        !this.state.isMenuOpen;

    this.state.isMenuOpen
        ? this.openMenu()
        : this.closeMenu();
  }

  hide() {
    this.killTween();
    this.state.tween = gsap.to(this.dom.header, {
      yPercent: -100,
      duration: this.options.duration,
      ease: this.options.ease,
      delay: 0.2
    });
  }

  show(force = false) {
    this.killTween();
    this.state.tween = gsap.to(this.dom.header, {
      yPercent: 0,
      duration: this.options.duration,
      ease: this.options.ease,
      delay: force ? 0 : 0.2
    });
  }

  openMenu() {
    this.menuTl.play();
  }

  closeMenu() {
    this.menuTl.reverse();
  }

  lockScroll() {
    this.state.smoother.paused(true);
  }

  unlockScroll() {
    this.state.smoother.paused(false);
  }

  killTween() {
    if (!this.state.tween) return;
    this.state.tween.kill();
    this.state.tween = null;
  }

  destroy() {
    this.killTween();

    this.observer?.kill();
    this.observer = null;

    this.trigger?.kill();
    this.trigger = null;

    this.menuTl.kill();
    this.dom.menuToggle.off(".header");
    EventBus.off(".header");
  }
}