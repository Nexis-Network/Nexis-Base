import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      // Replace with actual Zealy API call
      const response = await fetch(`https://api.zealy.io/quests/${id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.ZEALY_API_KEY}`
        }
      })
      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quest details' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}