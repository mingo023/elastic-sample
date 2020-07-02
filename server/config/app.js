require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { initElasticsearch } from './elasticsearch'
import { esUrl } from './vars'

const ES = initElasticsearch({ host: esUrl });
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/search', async (req, res, next) => {
  const { q = '' } = req.query;
  const query = q
    ? {
        match: {
          title: {
            query: q,
            fuzziness: 'AUTO',
            operator : 'and',
          },
        },
      }
    : { match_all: {} };

  try {
    const docs = await ES.search({
      index: 'posts',
      size: 100,
      body: {
        query,
      },
    });

    return res.json(docs.hits.hits);
  } catch (error) {
    return next(error);
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;
