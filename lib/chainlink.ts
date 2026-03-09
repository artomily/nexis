// ============================================
// NexisRiskOracle ABI — Auto-extracted from Foundry build
// ============================================
// This is the ABI for the NexisRiskOracle contract.
// Used by wagmi hooks to interact with the deployed contract.
//
// Contract: chainlink/src/NexisRiskOracle.sol
// Network:  Sepolia (or local Anvil)

export const NEXIS_ORACLE_ABI = [
  // ── Read Functions ───────────────────────────────────────
  {
    type: "function",
    name: "getRiskData",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "mriValue", type: "uint256" },
          { name: "state", type: "uint8" },
          { name: "momentum", type: "int256" },
          { name: "lastUpdated", type: "uint256" },
          { name: "btcPrice", type: "int256" },
          { name: "ethPrice", type: "int256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getIntelligenceReport",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "summary", type: "string" },
          { name: "primaryDriver", type: "string" },
          { name: "riskOutlook7D", type: "string" },
          { name: "generatedAt", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLatestAlerts",
    inputs: [{ name: "count", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "id", type: "uint256" },
          { name: "severity", type: "uint8" },
          { name: "title", type: "string" },
          { name: "description", type: "string" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLatestPrices",
    inputs: [],
    outputs: [
      { name: "btcPrice", type: "int256" },
      { name: "ethPrice", type: "int256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "currentRisk",
    inputs: [],
    outputs: [
      { name: "mriValue", type: "uint256" },
      { name: "state", type: "uint8" },
      { name: "momentum", type: "int256" },
      { name: "lastUpdated", type: "uint256" },
      { name: "btcPrice", type: "int256" },
      { name: "ethPrice", type: "int256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "alertCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "criticalThreshold",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "highThreshold",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "checkUpkeep",
    inputs: [{ name: "", type: "bytes" }],
    outputs: [
      { name: "upkeepNeeded", type: "bool" },
      { name: "performData", type: "bytes" },
    ],
    stateMutability: "view",
  },

  // ── Write Functions ──────────────────────────────────────
  {
    type: "function",
    name: "updateRiskData",
    inputs: [
      { name: "_mriValue", type: "uint256" },
      { name: "_state", type: "uint8" },
      { name: "_momentum", type: "int256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateIntelligenceReport",
    inputs: [
      { name: "_summary", type: "string" },
      { name: "_primaryDriver", type: "string" },
      { name: "_riskOutlook7D", type: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "performUpkeep",
    inputs: [{ name: "performData", type: "bytes" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCreWorkflowAddress",
    inputs: [{ name: "_addr", type: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setThresholds",
    inputs: [
      { name: "_critical", type: "uint256" },
      { name: "_high", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "_newOwner", type: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },

  // ── Events ───────────────────────────────────────────────
  {
    type: "event",
    name: "RiskDataUpdated",
    inputs: [
      { name: "mriValue", type: "uint256", indexed: true },
      { name: "state", type: "uint8", indexed: false },
      { name: "momentum", type: "int256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "IntelligenceReportUpdated",
    inputs: [
      { name: "summary", type: "string", indexed: false },
      { name: "generatedAt", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "RiskAlertTriggered",
    inputs: [
      { name: "id", type: "uint256", indexed: true },
      { name: "severity", type: "uint8", indexed: false },
      { name: "title", type: "string", indexed: false },
      { name: "description", type: "string", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
] as const;

// ── Contract Addresses ─────────────────────────────────────
// Update these after deploying to Sepolia

export const NEXIS_ORACLE_ADDRESS =
  (process.env.NEXT_PUBLIC_NEXIS_ORACLE_ADDRESS as `0x${string}`) ||
  "0x0000000000000000000000000000000000000000";

// Chainlink Data Feed addresses (Sepolia)
export const CHAINLINK_FEEDS = {
  BTC_USD: "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43" as `0x${string}`,
  ETH_USD: "0x694AA1769357215DE4FAC081bf1f309aDC325306" as `0x${string}`,
} as const;
