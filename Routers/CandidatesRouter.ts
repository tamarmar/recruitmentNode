import {Request, Response, NextFunction} from "express";
import  CandidatesController  from '../Controllers/CandidatesController';
import express from "express";

const CandidatesRouter = express.Router();

const CandidatesC=new CandidatesController()

CandidatesRouter.get("/",CandidatesC.getCandidates)
// CandidatesRouter.get("/:id",CandidatesC.getbyid)
CandidatesRouter.get("/:jobid",CandidatesC.getbyJobid)
CandidatesRouter.post("/",CandidatesC.addCandidates)
CandidatesRouter.put("/:id",CandidatesC.updateCandidates)
CandidatesRouter.delete("/:id",CandidatesC.deleteCandidates)

export default CandidatesRouter;