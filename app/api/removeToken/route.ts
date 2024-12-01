import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const { wallet_address, token_id, chain } = await request.json()

    if (!wallet_address || !token_id || !chain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('user_tokens')
      .delete()
      .match({
        wallet_address: wallet_address.toLowerCase(),
        token_id: token_id.toLowerCase(),
        chain,
      })

    if (error) {
      console.error('Error removing token:', error)
      return NextResponse.json(
        { error: 'Failed to remove token' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Token removed successfully' })
  } catch (error) {
    console.error('Error in removeToken route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 