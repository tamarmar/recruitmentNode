import { model } from "mongoose";
import candidatesModel, { ICandidates } from "../Models/candidatesModel"
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';

const candidatesmodel = model<ICandidates>('candidates', candidatesModel.schema);

export default class CandidatesController{
    public async getCandidates (req: Request, res: Response) {           
       try{
        const candidates=await candidatesmodel.find();
        res.json(candidates);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
    }

    public async getbyid(req: Request, res: Response) {
      
        try {
            const Candidates = await candidatesmodel.findById({ _id: req.params.id})
            res.status(200).json(Candidates)
        } 
        catch (e) {if (e instanceof Error) {
            res.status(400).json({ message: e.message })
        } 
    }
}
   
    public async addCandidates(req: Request, res: Response) {
        try {
            const { name } = req.body
            //בדיקה שמשרה כזה אינו קיים:
            const Candidates = await candidatesmodel.findOne({name:name})
            if (Candidates != null) {
                res.status(200).send("the Candidates exists")
            }
            const newCandidates = await candidatesmodel.create(req.body)
            res.status(200).json(newCandidates);
        }
        catch (e) {if (e instanceof Error) {
            res.status(400).json({ message: e.message })
        }
        }
    }
    public async updateCandidates (req: Request, res: Response) {           
        const {id} = req.params;
        try {
            const updateCandidates = await candidatesmodel.findByIdAndUpdate(id,req.body,{new: true});
            res.json(updateCandidates);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
    public async deleteCandidates(req: Request, res: Response){
        const {id} = req.params;
        try {
            const deleteCandidates = await candidatesmodel.findByIdAndDelete(id);
            res.json(deleteCandidates);
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
    public async getbyJobid(req: Request, res: Response) {
      
        try {
            const Candidates = await candidatesmodel.find({ jobId: req.params.jobid})
            res.status(200).json(Candidates)
        } 
        catch (e) {if (e instanceof Error) {
            res.status(400).json({ message: e.message })
        } 
    }
}

    
}