import type { StaticImageData } from "next/image";
import type { Address } from "viem";

export type MenuItem = {
  title: string;
  link: string;
  isNewTab?: boolean;
}

export type MenuItems = MenuItem[];

export type WalletType = {
  [k: string]: string;
}

export type CreateUser = {
  walletAddress: Address,
  referralCode: string
}

export interface CompletedQuest {
  type: string;
  stakingType?: string;
}

export type CompletedQuests = CompletedQuest[];

export interface User {
  id: string;
  walletAddress: string;
  twitterAccountId: string;
  points: number;
  referralCode: string;
  leaderboardPosition: number;
  pointsLastUpdatedAt: string;
  createdAt: string;
  completedQuests: string[];
  walletAgeInDays: number;
  seasonOnePoints: number;
  totalNZT: string;
  unlockedNZT: string;
  vestedNZT: string;
  estDailyUnlocked: number;
  vestingPeriod: number;
  delegatedNZT: string;
  nodeLicenses: string;
}

export interface LeaderboardUser {
  id: string;
  walletAddress: Address;
  twitterAccountId: string;
  points: number;
  referralCode: string;
  walletAgeInDays?: number;
}


export type LeaderboardUsers = LeaderboardUser[];

export interface Leaderboard {
  users: LeaderboardUser[];
}

export type SignupStepCompleted = {
  [key: number]: boolean;
}

export type EcosystemApp = {
  name: string;
  description: string;
  image: string | StaticImageData;
  background?: string;
  beforeBackground?: string;
  quests: Quests;
  isHidden?: boolean;
}

export type EcosystemApps = EcosystemApp[];

export type Quest = {
  id: string;
  title: string;
  image?: string | StaticImageData;
  heading?: string;
  point?: string;
  pointModal?: string;
  description?: string;
  isActive?: boolean;
  isHidden?: boolean;
  completed?: boolean;
  button?: string;
  link?: string;
  isFunction?: boolean;
  isLoading?: boolean;
  buttonTwo?: string;
  successButtonTwo?: string
  linkTwo?: string;
  isFunctionTwo?: boolean;
  isDisabledTwo?: boolean;
  isLoadingTwo?: boolean;
  endpointTwo?: string;
  padding?: string;
  imageHeight?: string;
  accumulatedPoints?: number;
}

export type Quests = Quest[];

export interface WalletMetadata {
  totalNZT: string;
  unlockedNZT: string;
  vestedNZT: string;
  estDailyUnlocked: string;
  vestingPeriod: string;
  delegatedNZTAmount: string;
  nodeLicenses: string;
  nextRewardDistributionTime: string;
  ownsNZT: boolean;
  isDelegated: boolean;
}

export interface UserWalletData {
  walletAddress: Address;
  metadata: WalletMetadata;
}

export type WalletDataMapping = {
  [walletAddress: string]: WalletMetadata;
}
