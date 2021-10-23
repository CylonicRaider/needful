import * as express from 'express';

export function app(): express.Express {
  const server = express();

  server.get('/api/ping', (req, res) => {
    res.json('pong');
  });

  server
    .route('/api/doit')
    .get((req, res) => {
      res.status(405).type('text').send('Use POST instead');
    })
    .post((req, res) => {
      setTimeout(() => res.json({ status: 'OK' }), 1000 + 2000 * Math.random());
    });

  server
    .route('/api/**')
    .get((req, res) => {
      res.status(404).type('text').send('404 Not Found');
    })
    .all((req, res) => {
      res.status(405).type('text').send('405 Method Not Allowed');
    });

  return server;
}
