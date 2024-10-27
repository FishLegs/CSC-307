import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 2;
    const got = mut.div(10, 5);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 4.8;
    const got = mut.div(24, 5);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 1;
    const got = mut.div(1, 1);
    expect(got).toBe(expected);
});

test('Testing div -- success', () => {
    const expected = 0.5;
    const got = mut.div(1, 2);
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("12345");
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- success', () => {
    const expected = false;
    const got = mut.containsNumbers("a");
    expect(got).toBe(expected);
});

//caught bug. to fix i would strip() text 
test('Testing containsNumbers -- success', () => {
    const expected = true;
    const got = mut.containsNumbers("a b");
    expect(got).toBe(expected);
});

