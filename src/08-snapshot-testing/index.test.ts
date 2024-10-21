// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3];
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList(input);
    expect(result).toStrictEqual(expectedOutput);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const input = ['a', 'b', 'c', 'd'];
    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });

  test('should generate empty linked list for empty input', () => {
    const input: number[] = [];
    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });

  test('should generate linked list with one element', () => {
    const input = [42];
    const result = generateLinkedList(input);
    expect(result).toMatchSnapshot();
  });
});
