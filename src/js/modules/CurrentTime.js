export default class CurrentTime {
  constructor(element) {
    this.$root = $(element);

    this.timer = null;

    this.init();
  }

  init() {
    this.update();
    this.start();
  }

  update() {
    const date = new Date();

    const time = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);

    this.$root.text(`UTC +7, ${time}`);
  }


  start() {
    this.timer = setInterval(() => {
      this.update();
    }, 1000);
  }

  destroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
}