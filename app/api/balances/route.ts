import { NextResponse } from 'next/server';
import Moralis from 'moralis';

export async function GET(request: Request) {
  try {
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });

    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const chain = searchParams.get('chain');

    if (!address) {
      return NextResponse.json({ error: 'Address not provided' }, { status: 400 });
    }

    if (!chain) {
      return NextResponse.json({ error: 'Chain not provided' }, { status: 400 });
    }

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });

    return NextResponse.json(response.raw);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}