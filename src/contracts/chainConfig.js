import * as ConfigModuleBnb from "./configBnb";
import IconBnb from "../assets/images/token/bnb.png";

const chains = {
  BNB: {
    id: 1,
    icon: IconBnb,
    name: "BNB Smart Chain Testnet",
    chainId: 97,
    configModule: ConfigModuleBnb,
    payWith: "BNB",
    title: "Buy on BNB",
  },
};

export const chainInfo = [
  {
    ...chains.BNB,
    // Since there is only one network, the "buy" properties are just the same as the normal ones.
    buyChainId: chains.BNB.chainId,
    buyTitle: chains.BNB.title,
    buyIcon: chains.BNB.icon,
    buyConfigModule: chains.BNB.configModule,
  },
];

export const chainConfig = (chainId) => {
  const config = chainInfo.find((item) => item.chainId === chainId);
  return config || chainInfo[0];
};
