// __tests__/example.test.js
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(4);
});

test('adds 2 + 2 to equal 5', () => {
  expect(sum(2, 2)).toBe(5); // This test will fail intentionally
});
