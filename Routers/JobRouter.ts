import {Request, Response, NextFunction} from "express";
import  JobController  from '../Controllers/JobController';
import express from "express";

const JobRouter = express.Router();

const jobC=new JobController()
// const getjobs = jobC.getJobs.bind(jobC)

JobRouter.get("/",jobC.getJobs)
JobRouter.get("/:id",jobC.getbyid)
JobRouter.post("/",jobC.addJob)
JobRouter.put("/:id",jobC.updateJobs)
JobRouter.delete("/:id",jobC.deleteJobs)

export default JobRouter;

