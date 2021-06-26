"use strict";

const DPR_Cped = (function () {
  const getCPEDEntryAsObject = (velthiusWord) => {
    const entry = DPR_G.yt[velthiusWord] || [];
    const [, grammar, definition, , inflectionGroup] = entry;
    return { grammar, definition, inflectionGroup };
  }
  
  function getDefinition(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).definition;
  }

  function getGrammar(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).grammar;
  }

  function getInflectionGroup(velthiusWord) {
    return getCPEDEntryAsObject(velthiusWord).inflectionGroup;
  }
  
  return {
    getDefinition,
    getGrammar,
    getInflectionGroup,
  }
})()

window.CPED = DPR_Cped;

if (typeof module !== "undefined") {
  module.exports = CPED;
}
