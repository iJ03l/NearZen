// packages/funding-sdk/index.ts

import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import { providers, connect, Account } from 'near-api-js';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';
import { initSelector } from './wallet';

// Type definitions for better TS support
interface Proposal {
  description: string;
  amount: number;  // In yoctoNEAR
  recipient: string;
}

interface FundingSDKOptions {
  network: 'testnet' | 'mainnet';
  daoContractId: string;
}

// New interface for treasury report (based on NEAR Treasury docs)
// New interface for treasury report (based on NEAR Treasury docs)
interface TreasuryReport {
  balance: string;           // Total available balance
  stakedBalance: string;     // Currently staked amount  
  unstakingBalance: string;  // Tokens being unstaked
  rewards: string;          // Estimated rewards earned
  delegatedValidators: string[]; // List of validators delegated to
}


// Fixed interface declaration - added 'interface' keyword
interface StakingPoolInfo {
  accountId: string;
  stakedBalance: string;
  unstakedBalance: string;
  canWithdraw: boolean;
}


/**
 * Enhanced FundingSDK class for handling DAO proposals and treasury management.
 */
export class FundingSDK {
  private selector: WalletSelector | null = null;
  private options: FundingSDKOptions;
  private account: Account | null = null;
  private nearConnection: any = null;

  constructor(options: FundingSDKOptions) {
    this.options = options;
  }

  /**
 * Helper function to safely convert numbers to BigInt, handling scientific notation
 */
private toBigInt(value: number | string): bigint {
  if (typeof value === 'number') {
    // Convert scientific notation to string first
    return BigInt(value.toLocaleString('fullwide', { useGrouping: false }));
  }
  return BigInt(value);
}

  /**
   * Initialize the wallet selector and NEAR connection for treasury operations.
   */
  async init(): Promise<void> {
    this.selector = await initSelector(this.options.network, this.options.daoContractId);
    
    // Connect to NEAR for treasury operations - removed explorerUrl
    this.nearConnection = await connect({
      networkId: this.options.network,
      nodeUrl: `https://rpc.${this.options.network}.near.org`,
      walletUrl: `https://wallet.${this.options.network}.near.org`,
      helperUrl: `https://helper.${this.options.network}.near.org`,
    });

    const wallet = await this.selector.wallet();
    const accounts = await wallet.getAccounts();
    if (accounts && accounts.length > 0) {
      this.account = await this.nearConnection.account(accounts[0].accountId);
    }
  }

  /**
   * Submit a funding proposal to the DAO (unchanged from previous version).
   */
  async submitProposal(proposal: Proposal): Promise<string> {
    if (!this.selector) {
      throw new Error('Wallet selector not initialized. Call init() first.');
    }

    const wallet: Wallet = await this.selector.wallet();
    if (!wallet) {
      throw new Error('No wallet selected.');
    }

    const args = {
      proposal: {
        description: proposal.description,
        kind: {
          Transfer: {
            token_id: '',
            receiver_id: proposal.recipient,
            amount: proposal.amount.toString(),
          },
        },
      },
    };

    const outcome = await wallet.signAndSendTransaction({
      receiverId: this.options.daoContractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'add_proposal',
            args: Buffer.from(JSON.stringify(args)),
            gas: '300000000000000',
            deposit: '1000000000000000000000000',
          },
        },
      ],
    });

    const provider = new providers.JsonRpcProvider({ url: `https://rpc.${this.options.network}.near.org` });
    const accounts = await wallet.getAccounts();
    const accountId = accounts[0]?.accountId;
    if (!accountId) {
      throw new Error('No account ID available from wallet.');
    }
    const txResult: FinalExecutionOutcome = await provider.txStatus(outcome.transaction.hash, accountId);

    return txResult.transaction.hash;
  }

  /**
   * Create a treasury DAO using the Sputnik DAO factory.
   */
  async createTreasuryDAO(daoName: string, council: string[], purpose: string = 'NearZen Hub Treasury'): Promise<string> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    const factoryContract = this.options.network === 'mainnet' ? 'sputnik-dao.near' : 'sputnik-dao.testnet';
    
    const config = {
      name: daoName,
      purpose: purpose,
      metadata: '',
    };

    const policy = council;

    const args = {
      config,
      policy,
    };

    const outcome = await this.account.functionCall({
      contractId: factoryContract,
      methodName: 'create',
      args: {
        name: daoName.toLowerCase().replace(/\s+/g, '-'),
        args: Buffer.from(JSON.stringify(args)).toString('base64'),
      },
      gas: this.toBigInt('300000000000000'),
      attachedDeposit: this.toBigInt('6000000000000000000000000'),
    });

    return outcome.transaction.hash;
  }

  /**
   * Delegate NEAR tokens to a staking pool for treasury yield generation.
   */
  async delegateStake(validatorId: string, amount: number): Promise<string> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    // First deposit and stake in one transaction
    const outcome = await this.account.functionCall({
      contractId: validatorId,
      methodName: 'deposit_and_stake',
      args: {},
      attachedDeposit: this.toBigInt(amount),
      gas: this.toBigInt('300000000000000'),
    });

    return outcome.transaction.hash;
  }

  /**
   * Unstake tokens from a validator (begins unstaking process).
   */
  async unstakeTokens(validatorId: string, amount?: number): Promise<string> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    const methodName = amount ? 'unstake' : 'unstake_all';
    const args = amount ? { amount: amount.toString() } : {};

    const outcome = await this.account.functionCall({
      contractId: validatorId,
      methodName,
      args,
      gas: this.toBigInt('300000000000000'),
      attachedDeposit: this.toBigInt('0'),

    });

    return outcome.transaction.hash;
  }

  /**
   * Withdraw unstaked tokens after the unstaking period (2-4 epochs).
   */
  async withdrawUnstaked(validatorId: string): Promise<string> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    const outcome = await this.account.functionCall({
      contractId: validatorId,
      methodName: 'withdraw_all',
      args: {},
      gas: BigInt('300000000000000'), // Convert to bigint
      attachedDeposit: BigInt('0'), // Convert to bigint
    });

    return outcome.transaction.hash;
  }

  /**
   * Get staking pool information for a specific validator.
   */
  async getStakingPoolInfo(validatorId: string): Promise<StakingPoolInfo> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    try {
      const stakedBalance = await this.account.viewFunction({
        contractId: validatorId,
        methodName: 'get_account_staked_balance',
        args: { account_id: this.account.accountId },
      });

      const unstakedBalance = await this.account.viewFunction({
        contractId: validatorId,
        methodName: 'get_account_unstaked_balance',
        args: { account_id: this.account.accountId },
      });

      const canWithdraw = await this.account.viewFunction({
        contractId: validatorId,
        methodName: 'is_account_unstaked_balance_available',
        args: { account_id: this.account.accountId },
      });

      return {
        accountId: validatorId,
        stakedBalance: stakedBalance.toString(),
        unstakedBalance: unstakedBalance.toString(),
        canWithdraw: canWithdraw,
      };
    } catch (error) {
      throw new Error(`Failed to get staking pool info: ${error}`);
    }
  }

  /**
   * Generate comprehensive treasury report with staking information.
   */
  async generateTreasuryReport(validatorIds: string[] = []): Promise<TreasuryReport> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    try {
      // Get account balance
      const balance = await this.account.getAccountBalance();
      
      let totalStaked = '0';
      let totalUnstaking = '0';
      let totalRewards = '0';
      const delegatedValidators: string[] = [];

      // Get staking information for each validator
      for (const validatorId of validatorIds) {
        try {
          const poolInfo = await this.getStakingPoolInfo(validatorId);
          
          if (BigInt(poolInfo.stakedBalance) > 0 || BigInt(poolInfo.unstakedBalance) > 0) {
            delegatedValidators.push(validatorId);
            totalStaked = (BigInt(totalStaked) + BigInt(poolInfo.stakedBalance)).toString();
            totalUnstaking = (BigInt(totalUnstaking) + BigInt(poolInfo.unstakedBalance)).toString();
            
            // Calculate estimated rewards (simplified calculation)
            // In practice, you'd want to track historical deposits vs current balance
            const estimatedRewards = BigInt(poolInfo.stakedBalance) * BigInt(45) / BigInt(1000); // ~4.5% APY
            totalRewards = (BigInt(totalRewards) + estimatedRewards).toString();
          }
        } catch (error) {
          console.warn(`Could not fetch info for validator ${validatorId}:`, error);
        }
      }

      return {
        balance: balance.available,
        stakedBalance: totalStaked,
        unstakingBalance: totalUnstaking,
        rewards: totalRewards,
        delegatedValidators,
      };
    } catch (error) {
      throw new Error(`Failed to generate treasury report: ${error}`);
    }
  }

  /**
   * Transfer funds to treasury DAO.
   */
  async fundTreasury(treasuryDaoId: string, amount: number): Promise<string> {
    if (!this.account) {
      throw new Error('Account not initialized. Call init() first.');
    }

    const outcome = await this.account.sendMoney(treasuryDaoId, this.toBigInt(amount)); // Convert to bigint
    return outcome.transaction.hash;
  }

  /**
   * Get list of available validators for staking.
   */
  async getValidators(): Promise<any[]> {
    const provider = new providers.JsonRpcProvider({ url: `https://rpc.${this.options.network}.near.org` });
    
    try {
      const validators = await provider.validators(null);
      return validators.current_validators;
    } catch (error) {
      throw new Error(`Failed to fetch validators: ${error}`);
    }
  }
}
