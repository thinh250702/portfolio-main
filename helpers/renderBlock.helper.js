import Handlebars from "handlebars";

export function renderBlock(block) {
  if (!block) return "";
  switch (block.type) {
    case "paragraph":
      return new Handlebars.SafeString(
        `<p>${block.data}</p>`
        // `<p>${Handlebars.escapeExpression(block.data)}</p>`
      );
    case "list":
      return new Handlebars.SafeString(`
        <ul class="list-disc ps-4">
          ${block.data
            .map(
              (item) => `<li>${Handlebars.escapeExpression(item)}</li>`
            )
            .join("")}
        </ul>
      `);
    default:
      return "";
  }
}