const DPR_search_utils_mod = (() => {
  const searchAcrossBoundary = ({ text, searchPattern, boundaryPattern }) => {
    const textWithoutBoundaries = removeBoundaries(text, boundaryPattern);
    const position = findPosition(textWithoutBoundaries, searchPattern);
    if (position === null) {
      return null;
    }

    const { start, end } = alignPositionToSourceText(
      position,
      text,
      boundaryPattern
    );
    return { start, end, match: text.substring(start, end) };
  };

  const findPosition = (text, searchPattern) => {
    return searchPattern instanceof RegExp
      ? findRegExpPosition(text, searchPattern)
      : findStringPosition(text, searchPattern);
  };

  const findRegExpPosition = (text, searchPattern) => {
    const match = text.match(searchPattern);
    if (match === null) {
      return null;
    }

    const start = match.index;
    const end = start + match[0].length;
    return { start, end };
  };

  const findStringPosition = (text, searchPattern) => {
    const start = text.indexOf(searchPattern);
    if (start < 0) {
      return null;
    }

    const end = start + searchPattern.length;
    return { start, end };
  };

  const alignPositionToSourceText = (position, text, boundaryPattern) => {
    const allBoundaries = new RegExp(boundaryPattern, "g");
    for (const match of text.matchAll(allBoundaries)) {
      if (match.index <= position.start) {
        position.start += match[0].length;
      }
      if (match.index < position.end) {
        position.end += match[0].length;
      }
    }
    return position;
  };

  const removeBoundaries = (text, boundaryPattern) => {
    const allBoundaries = new RegExp(boundaryPattern, "g");
    return text.replace(allBoundaries, "");
  };

  return {
    searchAcrossBoundary,
  };
})();

if (typeof module !== "undefined") {
  module.exports = DPR_search_utils_mod;
}
