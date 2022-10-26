import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, email } = req.body;

  try {
    await prisma.note.create({
      data: {
        title,
        email,
        content,
      },
    });
    res.status(200).json({ message: 'Note Created' });
  } catch (error) {
    console.log('Failure');
  }
}
