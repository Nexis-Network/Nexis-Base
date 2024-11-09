import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

const LoyaltyPointFactoryModule = buildModule("LoyaltyPointFactory", (m) => {
  const owner = m.getAccount(0);
  const lpFactory = m.contract("LoyaltyPointFactory", [owner]);
  return { lpFactory };
});

export default LoyaltyPointFactoryModule;
