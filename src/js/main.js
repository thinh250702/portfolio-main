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

$(async function () {
  
  await document.fonts.ready;

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

  $(".carousel-wrapper").each(function () {
    new Carousel(this);
  });
});