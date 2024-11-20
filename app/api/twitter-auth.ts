import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' })
  }

  try {
    // Exchange the code for an access token
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/twitter-auth`,
        code_verifier: 'challenge',
      }),
    })

    const { access_token } = await tokenResponse.json()

    // Use the access token to get the user's Twitter info
    const userResponse = await fetch('https://api.twitter.com/2/users/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const { data: userData } = await userResponse.json()

    // Store the Twitter info in Supabase
    await supabase.from('users').update({
      twitter_id: userData.id,
      twitter_username: userData.username,
    }).eq('id', req.query.state)

    res.redirect('/onboarding?twitter=success')
  } catch (error) {
    console.error('Error during Twitter auth:', error)
    res.redirect('/onboarding?twitter=error')
  }
}