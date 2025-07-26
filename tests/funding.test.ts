// tests/funding.test.ts

import { FundingSDK } from '../packages/funding-sdk';  // Adjust path if needed
import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import * as nearAPI from 'near-api-js';  // Import for mocking

// Mock WalletSelector and Wallet
jest.mock('@near-wallet-selector/core', () => ({
  WalletSelector: jest.fn()
}));

// Mock near-api-js provider
jest.mock('near-api-js', () => ({
  providers: {
    JsonRpcProvider: jest.fn().mockImplementation(() => ({
      txStatus: jest.fn().mockResolvedValue({
        transaction: { hash: 'mockTxHash' }
      })
    }))
  }
}));

const mockWallet: Partial<Wallet> = {
  signAndSendTransaction: jest.fn().mockResolvedValue({
    transaction: { hash: 'mockTxHash' }
  }),
  getAccounts: jest.fn().mockResolvedValue([{ accountId: 'testaccount.testnet' }])
};

const mockSelector: Partial<WalletSelector> = {
  wallet: jest.fn().mockResolvedValue(mockWallet as Wallet)
};

describe('FundingSDK', () => {
  let sdk: FundingSDK;

  beforeEach(() => {
    sdk = new FundingSDK({ network: 'testnet', daoContractId: 'nearzen.testnet' });
    // Mock init to return our mock selector
    (sdk as any).selector = mockSelector;  // Bypass actual init for testing
  });

  test('submits a proposal successfully', async () => {
    const proposal = {
      description: 'Test funding proposal',
      amount: 1000000000000000000000000,  // 1 NEAR
      recipient: 'recipient.testnet'
    };

    const txHash = await sdk.submitProposal(proposal);

    expect(txHash).toBe('mockTxHash');
    expect(mockWallet.signAndSendTransaction).toHaveBeenCalledWith(expect.objectContaining({
      receiverId: 'nearzen.testnet',
      actions: expect.arrayContaining([
        expect.objectContaining({
          type: 'FunctionCall',
          params: expect.objectContaining({
            methodName: 'add_proposal'
          })
        })
      ])
    }));
    // Verify provider mock was called
    expect(nearAPI.providers.JsonRpcProvider).toHaveBeenCalled();
  });

  test('throws error if selector not initialized', async () => {
    (sdk as any).selector = null;  // Simulate uninitialized state
    await expect(sdk.submitProposal({} as any)).rejects.toThrow('Wallet selector not initialized');
  });
});
