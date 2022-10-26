import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const noteId = req.query.id;

  if (req.method === 'DELETE') {
    const note = await prisma.note.delete({
      where: { id: String(noteId) },
    });
    res.json(note);
  } else {
    console.log('Note could not be created');
  }

  if (req.method === 'PUT') {
    const note = await prisma.note.update({
      where: { id: String(noteId) },
      data: req.body,
    });
    res.json(note);
  } else {
    console.log('Note could not be created');
  }
}
