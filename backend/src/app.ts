import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

const port: number = parseInt(process.env.PORT || '8000');

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World.');
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
