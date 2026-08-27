import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("keeps the language control owned by the responsive navbar", async () => {
  const page = await read("src/app/page.tsx");
  const navbar = await read("src/components/Navbar.tsx");

  assert.equal((page.match(/<LanguageToggle\s*\/?/g) ?? []).length, 0);
  assert.match(navbar, /<LanguageToggle[^>]+className=/);
});

test("exposes keyboard-accessible navigation and project dialog contracts", async () => {
  const navbar = await read("src/components/Navbar.tsx");
  const portfolio = await read("src/components/PortfolioSection.tsx");

  assert.match(navbar, /aria-label=\{[^}]*menu/i);
  assert.match(navbar, /aria-expanded=\{isDrawerOpen\}/);
  assert.match(portfolio, /role="dialog"/);
  assert.match(portfolio, /event\.key === "Escape"/);
  assert.match(portfolio, /aria-label=/);
  assert.match(portfolio, /clickLabel/);
});
