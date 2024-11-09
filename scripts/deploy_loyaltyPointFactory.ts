import { bufferToHex, keccak256 } from "ethereumjs-util";
import hre from "hardhat";

import LoyaltyPointFactoryModule from "../ignition/modules/LoyaltyPointFactory";

const salt = "0x" + "0".repeat(64);

async function main() {
  const network = process.env.HARDHAT_NETWORK;
  const { lpFactory } = await hre.ignition.deploy(LoyaltyPointFactoryModule, {
    strategy: "create2",
    strategyConfig: {
      salt: bufferToHex(keccak256(Buffer.from("LoyaltyPointFactory-v0.1.0", "utf8"))),
    },
    // Somehow necessary for Gravity chain to work.
    // see https://github.com/NomicFoundation/hardhat-ignition/issues/725
    config: {
      requiredConfirmations: 1,
    },
  });
  const addr = await lpFactory.getAddress();
  console.log(`(${network}) LoyaltyPointFactory deployed to: ${addr}`);
}

main().catch(console.error);
