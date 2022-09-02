import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import router from './routes';
import dbClient from './utils/db';

const port = 5000;
const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(router);

try {
  dbClient;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
} catch (err) {
  console.log(err);
}
