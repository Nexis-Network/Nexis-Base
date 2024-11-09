import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { BigNumberish, hexlify } from "ethers";
import { ethers } from "hardhat";

export async function getGrantMinterRoleSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  account: string,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      GrantMinterRole: [
        { name: "loyaltyPoint", type: "address" },
        { name: "account", type: "address" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      account: account,
    },
  );
  return hexlify(hashMsg);
}

export async function getRevokeMinterRoleSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  account: string,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      RevokeMinterRole: [
        { name: "loyaltyPoint", type: "address" },
        { name: "account", type: "address" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      account: account,
    },
  );
  return hexlify(hashMsg);
}

export async function getGrantSpaceAdminRoleSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  account: string,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      GrantSpaceAdminRole: [
        { name: "loyaltyPoint", type: "address" },
        { name: "account", type: "address" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      account: account,
    },
  );
  return hexlify(hashMsg);
}

export async function getRevokeSpaceAdminRoleSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  account: string,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      RevokeSpaceAdminRole: [
        { name: "loyaltyPoint", type: "address" },
        { name: "account", type: "address" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      account: account,
    },
  );
  return hexlify(hashMsg);
}

export async function getCreateLoyaltyPointsig(
  contract: string,
  signer: SignerWithAddress,
  spaceID: number,
  version: string,
  spaceName: string,
  initialAdmin: string,
  minters: string[],
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Factory",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      CreateLoyaltyPoint: [
        { name: "spaceID", type: "uint64" },
        { name: "version", type: "string" },
        { name: "spaceName", type: "string" },
        { name: "initialAdmin", type: "address" },
        { name: "minters", type: "address[]" },
      ],
    },
    {
      spaceID: spaceID,
      version: version,
      spaceName: spaceName,
      initialAdmin: initialAdmin,
      minters: minters,
    },
  );
  return hexlify(hashMsg);
}

export async function getPauseLoyaltyPointSig(contract: string, signer: SignerWithAddress, loyaltyPoint: string) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      PauseLoyaltyPoint: [{ name: "loyaltyPoint", type: "address" }],
    },
    {
      loyaltyPoint: loyaltyPoint,
    },
  );
  return hexlify(hashMsg);
}

export async function getUnpauseLoyaltyPointSig(contract: string, signer: SignerWithAddress, loyaltyPoint: string) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      UnpauseLoyaltyPoint: [{ name: "loyaltyPoint", type: "address" }],
    },
    {
      loyaltyPoint: loyaltyPoint,
    },
  );
  return hexlify(hashMsg);
}

export async function getSetLoyaltyPointNameSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  name: string,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      SetLoyaltyPointName: [
        { name: "loyaltyPoint", type: "address" },
        { name: "name", type: "string" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      name: name,
    },
  );
  return hexlify(hashMsg);
}

export async function getSetLoyaltyPointSymbolSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  symbol: string,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      SetLoyaltyPointSymbol: [
        { name: "loyaltyPoint", type: "address" },
        { name: "symbol", type: "string" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      symbol: symbol,
    },
  );
  return hexlify(hashMsg);
}

export async function getSetLoyaltyPointTransferableSig(
  contract: string,
  signer: SignerWithAddress,
  loyaltyPoint: string,
  transferable: boolean,
) {
  const hashMsg = await signer.signTypedData(
    {
      name: "Galxe LoyaltyPoint Manager",
      version: "1.0.0",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: contract,
    },
    {
      SetLoyaltyPointTransferable: [
        { name: "loyaltyPoint", type: "address" },
        { name: "transferable", type: "bool" },
      ],
    },
    {
      loyaltyPoint: loyaltyPoint,
      transferable: transferable,
    },
  );
  return hexlify(hashMsg);
}
