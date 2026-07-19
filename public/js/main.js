import Header from "./modules/Header.js";
import NftCard from "./modules/NftCard.js";
import Accordion from "./modules/Accordion.js";
import Dropdown from "./modules/Dropdown.js";
import Marquee from "./modules/Marquee.js";

$(function () {
  $("[data-header]").each(function () {
    new Header(this);
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
});