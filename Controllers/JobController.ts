import { model,ObjectId } from "mongoose";
import JobsModel, { IJob } from "../Models/JobsModel"
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import candidatesModel, { ICandidates } from "../Models/candidatesModel";

const job = model<IJob>('jobs', JobsModel.schema);
const candidateModel = model<ICandidates>('candidates', candidatesModel.schema);

export default class JobController{
    public async getJobs (req: Request, res: Response) {           
       try{
        const jobs=await job.find();
        res.json(jobs);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
    }

    public async getbyid(req: Request, res: Response) {
      
        try {
            const njob = await job.findById({ _id: req.params.id})
            res.status(200).json(njob)
        } 
        catch (e) {if (e instanceof Error) {
            res.status(400).json({ message: e.message })
        } 
    }
}
   
    public async addJob(req: Request, res: Response) {
        try {
            const { name } = req.body
            //בדיקה שמשרה כזה אינו קיים:
            const njob = await job.findOne({name:name})
            if (njob != null) {
                res.status(200).send("the job exists")
            }
            const newJob = await job.create(req.body)
            res.status(200).json(newJob);
        }
        catch (e) {if (e instanceof Error) {
            res.status(400).json({ message: e.message })
        }
        }
    }
    public async updateJobs (req: Request, res: Response) {           
        const {id} = req.params;
        try {
            const updatejob = await job.findByIdAndUpdate(id,req.body,{new: true});
            res.json(updatejob);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
    public async deleteJobs(req: Request, res: Response){
        const {id} = req.params;
        try {
            const deleteJob = await job.findByIdAndDelete(id);
            res.json(deleteJob);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
    public async getCalculatedJobs (req: Request, res: Response) {           
        try {
            const jobs = await job.find();
            if(jobs){
                const dataIntegration: any = [];
                await Promise.all(
                    jobs.map(async (job) => {
                        const candidate = await candidateModel.find({jobId: job._id});
                        const data = {
                            jobId: job._id,
                            name: job.name,
                            JobDesc:job.JobDesc,
                            place:job.place,
                            status: job.status,
                            total: 0,
                            interview: 0,
                            screeningCall: 0,
                            task: 0,
                            logo:job.logo
                        };
                        if(candidate){
                            candidate.map((c)=> {
                                data.total ++;
                                if(c.interview == true || c.interview == false){
                                    data.interview ++;
                                }
                                if(c.screeningCall == true || c.screeningCall == false){
                                    data.screeningCall ++;
                                }
                                if(c.task == true || c.task == false){
                                    data.task ++;
                                }
                            })
                        }                        
                        dataIntegration.push(data);
                    })
                )
                return res.status(200).json(dataIntegration);
            }
            return res.status(404).json({message:"jobs not found"})
        } catch (error) {
            return res.status(404).json({ message: error });
        }
    }
}
