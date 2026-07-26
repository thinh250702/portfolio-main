import $ from "../vendors/jquery.js";
import { gsap } from "../vendors/gsap.js";

export default class BrandGen {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      duration: 0.5,
      ease: "power3.out",
      ...options
    };
    this.dom = {};
    this.state = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    this.createTimeline();
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.resetBtn = this.$root.find('.chat-reset-btn');
    this.dom.chatBubble = this.$root.find('.chat-bubble');
    this.dom.shimmerText = this.$root.find('.chat-shimmer-text');
    this.dom.shimmerImg = this.$root.find('.chat-skeleton-image');
    this.dom.resultImg = this.$root.find('.chat-result-img');
    this.dom.resultBtn = this.$root.find('.chat-result-btn');
    this.dom.chatInput = this.$root.find('.chat-input');
    this.dom.sendBtn = this.$root.find('.chat-send-btn');
    this.dom.voiceBtn = this.$root.find('.chat-voice-btn');
    this.dom.pauseBtn = this.$root.find('.chat-pause-btn');
  }

  createTimeline() {
    this.tl = gsap.timeline({ paused: true })
    .from(this.dom.chatBubble, { y: 20, opacity: 0, duration: this.options.duration, ease: this.options.ease})
    .set(this.dom.sendBtn, { display: "none" }, "<")
    .set(this.dom.pauseBtn, { display: "inline-flex" }, "<")
    .from(this.dom.shimmerText, { y: 20, opacity: 0, duration: this.options.duration, ease: this.options.ease}, "+=0.5")
    .from(this.dom.shimmerImg, { scale: 0, duration: this.options.duration, ease: this.options.ease}, "+=0.2")
    .to(this.dom.shimmerText, { height: 0, opacity: 0, duration: this.options.duration, ease: this.options.ease}, "+=3")
    .to(this.dom.shimmerImg, { opacity: 0, duration: this.options.duration, ease: this.options.ease }, "<")
    .from(this.dom.resultImg, { opacity: 0, scale: 1.2, duration: this.options.duration, ease: this.options.ease }, "+=0.2")
    .from(this.dom.resultBtn, { opacity: 0, duration: this.options.duration, ease: this.options.ease }, "<")
    .set(this.dom.pauseBtn, { display: "none" }, "<")
    .set(this.dom.voiceBtn, { display: "inline-flex" }, "<")
  }

  bindEvents() {
    this.dom.sendBtn.on("click.logogen", () => {
      this.tl.play();
      this.dom.chatInput.val("");
    });
    this.dom.resetBtn.on("click.logogen", () => {
      this.tl.pause(0);
      this.dom.chatInput.val(this.dom.chatBubble[0].innerText.trim());
      gsap.set(this.dom.sendBtn, { clearProps: "display" });
      gsap.set(this.dom.voiceBtn, { clearProps: "display" });
      gsap.set(this.dom.pauseBtn, { clearProps: "display" });
    });
  }

  destroy() {
    this.dom.sendBtn.off(".logogen");
    this.dom.resetBtn.off(".logogen");
    this.tl?.kill();
  }
}