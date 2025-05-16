# Gittu - ICO/IDO/IGO Token Presale Template With Smart Contract (React JS+Solidity)

This project is a token presale platform that supports multiple blockchain networks (Ethereum and BSC).

## Features

- Multi-chain support (Ethereum and BSC)
- Presale stages with increasing token prices
- Automatic stage progression based on total sales
- Responsive design for all devices
- Real-time progress tracking

## Project Structure

- `/src` - React frontend application
- `/src/contracts` - Smart contract ABIs and configuration
- `/presale-aggregator` - Off-chain service for cross-chain aggregation

## Getting Started with React App

### Available Scripts

In the project directory, you can run:

#### `npm install`

Install the dependencies

#### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Presale Aggregator

The presale aggregator is a Node.js service that monitors and synchronizes presale stages across multiple blockchain networks.

### Setup and Running

1. Navigate to the presale-aggregator directory:
```bash
cd presale-aggregator
```

2. Install dependencies:
```bash
npm install
```

3. Configure the `.env` file with your RPC endpoints, private key, and contract addresses.

4. Start the service:
```bash
npm start
```

For more details, see the [Presale Aggregator README](/presale-aggregator/README.md).