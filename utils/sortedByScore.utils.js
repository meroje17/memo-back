function sortedByScore(array) {
  if (!Array.isArray(array) || array.length === 0) return [];
  for (let index = 0; index < array.length; index++) {
    if (!(typeof array[index].score === "number")) return [];
  }
  return array.sort((a, b) => a.score - b.score);
}

module.exports = sortedByScore;
