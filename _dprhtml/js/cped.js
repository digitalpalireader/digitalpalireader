"use strict";

const getCPEDEntryAsObject = (velthiusWord) => {
  const entry = DPR_G.yt[velthiusWord] || [];
  const [, grammar, definition, , inflectionGroup] = entry;
  return { grammar, definition, inflectionGroup };
};

const DPR_cped_mod = {
  getDefinition(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).definition;
  },
  getGrammar(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).grammar;
  },
  getInflectionGroup(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).inflectionGroup;
  },
};

if (typeof module !== "undefined") {
  module.exports = DPR_cped_mod;
}
