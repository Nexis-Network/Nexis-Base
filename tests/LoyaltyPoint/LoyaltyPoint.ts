import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { HDNodeWallet, hexlify, toBigInt } from "ethers";
import { ethers } from "hardhat";

import { LoyaltyPoint } from "../../typechain-types";
import { generateRandomWallet } from "../helpers/wallet";

const ZERO_BYTES32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

describe("LoyaltyPoint", function () {
  let loyaltyPoint: LoyaltyPoint;
  let owner: SignerWithAddress;
  let minter: SignerWithAddress;

  beforeEach(async () => {
    ({ loyaltyPoint, owner, minter } = await loadFixture(deployLoyaltyPointFixture));
  });

  async function deployLoyaltyPointFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, minter] = await ethers.getSigners();
    const loyaltyPointFactory = await ethers.getContractFactory("LoyaltyPoint");
    const loyaltyPoint = await loyaltyPointFactory.deploy("testName", "testSymbol", owner, [minter]);
    return { loyaltyPoint, owner, minter };
  }

  describe("Deployment", function () {
    it("Should set the right name", async function () {
      expect(await loyaltyPoint.name()).to.equal("testName");
    });

    it("Should set the right symbol", async function () {
      expect(await loyaltyPoint.symbol()).to.equal("testSymbol");
    });
  });

  describe("setName", function () {
    it("caller not owner", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.connect(user).setName("test")).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("success to set name", async function () {
      await loyaltyPoint.setName("test");
      expect(await loyaltyPoint.name()).to.equal("test");
    });
  });

  describe("setSymbol", function () {
    it("caller not owner", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.connect(user).setSymbol("test")).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("success to set symbol", async function () {
      await loyaltyPoint.setSymbol("test");
      expect(await loyaltyPoint.symbol()).to.equal("test");
    });
  });

  describe("setTransferable", function () {
    it("caller no permisson", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.connect(user).setTransferable(true)).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("contract owner success to set transferable", async function () {
      await loyaltyPoint.setTransferable(true);
    });
  });

  describe("mint", function () {
    it("caller no minter", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.mint(user, ethers.parseEther("100"))).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("invalid address", async function () {
      await expect(
        loyaltyPoint.connect(minter).mint(ethers.ZeroAddress, ethers.parseEther("100")),
      ).to.be.revertedWithCustomError(loyaltyPoint, "InvalidAddress");
    });

    it("success", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.connect(minter).mint(user, ethers.parseEther("100"))).to.changeTokenBalance(
        loyaltyPoint,
        user,
        ethers.parseEther("100"),
      );
    });
  });

  describe("mintBatch", function () {
    it("caller no minter", async function () {
      await expect(loyaltyPoint.mintBatch([], [])).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("length miss match", async function () {
      const users = [await generateRandomWallet(), await generateRandomWallet(), await generateRandomWallet()];
      const amounts = [100, 200];
      await expect(loyaltyPoint.connect(minter).mintBatch(users, amounts)).to.be.revertedWithCustomError(
        loyaltyPoint,
        "ParamsLengthMismatch",
      );
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(0);
      }
    });

    it("invalid address", async function () {
      const users = [await generateRandomWallet(), await generateRandomWallet(), ethers.ZeroAddress];
      const amounts = [100, 200, 300];
      await expect(loyaltyPoint.connect(minter).mintBatch(users, amounts)).to.be.revertedWithCustomError(
        loyaltyPoint,
        "InvalidAddress",
      );
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(0);
      }
    });

    it("success", async function () {
      const users = [await generateRandomWallet(), await generateRandomWallet(), await generateRandomWallet()];
      const amounts = [100, 200, 300];
      await loyaltyPoint.connect(minter).mintBatch(users, amounts);
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index]);
      }
    });
  });

  describe("burn", function () {
    it("caller no minter", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.burn(user, ethers.parseEther("100"))).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("invalid address", async function () {
      await expect(
        loyaltyPoint.connect(minter).burn(ethers.ZeroAddress, ethers.parseEther("100")),
      ).to.be.revertedWithCustomError(loyaltyPoint, "InvalidAddress");
    });

    it("success", async function () {
      const user = await generateRandomWallet();
      await loyaltyPoint.connect(minter).mint(user, 100);
      await expect(loyaltyPoint.connect(minter).burn(user, 80)).to.changeTokenBalance(loyaltyPoint, user, -80);
    });
  });

  describe("burnBatch", function () {
    it("caller no minter", async function () {
      await expect(loyaltyPoint.burnBatch([], [])).to.be.revertedWithCustomError(
        loyaltyPoint,
        "AccessControlUnauthorizedAccount",
      );
    });

    it("length miss match", async function () {
      // mint
      const users = [await generateRandomWallet(), await generateRandomWallet(), await generateRandomWallet()];
      const amounts = [100, 200, 300];
      await loyaltyPoint.connect(minter).mintBatch(users, amounts);
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index]);
      }

      const burnAmounts = [100, 200];
      await expect(loyaltyPoint.connect(minter).burnBatch(users, burnAmounts)).to.be.revertedWithCustomError(
        loyaltyPoint,
        "ParamsLengthMismatch",
      );
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index]);
      }
    });

    it("invalid address", async function () {
      // mint
      const users = [await generateRandomWallet(), await generateRandomWallet(), await generateRandomWallet()];
      const amounts = [100, 200, 300];
      await loyaltyPoint.connect(minter).mintBatch(users, amounts);
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index]);
      }

      const burnAmounts = [100, 200, 300];
      await expect(
        loyaltyPoint.connect(minter).burnBatch([users[0], users[1], ethers.ZeroAddress], burnAmounts),
      ).to.be.revertedWithCustomError(loyaltyPoint, "InvalidAddress");
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index]);
      }
    });

    it("success", async function () {
      // mint
      const users = [await generateRandomWallet(), await generateRandomWallet(), await generateRandomWallet()];
      const amounts = [100, 200, 300];
      await loyaltyPoint.connect(minter).mintBatch(users, amounts);
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index]);
      }

      const burnAmounts = [10, 20, 30];
      await loyaltyPoint.connect(minter).burnBatch(users, burnAmounts);
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        expect(await loyaltyPoint.balanceOf(user)).to.be.eq(amounts[index] - burnAmounts[index]);
      }
    });
  });

  describe("transfer", function () {
    it("cannot transfer", async function () {
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.transfer(user, 100)).to.be.revertedWithCustomError(loyaltyPoint, "TransferNotAllow");
    });

    it("transfer success", async function () {
      const user1 = await generateRandomWallet();
      const user2 = await generateRandomWallet();
      await loyaltyPoint.setTransferable(true);
      await loyaltyPoint.connect(minter).mint(user1, 100);
      await expect(loyaltyPoint.connect(user1).transfer(user2, 20)).to.be.changeTokenBalances(
        loyaltyPoint,
        [user1, user2],
        [-20, 20],
      );
    });
  });

  describe("hook", function () {
    it("add hook", async function () {
      const hookF = await ethers.getContractFactory("LoyaltyPointHook");
      const hook = await hookF.deploy(true);
      await loyaltyPoint.addHook(hook);
      const hooks = await loyaltyPoint.getHooks();
      expect(hooks[0]).to.be.eq(await hook.getAddress());
    });

    it("delete hook", async function () {
      const hookF = await ethers.getContractFactory("LoyaltyPointHook");
      const hook = await hookF.deploy(true);
      await loyaltyPoint.addHook(hook);
      let hooks = await loyaltyPoint.getHooks();
      expect(hooks[0]).to.be.eq(await hook.getAddress());

      await loyaltyPoint.deleteHook(0);
      hooks = await loyaltyPoint.getHooks();
      expect(hooks[0]).to.be.eq(ethers.ZeroAddress);
    });

    it("exec hook", async function () {
      const hookF = await ethers.getContractFactory("LoyaltyPointHook");
      const hook1 = await hookF.deploy(true);
      const hook2 = await hookF.deploy(true);
      const hook3 = await hookF.deploy(false);

      await loyaltyPoint.addHook(hook1);
      await loyaltyPoint.addHook(hook2);
      await loyaltyPoint.addHook(hook3);

      // exec failed
      const user = await generateRandomWallet();
      await expect(loyaltyPoint.connect(minter).mint(user, 100)).to.be.revertedWithCustomError(
        loyaltyPoint,
        "HookExecutionFailed",
      );

      // exec success
      await loyaltyPoint.deleteHook(2);
      await expect(loyaltyPoint.connect(minter).mint(user, ethers.parseEther("100"))).to.changeTokenBalance(
        loyaltyPoint,
        user,
        ethers.parseEther("100"),
      );
      await loyaltyPoint.deleteHook(0);
      await expect(loyaltyPoint.connect(minter).mint(user, ethers.parseEther("100"))).to.changeTokenBalance(
        loyaltyPoint,
        user,
        ethers.parseEther("100"),
      );
    });
  });
});
