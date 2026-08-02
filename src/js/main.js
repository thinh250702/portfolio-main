import "../css/main.css";

import $ from "./vendors/jquery.js";
import { gsap } from "./vendors/gsap.js";

import Header from "./modules/Header.js";
import NftCard from "./modules/NftCard.js";
import Accordion from "./modules/Accordion.js";
import Dropdown from "./modules/Dropdown.js";
import Marquee from "./modules/Marquee.js";
import PolaroidHero from "./modules/PolaroidHero.js";
import CursorLabel from "./modules/CursorLabel.js";
import Carousel from "./modules/Carousel.js";
import PageTransition from "./modules/PageTransition.js";
import Reveal from "./modules/Reveal.js";
import TextReveal from "./modules/TextReveal.js";
import BrandGen from "./modules/BrandGen.js";
import ZoomTransition from "./modules/ZoomTransition.js";
import TableOfContents from "./modules/TableOfContents.js";
import CurrentTime from "./modules/CurrentTime.js";
import SmoothScroll from "./modules/SmoothScroll.js";
import ScrollToTop from "./modules/ScrollToTop.js";
import TextRoll from "./modules/TextRoll.js";

$(async function () {
  
  await document.fonts.ready;

  new SmoothScroll();
  new PageTransition("[data-page-transition]");

  $("[data-header]").each(function () {
    new Header(this);
  });

  $("[data-reveal]").each(function () {
    new Reveal(this);
  });

  $("[data-text-reveal]").each(function () {
    new TextReveal(this);
  });
  
  $("[data-nft-card-canvas]").each(function () {
    new NftCard(this);
  });

  $("[data-accordion]").each(function () {
    new Accordion(this);
  });

  $("[data-dropdown]").each(function () {
    new Dropdown(this);
  });

  $("[data-marquee]").each(function () {
    new Marquee(this);
  });

  $("[data-polaroid-hero]").each(function () {
    new PolaroidHero(this);
  });

  $("[data-card-grid]").each(function () {
    new CursorLabel(this);
  });

  $("[data-carousel]").each(function () {
    new Carousel(this);
  });

  $("[data-chat]").each(function () {
    new BrandGen(this);
  });

  $("[data-zoom]").each(function () {
    new ZoomTransition(this);
  });

  $("[data-toc]").each(function () {
    new TableOfContents(this);
  });

  $("[data-current-time]").each(function () {
    new CurrentTime(this);
  });

  $("[data-scroll-top]").each(function () {
    new ScrollToTop(this);
  });

  $("[data-text-roll]").each(function () {
    new TextRoll(this);
});

  $("[data-style]").each(function () {
    const style = $(this).data("style");
    if (style) {
      this.style.cssText += ";" + style;
    }
  });
});