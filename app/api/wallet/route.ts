import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface WalletData {
  totalNZT: string;
  unlockedNZT: string;
  vestedNZT: string;
  estDailyUnlocked: number;
  vestingPeriod: number;
  delegatedNZT: string;
  nodeLicenses: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address')?.toLowerCase();

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: { walletAddress: address },
      select: {
        totalNZT: true,
        unlockedNZT: true,
        vestedNZT: true,
        estDailyUnlocked: true,
        vestingPeriod: true,
        delegatedNZT: true,
        nodeLicenses: true,
      },
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const walletData: WalletData = {
      totalNZT: userData.totalNZT,
      unlockedNZT: userData.unlockedNZT,
      vestedNZT: userData.vestedNZT,
      estDailyUnlocked: userData.estDailyUnlocked,
      vestingPeriod: userData.vestingPeriod,
      delegatedNZT: userData.delegatedNZT,
      nodeLicenses: userData.nodeLicenses,
    };

    return NextResponse.json(walletData);
  } catch (error) {
    console.error('Error fetching wallet data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wallet data' },
      { status: 500 }
    );
  }
} 