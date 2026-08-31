import test from "node:test";
import assert from "node:assert/strict";

import {
  featuredProjects,
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "../src/data/projects.ts";
import * as cloudinary from "../src/lib/cloudinary.ts";
import * as mediaPolicy from "../src/lib/media-policy.ts";
import { localizeRole } from "../src/data/ui-copy.ts";

const expectedPreviews = {
  "spider-verse-frenesi-dualidade": { start: 27, duration: 4 },
  "la-la-land-estetica-melancolia": { start: 31, duration: 6 },
  "naruto-manga-motion": { start: 0, duration: 5 },
  "fight-club-peso-projecao": { start: 10, duration: 5 },
  "institucional-7-anos": { start: 29, duration: 6 },
  "workshop-df-previcom": { start: 0, duration: 6 },
  "conselho-deliberativo": { start: 0, duration: 5 },
};

test("stores every approved video preview interval exactly", () => {
  const actual = Object.fromEntries(
    projects
      .filter((project) => project.media.kind === "video")
      .map((project) => [project.slug, project.media.preview]),
  );

  assert.deepEqual(actual, expectedPreviews);
});

test("builds a silent trimmed MP4 preview from the original Cloudinary asset", () => {
  const spiderVerse = getProjectBySlug("spider-verse-frenesi-dualidade");
  assert.ok(spiderVerse);
  assert.equal(spiderVerse.media.kind, "video");

  const previewUrl = cloudinary.getCloudinaryPreviewUrl(
    spiderVerse.media.sourceUrl,
    spiderVerse.media.preview,
    1280,
  );

  assert.match(previewUrl, /\/video\/upload\//);
  assert.match(previewUrl, /so_27/);
  assert.match(previewUrl, /du_4/);
  assert.match(previewUrl, /ac_none/);
  assert.match(previewUrl, /f_mp4/);
  assert.match(previewUrl, /w_1280/);
  assert.doesNotMatch(previewUrl, /q_auto,f_mp4\/v/);
});

test("builds a stable poster from the first frame of the approved excerpt", () => {
  const institutional = getProjectBySlug("institucional-7-anos");
  assert.ok(institutional);
  assert.equal(institutional.media.kind, "video");

  const posterUrl = cloudinary.getCloudinaryPosterUrl(
    institutional.media.sourceUrl,
    institutional.media.preview.start,
    960,
  );

  assert.match(posterUrl, /so_29/);
  assert.match(posterUrl, /f_jpg/);
  assert.match(posterUrl, /w_960/);
});

test("keeps slugs unique and resolves unknown projects safely", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  assert.equal(getProjectBySlug("projeto-inexistente"), undefined);
});

test("orders the three cinematic highlights as Spider-Verse, Institutional and La La Land", () => {
  assert.deepEqual(
    featuredProjects.map((project) => project.slug),
    [
      "spider-verse-frenesi-dualidade",
      "institucional-7-anos",
      "la-la-land-estetica-melancolia",
    ],
  );
});

test("provides circular previous and next case navigation", () => {
  const first = projects[0];
  const last = projects.at(-1);
  assert.ok(last);

  assert.deepEqual(getAdjacentProjects(first.slug), {
    previous: last,
    next: projects[1],
  });
  assert.deepEqual(getAdjacentProjects(last.slug), {
    previous: projects.at(-2),
    next: first,
  });
  assert.equal(getAdjacentProjects("projeto-inexistente"), undefined);
});

test("preserves the complete 13-project portfolio with localized serializable media", () => {
  assert.equal(projects.length, 13);
  assert.equal(projects.filter((project) => project.discipline === "motion").length, 7);
  assert.equal(projects.filter((project) => project.discipline === "design").length, 6);
  assert.equal(projects.filter((project) => project.context === "authorial").length, 4);
  assert.equal(projects.filter((project) => project.context === "institutional").length, 9);

  for (const project of projects) {
    assert.ok(project.copy.pt.title);
    assert.ok(project.copy.en.title);
    assert.ok(project.copy.pt.description.length > 0);
    assert.ok(project.copy.en.description.length > 0);
    assert.doesNotThrow(() => JSON.stringify(project));
  }
});

test("places design projects explicitly and shows carousel work first", () => {
  const design = projects
    .filter((project) => project.homePlacement?.section === "design-showcase")
    .sort((a, b) => a.homePlacement.order - b.homePlacement.order);

  assert.equal(design.length, 6);
  assert.deepEqual(
    design.slice(0, 3).map((project) => project.media.kind),
    ["gallery", "gallery", "gallery"],
  );
});

test("derives the untransformed Cloudinary MP4 for metadata-stable playback", () => {
  assert.equal(typeof cloudinary.getCloudinaryOriginalUrl, "function");
  const institutional = getProjectBySlug("institucional-7-anos");
  assert.ok(institutional);
  assert.equal(institutional.media.kind, "video");

  const originalUrl = cloudinary.getCloudinaryOriginalUrl(institutional.media.sourceUrl);
  assert.match(originalUrl, /\/video\/upload\/v\d+\//);
  assert.match(originalUrl, /\.mp4$/);
  assert.doesNotMatch(originalUrl, /q_auto/);
  assert.doesNotMatch(originalUrl, /f_mp4/);
});

test("reuses the already-generated optimized asset for full playback", () => {
  const spiderVerse = getProjectBySlug("spider-verse-frenesi-dualidade");
  assert.ok(spiderVerse);
  assert.equal(spiderVerse.media.kind, "video");

  assert.equal(
    cloudinary.getCloudinaryPlaybackUrl(spiderVerse.media.sourceUrl),
    spiderVerse.media.sourceUrl,
  );
});

test("provides responsive preview widths through 4K", () => {
  assert.equal(typeof cloudinary.getCloudinaryPreviewSources, "function");
  const spiderVerse = getProjectBySlug("spider-verse-frenesi-dualidade");
  assert.ok(spiderVerse);
  assert.equal(spiderVerse.media.kind, "video");

  assert.deepEqual(
    cloudinary.getCloudinaryPreviewSources(
      spiderVerse.media.sourceUrl,
      spiderVerse.media.preview,
    ).map(({ width }) => width),
    [1440, 1920, 2560, 3840],
  );
});

test("selects economical poster widths while preserving large-display fidelity", () => {
  assert.equal(cloudinary.getResponsivePosterWidth(390, 2560), 1440);
  assert.equal(cloudinary.getResponsivePosterWidth(1920, 2560), 1920);
  assert.equal(cloudinary.getResponsivePosterWidth(2560, 2560), 2560);
  assert.equal(cloudinary.getResponsivePosterWidth(3840, 2560), 2560);
});

test("localizes role labels without changing the serialized project registry", () => {
  assert.equal(localizeRole("pt", "Direção de arte"), "Direção de arte");
  assert.equal(localizeRole("en", "Direção de arte"), "Art direction");
  assert.equal(localizeRole("en", "Ferramenta específica"), "Ferramenta específica");
});

test("disables moving previews for reduced-motion and data-saver preferences", () => {
  assert.equal(mediaPolicy.canAutoplayPreview({ reducedMotion: false, saveData: false }), true);
  assert.equal(mediaPolicy.canAutoplayPreview({ reducedMotion: true, saveData: false }), false);
  assert.equal(mediaPolicy.canAutoplayPreview({ reducedMotion: false, saveData: true }), false);
  assert.equal(mediaPolicy.canAutoplayPreview({ reducedMotion: true, saveData: true }), false);
});

test("keeps the poster fallback after repeated transient preview failures", () => {
  assert.equal(typeof mediaPolicy.getPreviewRetryDelay, "function");
  assert.equal(mediaPolicy.getPreviewRetryDelay(1), 1000);
  assert.equal(mediaPolicy.getPreviewRetryDelay(2), 2000);
  assert.equal(mediaPolicy.getPreviewRetryDelay(3), null);

  assert.deepEqual(
    mediaPolicy.getPreviewRecovery("media-error", 3),
    { kind: "keep-poster" },
  );
});

test("does not treat an autoplay rejection as a broken preview asset", () => {
  assert.equal(typeof mediaPolicy.getPreviewRecovery, "function");
  assert.deepEqual(
    mediaPolicy.getPreviewRecovery("play-rejected", 1),
    { kind: "keep-poster" },
  );
  assert.deepEqual(
    mediaPolicy.getPreviewRecovery("media-error", 1),
    { kind: "retry", delay: 1000 },
  );
  assert.deepEqual(
    mediaPolicy.getPreviewRecovery("media-error", 3),
    { kind: "keep-poster" },
  );
});
