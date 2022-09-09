import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routes';
import dbClient from './utils/db';

const port = 5000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(router);

dbClient.client
  .then(() =>
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })
  )
  .catch(() => console.log('DB not connected'));
