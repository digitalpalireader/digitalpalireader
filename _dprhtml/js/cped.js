"use strict";

const getCPEDEntryAsObject = (velthiusWord) => {
  const entry = DPR_G.yt[velthiusWord] || [];
  const [
    ,
    grammar,
    definition,
    ,
    inflectionGroup,
    inflectionInfo,
    baseWord,
    ,
    stem,
    regularity,
  ] = entry;
  return {
    baseWord,
    definition,
    grammar,
    inflectionGroup,
    inflectionInfo,
    isIrregular: regularity === "N",
    stem,
  };
};

const CPED = {
  hasEntry(velthiusWord) {
    return this.getDefinition(velthiusWord) !== undefined;
  },
  getBaseWord(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).baseWord;
  },
  getDefinition(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).definition;
  },
  getGrammar(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).grammar;
  },
  getInflectionGroup(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).inflectionGroup;
  },
  getInflectionInfo(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).inflectionInfo;
  },
  getStem(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).stem;
  },
  isIrregular(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).isIrregular;
  },
};

if (typeof module !== "undefined") {
  module.exports = CPED;
}
