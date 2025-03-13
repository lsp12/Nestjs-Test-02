const { calculateScore } = require("./index.js");

describe("calculateScore", () => {
  test("Debe retornar 13 para [1, 2, 3, 4, 5]", () => {
    expect(calculateScore([1, 2, 3, 4, 5])).toBe(13);
  });

  test("Debe retornar 9 para [17, 19, 21]", () => {
    expect(calculateScore([17, 19, 21])).toBe(9);
  });

  test("Debe retornar 15 para [5, 5, 5]", () => {
    expect(calculateScore([5, 5, 5])).toBe(15);
  });
});
