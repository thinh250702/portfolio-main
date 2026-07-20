import fs from "fs";
import path from "path";

export function vite(entry) {
  if (process.env.NODE_ENV === "development") {
    return `
        <script type="module" src="${process.env.VITE_DEV_SERVER}/src/js/${entry}"></script>
    `;
  }
  const manifestPath = path.join(process.cwd(), "public/build/.vite/manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  const asset = manifest[`src/js/${entry}`];
  return `
      <link rel="stylesheet" href="/build/${asset.css[0]}">
      <script type="module" src="/build/${asset.file}"></script>
  `;
}