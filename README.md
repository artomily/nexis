# Nexis — RiskTerminal AI

**Institutional-grade DeFi risk monitoring terminal powered by Chainlink.**

Nexis aggregates real-time market data via Chainlink Data Feeds, computes a composite Market Risk Index (MRI), generates AI intelligence reports via Chainlink Functions, and triggers automated alerts via Chainlink Automation — all orchestrated through a **CRE Workflow**.

> Built for the Chainlink Hackathon — **Risk & Compliance** track.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CRE Workflow                           │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │  Trigger  │→ │ Data Feeds   │→ │ Compute Risk Index │    │
│  │  (Cron)   │  │ (BTC, ETH)   │  │ (Custom Compute)   │    │
│  └──────────┘  └──────────────┘  └────────┬───────────┘    │
│                                           │                 │
│                                    ┌──────▼──────────┐      │
│                                    │ Chainlink        │      │
│                                    │ Functions (LLM)  │      │
│                                    └──────┬───────────┘      │
│                                           │                 │
│                                    ┌──────▼──────────┐      │
│                                    │ OCR3 Consensus   │      │
│                                    └──────┬───────────┘      │
│                                           │                 │
│                                    ┌──────▼──────────┐      │
│                                    │ Write to EVM     │      │
│                                    │ (NexisRiskOracle)│      │
│                                    └─────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                          │
                    ┌─────▼─────┐
                    │  Next.js  │
                    │ Dashboard │ ← wagmi hooks read contract
                    └───────────┘
```

---

## Chainlink Integration Files

| File | Chainlink Product | Description |
|------|-------------------|-------------|
| [`chainlink/src/NexisRiskOracle.sol`](chainlink/src/NexisRiskOracle.sol) | **Data Feeds, Automation** | Smart contract consuming Chainlink Price Feeds (BTC/USD, ETH/USD) with Automation-compatible `checkUpkeep`/`performUpkeep` |
| [`chainlink/workflow/workflow.toml`](chainlink/workflow/workflow.toml) | **CRE Workflow** | Workflow definition: cron trigger → Data Feeds → compute MRI → Chainlink Functions (AI) → write to contract |
| [`chainlink/workflow/compute-risk.js`](chainlink/workflow/compute-risk.js) | **CRE Custom Compute** | Off-chain risk index computation from Chainlink price data |
| [`chainlink/workflow/ai-report.js`](chainlink/workflow/ai-report.js) | **Chainlink Functions** | Calls OpenAI API to generate AI risk intelligence report, delivered on-chain |
| [`chainlink/script/Deploy.s.sol`](chainlink/script/Deploy.s.sol) | **Data Feeds** | Foundry deploy script with Sepolia Chainlink feed addresses |
| [`chainlink/test/NexisRiskOracle.t.sol`](chainlink/test/NexisRiskOracle.t.sol) | **Data Feeds** | Unit tests with mock Chainlink aggregators |
| [`lib/chainlink.ts`](lib/chainlink.ts) | **Frontend ABI** | Contract ABI & addresses for wagmi integration |
| [`lib/wagmi-config.ts`](lib/wagmi-config.ts) | **Frontend** | Wagmi config for Sepolia (reads from Chainlink-powered contract) |
| [`lib/hooks/use-risk-index.ts`](lib/hooks/use-risk-index.ts) | **Data Feeds** | React hook reading MRI from on-chain Chainlink data |
| [`lib/hooks/use-ai-report.ts`](lib/hooks/use-ai-report.ts) | **Chainlink Functions** | React hook reading AI report from on-chain |
| [`lib/hooks/use-alerts.ts`](lib/hooks/use-alerts.ts) | **Automation** | React hook listening to on-chain alert events |
| [`app/providers.tsx`](app/providers.tsx) | **Frontend** | WagmiProvider wrapping the app for Web3 reads |
| [`components/layout/top-bar.tsx`](components/layout/top-bar.tsx) | **Data Feeds** | TopBar displays live MRI from Chainlink with live indicator |

---

## Chainlink Products Used

1. **Chainlink Data Feeds** — BTC/USD and ETH/USD price feeds on Sepolia for real-time market data
2. **Chainlink Automation** — `checkUpkeep` / `performUpkeep` for automated risk threshold monitoring
3. **Chainlink Functions** — Serverless compute calling an LLM API to generate AI intelligence reports
4. **CRE Workflow** — Orchestration layer connecting Data Feeds → Risk Computation → AI Report → On-chain write

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (forge, cast, anvil)
- Sepolia testnet ETH & LINK ([faucet](https://faucets.chain.link))

### Install

```bash
# Frontend dependencies
npm install

# Foundry dependencies (already included via forge init)
cd chainlink && forge install
```

### Environment Variables

```bash
cp .env.example .env
# Fill in your keys
```

### Smart Contracts

```bash
cd chainlink

# Build
forge build

# Test (17 tests)
forge test -vv

# Deploy to Sepolia
source .env
forge script script/Deploy.s.sol:DeployNexis \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast \
  --verify
```

### CRE Workflow

```bash
cd chainlink

# Simulate the workflow
chainlink workflow simulate --config workflow/workflow.toml

# Deploy to CRE network
chainlink workflow deploy --config workflow/workflow.toml --network sepolia
```

### Frontend

```bash
# After deploying, update NEXT_PUBLIC_NEXIS_ORACLE_ADDRESS in .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the TopBar will show a green pulse when reading live data from Chainlink.

---

## Project Structure

```
nexis/
├── app/                        # Next.js App Router
│   ├── providers.tsx           # WagmiProvider + QueryClient (Chainlink)
│   ├── layout.tsx              # Root layout with Web3Provider
│   └── (terminal)/             # Dashboard pages
│       ├── overview/           # Main risk dashboard
│       ├── derivatives/        # Derivatives risk module
│       ├── liquidity/          # Liquidity risk module
│       ├── stablecoin/         # Stablecoin flow module
│       ├── whale/              # Whale activity module
│       ├── systemic/           # Systemic stress module
│       ├── simulation/         # Stress test scenarios
│       └── replay/             # Historical event replay
├── components/                 # React components
│   ├── layout/
│   │   └── top-bar.tsx         # Live MRI display (Chainlink)
│   ├── cards/                  # Dashboard cards
│   └── terminal/               # Terminal-specific components
├── lib/
│   ├── chainlink.ts            # Contract ABI & addresses
│   ├── wagmi-config.ts         # Wagmi/Sepolia config
│   ├── hooks/
│   │   ├── use-risk-index.ts   # Chainlink Data Feeds hook
│   │   ├── use-ai-report.ts    # Chainlink Functions hook
│   │   └── use-alerts.ts       # Chainlink Automation hook
│   ├── mock-data.ts            # Fallback mock data
│   └── detail-data.ts          # Module detail data
├── chainlink/                  # Chainlink integration
│   ├── foundry.toml            # Foundry config
│   ├── src/
│   │   └── NexisRiskOracle.sol # Main smart contract
│   ├── script/
│   │   └── Deploy.s.sol        # Foundry deploy script
│   ├── test/
│   │   └── NexisRiskOracle.t.sol # Contract tests
│   └── workflow/
│       ├── workflow.toml       # CRE Workflow definition
│       ├── compute-risk.js     # Risk computation action
│       └── ai-report.js        # AI report (Chainlink Functions)
└── types/
    └── index.ts                # TypeScript types
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4, Recharts |
| Web3 | wagmi, viem, Sepolia testnet |
| Smart Contracts | Solidity 0.8.24, Foundry |
| Chainlink | Data Feeds, Automation, Functions, CRE Workflows |
| AI | OpenAI GPT-4o-mini (via Chainlink Functions) |

---

## License

MIT
