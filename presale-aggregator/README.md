# Presale Aggregator

This service monitors and synchronizes presale stages across multiple blockchain networks (Ethereum and BSC).

## Overview

The presale aggregator is a Node.js service that:

1. Monitors token sales on both Ethereum and BSC networks
2. Aggregates the total tokens sold across both chains
3. Automatically advances presale stages based on total sales
4. Ensures both chains stay in sync with the same presale stage

## Setup

### Prerequisites

- Node.js v16 or higher
- Access to Ethereum and BSC RPC endpoints
- Private key with owner permissions on both presale contracts

### Installation

1. Install dependencies:

```bash
cd presale-aggregator
npm install
```

2. Configure environment variables:

Edit the `.env` file with your specific values:

```
# RPC URLs
ETH_RPC_URL=https://sepolia.infura.io/v3/your-infura-key
BSC_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/

# The private key of the owner who can call setStage()
PRIVATE_KEY=0xabc123...

# Your deployed presale contract addresses
PRESALE_ETH=0xE429f7A2BDac87e8B02C9a14E68C668f417Ec6ec
PRESALE_BSC=0x8b26c34c2f015fa4bbe985eadba976578715bf90

# How often to check (ms). Default: 5 minutes
CHECK_INTERVAL_MS=300000
```

3. Configure stage parameters:

Edit `stageConfig.json` to match your presale stage configuration:

```json
{
  "stages": [
    {
      "id": 1,
      "bonus": 10,
      "price": "100000000000000",
      "start": 1737881664,
      "end": 1740506400,
      "cap": "2000000000000000000000000"
    },
    ...
  ]
}
```

## Running the Service

Start the service:

```bash
npm start
```

For production deployment, use a process manager like PM2:

```bash
npm install -g pm2
pm2 start index.js --name presale-aggregator
```

## Monitoring

The service logs its activity to the console:

- On startup: `🚀 Presale aggregator starting…`
- When checking: `✅ No change (on-chain: 1, target: 1, sold: 123.45 tokens)`
- When advancing stages: `🔄 Advancing from stage 1 → 2 (sold: 250000.00 tokens)`

## Frontend Integration

The frontend already reads the current stage and total sold tokens from the blockchain. The aggregator ensures these values are consistent across both chains.

## Troubleshooting

If you encounter issues:

1. Check that your RPC endpoints are working
2. Verify the private key has owner permissions on both contracts
3. Ensure the contract addresses are correct
4. Check that the stage configuration matches what's in your contracts