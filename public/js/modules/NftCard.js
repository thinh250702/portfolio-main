export default class NftCard {
  constructor(element, options = {}) {
    this.$root = $(element);

    this.options = {
      maxRotate: 20,
      duration: 0.4,
      ease: "power3.out",
      glareOpacity: 0.6,
      ...options
    };

    this.dom = {};
    this.quick = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    this.createQuickTo();
    this.bindEvents();
  }

  cacheDOM() {
    this.dom.canvas = this.$root;
    this.dom.card = this.$root.find("#nft-card");
    this.dom.content = this.$root.find("#nft-card-text");
    this.dom.glare = this.$root.find("#nft-card-glare");
  }

  createQuickTo() {
    const config = {
      duration: this.options.duration,
      ease: this.options.ease
    };
    this.quick.rotateX = gsap.quickTo(this.dom.card, "rotationX", config);
    this.quick.rotateY = gsap.quickTo(this.dom.card, "rotationY", config);

    this.quick.moveX = gsap.quickTo(this.dom.content, "x", config);
    this.quick.moveY = gsap.quickTo(this.dom.content, "y", config);

    this.quick.bgX = gsap.quickTo(this.dom.glare, "--radial-x", config);
    this.quick.bgY = gsap.quickTo(this.dom.glare, "--radial-y", config);

    this.quick.glareOpacity = gsap.quickTo(this.dom.glare, "opacity", { duration: 0.25 });
  }

  bindEvents() {
    this.dom.canvas.on("pointermove.nft", this.onPointerMove.bind(this));
    this.dom.canvas.on("pointerleave.nft", this.onPointerLeave.bind(this));
  }

  onPointerMove(e) {
    const rect = this.dom.canvas[0].getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    this.quick.rotateY((x - 0.5) * this.options.maxRotate);
    this.quick.rotateX(-(y - 0.5) * this.options.maxRotate);
    this.quick.moveX((x - 0.5) * this.options.maxRotate);
    this.quick.moveY((y - 0.5) * this.options.maxRotate);
    this.quick.bgX(x * 100);
    this.quick.bgY(y * 100);
    this.quick.glareOpacity(this.options.glareOpacity);
  }

  onPointerLeave() {
    this.quick.rotateX(0);
    this.quick.rotateY(0);
    this.quick.moveX(0);
    this.quick.moveY(0);
    this.quick.glareOpacity(0);
  }

  destroy() {
    this.dom.canvas.off(".nft");
  }
}