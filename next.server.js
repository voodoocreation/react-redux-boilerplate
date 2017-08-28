/* eslint-disable no-console, global-require, import/no-dynamic-require */

const path = require('path');
const glob = require('glob');
const accepts = require('accepts');
const express = require('express');
const nextJS = require('next');
const compression = require('compression');
const customRoutes = require('./next.routes');
const jsonServer = require('json-server');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 5000;
const app = nextJS({ dev });
const customRoutesHandler = customRoutes.getRequestHandler(app);
const jsonRouter = jsonServer.router('./src/services/apiMocks.json');

const languages = glob.sync('./locales/*.json').map(f => path.basename(f, '.json'));

const getMessages = locale => require(`./locales/${locale}.json`);

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

    server.use((req, res) => {
      const accept = accepts(req);
      const locale = accept.language(languages);

      req.locale = locale;
      req.intlMessages = getMessages(locale);

      customRoutesHandler(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
