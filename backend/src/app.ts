import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mainRouter from './routes/main.router';
import authRouter from './routes/auth.router';
import postRouter from './routes/post.router';
import { initPassport } from './middleware/auth.middleware';

// const db = require('./models');

const app: Express = express();

const port: number = parseInt(process.env.PORT || '8000');

app.use(bodyParser.json());
app.use(cors());
initPassport(app);

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);

// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log('Synced db.');
//   })
//   .catch((err: any) => {
//     console.log('Failed to sync db: ' + err.message);
//   });

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
