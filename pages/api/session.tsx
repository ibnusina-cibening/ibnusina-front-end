import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // res.status(200).json({ text: 'Hello' });
  const session = await getSession({ req })
  if (session) {
    // Signed in
    res.status(200).json(session);
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}