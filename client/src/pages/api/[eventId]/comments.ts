import type { NextApiHandler } from 'next';

import { connectToDatabase } from '@/lib/mongodb';
import { collections } from '@/src/constants';
import { CommentDocument } from '@/src/models';
import { CreateCommentAPIRequest, CreateCommentAPIResponse } from '@/src/services/comments/create';
import { GetAllCommentsAPIResponse, GetAllCommentsRequest } from '@/src/services/comments/getAll';

type Response = GetAllCommentsAPIResponse | CreateCommentAPIResponse;

const getHandler: NextApiHandler<GetAllCommentsAPIResponse> = async (req, res) => {
  try {
    const { sort = {}, eventId } = req.query as Partial<GetAllCommentsRequest>;

    if (!eventId) {
      res.status(422).json({ message: `Event with id ${eventId} not found.` });
    }

    const { db } = await connectToDatabase();

    const comments = await db.collection<CommentDocument>(collections.comments).find({ eventId }).sort(sort).toArray();

    res.status(200).json({ comments: comments.map((comment) => ({ ...comment, id: comment._id.toString() })) });
  } catch (err) {
    res.status(500).json({ message: 'Server not available!' });
  }
};

const postHandler: NextApiHandler<CreateCommentAPIResponse> = async (req, res) => {
  try {
    const eventId = req.query.eventId as string | undefined;

    if (!eventId) {
      res.status(422).json({ message: `Event with id ${eventId} not found.` });
      return;
    }

    const { email, name, message } = req.body as CreateCommentAPIRequest;

    if (!email.includes('@') || !name.trim() || !message.trim()) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const { db } = await connectToDatabase();

    const { insertedId } = await db
      .collection<CommentDocument>(collections.comments)
      .insertOne({ email, eventId, message, name });

    if (!insertedId) {
      res.status(422).json({ message: `Something went wrong, please try again later.` });
      return;
    }

    res.status(201).json({ comment: { email, eventId, message, name, id: insertedId.toString() } });
  } catch (err) {
    res.status(500).json({ message: 'Server not available!' });
  }
};

const handler: NextApiHandler<Response> = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getHandler(req, res);
      break;

    case 'POST':
      await postHandler(req, res);
      break;

    default:
      res.status(500).json({ message: `The ${req.method} method is not supported!` });
  }
};

export default handler;
