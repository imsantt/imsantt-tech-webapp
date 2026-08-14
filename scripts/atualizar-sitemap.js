/**
 * Atualiza a data <lastmod> no sitemap.xml com a data do build.
 * Roda automaticamente após `vite build`.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const sitemapPath = resolve("dist", "sitemap.xml");
const hoje = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

try {
  let conteudo = readFileSync(sitemapPath, "utf-8");
  conteudo = conteudo.replace(
    /<lastmod>.*<\/lastmod>/g,
    `<lastmod>${hoje}</lastmod>`,
  );
  writeFileSync(sitemapPath, conteudo);
  console.log(`✓ sitemap.xml atualizado com lastmod: ${hoje}`);
} catch (error) {
  console.warn("⚠ Não foi possível atualizar sitemap.xml:", error.message);
}
