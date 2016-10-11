
import { Schema, Document, model } from 'mongoose';
import * as mongoose from 'mongoose';

export let ObjectId = Schema.Types.ObjectId;
export let Mixed = Schema.Types.Mixed;

export interface IArticleModel extends Document {
  title: string;
  url: string;
  text: string;
}

let schema = new Schema({
  title: String,
  url: String,
  text: String
});

export const Article = mongoose.model<IArticleModel>('Article', schema);
