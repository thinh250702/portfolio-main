import fs from "fs/promises";
import path from "path";
import createError from 'http-errors';

export async function loadJson(fileName, notFoundMessage = null) {
  const filePath = path.join(process.cwd(), "data", fileName);
  
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    switch (err.code) {
      case "ENOENT":
        throw createError(404, notFoundMessage || `JSON file "${fileName}" not found.`);
      default:
        if (err instanceof SyntaxError) {
          throw createError(500, `Invalid JSON format in "${fileName}".`);
        }
        throw err;
    }
  }
}