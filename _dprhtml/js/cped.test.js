import "../../en/cped";

import { getDefinition, getGrammar, getInflectionGroup } from "./cped";

describe("getDefinition", () => {
  test.each([
    ["bhikkhu", "a Buddhist monk."],
    ["ambala.t.thikaa", "a mango plant."],
  ])("%s => %s", (velthiusWord, definition) => {
    expect(getDefinition(velthiusWord)).toBe(definition);
  });
});

describe("getGrammar", () => {
  test.each([
    ["bhikkhu", "m."],
    ["ambala.t.thikaa", "f."],
  ])("%s => %s", (velthiusWord, grammar) => {
    expect(getGrammar(velthiusWord)).toBe(grammar);
  });
});

describe("getInflectionGroup", () => {
  test.each([
    ["bhikkhu", "N"],
    ["bhiyyo", "I"],
  ])("%s => %s", (velthiusWord, inflectionGroup) => {
    expect(getInflectionGroup(velthiusWord)).toBe(inflectionGroup);
  });
});
