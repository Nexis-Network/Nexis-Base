import { NextResponse } from 'next/server'
import { supabaseServerClient } from '../../../../lib/utils/supabase/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 })
  }
  try {
    // Query Supabase
    const { data, error } = await supabaseServerClient
      .from('nexis_holders')
      .select('*')
      .eq('wallet_address', address)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}