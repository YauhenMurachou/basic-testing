import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 7, action: Action.Multiply });
    expect(result).toBe(42);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 15, b: 3, action: Action.Divide });
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
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

  test('should handle negative numbers', () => {
    const result = simpleCalculator({ a: -5, b: 3, action: Action.Add });
    expect(result).toBe(-2);
  });

  test('should handle decimal numbers', () => {
    const result = simpleCalculator({
      a: 5.5,
      b: 2.2,
      action: Action.Multiply,
    });
    expect(result).toBeCloseTo(12.1, 5);
  });

  test('should handle division by zero', () => {
    const result = simpleCalculator({ a: 10, b: 0, action: Action.Divide });
    expect(result).toBe(Infinity);
  });
});
