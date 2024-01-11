import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mainRouter from './routes/main.router';

dotenv.config();

const db = require('./models');

const app: Application = express();

const port: number = parseInt(process.env.PORT || '8000');

app.use(bodyParser.json());
app.use(cors());

app.use('/', mainRouter);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err: any) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
