import test from "node:test";
import assert from "node:assert/strict";

import { getPosterTime, projects, reelProjects, verticalProjects } from "../src/data/projects.ts";
import {
  formatTimecode,
  getActiveTake,
  getClipStops,
  getTakeScrollProgress,
} from "../src/lib/reel.ts";

test("formats real video time as HH:MM:SS:FF at 24 fps", () => {
  assert.equal(formatTimecode(0), "00:00:00:00");
  assert.equal(formatTimecode(27.5), "00:00:27:12");
  assert.equal(formatTimecode(3661.25), "01:01:01:06");
  assert.equal(formatTimecode(Number.NaN), "00:00:00:00");
  assert.equal(formatTimecode(-4), "00:00:00:00");
});

test("cuts to each take inside its transition and clamps at both ends", () => {
  assert.equal(getActiveTake(-1, 4), 0);
  assert.equal(getActiveTake(0.5, 4), 0);
  assert.equal(getActiveTake(1.04, 4), 0);
  assert.equal(getActiveTake(1.06, 4), 1);
  assert.equal(getActiveTake(3.5, 4), 3);
  assert.equal(getActiveTake(4, 4), 3);
});

test("timeline jumps land on the take they name", () => {
  for (let index = 0; index < 4; index += 1) {
    assert.equal(getActiveTake(getTakeScrollProgress(index, 4) * 4, 4), index);
  }
});

test("sizes timeline clips by their real preview duration", () => {
  assert.deepEqual(getClipStops([1, 1, 2]), [0, 0.25, 0.5, 1]);
});

test("vertical cuts hold every portrait piece and skip the black opening frame", () => {
  assert.deepEqual(verticalProjects.map((project) => project.slug), [
    "naruto-manga-motion",
    "workshop-df-previcom",
    "conselho-deliberativo",
  ]);
  const council = verticalProjects.find((project) => project.slug === "conselho-deliberativo");
  assert.equal(getPosterTime(council.media), 4);
  assert.equal(getPosterTime(verticalProjects[0].media), verticalProjects[0].media.preview.start);
});

test("the reel holds every landscape motion piece, featured work first", () => {
  assert.deepEqual(reelProjects.map((project) => project.slug), [
    "spider-verse-frenesi-dualidade",
    "institucional-7-anos",
    "la-la-land-estetica-melancolia",
    "fight-club-peso-projecao",
  ]);
  const landscape = projects.filter((project) => project.media.kind === "video" && project.media.orientation === "landscape");
  assert.equal(reelProjects.length, landscape.length);
  for (const project of reelProjects) assert.match(project.grade ?? "", /^#[0-9A-F]{6}$/i);
});
