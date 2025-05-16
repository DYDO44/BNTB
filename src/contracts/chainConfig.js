import * as ConfigModuleBnb from "./configBnb";
import * as ConfigModuleEth from "./configEth";
import IconBnb from "../assets/images/token/bnb.png";
import IconEth from "../assets/images/token/eth.png";

const chains = {
  BNB: {
    id: 1,
    icon: IconBnb,
    name: "BNB Smart Chain Testnet",
    chainId: 97,
    configModule: ConfigModuleBnb,
    payWith: "BNB",
    title: "Buy with BNB",
  },
  ETH: {
    id: 2,
    icon: IconEth,
    name: "Ethereum Sepolia Testnet",
    chainId: 11155111,
    configModule: ConfigModuleEth,
    payWith: "ETH",
    title: "Buy with ETH",
  }
};

export const chainInfo = [
  {
    ...chains.BNB,
    buyChainId: chains.BNB.chainId,
    buyTitle: chains.BNB.title,
    buyIcon: chains.BNB.icon,
    buyConfigModule: chains.BNB.configModule,
  },
  {
    ...chains.ETH,
    buyChainId: chains.ETH.chainId,
    buyTitle: chains.ETH.title,
    buyIcon: chains.ETH.icon,
    buyConfigModule: chains.ETH.configModule,
  }
];

export const chainConfig = (chainId) => {
  const config = chainInfo.find((item) => item.chainId === chainId);
  return config || chainInfo[0];
};
