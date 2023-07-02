import mongoose, { Schema, model, connect, ObjectId } from 'mongoose';

export interface ICandidates {
    name: string;
    email:string;
    jobId:ObjectId;
    rating:number;
    cognitiveTest?:boolean;
    personalityTest?:boolean
    ReliabilityTest?:boolean
  }

  const candidatesSchema = new Schema<ICandidates>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    jobId: { type: Schema.Types.ObjectId, required: true },
    rating: { type: Number, required: true },
    cognitiveTest: {type:Boolean},
    personalityTest: {type:Boolean},
    ReliabilityTest: {type:Boolean}
  });

  export default mongoose.model<ICandidates>("candidatesModel", candidatesSchema);