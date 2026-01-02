import mongoose, { Schema, Document, trusted } from 'mongoose';

////////////////////////-----------QUEUE ----------------
export interface IQueue extends Document {
  name: string;
  isActive: boolean;
  nextSequence: number;
  createdAt: Date;
  updatedAt: Date;
}

const queueSchema = new Schema<IQueue>({
  name: { // queue name - unique so that we can identify the queue
    type: String,
    required: true
  },
  isActive: {// this tell if the queue is accepting new tokens or not
    type: Boolean,
    default: true, // by default queues are open for token generation
  },
  nextSequence: {//in queue - next available sequence number
      type: Number,
      required: true,
      default: 1,  
      //Monotonically increasing sequence for token generation
    },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

queueSchema.index({ name: 1 }, {unique:true}); //Queue name should be unique
queueSchema.index({ isActive: 1 });  //todo for future issue


//////-------------------------------------------------TOKEN ---------------------------------------------
///------------------------token statuses 
// Waiting - token is in queue
// Served - token has been called and served (completed : out from queue)
// Skipped - token was skipped (not served)
// Cancelled - token was cancelled by user
export enum TokenStatus {
  WAITING = "waiting",
  SERVED = "served",
  SKIPPED = "skipped",
  CANCELLED = "cancelled",
}

export interface IToken extends Document {
  queue: mongoose.Types.ObjectId;
  seq: number;
  status: TokenStatus;
  createdAt: Date;
  updatedAt: Date;
}
const tokenSchema = new Schema<IToken>(
  {
    queue: { // which queue this token belongs to
      type: Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
    },
    seq: {// sequence number within the queue
      type: Number,
      required: true,
    },
    status: { // life cycle status of the token
      type: String,
      enum: Object.values(TokenStatus),
      default: TokenStatus.WAITING,
    },
  },
  { timestamps: true }
);
tokenSchema.index({ queue:1, seq: 1 }, { unique: true });
tokenSchema.index({ queue: 1, status: 1 });

export const Token = mongoose.model<IToken>("Token", tokenSchema);
export const Queue = mongoose.model<IQueue>('Queue', queueSchema);