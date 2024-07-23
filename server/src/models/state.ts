import mongoose, { Document, Schema } from 'mongoose';

interface IState extends Document {
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

const stateSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true }
});

stateSchema.pre<IState>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const State = mongoose.model<IState>('State', stateSchema);
export default State;
