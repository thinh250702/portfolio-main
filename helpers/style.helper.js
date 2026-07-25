import Handlebars from "handlebars";

const aliases = {
  textColor: "color",
  backgroundColor: "background",
};

const toKebabCase = (str) => str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

export function style(styles) {
  if (!styles || typeof styles !== "object") return "";

  const css = Object.entries(styles)
    .filter(([, value]) => value != null && value !== "")
    .map(([key, value]) => {
      const property = aliases[key] || toKebabCase(key);
      return `${property}: ${value}`;
    })
    .join("; ");

  return new Handlebars.SafeString(css);
}