import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { LoyaltyPointFactory } from "../../typechain-types";
import { generateRandomWallet } from "../helpers/wallet";

describe("LoyaltyPointFactory", function () {
  let loyaltyPointFactory: LoyaltyPointFactory;
  let owner: SignerWithAddress;

  beforeEach(async () => {
    ({ loyaltyPointFactory, owner } = await loadFixture(deployLoyaltyPointFixture));
  });

  async function deployLoyaltyPointFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();
    const LoyaltyPointFactory = await ethers.getContractFactory("LoyaltyPointFactory");
    const loyaltyPointFactory = await LoyaltyPointFactory.deploy(owner);
    return { loyaltyPointFactory, owner };
  }

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await loyaltyPointFactory.owner()).to.equal(owner);
    });
  });

  describe("CreateLoyaltyPoint", function () {
    it("success", async function () {
      const user = await generateRandomWallet();
      const tx = await loyaltyPointFactory.createLoyaltyPoint("testName", "testSymbol", user.address, [user.address]);

      // replay attack
      await expect(loyaltyPointFactory.createLoyaltyPoint("testName", "testSymbol", user.address, [user.address])).to
        .reverted;
    });
  });
});
