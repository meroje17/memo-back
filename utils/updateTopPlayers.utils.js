const sortedByScore = require("./sortedByScore.utils");

function updateTopPlayers(newPlayer, array) {
  if (!Array.isArray(array) || array.length === 0) return [];
  if (typeof newPlayer !== "object") return array;
  if (!(typeof newPlayer.score === "number")) return array;
  if (!(typeof newPlayer.username === "string")) return array;
  let newArray = [...array];
  newArray.push(newPlayer);
  newArray = sortedByScore(newArray);
  newArray.splice(newArray.lenght - 1, 1);
  return newArray;
}

module.exports = updateTopPlayers;
