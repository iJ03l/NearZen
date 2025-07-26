// packages/funding-sdk/index.ts

import { WalletSelector, Wallet } from '@near-wallet-selector/core';
import { providers } from 'near-api-js';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';  // Correct import path for FinalExecutionOutcome

import { initSelector } from './wallet';  // Import wallet init function

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

/**
 * FundingSDK class for handling DAO proposals with wallet integration.
 */
export class FundingSDK {
  private selector: WalletSelector | null = null;
  private options: FundingSDKOptions;

  constructor(options: FundingSDKOptions) {
    this.options = options;
  }

  /**
   * Initialize the wallet selector.
   */
  async init(): Promise<void> {
    this.selector = await initSelector(this.options.network, this.options.daoContractId);
  }

  /**
   * Submit a funding proposal to the DAO.
   * @param proposal - The proposal details.
   * @returns Transaction hash on success.
   */
  async submitProposal(proposal: Proposal): Promise<string> {
    if (!this.selector) {
      throw new Error('Wallet selector not initialized. Call init() first.');
    }

    const wallet: Wallet = await this.selector.wallet();
    if (!wallet) {
      throw new Error('No wallet selected.');
    }

    // Prepare DAO proposal call (using Sputnik DAO standard)
    const args = {
      proposal: {
        description: proposal.description,
        kind: {
          Transfer: {
            token_id: '',  // Empty for native NEAR
            receiver_id: proposal.recipient,
            amount: proposal.amount.toString(),
          },
        },
      },
    };

    // Sign and send transaction
    const outcome = await wallet.signAndSendTransaction({
      receiverId: this.options.daoContractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'add_proposal',
            args: Buffer.from(JSON.stringify(args)),
            gas: '300000000000000',  // 300 TGas as string
            deposit: '1000000000000000000000000',  // 1 NEAR bond
          },
        },
      ],
    });

    // Get transaction hash from outcome with proper typing
    const provider = new providers.JsonRpcProvider({ url: `https://rpc.${this.options.network}.near.org` });
    const accounts = await wallet.getAccounts();  // Use getAccounts()
    const accountId = accounts[0]?.accountId;
    if (!accountId) {
      throw new Error('No account ID available from wallet.');
    }
    const txResult: FinalExecutionOutcome = await provider.txStatus(outcome.transaction.hash, accountId);  // Use FinalExecutionOutcome

    return txResult.transaction.hash;
  }

  // Additional methods can be added here, e.g., listProposals, voteOnProposal
}
