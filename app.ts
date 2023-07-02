import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./DbConection";
import JobRouter from "./Routers/JobRouter";
import bodyParser from 'body-parser';
import CandidatesRouter from "./Routers/CandidatesRouter";

// import helmet from "helmet";

connectDB();

const app = express();

app.get('/',(req,res)=>{res.send('Hello world!!')});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(cors())


app.use('/jobs',JobRouter);
app.use('/candidates',CandidatesRouter);

dotenv.config();

app.listen(3000, () => { console.log(`https//:localhost:${3000}`) })

