import elasticsearch from 'elasticsearch';

export const initElasticsearch = ({ config = {} }) => {
  const client = new elasticsearch.Client({
    host: 'http://localhost:9200',
    log: 'trace',
    apiVersion: '7.2',
    ...config,
  });
  
  return client;
}
