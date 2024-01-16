import express, { Request, Response } from 'express';
import dotenv from 'dotenv-flow';
import './paths';

import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

import AppDataSource from './data-source';
import APIRouter from './routes';
import { errorHandler } from './middlewares';

const App = express();

AppDataSource.initialize()
   .then(() => {
      console.log('✅ Database connected successfully !');

      // MIDDLEWARES
      App.use(express.json());
      App.use(express.urlencoded({ extended: true }));
      App.use(cors());
      App.use(helmet());

      App.use('/api', APIRouter);
      App.use(errorHandler); // Should be last middleware

      App.get('/', (_req: Request, res: Response) => {
         res.send('<h1>Vanakkam da Maple!</h1>');
      });

      const port = +process.env.PORT || 8000;

      App.listen(port, () => {
         console.log(`✅ Server listing on port ${port}`);
      });
   })
   .catch((err) => {
      console.error('❌ Database connection failed', err);
   });


