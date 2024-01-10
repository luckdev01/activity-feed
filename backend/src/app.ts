import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/main.router';

dotenv.config();

const app: Application = express();

const port: number = parseInt(process.env.PORT || '8000');

app.use(bodyParser.json());
app.use(cors());

app.use('/', mainRouter);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
