// packages/funding-sdk/wallet.ts

import { setupWalletSelector, WalletSelector, WalletModuleFactory, Wallet } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';

/**
 * Initialize the Wallet Selector with modal UI.
 * @param network - 'testnet' or 'mainnet'
 * @param contractId - The DAO contract ID for modal config
 * @returns Initialized WalletSelector
 */
export async function initSelector(network: 'testnet' | 'mainnet', contractId: string): Promise<WalletSelector> {
  const selector = await setupWalletSelector({
    network,
    modules: [
      setupNearWallet() as WalletModuleFactory<Wallet>,  // Type assertion to match expected Wallet
      setupHereWallet() as WalletModuleFactory<Wallet>   // Type assertion for Here Wallet
    ],
  });

  setupModal(selector, { contractId });

  return selector;
}
