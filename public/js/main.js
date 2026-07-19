import Header from "./modules/Header.js";
import NftCard from "./modules/NftCard.js";
import Accordion from "./modules/Accordion.js";
import Dropdown from "./modules/Dropdown.js";
import Marquee from "./modules/Marquee.js";

$(function () {
  const header = new Header("[data-header]");
  const nftCard = new NftCard("#nft-card-canvas");

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