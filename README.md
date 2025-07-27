![Nearzen Banner](./nearzen-light.svg#gh-light-mode-only)
![Nearzen Banner](./nearzen-dark.svg#gh-dark-mode-only)
# NearZen Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/iJ03l/NearZen.svg?style=social&label=Star)](https://github.com/iJ03l/NearZen)
[![GitHub forks](https://img.shields.io/github/forks/iJ03l/NearZen.svg?style=social&label=Fork)](https://github.com/iJ03l/NearZen/fork)
[![GitHub issues](https://img.shields.io/github/issues/iJ03l/NearZen.svg)](https://github.com/iJ03l/NearZen/issues)
[![Contributors](https://img.shields.io/github/contributors/iJ03l/NearZen.svg)](https://github.com/iJ03l/NearZen/graphs/contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Open-source framework for establishing and scaling regional NEAR hubs globally, with transparent tools, open contributions, and ecosystem funding pathways.**

## Brand Strategy
[Full details in BRAND-STRATEGY.md](BRAND-STRATEGY.md)

## 🚀 Quick Start

- **Clone repo**: `git clone https://github.com/iJ03l/NearZen.git`
- **Install dependencies**: `pnpm install`
- **Start building**: Check out `/templates` for hub starter kits
- **Run tests**: `pnpm test`
- **Use the Funding SDK**: See usage below for submitting DAO proposals

## ✨ Features

- 🌍 **Global Accessibility**: Start a NEAR hub anywhere with our standing kit
- 🔧 **Modular Tools**: Templates for DAOs, events, governance, and community building
- 💰 **Funding Pathway**: Built-in mechanisms for established communities to request ecosystem funding
- 🏦 **Treasury Management**: Create treasury DAOs, delegate stakes for yields, and manage hub funds sustainably
- 🤝 **Open Contributions**: Anyone can contribute improvements, translations, and regional adaptations
- 📊 **Metrics & Analytics**: Track your hub's performance and impact transparently with treasury reporting
- 🔗 **NEAR Integration**: Seamless compatibility with NEAR wallets, DAOs, protocols, and staking validators


### ✨ Implemented Features

- **Funding Module SDK**: A TypeScript library for submitting funding proposals to NEAR DAOs with wallet integration.
- **Treasury Management System**: Comprehensive treasury operations including DAO creation, staking delegation, fund management, and reporting for sustainable hub operations.
- **Basic Repo Structure**: Folders for packages, templates, examples, scripts, tests, and CI workflows.
- **CI/CD with GitHub Actions**: Automated linting and testing on pushes/PRs.
- **Testing with Jest**: Unit tests for the SDK, including mocks for wallet and network calls.
- **Templates and Guides**: Treasury setup guides, branding kits, event templates, and contribution frameworks.


## 📁 Repository Structure

├── docs/ # Documentation and guides (published to website)

├── packages/ # Reusable libraries and SDKs

│ ├── funding-sdk/ # Ecosystem funding request tools

│ └── wallet-utils/ # NEAR wallet integration helpers

├── templates/ # Copy-paste hub playbooks

│ ├── dao-setup/ # DAO governance templates

│ ├── events/ # Hackathon and workshop kits

│ └── community/ # Community building resources

├── examples/ # Reference implementations

├── scripts/ # Development and deployment tools

└── .github/ # Community guidelines and CI/CD


## 🌟 Getting Started

### For Hub Organizers
1. **Download the Standing Kit**: Visit our [documentation](docs/) for step-by-step guides
2. **Customize Templates**: Adapt governance structures and event plans for your region
3. **Launch Your Hub**: Use our proof-of-concept tools to validate your approach
4. **Track Progress**: Implement our metrics dashboard to measure impact

### For Contributors
1. **Read Contributing Guidelines**: Check [CONTRIBUTING.md](CONTRIBUTING.md) for PR guidelines
2. **Pick an Issue**: Look for `good-first-issue` labels in our [Issues](https://github.com/iJ03l/NearZen/issues)
3. **Join Discussions**: Participate in [GitHub Discussions](https://github.com/iJ03l/NearZen/discussions)
4. **Share Your Experience**: Submit case studies from your regional implementations

### For Funding Requests
1. **Prove Impact**: Document your hub's activities and community engagement
2. **Use Our Templates**: Follow standardized proposal formats in `/templates/funding-proposal.md`
3. **Submit Through DAO**: Community-driven review process ensures transparency
4. **Track Progress**: Monitor your request status through our dashboard

## 🔧 Development

Clone the repository

git clone https://github.com/iJ03l/NearZen.git

cd NearZen

Install dependencies

pnpm install
Run linting

pnpm run lint
Run tests

pnpm test
Build (if needed)



## 💰 Using the Funding SDK with Treasury Management

The SDK provides comprehensive capabilities for both requesting ecosystem funding and managing hub treasuries. The SDK maintains full backward compatibility while adding powerful treasury operations including DAO creation, staking delegation, and financial reporting.

### Installation
Copy `/packages/funding-sdk` into your project or install dependencies:

> pnpm add @near-wallet-selector/core @near-wallet-selector/modal-ui @near-wallet-selector/near-wallet @near-wallet-selector/here-wallet near-api-js

### Basic Funding Request Example

```
import { FundingSDK } from './packages/funding-sdk'; // Adjust path

async function submitFundingRequest() {
  const sdk = new FundingSDK({ network: 'testnet', daoContractId: 'your-dao.testnet' });
  await sdk.init();

  const proposal = {
    description: 'Funding for hub hackathon event',
    amount: 1000000000000000000000000, // 1 NEAR in yoctoNEAR
    recipient: 'recipient.testnet'
  };

  const txHash = await sdk.submitProposal(proposal);
  console.log(`Proposal submitted! Tx:

```
### Treasury Management Example
```
import { FundingSDK } from './packages/funding-sdk';

async function manageTreasury() {
  const sdk = new FundingSDK({ network: 'testnet', daoContractId: 'your-dao.testnet' });
  await sdk.init();

  // Create a treasury DAO for community governance
  const treasuryTxHash = await sdk.createTreasuryDAO(
  'NearZen Nigeria Treasury',
  ['leader.testnet', 'member1.testnet', 'member2.testnet'],
  'Managing funds for our regional NEAR hub activities'
  );
  console.log(Treasury DAO created! Tx: ${treasuryTxHash});

  // Delegate tokens to validators for yield generation (~4.5% APY)
  const stakeTxHash = await sdk.delegateStake('validator.testnet', 5000000000000000000000000); // 5 NEAR
  console.log(Tokens delegated for staking! Tx: ${stakeTxHash});

  // Fund the treasury from hub activities
  const fundTxHash = await sdk.fundTreasury('treasury-dao.testnet', 10000000000000000000000000); // 10 NEAR
  console.log(Treasury funded! Tx: ${fundTxHash});

  // Generate comprehensive treasury report
  const report = await sdk.generateTreasuryReport(['validator.testnet', 'validator2.testnet']);
  console.log('Treasury Report:', {
  availableBalance: report.balance,
  stakedAmount: report.stakedBalance,
  estimatedRewards: report.rewards,
  validators: report.delegatedValidators
  });
}

manageTreasury();
```

### Advanced Staking Operations
```
async function manageStaking() {
  const sdk = new FundingSDK({ network: 'testnet', daoContractId: 'your-dao.testnet' });
  await sdk.init();

  // Get list of available validators
  const validators = await sdk.getValidators();
  console.log('Available validators:', validators.slice(0, 5)); // Show first 5

  // Check specific validator's staking pool information
  const poolInfo = await sdk.getStakingPoolInfo('validator.testnet');
  console.log('Pool info:', {
  stakedBalance: poolInfo.stakedBalance,
  unstakedBalance: poolInfo.unstakedBalance,
  canWithdraw: poolInfo.canWithdraw
  });

  // Unstake tokens (begins 2-4 epoch waiting period)
  const unstakeTxHash = await sdk.unstakeTokens('validator.testnet', 1000000000000000000000000); // 1 NEAR
  console.log(Unstaking initiated! Tx: ${unstakeTxHash});

  // Withdraw unstaked tokens after waiting period
  const withdrawTxHash = await sdk.withdrawUnstaked('validator.testnet');
  console.log(Tokens withdrawn! Tx: ${withdrawTxHash});
  }

manageStaking();
```

### Combined Funding and Treasury Workflow
```
async function hubLifecycle() {
  const sdk = new FundingSDK({ network: 'testnet', daoContractId: 'ecosystem-dao.testnet' });
  await sdk.init();

  // 1. Request initial funding from ecosystem DAO
  const fundingProposal = {
  description: 'Initial funding for NearZen Regional Hub in Nigeria',
  amount: 50000000000000000000000000, // 50 NEAR
  recipient: 'hub-leader.testnet'
  };
  const proposalTx = await sdk.submitProposal(fundingProposal);
  console.log(Funding requested! Proposal Tx: ${proposalTx});

  // 2. After funding approval, create treasury DAO
  const treasuryTx = await sdk.createTreasuryDAO(
  'NearZen Nigeria Hub Treasury',
  ['hub-leader.testnet', 'community-member.testnet']
  );

  // 3. Fund treasury and stake for sustainability
  await sdk.fundTreasury('nigeria-treasury.testnet', 30000000000000000000000000); // 30 NEAR
  await sdk.delegateStake('validator.testnet', 20000000000000000000000000); // 20 NEAR for staking

  // 4. Generate regular reports for transparency
  const quarterlyReport = await sdk.generateTreasuryReport(['validator.testnet']);
  console.log('Quarterly Treasury Report:', quarterlyReport);
  }

hubLifecycle();
```


## 🌐 Ecosystem Integration

NearZen is built for the NEAR ecosystem, featuring:
- **Wallet Selector**: Multi-wallet support for seamless user onboarding
- **DAO Templates**: Pre-configured governance structures using NEAR DAO tools
- **Smart Contracts**: Funding distribution and community management contracts
- **DevHub Integration**: Aligned with NEAR DevHub standards and practices

## 📈 Impact & Metrics

Track global NearZen adoption:
- **Active Hubs**: [Live counter from GitHub API]
- **Global Reach**: [World map of implementations]
- **Funding Distributed**: [Total ecosystem grants facilitated]
- **Contributors**: [Community growth metrics]

## 🤝 Community

- **Website**: (coming soon)
- **Telegram**: Join the [NEAR DevHub](https://t.me/NearDevHub) community
- **Twitter**: Follow [@NearZenHub](https://twitter.com/NearZenHub) for updates
- **NEAR DevHub**: Participate in ecosystem discussions

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the NEAR Protocol ecosystem
- Inspired by successful regional hub models
- Community-driven development approach
- Special thanks to all contributors and hub organizers

---

**Ready to start your regional NEAR hub?** Get the toolkit and join the global movement! 🚀
