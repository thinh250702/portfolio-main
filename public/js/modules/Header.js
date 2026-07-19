export default class Header {
  constructor(element, options = {}) {
    this.$root = $(element);
    this.options = {
      duration: 0.3,
      ease: "power2.inOut",
      ...options
    };
    this.dom = {};
    this.state = {
      height: 0,
      isHomepage: false,
      isMenuOpen: false,
      tween: null,
    };
    this.init();
  }

  init() {
    // this.cache();   
    this.cacheDOM();
    this.createState();
    this.createScrollTrigger();
    this.createMenuTimeline();
    this.bindEvents();
  }

  cacheDOM() {
    this.$header = this.$root;
    this.dom.body = $("body");
    this.dom.menu = this.$header.next("[data-header-menu]");
    this.dom.menuItems = this.dom.menu.find("[data-menu-item]");
    this.dom.menuToggle = $("[data-menu-toggle]");
  }

  createState() {
    this.state.height = this.$header.outerHeight();
    this.state.isHomepage = this.$header.hasClass("is-light");
  }

  createScrollTrigger() {
    ScrollTrigger.create({
      trigger: this.dom.body,
      start: () => `top+=${this.state.height} top`,
      end: "max",
      scrub: 1,
      invalidateOnRefresh: true,
      toggleClass: { 
        targets: this.$header, 
        className: "is-scrolled" 
      },
      onEnter: () => this.onEnter(),
      onLeaveBack: () => this.onLeaveBack(),
      onUpdate: self => this.onUpdate(self)
    })
  }

  createMenuTimeline() {
    this.menuTl = gsap.timeline({ paused: true });
    this.menuTl.fromTo(this.dom.menu, { autoAlpha: 0, yPercent: -100 }, { autoAlpha: 1, yPercent: 0, duration: .4, ease: "power2.out" } );
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
}

  onEnter() {
    if (this.state.isHomepage){
      this.$header.removeClass("is-light");
    }
  }

  onLeaveBack() {
    if (this.state.isHomepage) {
      this.$header.addClass("is-light");
    }
    this.show();
  }

  onUpdate(self) {
    if (!this.$header.hasClass("is-scrolled")) return;
    if (self.direction === 1) this.hide();
    if (self.direction === -1) this.show();
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
    this.state.tween = gsap.to(this.$header, {
      yPercent: -100,
      duration: this.options.duration,
      ease: this.options.ease
    });
  }

  show() {
    this.killTween();
    this.state.tween = gsap.to(this.$header, {
      yPercent: 0,
      duration: this.options.duration,
      ease: this.options.ease
    });
  }

  openMenu() {
    this.menuTl.play();
  }

  closeMenu() {
    this.menuTl.reverse();
  }

  lockScroll() {
    gsap.set(this.dom.body, { overflow: "hidden" });
  }

  unlockScroll() {
    gsap.set(this.dom.body, { overflow: "" });
  }

  killTween() {
    if (!this.state.tween) return;
    this.state.tween.kill();
    this.state.tween = null;
  }

  destroy() {
    this.killTween();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.menuTl.kill();
    this.dom.menuToggle.off(".header");
  }
}