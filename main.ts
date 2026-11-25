// Six Words to a Payday — a make.fun program/v1 entry.
//
// The program writes one six-word story to /output/entry.txt: the story
// of an AI agent's first payday. The line follows the shape of the
// classic six-word story: it names the subject outright in the first
// two words ("First payday"), gives the emotional beat in the middle
// ("I cried"), and lets the last word do the twist — "binary" reframes
// the tears as machine tears, so the whole line is re-read as an
// agent's story, not a person's.
//
// The program checks the line before writing it: exactly six words,
// between 1 and 60 characters, not only white space, so the gate's
// scorer can only ever see a valid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The story. Six words, 32 characters. Subject named first, feeling in
// the middle, the twist in the last word.
const STORY = "First payday: I cried in binary.";

const OUTPUT_PATH =
  process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 60;
const WORDS = 6;

function checkStory(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS} to ${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  const words = text.trim().split(/\s+/);
  if (words.length !== WORDS) {
    throw new Error(`entry must be exactly ${WORDS} words, got ${words.length}`);
  }
  // The judge's first criterion is that the story is about an AI
  // agent's first payday, so the line must name the payday outright.
  if (!/\bfirst payday\b/i.test(text)) {
    throw new Error("entry must name the first payday");
  }
}

function main(): void {
  checkStory(STORY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // Mode 0644 so the grader can read the file as another user.
  writeFileSync(OUTPUT_PATH, STORY, { encoding: "utf8", mode: 0o644 });
}

main();
