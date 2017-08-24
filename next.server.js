/* eslint-disable no-console */

const path = require('path');
const express = require('express');
const nextJS = require('next');
const compression = require('compression');
const customRoutes = require('./next.routes');
const jsonServer = require('json-server');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;
const app = nextJS({ dev });
const handle = app.getRequestHandler();
const customRoutesHandler = customRoutes.getRequestHandler(app);
const jsonRouter = jsonServer.router('./src/services/apiMocks.json');

app.prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    if (process.env.API_DELAY) {
      server.use('/api', (req, res, next) => {
        setTimeout(() => {
          next();
        }, process.env.API_DELAY);
      });
    }
    server.use('/api', jsonRouter);

    server.use('/assets', express.static(path.join(__dirname, 'dist/assets')));

    server.use(customRoutesHandler);

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
