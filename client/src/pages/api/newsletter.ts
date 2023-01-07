import type { NextApiHandler } from 'next';

import { connectToDatabase } from '@/lib/mongodb';
import { collections } from '@/src/constants';
import { EmailDocument } from '@/src/models';
import { APIResponse } from '@/src/types';

interface PostRequest {
  email: string;
}

const postHandler: NextApiHandler<APIResponse> = async (req, res) => {
  try {
    const { email } = req.body as PostRequest;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const { db } = await connectToDatabase();

    const data = await db.collection<EmailDocument>(collections.emails).findOne({ email });

    if (!data) {
      await db.collection<EmailDocument>(collections.emails).insertOne({ email });

      res.status(201).json({ message: 'Signed up!' });
      return;
    }

    res.status(400).json({ message: 'User with this email already exists' });
  } catch (err) {
    res.status(500).json({ message: 'Server not available!' });
  }
};

const handler: NextApiHandler<APIResponse> = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await postHandler(req, res);
      break;

    default:
      res.status(500).json({ message: `The ${req.method} method is not supported!` });
  }
};

export default handler;
