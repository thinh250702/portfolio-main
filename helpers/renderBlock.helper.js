import { style } from "./style.helper.js";
import Handlebars from "handlebars";

export function renderBlock(block) {
  if (!block) return "";

  const blockStyle = block.style ? style(block.style) : ""
  
  switch (block.type) {
    case "paragraph":
      return new Handlebars.SafeString(
        `<p data-style="${blockStyle}">${block.data}</p>`
      );
    case "list":
      
      return new Handlebars.SafeString(`
        <ul data-style="${blockStyle}">
          ${block.data
            .map(
              (item) => `<li>${item}</li>`
            )
            .join("")}
        </ul>
      `);
    default:
      return "";
  }
}