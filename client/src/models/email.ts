import { ObjectId } from 'mongodb';

export default class Email {
  constructor(public email: string, public _id?: ObjectId) {}
}
