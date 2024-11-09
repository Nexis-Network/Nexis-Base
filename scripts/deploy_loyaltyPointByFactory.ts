import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { hexlify } from "ethers";
import { ethers, run } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  const minters = [
    "0x85d80c9e71aeffbd74d3b7f2a17cd84c24de7049",
  ];
  const lpFactoryAddr = "0xb27fa575A34BeF6D4E3f5b92160a77ad2CeD1E9c";
  const name = "testName";
  const symbol = "testSymbol";
  const initialAdmin = owner.address;

  const lpFactory = await ethers.getContractAt("LoyaltyPointFactory", lpFactoryAddr);
  const tx = await lpFactory.createLoyaltyPoint(name, symbol, initialAdmin, minters);
  await tx.wait();
  console.log("tx:", tx.hash);
}

main().catch(console.error);
