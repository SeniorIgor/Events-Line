import type { NextApiHandler } from 'next';

import axios from "axios";

import { apiPath } from "@/config/api";
import { Comment, ErrorResponse } from "@/src/types";

type CommentsSuccessGetResponse = Array<Comment>;
type Response = CommentsSuccessGetResponse | ErrorResponse;
type PostRequest = Omit<Comment, 'id'>;

const getHandler: NextApiHandler<Response> = async (req, res) => {
  const eventId = req.query.eventId as string;

  const { data } = await axios.get<Array<Comment>>(
    apiPath.comments.all(eventId)
  );

  res.status(201).json(data);
};

const postHandler: NextApiHandler<Response> = async (req, res) => {
  const eventId = req.query.eventId as string;

  const { email, name, message } = req.body as PostRequest;

  await axios.post(apiPath.comments.all(eventId), {
    email,
    name,
    message,
  });

  res.status(201).json({ message: 'Success!' });
};

const handler: NextApiHandler<Response> = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        getHandler(req, res);
        break;

      case 'POST':
        postHandler(req, res);
        break;

      default:
        res
          .status(500)
          .json({ message: `The ${req.method} method is not supported!` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server not available!' });
  }
};

export default handler;
