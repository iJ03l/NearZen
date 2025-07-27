
# NearZen Treasury Account Setup Guide

## Prerequisites
- A NEAR testnet or mainnet wallet with some Ⓝ (use faucet for testnet).
- NEAR CLI installed (`pnpm install -g near-cli`).
- Your hub's DAO contract ID (if none, create one via Sputnik DAO factory).

## Step 1: Create a Treasury DAO (If Not Already Set Up)

### Option A: Using Frontend Interface (Recommended for Beginners)
1. **Visit the Treasury Factory Frontend**: Go to https://treasury-factory.near.page/ for an easy, user-friendly DAO creation experience.
   - This interface provides a streamlined way to deploy treasury DAOs without using command-line tools.
   - Follow the guided setup process to configure your DAO parameters.

2. **For Comprehensive Treasury Management**: Visit https://neartreasury.com/ for a detailed frontend guide on:
   - Creating and configuring treasury accounts
   - Managing ongoing treasury operations
   - Setting up governance structures
   - Monitoring treasury performance and metrics

### Option B: Using Traditional Methods
1. Go to the Sputnik DAO factory on testnet (e.g., factory.testnet.sputnik-dao.near via NEAR Explorer).
2. Deploy a new DAO:YourHubName]-treasury` (e.g., nearzen-nigeria-treasury).
   - Council: Add your account and 1-2 trusted members.
   - Bond: 1 Ⓝ (required).
3. Note the DAO contract ID (e.g., your-treasury.testnet).

**💡 Pro Tip**: The frontend interfaces at https://treasury-factory.near.page/ and https://neartreasury.com/ provide visual guidance and simplified workflows, making treasury setup more accessible for users who prefer graphical interfaces over CLI commands.

## Step 2: Fund the Treasury Account
1. Transfer initial funds to the DAO:
   ```
   near send [your-account.testnet] [your-treasury.testnet] 5 --useLedger
   ```
   (Replace with your accounts; 5 Ⓝ example).

## Step 3: Set Up Staking Delegation
1. Delegate to a validator for yields:
   ```
   near call [validator.testnet] deposit_and_stake --accountId [your-treasury.testnet] --amount 10
   ```
2. Monitor via NEAR Explorer or through the treasury management interface at https://neartreasury.com/.

## Step 4: Configure Governance
1. Add proposals for treasury actions (e.g., spending) via the DAO interface.
2. Set policies: Require multi-sig votes for withdrawals.
3. **Frontend Management**: Use https://neartreasury.com/ for ongoing treasury governance and management tasks through an intuitive web interface.

## Step 5: Integrate with NearZen SDK
See the SDK integration section below for code to manage your treasury programmatically.

## Frontend vs CLI Approach

| Method | Best For | Advantages |
|--------|----------|------------|
| **Frontend** (https://treasury-factory.near.page/ & https://neartreasury.com/) | Beginners, visual learners, ongoing management | User-friendly interface, guided setup, visual monitoring |
| **CLI/Manual** | Developers, automation, custom setups | Programmatic control, scripting capabilities, advanced configurations |

## Best Practices
- Diversify: Keep 30% in stablecoins (e.g., USN).
- Report: Use NearZen metrics to track balance quarterly.
- Security: Enable multi-sig and audits.
- **Monitor Regularly**: Use the frontend dashboard at https://neartreasury.com/ for real-time treasury oversight.

For issues, open a GitHub Discussion.
