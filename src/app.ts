import express, {Express} from 'express';
import morgan from 'morgan';
import healthRouter from './api/v1/routes/healthRoutes';
import eventRouter from "./api/v1/routes/eventRoutes";
import cors from 'cors';
import dotenv from 'dotenv';


import {getHelmetConfig} from "../config/helmetConfig";
import {getCorsOptions} from "../config/corsConfig";
dotenv.config();

const app: Express = express();
app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));
app.use(express.json());
app.use(morgan('combined'));
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/events', eventRouter);

export default app;