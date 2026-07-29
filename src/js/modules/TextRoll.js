import $ from "../vendors/jquery.js";
import { gsap, SplitText } from "../vendors/gsap.js";

export default class TextRoll {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      type: this.$root.data("split") || "words",
      duration: 0.6,
      stagger: 0.06,
      ease: "power3.inOut",
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
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.text = this.$root[0];
  }

  createSplitText() {
    this.state.split = SplitText.create(this.dom.text, {
      type: this.options.type,
      mask: this.options.type,
    });
    this.state.split[this.options.type].forEach(item => {
      $(item).attr("data-label", item.textContent);
    });
  }

  createTimeline() {
    this.tl = gsap.timeline({
      paused: true,
    });
    this.tl.to(this.state.split[this.options.type], {
      yPercent: -100,
      duration: this.options.duration,
      stagger: this.options.stagger,
      ease: this.options.ease
    });
  }

  bindEvents() {
    this.$root.on("mouseenter.roll", () => this.tl.play());
    this.$root.on("mouseleave.roll", () => this.tl.reverse());
  }

  destroy() {
    this.$root.off(".roll");

    this.tl?.kill();
    this.tl = null;

    this.state.split?.revert();
    this.state.split = null;
  }
}