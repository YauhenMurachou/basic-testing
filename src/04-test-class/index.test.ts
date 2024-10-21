import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError when withdrawing more than balance', () => {
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(150)).toThrow(
      'Insufficient funds: cannot withdraw more than 100',
    );
  });

  test('should transfer money', () => {
    const recipientAccount = getBankAccount(50);
    account.transfer(30, recipientAccount);
    expect(account.getBalance()).toBe(70);
    expect(recipientAccount.getBalance()).toBe(80);
  });

  test('should throw error when transferring more than balance', () => {
    const recipientAccount = getBankAccount(50);
    expect(() => account.transfer(150, recipientAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  describe('fetchBalance', () => {
    test('should return number if request did not fail', async () => {
      (random as jest.Mock).mockReturnValueOnce(75).mockReturnValueOnce(1);
      const result = await account.fetchBalance();
      expect(result).toBe(75);
    });

    test('should return null if request failed', async () => {
      (random as jest.Mock).mockReturnValueOnce(75).mockReturnValueOnce(0);
      const result = await account.fetchBalance();
      expect(result).toBeNull();
    });
  });

  describe('synchronizeBalance', () => {
    test('should set new balance if fetchBalance returned number', async () => {
      (random as jest.Mock).mockReturnValueOnce(75).mockReturnValueOnce(1);
      await account.synchronizeBalance();
      expect(account.getBalance()).toBe(75);
    });

    test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
      (random as jest.Mock).mockReturnValueOnce(75).mockReturnValueOnce(0);
      await expect(account.synchronizeBalance()).rejects.toThrow(
        SynchronizationFailedError,
      );
      expect(account.getBalance()).toBe(100);

      (random as jest.Mock).mockReturnValueOnce(75).mockReturnValueOnce(0);
      await expect(account.synchronizeBalance()).rejects.toThrow(
        'Synchronization failed',
      );
      expect(account.getBalance()).toBe(100);
    });
  });
});
