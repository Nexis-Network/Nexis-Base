import { HDNodeWallet } from "ethers";
import { ethers } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";

// Generates random wallet and connects it to hardhat provider, sets balance to 100 ETH
export async function generateRandomWallet(): Promise<HDNodeWallet> {
  // Connect to Hardhat Provider
  const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
  // Set balance
  await ethers.provider.send("hardhat_setBalance", [
    wallet.address,
    "0x56BC75E2D6310000000", // 10000 ETH
  ]);
  return wallet;
}

export async function generateRandomWallets(count: number): Promise<HDNodeWallet[]> {
  const wallets = [];
  for (let i = 0; i < count; i++) {
    wallets.push(await generateRandomWallet());
  }
  return wallets;
}
