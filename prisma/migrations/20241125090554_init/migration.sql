-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "twitterAccountId" TEXT,
    "points" INTEGER NOT NULL,
    "referralCode" TEXT,
    "leaderboardPosition" INTEGER NOT NULL,
    "pointsLastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedQuests" TEXT NOT NULL,
    "walletAgeInDays" INTEGER NOT NULL,
    "seasonOnePoints" INTEGER NOT NULL,
    "totalNZT" TEXT NOT NULL,
    "unlockedNZT" TEXT NOT NULL,
    "vestedNZT" TEXT NOT NULL,
    "estDailyUnlocked" INTEGER NOT NULL,
    "vestingPeriod" INTEGER NOT NULL,
    "delegatedNZT" TEXT NOT NULL,
    "nodeLicenses" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isUsdPriceLoading" BOOLEAN NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
