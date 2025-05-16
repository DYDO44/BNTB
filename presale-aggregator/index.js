import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
dotenv.config();

// ─── Load config ───────────────────────────────────────────────────────────────
const {
  ETH_RPC_URL,
  BSC_RPC_URL,
  PRIVATE_KEY,
  PRESALE_ETH,
  PRESALE_BSC,
  CHECK_INTERVAL_MS = 300000
} = process.env;

if (!ETH_RPC_URL || !BSC_RPC_URL || !PRIVATE_KEY || !PRESALE_ETH || !PRESALE_BSC) {
  console.error("❗ Missing one of ETH_RPC_URL, BSC_RPC_URL, PRIVATE_KEY, PRESALE_ETH, PRESALE_BSC");
  process.exit(1);
}

// Get the directory name using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stages = JSON.parse(
  fs.readFileSync(path.join(__dirname, "stageConfig.json"), "utf8")
).stages;

// ─── Providers & Signers ───────────────────────────────────────────────────────
const providerEth = new ethers.JsonRpcProvider(ETH_RPC_URL);
const providerBsc = new ethers.JsonRpcProvider(BSC_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY);
const signerEth = wallet.connect(providerEth);
const signerBsc = wallet.connect(providerBsc);

// ─── Presale ABI & Contracts ───────────────────────────────────────────────────
// Minimal ABI for what we need
const presaleAbi = [
  "function totalSold() view returns (uint256)",
  "function getCurrentStageIdActive() view returns (uint256)",
  "function setStage(uint256, uint256, uint256, uint256, uint256)"
];
const presaleEth = new ethers.Contract(PRESALE_ETH, presaleAbi, signerEth);
const presaleBsc = new ethers.Contract(PRESALE_BSC, presaleAbi, signerBsc);

// ─── Helper: determine current stage by total sold ─────────────────────────────
function determineStageBySold(totalSoldBN) {
  // compute cumulative caps
  let cumulative = ethers.ZeroHash;
  for (const s of stages) {
    cumulative = ethers.toBigInt(cumulative) + ethers.toBigInt(s.cap);
    if (totalSoldBN < cumulative) {
      return s.id;
    }
  }
  // if ≥ all caps, stay at last stage
  return stages[stages.length - 1].id;
}

// ─── Core: check & advance stage ────────────────────────────────────────────────
async function checkAndAdvance() {
  try {
    // 1) fetch on-chain totals
    const [soldEth, soldBsc] = await Promise.all([
      presaleEth.totalSold(),
      presaleBsc.totalSold()
    ]);
    const totalSold = soldEth + soldBsc;

    // 2) determine where we *should* be
    const targetStage = determineStageBySold(totalSold);

    // 3) fetch each chain's current stage
    const [currEth, currBsc] = await Promise.all([
      presaleEth.getCurrentStageIdActive(),
      presaleBsc.getCurrentStageIdActive()
    ]);
    // we assume they are always in sync; take the min to be safe
    const currentStage = currEth < currBsc ? currEth : currBsc;

    if (targetStage > currentStage) {
      console.log(
        `🔄 Advancing from stage ${currentStage} → ${targetStage} ` +
        `(sold: ${ethers.formatUnits(totalSold, 18)} tokens)`
      );

      // get the new stage parameters
      const ns = stages.find((s) => s.id === targetStage);
      if (!ns) throw new Error(`No config for stage ${targetStage}`);

      // 4) call setStage on both chains
      const txEth = await presaleEth.setStage(
        ns.id, ns.bonus, ns.price, ns.start, ns.end
      );
      const txBsc = await presaleBsc.setStage(
        ns.id, ns.bonus, ns.price, ns.start, ns.end
      );
      await Promise.all([txEth.wait(), txBsc.wait()]);

      console.log("✅ Stage advanced on both chains");
    } else {
      console.log(
        `✅ No change (on-chain: ${currentStage}, target: ${targetStage}, ` +
        `sold: ${ethers.formatUnits(totalSold, 18)} tokens)`
      );
    }
  } catch (err) {
    console.error("❌ Error in checkAndAdvance:", err);
  }
}

// ─── Run on startup and then on interval ───────────────────────────────────────
(async () => {
  console.log("🚀 Presale aggregator starting…");
  await checkAndAdvance();
  setInterval(checkAndAdvance, Number(CHECK_INTERVAL_MS));
})();