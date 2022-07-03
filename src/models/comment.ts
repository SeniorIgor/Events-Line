import { ObjectId } from 'mongodb';

export default class Comment {
  constructor(
    public eventId: string,
    public name: string,
    public email: string,
    public message: string,
    public _id?: ObjectId,
  ) {}
}
