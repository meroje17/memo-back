const sortedByScore = require("./sortedByScore.utils");

test("sortedByScore test invalid : argument is empty", () => {
  expect(sortedByScore()).toStrictEqual([]);
});

test("sortedByScore test invalid : argument type is string", () => {
  expect(sortedByScore("test")).toStrictEqual([]);
});

test("sortedByScore test invalid : argument type is number", () => {
  expect(sortedByScore(1)).toStrictEqual([]);
});

test("sortedByScore test invalid : argument type is object", () => {
  expect(sortedByScore({ test: "test" })).toStrictEqual([]);
});

test("sortedByScore test invalid : array is empty", () => {
  expect(sortedByScore([])).toStrictEqual([]);
});

test("sortedByScore test invalid : object in array not contain score attributes", () => {
  expect(sortedByScore([{ test: "test" }])).toStrictEqual([]);
});

test("sortedByScore test valid : return the same", () => {
  expect(
    sortedByScore([{ username: "Hello world", score: 10 }])
  ).toStrictEqual([{ username: "Hello world", score: 10 }]);
});

test("sortedByScore test valid : return the sorted array", () => {
  expect(sortedByScore([{ score: 10 }, { score: 2 }])).toStrictEqual([
    { score: 2 },
    { score: 10 },
  ]);
});
