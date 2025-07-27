// tests/funding.test.ts

import { FundingSDK } from '../packages/funding-sdk';
import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import * as nearAPI from 'near-api-js';

// Mock WalletSelector and Wallet
jest.mock('@near-wallet-selector/core', () => ({
  WalletSelector: jest.fn()
}));

// Mock near-api-js
jest.mock('near-api-js', () => ({
  providers: {
    JsonRpcProvider: jest.fn().mockImplementation(() => ({
      txStatus: jest.fn().mockResolvedValue({
        transaction: { hash: 'mockTxHash' }
      }),
      validators: jest.fn().mockResolvedValue({
        current_validators: [
          { account_id: 'validator1.testnet', stake: '1000000000000000000000000' },
          { account_id: 'validator2.testnet', stake: '2000000000000000000000000' }
        ]
      })
    }))
  },
  connect: jest.fn().mockResolvedValue({
    account: jest.fn().mockResolvedValue({
      accountId: 'testaccount.testnet',
      functionCall: jest.fn().mockResolvedValue({ transaction: { hash: 'mockFunctionCallHash' } }),
      viewFunction: jest.fn().mockResolvedValue('1000000000000000000000000'),
      getAccountBalance: jest.fn().mockResolvedValue({ 
        total: '5000000000000000000000000',
        available: '3000000000000000000000000'
      }),
      sendMoney: jest.fn().mockResolvedValue({ transaction: { hash: 'mockTransferHash' } })
    })
  })
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

describe('Enhanced FundingSDK with Treasury Features', () => {
  let sdk: FundingSDK;

  beforeEach(() => {
    sdk = new FundingSDK({ network: 'testnet', daoContractId: 'nearzen.testnet' });
    // Mock init to return our mock selector and account
    (sdk as any).selector = mockSelector;
    (sdk as any).account = {
      accountId: 'testaccount.testnet',
      functionCall: jest.fn().mockResolvedValue({ transaction: { hash: 'mockFunctionCallHash' } }),
      viewFunction: jest.fn().mockResolvedValue('1000000000000000000000000'),
      getAccountBalance: jest.fn().mockResolvedValue({ 
        total: '5000000000000000000000000',
        available: '3000000000000000000000000'
      }),
      sendMoney: jest.fn().mockResolvedValue({ transaction: { hash: 'mockTransferHash' } })
    };
  });

  // Original tests
  test('submits a proposal successfully', async () => {
    const proposal = {
      description: 'Test funding proposal',
      amount: 1000000000000000000000000,
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
  });

  test('throws error if selector not initialized', async () => {
    (sdk as any).selector = null;
    await expect(sdk.submitProposal({} as any)).rejects.toThrow('Wallet selector not initialized');
  });

  // New treasury tests
  test('creates treasury DAO successfully', async () => {
    const daoName = 'Test Treasury DAO';
    const council = ['member1.testnet', 'member2.testnet'];

    const txHash = await sdk.createTreasuryDAO(daoName, council);

    expect(txHash).toBe('mockFunctionCallHash');
    expect((sdk as any).account.functionCall).toHaveBeenCalledWith(expect.objectContaining({
      contractId: 'sputnik-dao.testnet',
      methodName: 'create',
      attachedDeposit: 6000000000000000000000000n  // Expect BigInt, not string
    }));
  });

  test('delegates stake successfully', async () => {
    const validatorId = 'validator.testnet';
    const amount = '1000000000000000000000000';  // Use string to avoid scientific notation

    const txHash = await sdk.delegateStake(validatorId, parseInt(amount));

    expect(txHash).toBe('mockFunctionCallHash');
    expect((sdk as any).account.functionCall).toHaveBeenCalledWith(expect.objectContaining({
      contractId: validatorId,
      methodName: 'deposit_and_stake',
      attachedDeposit: BigInt(amount)  // Expect BigInt
    }));
  });

  test('unstakes tokens successfully', async () => {
    const validatorId = 'validator.testnet';
    const amount = 500000000000000000000000;

    const txHash = await sdk.unstakeTokens(validatorId, amount);

    expect(txHash).toBe('mockFunctionCallHash');
    expect((sdk as any).account.functionCall).toHaveBeenCalledWith(expect.objectContaining({
      contractId: validatorId,
      methodName: 'unstake',
      args: { amount: amount.toString() }
    }));
  });

  test('unstakes all tokens when no amount specified', async () => {
    const validatorId = 'validator.testnet';

    const txHash = await sdk.unstakeTokens(validatorId);

    expect(txHash).toBe('mockFunctionCallHash');
    expect((sdk as any).account.functionCall).toHaveBeenCalledWith(expect.objectContaining({
      contractId: validatorId,
      methodName: 'unstake_all',
      args: {}
    }));
  });

  test('withdraws unstaked tokens successfully', async () => {
    const validatorId = 'validator.testnet';

    const txHash = await sdk.withdrawUnstaked(validatorId);

    expect(txHash).toBe('mockFunctionCallHash');
    expect((sdk as any).account.functionCall).toHaveBeenCalledWith(expect.objectContaining({
      contractId: validatorId,
      methodName: 'withdraw_all'
    }));
  });

  test('gets staking pool info successfully', async () => {
    const validatorId = 'validator.testnet';

    // Mock different return values for different methods
    (sdk as any).account.viewFunction = jest.fn()
      .mockResolvedValueOnce('1000000000000000000000000') // staked balance
      .mockResolvedValueOnce('500000000000000000000000')  // unstaked balance
      .mockResolvedValueOnce(true);                       // can withdraw

    const poolInfo = await sdk.getStakingPoolInfo(validatorId);

    expect(poolInfo).toEqual({
      accountId: validatorId,
      stakedBalance: '1000000000000000000000000',
      unstakedBalance: '500000000000000000000000',
      canWithdraw: true
    });
  });

  test('generates treasury report successfully', async () => {
    const validatorIds = ['validator1.testnet', 'validator2.testnet'];

    // Mock staking pool info calls
    const mockGetStakingPoolInfo = jest.fn()
      .mockResolvedValueOnce({
        accountId: 'validator1.testnet',
        stakedBalance: '1000000000000000000000000',
        unstakedBalance: '0',
        canWithdraw: false
      })
      .mockResolvedValueOnce({
        accountId: 'validator2.testnet',
        stakedBalance: '2000000000000000000000000',
        unstakedBalance: '500000000000000000000000',
        canWithdraw: true
      });

    sdk.getStakingPoolInfo = mockGetStakingPoolInfo;

    const report = await sdk.generateTreasuryReport(validatorIds);

    expect(report.balance).toBe('3000000000000000000000000');
    expect(report.stakedBalance).toBe('3000000000000000000000000');
    expect(report.unstakingBalance).toBe('500000000000000000000000');
    expect(report.delegatedValidators).toEqual(['validator1.testnet', 'validator2.testnet']);
  });

  test('funds treasury successfully', async () => {
    const treasuryId = 'treasury.testnet';
    const amount = '1000000000000000000000000';  // Use string to avoid scientific notation

    const txHash = await sdk.fundTreasury(treasuryId, parseInt(amount));

    expect(txHash).toBe('mockTransferHash');
    expect((sdk as any).account.sendMoney).toHaveBeenCalledWith(treasuryId, BigInt(amount));
  });

  test('gets validators list successfully', async () => {
    const validators = await sdk.getValidators();

    expect(validators).toEqual([
      { account_id: 'validator1.testnet', stake: '1000000000000000000000000' },
      { account_id: 'validator2.testnet', stake: '2000000000000000000000000' }
    ]);
    expect(nearAPI.providers.JsonRpcProvider).toHaveBeenCalled();
  });

  test('throws error when account not initialized for treasury operations', async () => {
    (sdk as any).account = null;

    await expect(sdk.createTreasuryDAO('test', ['member.testnet'])).rejects.toThrow('Account not initialized');
    await expect(sdk.delegateStake('validator.testnet', 1000)).rejects.toThrow('Account not initialized');
    await expect(sdk.generateTreasuryReport()).rejects.toThrow('Account not initialized');
  });
});
