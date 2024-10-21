import axios from 'axios';
import { throttle } from 'lodash';
import * as moduleUnderTest from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockCreate = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: {} }),
    });
    mockedAxios.create = mockCreate;

    await moduleUnderTest.throttledGetDataFromApi('/test');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    mockedAxios.create.mockReturnValue({
      get: mockGet,
    } as any);

    await moduleUnderTest.throttledGetDataFromApi('/test');

    expect(mockGet).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test' };
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockData }),
    } as any);

    const result = await moduleUnderTest.throttledGetDataFromApi('/test');

    expect(result).toEqual(mockData);
  });

  test('should use throttle with correct time', () => {
    jest.isolateModules(() => {
      require('./index');
    });

    expect(throttle).toHaveBeenCalledWith(
      expect.any(Function),
      moduleUnderTest.THROTTLE_TIME,
    );
  });
});
