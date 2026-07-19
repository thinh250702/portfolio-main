export default class Marquee {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
        cloneCount: 1,
        ...options
    };
    this.dom = {};
    this.init();
  }

  init() {
    this.cacheDOM();
    this.cloneItems();
  }

  cacheDOM() {
    this.dom.track = this.$root.find("[data-marquee-track]");
  }

  cloneItems() {
    for (let i = 0; i < this.options.cloneCount; i++) {
      this.dom.track.children().clone().appendTo(this.dom.track);
    }
  }
}