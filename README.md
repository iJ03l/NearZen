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
- 🤝 **Open Contributions**: Anyone can contribute improvements, translations, and regional adaptations
- 📊 **Metrics & Analytics**: Track your hub's performance and impact transparently
- 🔗 **NEAR Integration**: Seamless compatibility with NEAR wallets, DAOs, and protocols

### ✨ Implemented Features

- **Funding Module SDK**: A TypeScript library for submitting funding proposals to NEAR DAOs with wallet integration.
- **Basic Repo Structure**: Folders for packages, templates, examples, scripts, tests, and CI workflows.
- **CI/CD with GitHub Actions**: Automated linting and testing on pushes/PRs.
- **Testing with Jest**: Unit tests for the SDK, including mocks for wallet and network calls.

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

tsc # Compiles TS to JS in /dist


## 💰 Using the Funding SDK

The SDK allows established NearZen hubs to submit funding proposals to a NEAR DAO.

### Installation
Copy `/packages/funding-sdk` into your project or install dependencies:

> pnpm add @near-wallet-selector/core @near-wallet-selector/modal-ui @near-wallet-selector/near-wallet @near-wallet-selector/here-wallet near-api-js

### Example Usage

```
import { FundingSDK } from './packages/funding-sdk'; // Adjust path

async function main() {
  const sdk = new FundingSDK({ network: 'testnet', daoContractId: 'your-dao.testnet' });
  await sdk.init();

  const proposal = {
    description: 'Funding for hub event',
    amount: 1000000000000000000000000, // 1 NEAR
    recipient: 'recipient.testnet'
  };

  const txHash = await sdk.submitProposal(proposal);
  console.log(`Proposal submitted! Tx: ${txHash}`);
}

main();
```


Run with `ts-node your-script.ts`. It prompts wallet signing and submits to the DAO.

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
