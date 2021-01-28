const updateTopPlayers = require("./updateTopPlayers.utils");

test("updateTopPlayers test invalid : all arguments are empties", () => {
  expect(updateTopPlayers()).toStrictEqual([]);
});

test("updateTopPlayers test invalid : array argument is empty", () => {
  expect(updateTopPlayers({ username: "test", score: 1 }, [])).toStrictEqual(
    []
  );
});

test("updateTopPlayers test invalid : object argument is empty", () => {
  expect(updateTopPlayers({}, [{ username: "test", score: 1 }])).toStrictEqual([
    { username: "test", score: 1 },
  ]);
});

test("updateTopPlayers test invalid : object haven't keys we needed", () => {
  expect(
    updateTopPlayers({ name: "test" }, [{ username: "test", score: 1 }])
  ).toStrictEqual([{ username: "test", score: 1 }]);
});

test("updateTopPlayers valid : return the same", () => {
  expect(
    updateTopPlayers({ username: "test", score: 1 }, [
      { username: "test", score: 3 },
    ])
  ).toStrictEqual([{ username: "test", score: 3 }]);
});

test("updateTopPlayers valid : return the updated array", () => {
  expect(
    updateTopPlayers({ username: "test", score: 10 }, [
      { username: "test1", score: 3 },
      { username: "test2", score: 5 },
      { username: "test3", score: 15 },
    ])
  ).toStrictEqual([
    { username: "test2", score: 5 },
    { username: "test", score: 10 },
    { username: "test3", score: 15 },
  ]);
});
