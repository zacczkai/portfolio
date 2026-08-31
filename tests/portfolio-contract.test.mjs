import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

test("keeps the language control owned by the responsive navbar", async () => {
  const page = await read("src/app/page.tsx");
  const navbar = await read("src/components/Navbar.tsx");

  assert.equal((page.match(/<LanguageToggle\s*\/?/g) ?? []).length, 0);
  assert.match(navbar, /<LanguageToggle\s*\/>/);
});

test("exposes keyboard-accessible navigation without the old project dialog", async () => {
  const navbar = await read("src/components/Navbar.tsx");
  const page = await read("src/app/page.tsx");

  assert.match(navbar, /aria-label=\{copy\.menu\}/);
  assert.match(navbar, /aria-expanded=\{isDrawerOpen\}/);
  assert.match(navbar, /event\.key === "Escape"/);
  assert.match(navbar, /matchMedia\("\(min-width: 1120px\)"\)/);
  assert.doesNotMatch(page, /PortfolioSection/);
  assert.doesNotMatch(page, /role="dialog"/);
});

test("keeps preview video and static project route accessibility contracts", async () => {
  const preview = await read("src/components/ProjectPreview.tsx");
  const route = await read("src/app/projetos/[slug]/page.tsx");

  assert.match(preview, /muted/);
  assert.match(preview, /loop/);
  assert.match(preview, /playsInline/);
  assert.match(preview, /preload="none"/);
  assert.match(preview, /videoRef\.current\?\.load\(\)/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /await params/);
  assert.match(route, /notFound\(\)/);
});

test("makes design a first-class home destination", async () => {
  const page = await read("src/app/page.tsx");
  const navbar = await read("src/components/Navbar.tsx");

  assert.match(page, /DesignShowcase/);
  assert.match(navbar, /id: "design"/);
  assert.match(navbar, /copy\.design/);
});

test("uses a reusable accessible carousel instead of a static gallery grid", async () => {
  const caseStudy = await read("src/components/CaseStudy.tsx");
  const carousel = await read("src/components/ProjectCarousel.tsx");

  assert.match(caseStudy, /ProjectCarousel/);
  assert.match(carousel, /role="region"/);
  assert.doesNotMatch(caseStudy, /assets\.map/);
});

test("leaves route metadata under Next ownership", async () => {
  const languageContext = await read("src/context/LanguageContext.tsx");

  assert.doesNotMatch(languageContext, /document\.title\s*=/);
  assert.doesNotMatch(languageContext, /meta\[name="description"\]/);
});

test("waits for stable video metadata before exposing native controls", async () => {
  const caseStudy = await read("src/components/CaseStudy.tsx");
  const player = await read("src/components/CaseVideoPlayer.tsx");

  assert.match(caseStudy, /CaseVideoPlayer/);
  assert.match(player, /onLoadedMetadata/);
  assert.match(player, /Number\.isFinite/);
  assert.match(player, /readyState\s*>=\s*HTMLMediaElement\.HAVE_METADATA/);
  assert.match(player, /getCloudinaryPlaybackUrl/);
  assert.match(player, /preload="metadata"/);
});
