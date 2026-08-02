import $ from "../vendors/jquery.js";
import { gsap, ScrollTrigger, ScrollSmoother } from "../vendors/gsap.js";

export default class TableOfContents {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      duration: 0.4,
      ease: "power2.out",
      menuDuration: 0.6,
      menuEase: "power2.inOut",
      ...options
    };
    this.dom = {};
    this.state = {
      isOpen: false,
      current: -1
    };
    this.triggers = [];
    this.items = [];
    this.smoother = ScrollSmoother.get();
    this.init();
  }

  init() {
    this.cacheDOM();
    this.generateMenu();
    this.createMenuTimeline();
    this.createScrollTriggers();
    this.bindEvents();
    this.setup();
  }

  setup() {
    this.items.forEach(item => {
      gsap.set(item.link, { color: "var(--color-gray-400)" });
    });
    this.setActive(0);
  }

  cacheDOM() {
    this.dom.toc = this.$root;
    this.dom.background = this.$root.find(".toc-bg");
    this.dom.toggle = this.$root.find(".toc-toggle");
    this.dom.list = this.$root.find(".toc-list");
    this.dom.sections = $("[data-toc-title]");
  }

  convertToId(text) {
    return text
      .trim()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_");
  }

  generateMenu() {
    this.dom.sections.each((index, section) => {
      const $section = $(section);
      const title = $section.data("toc-title");

      const id = this.convertToId(title);
      $section.attr("id", id);

      const $link = $(`
        <li class="toc-item">
          <a href="#${id}" class="toc-link" data-no-transition>${title}</a>
          <span class="toc-dot"></span>
        </li>
      `);

      this.dom.list.append($link);
      this.items.push({
        link: $link.find(".toc-link")[0],
        dot: $link.find(".toc-dot")[0],
      });
    })
  }

  createScrollTriggers() {
    this.dom.sections.each((index, section) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 35%",
        end: "bottom 35%",
        onEnter: () => this.setActive(index),
        onEnterBack: () => this.setActive(index)
      });
      this.triggers.push(trigger);
    })
  }

  setActive(index) {
    if (index === this.state.current) return;

    this.animateItem(this.state.current, false);
    this.animateItem(index, true);

    this.state.current = index;
  }

  animateItem(index, active) {
    const item = this.items[index];
    if (!item) return;

    gsap.to(item.link, {
      x: active ? -4 : 16,
      scale: active ? 1.1 : 1,
      color: active ? "#000" : "#9f9fa9",
      duration: this.options.duration,
      ease: this.options.ease,
      overwrite: "auto"
    });

    gsap.to(item.dot, {
      scale: active ? 1 : 0,
      duration: this.options.duration,
      ease: this.options.ease,
      overwrite: "auto"
    });
  }

  

  createMenuTimeline() {
    this.menuTl = gsap.timeline({
      paused: true,
      onStart: () => gsap.set(this.dom.list, { pointerEvents: "auto" }),
      onReverseComplete: () => gsap.set(this.dom.list, { pointerEvents: "none" })
    })
    .to(this.dom.background, { width: "100%", height: "100%", borderRadius: "16px", duration: this.options.menuDuration, ease: this.options.menuEase })
    .from(this.dom.list.children(), {
      autoAlpha: 0,
      y: 16,
      stagger: 0.05,
      duration: this.options.duration,
      ease: this.options.ease,
    }, ">");
  }

  bindEvents() {
    this.dom.toggle.on(
      "click.toc",
      this.onToggleMenu.bind(this)
    );
    this.dom.list.on("click.toc", ".toc-link", this.onClickLink.bind(this));
  }

  onClickLink(e) {
    e.preventDefault();
    const id = e.currentTarget.hash;
    this.smoother.scrollTo(id, true);
  }

  onToggleMenu() {
    if (this.menuTl.isActive()) return;

    this.state.isOpen =
        !this.state.isOpen;

    this.state.isOpen
        ? this.open()
        : this.close();
  }

  open() {
    this.menuTl.play();
  }

  close() {
    this.menuTl.reverse();
  }

  destroy() {
    // Remove events
    this.dom.toggle.off(".toc");
    this.dom.list.off(".toc");

    // Kill ScrollTriggers
    this.triggers.forEach(trigger => trigger.kill());
    this.triggers = [];

    // Kill timeline
    this.menuTl?.kill();
    this.menuTl = null;

    // Kill running tweens
    this.items.forEach(item => {
        gsap.killTweensOf(item.link);
        gsap.killTweensOf(item.dot);
    });

    // Remove generated items
    this.dom.list.empty();

    // Clear references
    this.items = [];

    this.dom = {};
  }
}