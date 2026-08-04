import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";

export default class Accordion {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      duration: 0.5,
      ease: "power2.out",
      headerOpacity: 0.5,
      defaultIndex: 0,
      ...options
    };
    this.dom = {};
    this.state = {
      activeIndex: -1
    };

    this.init();
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.setup();
  }

  cacheDOM() {
    this.dom.items = this.$root.find(".accordion-item");
    this.dom.images = this.$root.find(".accordion-images img").toArray();
    this.dom.data = this.dom.items.map((_, item) => {
      const collapse = $(item).find(".accordion-collapse")[0];
      return {
        header: $(item).find(".accordion-header")[0],
        collapse,
        children: collapse.children
      };
    })
  }

  setup() {
    gsap.set(
      this.dom.items.find(".accordion-header"),
      { opacity: this.options.headerOpacity }
    );
    gsap.set(
      this.dom.images,
      { autoAlpha: 0, scale: 1.05}
    );
    this.show(this.options.defaultIndex);
  }

  bindEvents() {
    this.$root.on(
      "click.accordion",
      ".accordion-header",
      (e) => {
        const index = $(e.currentTarget).closest(".accordion-item").index();
        this.show(index);
      }
    )
  }

  show(index) {
    if (index === this.state.activeIndex) return;
    this.closeItem(this.state.activeIndex);
    this.openItem(index);
    this.showImage(index);
    this.state.activeIndex = index;
  }

  openItem(index) {
    const item = this.dom.data[index];
    if (!item) return;

    gsap.to(item.header, { opacity: 1, duration: 0.3, overwrite: true });
    const tl = gsap.timeline({ defaults: { duration: this.options.duration, ease: this.options.ease, overwrite: true } });
    tl.to(item.collapse, { height: item.collapse.scrollHeight }, 0);
    tl.fromTo(item.children, { opacity: 0, y: -10}, { opacity: 1, y: 0, stagger: 0.1}, 0.1);
  }

  closeItem(index) {
    if (index < 0) return;
    const item = this.dom.data[index];

    gsap.to(item.header, { opacity: this.options.headerOpacity, duration: 0.3, overwrite: true });
    const tl = gsap.timeline({ defaults: { duration: this.options.duration, ease: this.options.ease, overwrite: true } });
    tl.to(item.children, { opacity: 0, y: 0 }, 0)
    tl.to(item.collapse, { height: 0 }, 0.1);
  }

  showImage(index) {
    if (index === this.state.activeIndex) return;

    const current = this.dom.images[this.state.activeIndex];
    const next = this.dom.images[index];

    const tl = gsap.timeline();
    if (current) {
      tl.to(current, { opacity: 0, scale: 1.05, duration: this.options.duration, ease: this.options.ease }, 0);
    }
    tl.set(next, { autoAlpha: 1 }, 0);
    tl.fromTo(next, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: this.options.duration, ease: this.options.ease }, 0);
  }

  destroy() {
    this.$root.off(".accordion");
  }
}