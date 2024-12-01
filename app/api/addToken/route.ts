import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const { wallet_address, token_id, name, symbol, chain } = await request.json()

    if (!wallet_address || !token_id || !name || !symbol || !chain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('user_tokens')
      .upsert(
        {
          wallet_address: wallet_address.toLowerCase(),
          token_id: token_id.toLowerCase(),
          name,
          symbol,
          chain,
          is_tracked: true,
        },
        {
          onConflict: 'wallet_address,token_id,chain',
        }
      )

    if (error) {
      console.error('Error adding token:', error)
      return NextResponse.json(
        { error: 'Failed to add token' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Token added successfully' })
  } catch (error) {
    console.error('Error in addToken route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 