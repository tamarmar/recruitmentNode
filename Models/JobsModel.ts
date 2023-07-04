import mongoose, { Schema, model, connect } from 'mongoose';

export interface IJob {
    name: string;
    place?:string;
    CompanyDesc?:string;
    JobDesc:string
    demands:string;
    date:string;
    status:boolean;
    logo?:string;
  }

  const jobSchema = new Schema<IJob>({
    name: { type: String, required: true },
    place: String,
    CompanyDesc:String,
    JobDesc: { type: String, required: true },
    demands: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: Boolean, required: true },
    logo:String
  });

  export default mongoose.model<IJob>("jobsModel", jobSchema);