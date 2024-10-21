import { simpleCalculator, Action } from './index';

const testCases = [
  {
    name: 'should add two numbers',
    a: 5,
    b: 3,
    action: Action.Add,
    expected: 8,
  },
  {
    name: 'should subtract two numbers',
    a: 10,
    b: 4,
    action: Action.Subtract,
    expected: 6,
  },
  {
    name: 'should multiply two numbers',
    a: 6,
    b: 7,
    action: Action.Multiply,
    expected: 42,
  },
  {
    name: 'should divide two numbers',
    a: 15,
    b: 3,
    action: Action.Divide,
    expected: 5,
  },
  {
    name: 'should exponentiate two numbers',
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
  },
  {
    name: 'should handle negative numbers',
    a: -5,
    b: 3,
    action: Action.Add,
    expected: -2,
  },
  {
    name: 'should handle decimal numbers',
    a: 5.5,
    b: 2.2,
    action: Action.Multiply,
    expected: 12.1,
  },
  {
    name: 'should handle division by zero',
    a: 10,
    b: 0,
    action: Action.Divide,
    expected: Infinity,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    if (typeof expected === 'number' && !Number.isInteger(expected)) {
      expect(result).toBeCloseTo(expected, 5);
    } else {
      expect(result).toBe(expected);
    }
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: 'invalid' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'not a number',
      b: 3,
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
